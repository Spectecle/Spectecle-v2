import { Resend } from "resend";
import { supabase } from "@/lib/supabase";
import { fetchOverdueInvoices, fetchInvoiceDetail } from "@/lib/zoho-books";
import { invoiceReminderLetterHtml } from "@/lib/client-letter-emails";
import { formatUsd, type PaymentReminder } from "@/lib/payment-reminder-format";

export type { PaymentReminder };

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = `Spectecle Billing <${process.env.RESEND_FROM || "onboarding@resend.dev"}>`;

/** Pulls live overdue-invoice state from Zoho Books into payment_reminders
 * -- upserts current ones (refreshing balance/due_date/etc, never touching
 * paused/last_reminder_sent_at/reminder_count), and marks anything
 * previously tracked but no longer overdue as resolved (paid or voided).
 * Shared by the daily cron and the admin page's manual "Sync Now" button --
 * this never sends email, it only reflects Zoho's real state, so it's safe
 * to run as often as wanted regardless of whether sending is enabled. */
export async function syncOverdueInvoices(): Promise<{ tracked: number; resolved: number }> {
  const overdueInvoices = await fetchOverdueInvoices();
  const overdueIds = overdueInvoices.map((inv) => inv.invoiceId);

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
      console.error("[payment-reminders] sync upsert error:", error);
      throw new Error("Failed to save invoices");
    }
  }

  const { data: unresolvedRows, error: unresolvedError } = await supabase
    .from("payment_reminders")
    .select("id, zoho_invoice_id")
    .is("resolved_at", null);
  if (unresolvedError) {
    console.error("[payment-reminders] fetch unresolved rows error:", unresolvedError);
    throw new Error("Failed to load reminder queue");
  }

  const overdueIdSet = new Set(overdueIds);
  const nowResolvedIds = (unresolvedRows ?? [])
    .filter((row) => !overdueIdSet.has(row.zoho_invoice_id))
    .map((row) => row.id);

  let resolved = 0;
  if (nowResolvedIds.length > 0) {
    const { error: resolveError } = await supabase
      .from("payment_reminders")
      .update({ resolved_at: new Date().toISOString() })
      .in("id", nowResolvedIds);
    if (resolveError) {
      console.error("[payment-reminders] resolve error:", resolveError);
    } else {
      resolved = nowResolvedIds.length;
    }
  }

  return { tracked: overdueInvoices.length, resolved };
}

export async function getPaymentReminders(): Promise<PaymentReminder[]> {
  const { data, error } = await supabase
    .from("payment_reminders")
    .select(
      "id, zoho_invoice_id, invoice_number, customer_name, email, balance, due_date, invoice_url, paused, last_reminder_sent_at, reminder_count, resolved_at"
    )
    .order("due_date", { ascending: true })
    .returns<PaymentReminder[]>();

  if (error) {
    console.error("[payment-reminders] fetch error:", error);
    return [];
  }
  return data ?? [];
}

/** Sends one reminder email for a tracked invoice and records it -- shared
 * by the cron route's scheduled sweep and the admin page's "Send reminder
 * now" button, so there's exactly one place that builds/sends/records a
 * reminder rather than two slightly-different copies. */
export async function sendReminderEmail(
  row: PaymentReminder
): Promise<{ success: true } | { success: false; error: string }> {
  let email = row.email;
  let invoiceUrl = row.invoice_url;
  // Both are normally captured on every sync from Zoho's list response (see
  // the cron route's upsert) -- this is just a defensive fallback for an
  // older row synced before invoice_url was tracked, or any other gap.
  if (!email || !invoiceUrl) {
    const detail = await fetchInvoiceDetail(row.zoho_invoice_id);
    email = email ?? detail?.email ?? null;
    invoiceUrl = invoiceUrl ?? detail?.invoiceUrl ?? null;
  }

  if (!email) {
    return { success: false, error: "No email on file for this invoice" };
  }

  const html = invoiceReminderLetterHtml({
    businessName: row.customer_name ?? "there",
    note: "",
    invoiceBalance: formatUsd(row.balance ?? 0),
    invoiceNumber: row.invoice_number ?? undefined,
    dueDate: row.due_date ?? undefined,
    invoiceLink: invoiceUrl ?? undefined,
    pastDue: true,
  });

  const sendResult = await resend.emails.send({
    from: FROM,
    to: [email],
    subject: "Your Spectecle invoice is past due — action needed.",
    html,
  });

  if (sendResult.error) {
    console.error(`[payment-reminders] Resend error for invoice ${row.zoho_invoice_id}:`, sendResult.error);
    return { success: false, error: "Failed to send email" };
  }

  await supabase
    .from("payment_reminders")
    .update({
      last_reminder_sent_at: new Date().toISOString(),
      reminder_count: row.reminder_count + 1,
      email, // persist whatever the detail fallback found, for next run
      invoice_url: invoiceUrl,
    })
    .eq("id", row.id);

  return { success: true };
}
