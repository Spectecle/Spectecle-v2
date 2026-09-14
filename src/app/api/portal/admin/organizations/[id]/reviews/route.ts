import { NextResponse } from "next/server";
import { getSession, isAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { isTrustedOrigin } from "@/lib/origin-check";
import type { HighlightedReview } from "@/lib/reviews-snapshots";

function normalizeHighlightedReviews(value: unknown): HighlightedReview[] | null {
  if (!Array.isArray(value)) return null;
  const reviews: HighlightedReview[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") return null;
    const reviewer = (item as { reviewer?: unknown }).reviewer;
    const rating = (item as { rating?: unknown }).rating;
    const text = (item as { text?: unknown }).text;
    if (typeof reviewer !== "string" || !reviewer.trim()) continue;
    if (typeof rating !== "number" || rating < 0 || rating > 5) return null;
    if (typeof text !== "string") return null;
    reviews.push({ reviewer: reviewer.trim(), rating, text: text.trim() });
  }
  return reviews;
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
    rating?: number | null;
    reviewCount?: number | null;
    notes?: string | null;
    highlightedReviews?: unknown;
  } | null;

  const periodMonth = normalizePeriodMonth(body?.periodMonth);
  if (!periodMonth) {
    return NextResponse.json({ error: "Invalid month" }, { status: 400 });
  }

  const highlightedReviews = normalizeHighlightedReviews(body?.highlightedReviews ?? []);
  if (highlightedReviews === null) {
    return NextResponse.json({ error: "Invalid highlighted reviews" }, { status: 400 });
  }

  const rating =
    typeof body?.rating === "number" && Number.isFinite(body.rating) && body.rating >= 0 && body.rating <= 5
      ? body.rating
      : null;
  const reviewCount =
    typeof body?.reviewCount === "number" && Number.isFinite(body.reviewCount) ? body.reviewCount : null;
  const notes = typeof body?.notes === "string" ? body.notes.trim() || null : null;

  const { error } = await supabase.from("reviews_snapshots").upsert(
    {
      organization_id: organizationId,
      period_month: periodMonth,
      rating,
      review_count: reviewCount,
      notes,
      highlighted_reviews: highlightedReviews,
      updated_at: new Date().toISOString(),
      created_by: admin.email,
    },
    { onConflict: "organization_id,period_month" }
  );

  if (error) {
    console.error("[portal/admin/organizations/:id/reviews] upsert error:", error);
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
    .from("reviews_snapshots")
    .delete()
    .eq("id", snapshotId)
    .eq("organization_id", organizationId);

  if (error) {
    console.error("[portal/admin/organizations/:id/reviews] delete error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
