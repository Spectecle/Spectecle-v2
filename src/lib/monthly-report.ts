import { renderToBuffer } from "@react-pdf/renderer";
import { supabase } from "@/lib/supabase";
import { fetchGA4Metrics } from "@/lib/ga4";
import { fetchSearchConsoleTopQueries, type SearchConsoleQueryRow } from "@/lib/search-console";
import { MonthlyReportDocument } from "@/components/portal/MonthlyReportDocument";

export function currentMonthValue(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

/** The month that just completed, not the one that just started -- a cron
 * job firing on the 1st has zero days of data for the current month. */
export function previousMonthValue(): string {
  const now = new Date();
  const prev = new Date(Date.UTC(now.getFullYear(), now.getMonth() - 1, 1));
  return `${prev.getUTCFullYear()}-${String(prev.getUTCMonth() + 1).padStart(2, "0")}`;
}

export type MonthlyReportData = {
  orgName: string;
  periodMonth: string;
  visitors: number | null;
  pageViews: number | null;
  topQueries: SearchConsoleQueryRow[] | null;
  requestCount: number;
};

/** Gathers everything a monthly report needs -- shared by the PDF download
 * and the report email so both pull from one implementation, not two
 * copies that can drift. */
export async function getMonthlyReportData(organizationId: string, periodMonth: string): Promise<MonthlyReportData> {
  const { data: org } = await supabase
    .from("organizations")
    .select("name, ga4_property_id, search_console_site_url")
    .eq("id", organizationId)
    .maybeSingle();

  let visitors: number | null = null;
  let pageViews: number | null = null;
  if (org?.ga4_property_id) {
    try {
      const metrics = await fetchGA4Metrics(org.ga4_property_id, periodMonth);
      visitors = metrics.visitors;
      pageViews = metrics.pageViews;
    } catch (error) {
      console.error("[monthly-report] GA4 fetch error:", error);
    }
  }

  // Search Console's API works off a trailing day window rather than an
  // arbitrary calendar month, so the report always shows the current
  // trailing-28-day window here regardless of which month was requested.
  let topQueries: SearchConsoleQueryRow[] | null = null;
  if (org?.search_console_site_url) {
    try {
      topQueries = await fetchSearchConsoleTopQueries(org.search_console_site_url, 28, 10);
    } catch (error) {
      console.error("[monthly-report] Search Console fetch error:", error);
    }
  }

  const [year, monthNum] = periodMonth.split("-").map(Number);
  const monthStart = new Date(Date.UTC(year, monthNum - 1, 1)).toISOString();
  const monthEnd = new Date(Date.UTC(year, monthNum, 1)).toISOString();

  const { data: orgUsers } = await supabase.from("portal_users").select("id").eq("organization_id", organizationId);
  const userIds = (orgUsers ?? []).map((u) => u.id);

  let requestCount = 0;
  if (userIds.length > 0) {
    const { count } = await supabase
      .from("service_requests")
      .select("id", { count: "exact", head: true })
      .in("user_id", userIds)
      .neq("status", "deleted")
      .gte("created_at", monthStart)
      .lt("created_at", monthEnd);
    requestCount = count ?? 0;
  }

  return { orgName: org?.name ?? "Your Business", periodMonth, visitors, pageViews, topQueries, requestCount };
}

/** Builds the same PDF the on-demand "Download PDF" button produces. */
export async function buildMonthlyReportPdf(organizationId: string, periodMonth: string): Promise<Buffer> {
  const data = await getMonthlyReportData(organizationId, periodMonth);
  return renderToBuffer(MonthlyReportDocument(data));
}
