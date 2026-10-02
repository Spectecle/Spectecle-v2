import { NextResponse } from "next/server";
import { getSession, isAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { isTrustedOrigin } from "@/lib/origin-check";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const admin = await getSession();
  if (!admin || !isAdmin(admin.email)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { id } = await params;
  const body = (await req.json().catch(() => null)) as { paused?: boolean } | null;
  if (typeof body?.paused !== "boolean") {
    return NextResponse.json({ error: "Invalid paused value" }, { status: 400 });
  }

  const { error } = await supabase
    .from("payment_reminders")
    .update({ paused: body.paused, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("[invoice-reminders/:id] update error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
