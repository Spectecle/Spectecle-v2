import { NextResponse } from "next/server";
import { getSession, isAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { isTrustedOrigin } from "@/lib/origin-check";
import { resolveOrganizationId } from "@/lib/organization-admin";

export async function POST(req: Request) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const user = await getSession();
  if (!user || !isAdmin(user.email)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = (await req.json().catch(() => null)) as {
    email?: string;
    name?: string;
    phone?: string;
    organizationId?: string;
    newOrganization?: { name?: string; websiteUrl?: string };
  } | null;
  const email = body?.email?.trim().toLowerCase();
  const name = body?.name?.trim() || null;
  const phone = body?.phone?.trim() || null;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const orgResult = await resolveOrganizationId(body?.organizationId, body?.newOrganization);
  if (!orgResult.ok) {
    return NextResponse.json({ error: orgResult.error }, { status: 500 });
  }
  const organizationId = orgResult.id;

  const { error: insertError } = await supabase
    .from("portal_users")
    .insert({ email, name, phone, organization_id: organizationId })
    .select("id")
    .single();

  if (insertError) {
    if (insertError.code !== "23505") {
      console.error("[portal/admin/users] insert error:", insertError);
      return NextResponse.json({ error: "Failed to add user" }, { status: 500 });
    }
    // Already registered — re-activate in case they were previously revoked,
    // and update their contact/org info.
    const { error: reactivateError } = await supabase
      .from("portal_users")
      .update({ status: "active", name, phone, organization_id: organizationId })
      .eq("email", email);
    if (reactivateError) {
      console.error("[portal/admin/users] reactivate error:", reactivateError);
      return NextResponse.json({ error: "Failed to add user" }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}
