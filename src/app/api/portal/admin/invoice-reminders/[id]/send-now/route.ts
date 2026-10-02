import { NextResponse } from "next/server";
import { getSession, isAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { isTrustedOrigin } from "@/lib/origin-check";
import { sendReminderEmail, type PaymentReminder } from "@/lib/payment-reminders";

// Bypasses the 3-day cadence -- an explicit admin-triggered nudge, not a
// scheduled one.
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const admin = await getSession();
  if (!admin || !isAdmin(admin.email)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { id } = await params;
  const { data: row, error } = await supabase
    .from("payment_reminders")
    .select(
      "id, zoho_invoice_id, invoice_number, customer_name, email, balance, due_date, invoice_url, paused, last_reminder_sent_at, reminder_count, resolved_at"
    )
    .eq("id", id)
    .maybeSingle<PaymentReminder>();

  if (error || !row) {
    return NextResponse.json({ error: "Reminder not found" }, { status: 404 });
  }

  const result = await sendReminderEmail(row);
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
