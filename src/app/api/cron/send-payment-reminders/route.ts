import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { fetchOverdueInvoices, type ZohoInvoice } from "@/lib/zoho-books";
import { sendReminderEmail, type PaymentReminder } from "@/lib/payment-reminders";

const REMINDER_INTERVAL_MS = 3 * 24 * 60 * 60 * 1000; // 3 days, confirmed cadence

// Vercel Cron authenticates itself by sending Authorization: Bearer
// $CRON_SECRET on every scheduled invocation -- same pattern as
// send-monthly-reports.
export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Deliberate launch gate, same shape as MONTHLY_REPORTS_ENABLED -- stays
  // off (dry-run only, no emails, no DB writes) until you've reviewed a
  // real dry run and are ready to let this actually email clients.
  const enabled = process.env.PAYMENT_REMINDERS_ENABLED === "true";

  const results = { dryRun: !enabled, tracked: 0, resolved: 0, reminded: 0, skipped: 0, failed: 0 };

  let overdueInvoices: ZohoInvoice[];
  try {
    overdueInvoices = await fetchOverdueInvoices();
  } catch (err) {
    console.error("[cron/send-payment-reminders] Zoho fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch overdue invoices from Zoho" }, { status: 502 });
  }

  const overdueIds = overdueInvoices.map((inv) => inv.invoiceId);

  if (!enabled) {
    console.log(
      `[cron/send-payment-reminders] DRY RUN — ${overdueInvoices.length} overdue invoice(s) from Zoho:`,
      overdueInvoices.map((inv) => `${inv.invoiceNumber ?? inv.invoiceId} (${inv.email ?? "no email"})`)
    );
    results.tracked = overdueInvoices.length;
    return NextResponse.json(results);
  }

  // Upsert every currently-overdue invoice -- refreshes balance/due_date/etc
  // on existing rows, inserts new ones. Never touches paused/
  // last_reminder_sent_at/reminder_count (left out of the payload), but
  // does clear resolved_at in case an invoice somehow went from
  // resolved back to overdue (e.g. a reversed payment).
  if (overdueInvoices.length > 0) {
    const { error } = await supabase.from("payment_reminders").upsert(
      overdueInvoices.map((inv) => ({
        zoho_invoice_id: inv.invoiceId,
        invoice_number: inv.invoiceNumber,
        customer_name: inv.customerName,
        email: inv.email,
        balance: inv.balance,
        due_date: inv.dueDate,
        invoice_url: inv.invoiceUrl,
        resolved_at: null,
        updated_at: new Date().toISOString(),
      })),
      { onConflict: "zoho_invoice_id" }
    );
    if (error) {
      console.error("[cron/send-payment-reminders] upsert error:", error);
      return NextResponse.json({ error: "Failed to save invoices" }, { status: 500 });
    }
  }
  results.tracked = overdueInvoices.length;

  // Load every previously-tracked, still-unresolved row and partition it in
  // JS against the live overdue set -- avoids hand-building a Postgres "not
  // in (...)" string from external Zoho IDs.
  const { data: unresolvedRows, error: unresolvedError } = await supabase
    .from("payment_reminders")
    .select(
      "id, zoho_invoice_id, invoice_number, customer_name, email, balance, due_date, invoice_url, paused, last_reminder_sent_at, reminder_count, resolved_at"
    )
    .is("resolved_at", null)
    .returns<PaymentReminder[]>();

  if (unresolvedError) {
    console.error("[cron/send-payment-reminders] fetch unresolved rows error:", unresolvedError);
    return NextResponse.json({ error: "Failed to load reminder queue" }, { status: 500 });
  }

  const overdueIdSet = new Set(overdueIds);
  const stillOverdueRows = (unresolvedRows ?? []).filter((row) => overdueIdSet.has(row.zoho_invoice_id));
  const nowResolvedIds = (unresolvedRows ?? [])
    .filter((row) => !overdueIdSet.has(row.zoho_invoice_id))
    .map((row) => row.id);

  // Anything previously tracked as unresolved that's no longer in the
  // overdue list has been paid (or voided) in Zoho -- mark it resolved so
  // the admin page shows proof the automation stopped, instead of the row
  // just quietly vanishing.
  if (nowResolvedIds.length > 0) {
    const { error: resolveError } = await supabase
      .from("payment_reminders")
      .update({ resolved_at: new Date().toISOString() })
      .in("id", nowResolvedIds);
    if (resolveError) {
      console.error("[cron/send-payment-reminders] resolve error:", resolveError);
    } else {
      results.resolved = nowResolvedIds.length;
    }
  }

  // Send reminders for still-overdue, non-paused invoices due for another
  // nudge (never sent, or last sent more than 3 days ago).
  const now = Date.now();
  for (const row of stillOverdueRows.filter((r) => !r.paused)) {
    const lastSent = row.last_reminder_sent_at ? new Date(row.last_reminder_sent_at).getTime() : null;
    if (lastSent !== null && now - lastSent < REMINDER_INTERVAL_MS) {
      results.skipped++;
      continue;
    }

    const sendResult = await sendReminderEmail(row);
    if (sendResult.success) {
      results.reminded++;
    } else {
      console.error(`[cron/send-payment-reminders] ${sendResult.error} (invoice ${row.zoho_invoice_id})`);
      results.failed++;
    }
  }

  console.log("[cron/send-payment-reminders] done:", results);
  return NextResponse.json(results);
}
