import { supabase } from "@/lib/supabase";

export type RankingEntry = {
  keyword: string;
  position: number | null;
};

export type AnalyticsSnapshot = {
  id: string;
  organization_id: string;
  period_month: string; // ISO date, first of month
  visitors: number | null;
  page_views: number | null;
  notes: string | null;
  rankings: RankingEntry[];
  created_by: string;
};

export async function getAnalyticsSnapshotsForOrg(organizationId: string): Promise<AnalyticsSnapshot[]> {
  const { data, error } = await supabase
    .from("analytics_snapshots")
    .select("id, organization_id, period_month, visitors, page_views, notes, rankings, created_by")
    .eq("organization_id", organizationId)
    .order("period_month", { ascending: false })
    .returns<AnalyticsSnapshot[]>();

  if (error) {
    console.error("[analytics-snapshots] fetch error:", error);
    return [];
  }
  return data ?? [];
}
