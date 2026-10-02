// Deliberately zero server-only imports (no supabase, no resend) -- this is
// the one piece of payment-reminders.ts that's safe to import as a real
// value from a client component. Importing `formatUsd` directly from
// payment-reminders.ts would drag its whole module graph (Supabase service
// client, Resend) into the browser bundle, where the required env vars
// don't exist and the module throws on load.
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
