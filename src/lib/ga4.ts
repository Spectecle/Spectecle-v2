import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { OAuth2Client } from "google-auth-library";

let client: BetaAnalyticsDataClient | null = null;

function getClient(): BetaAnalyticsDataClient {
  if (client) return client;

  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GA4_OAUTH_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      "Missing GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, or GA4_OAUTH_REFRESH_TOKEN"
    );
  }

  const oauth2Client = new OAuth2Client({ clientId, clientSecret });
  oauth2Client.setCredentials({ refresh_token: refreshToken });

  client = new BetaAnalyticsDataClient({ authClient: oauth2Client });
  return client;
}

/** YYYY-MM-01 -> [firstDayISO, lastDayISO] for that calendar month. */
function monthRange(periodMonth: string): { startDate: string; endDate: string } {
  const [year, month] = periodMonth.split("-").map(Number);
  const start = new Date(Date.UTC(year, month - 1, 1));
  const end = new Date(Date.UTC(year, month, 0)); // day 0 of next month = last day of this month
  const iso = (d: Date) => d.toISOString().slice(0, 10);
  return { startDate: iso(start), endDate: iso(end) };
}

export type GA4Metrics = {
  visitors: number;
  pageViews: number;
};

/** Fetches total users + page views for a GA4 property over a calendar month.
 * `propertyId` is the raw numeric GA4 property ID (e.g. "123456789"), not
 * the "properties/123456789" resource name — this function adds the prefix. */
export async function fetchGA4Metrics(propertyId: string, periodMonth: string): Promise<GA4Metrics> {
  const { startDate, endDate } = monthRange(periodMonth);
  const analyticsClient = getClient();

  const [response] = await analyticsClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate, endDate }],
    metrics: [{ name: "totalUsers" }, { name: "screenPageViews" }],
  });

  const row = response.rows?.[0];
  const visitors = Number(row?.metricValues?.[0]?.value ?? 0);
  const pageViews = Number(row?.metricValues?.[1]?.value ?? 0);

  return { visitors, pageViews };
}

function currentMonthValue(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

/** Visitors + page views for the current calendar month, month-to-date. */
export async function fetchGA4MonthToDate(propertyId: string): Promise<GA4Metrics> {
  return fetchGA4Metrics(propertyId, currentMonthValue());
}

/** True real-time active users (last ~30 minutes), via GA4's separate
 * Realtime API — distinct from runReport, which has processing delay. */
export async function fetchGA4ActiveUsersNow(propertyId: string): Promise<number> {
  const analyticsClient = getClient();
  const [response] = await analyticsClient.runRealtimeReport({
    property: `properties/${propertyId}`,
    metrics: [{ name: "activeUsers" }],
  });
  return Number(response.rows?.[0]?.metricValues?.[0]?.value ?? 0);
}

export type DailyVisitors = { date: string; visitors: number };

/** Day-by-day visitor counts for the current calendar month, for charting. */
export async function fetchGA4DailyVisitors(propertyId: string): Promise<DailyVisitors[]> {
  const { startDate, endDate } = monthRange(currentMonthValue());
  const analyticsClient = getClient();

  const [response] = await analyticsClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: "date" }],
    metrics: [{ name: "totalUsers" }],
    orderBys: [{ dimension: { dimensionName: "date" } }],
  });

  return (response.rows ?? []).map((row) => {
    const raw = row.dimensionValues?.[0]?.value ?? ""; // YYYYMMDD
    const date = `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;
    return { date, visitors: Number(row.metricValues?.[0]?.value ?? 0) };
  });
}

/** Counts of specific custom events (e.g. "phone_click", "contact_submit")
 * over the trailing N days. Missing events come back as 0, not omitted. */
export async function fetchGA4EventCounts(
  propertyId: string,
  eventNames: string[],
  days = 30
): Promise<Record<string, number>> {
  const analyticsClient = getClient();

  const [response] = await analyticsClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: `${days}daysAgo`, endDate: "today" }],
    dimensions: [{ name: "eventName" }],
    metrics: [{ name: "eventCount" }],
    dimensionFilter: {
      filter: { fieldName: "eventName", inListFilter: { values: eventNames } },
    },
  });

  const counts: Record<string, number> = Object.fromEntries(eventNames.map((n) => [n, 0]));
  for (const row of response.rows ?? []) {
    const name = row.dimensionValues?.[0]?.value;
    if (name) counts[name] = Number(row.metricValues?.[0]?.value ?? 0);
  }
  return counts;
}

export type GA4PageRow = { path: string; views: number };

/** Most-viewed pages over the trailing N days, highest views first. */
export async function fetchGA4TopPages(propertyId: string, days = 30, limit = 10): Promise<GA4PageRow[]> {
  const analyticsClient = getClient();

  const [response] = await analyticsClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: `${days}daysAgo`, endDate: "today" }],
    dimensions: [{ name: "pagePath" }],
    metrics: [{ name: "screenPageViews" }],
    orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
    limit,
  });

  return (response.rows ?? []).map((row) => ({
    path: row.dimensionValues?.[0]?.value ?? "",
    views: Number(row.metricValues?.[0]?.value ?? 0),
  }));
}
