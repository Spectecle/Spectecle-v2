import { NextResponse } from "next/server";
import { getSession, isAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { isTrustedOrigin } from "@/lib/origin-check";

export async function POST(req: Request) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const user = await getSession();
  if (!user || !isAdmin(user.email)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = (await req.json().catch(() => null)) as {
    id?: string;
    domain?: string;
    name?: string;
    websiteUrl?: string;
  } | null;
  const id = body?.id?.trim();
  const domain = body?.domain?.trim().toLowerCase();
  const name = body?.name?.trim();
  const websiteUrl = body?.websiteUrl?.trim() || null;

  if (!name || (!id && !domain)) {
    return NextResponse.json({ error: "Missing name or organization" }, { status: 400 });
  }

  if (id) {
    const { error } = await supabase
      .from("organizations")
      .update({ name, website_url: websiteUrl })
      .eq("id", id);
    if (error) {
      console.error("[portal/admin/organizations] update error:", error);
      return NextResponse.json({ error: "Failed to save" }, { status: 500 });
    }
    return NextResponse.json({ success: true, id });
  }

  // Legacy domain-bucket rename — promote it to a real organization and
  // backfill every currently-unassigned user on that domain into it.
  const { data: created, error: createError } = await supabase
    .from("organizations")
    .insert({ name, website_url: websiteUrl, domain })
    .select("id")
    .single();

  if (createError || !created) {
    console.error("[portal/admin/organizations] create error:", createError);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }

  const { error: backfillError } = await supabase
    .from("portal_users")
    .update({ organization_id: created.id })
    .is("organization_id", null)
    .ilike("email", `%@${domain}`);

  if (backfillError) {
    console.error("[portal/admin/organizations] backfill error:", backfillError);
  }

  return NextResponse.json({ success: true, id: created.id });
}
