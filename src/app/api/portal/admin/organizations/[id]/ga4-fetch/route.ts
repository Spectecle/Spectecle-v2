import { NextResponse } from "next/server";
import { getSession, isAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { isTrustedOrigin } from "@/lib/origin-check";
import { fetchGA4Metrics } from "@/lib/ga4";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const admin = await getSession();
  if (!admin || !isAdmin(admin.email)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { id: organizationId } = await params;
  const body = (await req.json().catch(() => null)) as { periodMonth?: string } | null;
  const periodMonth = body?.periodMonth;
  if (!periodMonth || !/^\d{4}-\d{2}/.test(periodMonth)) {
    return NextResponse.json({ error: "Invalid month" }, { status: 400 });
  }

  const { data: org } = await supabase
    .from("organizations")
    .select("ga4_property_id")
    .eq("id", organizationId)
    .maybeSingle();

  if (!org?.ga4_property_id) {
    return NextResponse.json({ error: "No GA4 property configured for this client" }, { status: 400 });
  }

  try {
    const metrics = await fetchGA4Metrics(org.ga4_property_id, periodMonth);
    return NextResponse.json(metrics);
  } catch (error) {
    console.error("[portal/admin/organizations/:id/ga4-fetch] error:", error);
    return NextResponse.json({ error: "Failed to fetch from GA4" }, { status: 500 });
  }
}
