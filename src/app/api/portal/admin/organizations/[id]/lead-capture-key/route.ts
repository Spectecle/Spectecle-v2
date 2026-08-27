import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { getSession, isAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { isTrustedOrigin } from "@/lib/origin-check";

/** Generates (or rotates) the lead-capture key for one org. Rotating
 * invalidates the old key immediately -- any mu-plugin still deployed with
 * the previous key will start failing silently (by design, see
 * spectecle-leads.php) until redeployed with the new one. */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const admin = await getSession();
  if (!admin || !isAdmin(admin.email)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { id: organizationId } = await params;
  const key = randomBytes(24).toString("base64url");

  const { error } = await supabase
    .from("organizations")
    .update({ lead_capture_key: key })
    .eq("id", organizationId);
  if (error) {
    console.error("[portal/admin/organizations/:id/lead-capture-key] error:", error);
    return NextResponse.json({ error: "Failed to generate key" }, { status: 500 });
  }

  return NextResponse.json({ key });
}
