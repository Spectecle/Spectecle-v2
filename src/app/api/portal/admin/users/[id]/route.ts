import { NextResponse } from "next/server";
import { getSession, isAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { isTrustedOrigin } from "@/lib/origin-check";
import { UPLOAD_BUCKET } from "@/lib/uploads";

const VALID_STATUSES = new Set(["active", "revoked"]);

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const user = await getSession();
  if (!user || !isAdmin(user.email)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { id } = await params;
  const body = (await req.json().catch(() => null)) as { status?: string } | null;
  const status = body?.status;

  if (!status || !VALID_STATUSES.has(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const { error } = await supabase.from("portal_users").update({ status }).eq("id", id);

  if (error) {
    console.error("[portal/admin/users/:id] update error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

/** Permanently deletes a user and, via cascade, every ticket/message/file they ever sent. Irreversible. */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const admin = await getSession();
  if (!admin || !isAdmin(admin.email)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { id } = await params;

  const { data: target } = await supabase
    .from("portal_users")
    .select("email")
    .eq("id", id)
    .maybeSingle();

  if (!target) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (target.email.toLowerCase() === admin.email.toLowerCase()) {
    return NextResponse.json({ error: "Can't delete your own account" }, { status: 400 });
  }

  // Cascade (on delete cascade) removes the DB rows, but not the actual
  // files in Supabase Storage — clean those up first.
  const { data: requestRows } = await supabase
    .from("service_requests")
    .select("id")
    .eq("user_id", id);
  const requestIds = (requestRows ?? []).map((r) => r.id);

  if (requestIds.length > 0) {
    const { data: fileRows } = await supabase
      .from("service_request_files")
      .select("storage_path")
      .in("request_id", requestIds);
    const paths = (fileRows ?? []).map((f) => f.storage_path);
    if (paths.length > 0) {
      const { error: removeError } = await supabase.storage.from(UPLOAD_BUCKET).remove(paths);
      if (removeError) {
        console.error("[portal/admin/users/:id] storage cleanup error:", removeError);
      }
    }
  }

  const { error } = await supabase.from("portal_users").delete().eq("id", id);

  if (error) {
    console.error("[portal/admin/users/:id] delete error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
