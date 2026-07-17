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

  const body = (await req.json().catch(() => null)) as { domain?: string; name?: string } | null;
  const domain = body?.domain?.trim().toLowerCase();
  const name = body?.name?.trim();

  if (!domain || !name) {
    return NextResponse.json({ error: "Missing domain or name" }, { status: 400 });
  }

  const { error } = await supabase
    .from("organizations")
    .upsert({ domain, name }, { onConflict: "domain" });

  if (error) {
    console.error("[portal/admin/organizations] upsert error:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
