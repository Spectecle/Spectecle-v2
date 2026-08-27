import { NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { getSession } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { getDashboardContextForUser } from "@/lib/dashboard-access";
import { tierIncludes } from "@/lib/dashboard-tiers";
import { fetchGA4Metrics } from "@/lib/ga4";
import { fetchSearchConsoleTopQueries, type SearchConsoleQueryRow } from "@/lib/search-console";
import { MonthlyReportDocument } from "@/components/portal/MonthlyReportDocument";

const MONTH_RE = /^\d{4}-\d{2}$/;

function currentMonthValue(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

export async function GET(req: Request) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const { organizationId, tier, ga4PropertyId, searchConsoleSiteUrl } = await getDashboardContextForUser(user.id);
  if (!tierIncludes(tier, "monthlyReport")) {
    return NextResponse.json({ error: "Not included in your current plan" }, { status: 403 });
  }
  if (!organizationId) {
    return NextResponse.json({ error: "No business on your account yet" }, { status: 400 });
  }

  const { searchParams } = new URL(req.url);
  const month = searchParams.get("month");
  const periodMonth = month && MONTH_RE.test(month) ? month : currentMonthValue();

  const { data: org } = await supabase.from("organizations").select("name").eq("id", organizationId).maybeSingle();

  let visitors: number | null = null;
  let pageViews: number | null = null;
  if (ga4PropertyId) {
    try {
      const metrics = await fetchGA4Metrics(ga4PropertyId, periodMonth);
      visitors = metrics.visitors;
      pageViews = metrics.pageViews;
    } catch (error) {
      console.error("[portal/dashboard/report] GA4 fetch error:", error);
    }
  }

  // Search Console's API works off a trailing day window rather than an
  // arbitrary calendar month, so the report always shows the current
  // trailing-28-day window here regardless of which month was requested.
  let topQueries: SearchConsoleQueryRow[] | null = null;
  if (searchConsoleSiteUrl) {
    try {
      topQueries = await fetchSearchConsoleTopQueries(searchConsoleSiteUrl, 28, 10);
    } catch (error) {
      console.error("[portal/dashboard/report] Search Console fetch error:", error);
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

  const buffer = await renderToBuffer(
    MonthlyReportDocument({
      orgName: org?.name ?? "Your Business",
      periodMonth,
      visitors,
      pageViews,
      topQueries,
      requestCount,
    })
  );

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="spectecle-report-${periodMonth}.pdf"`,
    },
  });
}
