import { NextResponse } from "next/server";
import { getSession, isAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { isTrustedOrigin } from "@/lib/origin-check";
import { startImpersonating, stopImpersonating } from "@/lib/impersonation";

export async function POST(req: Request) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const admin = await getSession();
  if (!admin || !isAdmin(admin.email)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = (await req.json().catch(() => null)) as { userId?: string } | null;
  const userId = body?.userId?.trim();
  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const { data: target } = await supabase
    .from("portal_users")
    .select("id, status")
    .eq("id", userId)
    .maybeSingle();

  if (!target || target.status !== "active") {
    return NextResponse.json({ error: "Client not found or inactive" }, { status: 404 });
  }

  await startImpersonating(userId);
  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const admin = await getSession();
  if (!admin || !isAdmin(admin.email)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await stopImpersonating();
  return NextResponse.json({ success: true });
}
