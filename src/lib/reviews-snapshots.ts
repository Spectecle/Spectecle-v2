import { supabase } from "@/lib/supabase";

export type HighlightedReview = {
  reviewer: string;
  rating: number;
  text: string;
};

export type ReviewSnapshot = {
  id: string;
  organization_id: string;
  period_month: string; // ISO date, first of month
  rating: number | null;
  review_count: number | null;
  notes: string | null;
  highlighted_reviews: HighlightedReview[];
  created_by: string;
};

export async function getReviewSnapshotsForOrg(organizationId: string): Promise<ReviewSnapshot[]> {
  const { data, error } = await supabase
    .from("reviews_snapshots")
    .select("id, organization_id, period_month, rating, review_count, notes, highlighted_reviews, created_by")
    .eq("organization_id", organizationId)
    .order("period_month", { ascending: false })
    .returns<ReviewSnapshot[]>();

  if (error) {
    console.error("[reviews-snapshots] fetch error:", error);
    return [];
  }
  return data ?? [];
}
