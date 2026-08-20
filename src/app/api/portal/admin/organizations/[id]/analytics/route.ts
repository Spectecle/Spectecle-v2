import { NextResponse } from "next/server";
import { getSession, isAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { isTrustedOrigin } from "@/lib/origin-check";
import type { RankingEntry } from "@/lib/analytics-snapshots";

function normalizeRankings(value: unknown): RankingEntry[] | null {
  if (!Array.isArray(value)) return null;
  const rankings: RankingEntry[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") return null;
    const keyword = (item as { keyword?: unknown }).keyword;
    const position = (item as { position?: unknown }).position;
    if (typeof keyword !== "string" || !keyword.trim()) continue;
    if (position !== null && typeof position !== "number") return null;
    rankings.push({ keyword: keyword.trim(), position });
  }
  return rankings;
}

/** Normalizes any YYYY-MM or YYYY-MM-DD input to the first of that month. */
function normalizePeriodMonth(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const match = value.match(/^(\d{4})-(\d{2})/);
  if (!match) return null;
  const [, year, month] = match;
  return `${year}-${month}-01`;
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const admin = await getSession();
  if (!admin || !isAdmin(admin.email)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { id: organizationId } = await params;

  const body = (await req.json().catch(() => null)) as {
    periodMonth?: string;
    visitors?: number | null;
    pageViews?: number | null;
    notes?: string | null;
    rankings?: unknown;
  } | null;

  const periodMonth = normalizePeriodMonth(body?.periodMonth);
  if (!periodMonth) {
    return NextResponse.json({ error: "Invalid month" }, { status: 400 });
  }

  const rankings = normalizeRankings(body?.rankings ?? []);
  if (rankings === null) {
    return NextResponse.json({ error: "Invalid rankings" }, { status: 400 });
  }

  const visitors =
    typeof body?.visitors === "number" && Number.isFinite(body.visitors) ? body.visitors : null;
  const pageViews =
    typeof body?.pageViews === "number" && Number.isFinite(body.pageViews) ? body.pageViews : null;
  const notes = typeof body?.notes === "string" ? body.notes.trim() || null : null;

  const { error } = await supabase.from("analytics_snapshots").upsert(
    {
      organization_id: organizationId,
      period_month: periodMonth,
      visitors,
      page_views: pageViews,
      notes,
      rankings,
      updated_at: new Date().toISOString(),
      created_by: admin.email,
    },
    { onConflict: "organization_id,period_month" }
  );

  if (error) {
    console.error("[portal/admin/organizations/:id/analytics] upsert error:", error);
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const admin = await getSession();
  if (!admin || !isAdmin(admin.email)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { id: organizationId } = await params;
  const snapshotId = new URL(req.url).searchParams.get("snapshotId");
  if (!snapshotId) {
    return NextResponse.json({ error: "Missing snapshotId" }, { status: 400 });
  }

  const { error } = await supabase
    .from("analytics_snapshots")
    .delete()
    .eq("id", snapshotId)
    .eq("organization_id", organizationId);

  if (error) {
    console.error("[portal/admin/organizations/:id/analytics] delete error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
