import { NextResponse } from "next/server";
import { getSession, isAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { isTrustedOrigin } from "@/lib/origin-check";
import { validateDetails } from "@/lib/service-fields";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const { id } = await params;

  const { data: ticket } = await supabase
    .from("service_requests")
    .select("id, user_id, service_type")
    .eq("id", id)
    .maybeSingle();

  if (!ticket) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const admin = isAdmin(user.email);
  if (!admin && ticket.user_id !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = (await req.json().catch(() => null)) as {
    budget?: string;
    message?: string;
    details?: Record<string, unknown>;
  } | null;

  const message = body?.message?.trim();
  const budget = body?.budget?.trim() || null;

  if (!message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { clean: details, missing } = validateDetails(ticket.service_type, body?.details ?? {});
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("service_requests")
    .update({ budget, message, details, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("[portal/requests/:id] update error:", error);
    return NextResponse.json({ error: "Failed to save changes" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
