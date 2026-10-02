import { NextResponse } from "next/server";
import { getSession, isAdmin } from "@/lib/auth";
import { isTrustedOrigin } from "@/lib/origin-check";
import { syncOverdueInvoices } from "@/lib/payment-reminders";

// Admin-triggered, on-demand refresh of the reminder queue from Zoho Books
// -- never sends email, just pulls the latest overdue/paid state so a
// just-collected payment shows up immediately instead of waiting for the
// next scheduled cron run.
export async function POST(req: Request) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const admin = await getSession();
  if (!admin || !isAdmin(admin.email)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const result = await syncOverdueInvoices();
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    console.error("[invoice-reminders/sync] error:", err);
    return NextResponse.json({ error: "Failed to sync with Zoho Books" }, { status: 502 });
  }
}
