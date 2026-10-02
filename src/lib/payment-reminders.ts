import { Resend } from "resend";
import { supabase } from "@/lib/supabase";
import { fetchInvoiceDetail } from "@/lib/zoho-books";
import { invoiceReminderLetterHtml } from "@/lib/client-letter-emails";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = `Spectecle Billing <${process.env.RESEND_FROM || "onboarding@resend.dev"}>`;

export type PaymentReminder = {
  id: string;
  zoho_invoice_id: string;
  invoice_number: string | null;
  customer_name: string | null;
  email: string | null;
  balance: number | null;
  due_date: string | null;
  invoice_url: string | null;
  paused: boolean;
  last_reminder_sent_at: string | null;
  reminder_count: number;
  resolved_at: string | null;
};

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
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
