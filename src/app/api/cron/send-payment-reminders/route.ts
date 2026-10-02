import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { syncOverdueInvoices, sendReminderEmail, type PaymentReminder } from "@/lib/payment-reminders";

const REMINDER_INTERVAL_MS = 3 * 24 * 60 * 60 * 1000; // 3 days, confirmed cadence

// Vercel Cron authenticates itself by sending Authorization: Bearer
// $CRON_SECRET on every scheduled invocation -- same pattern as
// send-monthly-reports.
export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Deliberate launch gate, same shape as MONTHLY_REPORTS_ENABLED -- but
  // scoped ONLY to actually sending emails. Syncing the queue from Zoho
  // always runs regardless, since that's just reflecting Zoho's real state
  // and never emails anyone.
  const enabled = process.env.PAYMENT_REMINDERS_ENABLED === "true";

  const results = { dryRun: !enabled, tracked: 0, resolved: 0, reminded: 0, skipped: 0, failed: 0 };

  try {
    const sync = await syncOverdueInvoices();
    results.tracked = sync.tracked;
    results.resolved = sync.resolved;
  } catch (err) {
    console.error("[cron/send-payment-reminders] sync error:", err);
    return NextResponse.json({ error: "Failed to sync overdue invoices from Zoho" }, { status: 502 });
  }

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

  // Figure out which overdue, non-paused invoices are due for another nudge
  // (never sent, or last sent more than 3 days ago) -- computed either way,
  // but only actually sent (and recorded) when enabled.
  const now = Date.now();
  const dueForReminder = (unresolvedRows ?? []).filter((row) => {
    if (row.paused) return false;
    const lastSent = row.last_reminder_sent_at ? new Date(row.last_reminder_sent_at).getTime() : null;
    return lastSent === null || now - lastSent >= REMINDER_INTERVAL_MS;
  });

  if (!enabled) {
    console.log(
      `[cron/send-payment-reminders] DRY RUN — synced ${results.tracked} overdue invoice(s), ` +
        `${dueForReminder.length} would be reminded:`,
      dueForReminder.map((row) => `${row.invoice_number ?? row.zoho_invoice_id} (${row.email ?? "no email"})`)
    );
    return NextResponse.json(results);
  }

  for (const row of dueForReminder) {
    const sendResult = await sendReminderEmail(row);
    if (sendResult.success) {
      results.reminded++;
    } else {
      console.error(`[cron/send-payment-reminders] ${sendResult.error} (invoice ${row.zoho_invoice_id})`);
      results.failed++;
    }
  }
  results.skipped = (unresolvedRows ?? []).filter((r) => !r.paused).length - dueForReminder.length;

  console.log("[cron/send-payment-reminders] done:", results);
  return NextResponse.json(results);
}
