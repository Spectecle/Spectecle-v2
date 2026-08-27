export const DASHBOARD_TIERS = ["free", "growth", "pro"] as const;
export type DashboardTier = (typeof DASHBOARD_TIERS)[number];

export const DASHBOARD_TIER_LABELS: Record<DashboardTier, string> = {
  free: "Free",
  growth: "Growth",
  pro: "Pro",
};

export type DashboardFeature =
  | "siteStatus" // Free+: basic up/down monitoring
  | "statusBundle" // Growth+: PageSpeed, SSL, and backup status (superset of siteStatus)
  | "analytics" // Growth+: live GA4 dashboard
  | "searchConsole" // Growth+
  | "leadsInbox" // Growth+
  | "reviewsMonitor" // Growth+: Google reviews monitor
  | "monthlyReport" // Growth+: automated monthly PDF report
  | "aiContentStudio" // Pro only
  | "aiChatWidget" // Pro only
  | "adReports" // Pro only: Google + Meta ads reporting
  | "rankTracking" // Pro only: keyword rank tracking + competitor snapshot
  | "aiReviewResponses" // Pro only
  | "callTracking"; // Pro only

export const DASHBOARD_FEATURE_LABELS: Record<DashboardFeature, string> = {
  siteStatus: "Site Up/Down Status",
  statusBundle: "PageSpeed, SSL & Backup Status",
  analytics: "Website Analytics",
  searchConsole: "Search Console",
  leadsInbox: "Leads Inbox",
  reviewsMonitor: "Reviews Monitor",
  monthlyReport: "Monthly PDF Report",
  aiContentStudio: "AI Content Studio",
  aiChatWidget: "AI Chat Widget",
  adReports: "Ads Reporting",
  rankTracking: "Rank Tracking",
  aiReviewResponses: "AI Review Responses",
  callTracking: "Call Tracking",
};

const TIER_FEATURES: Record<DashboardTier, DashboardFeature[]> = {
  free: ["siteStatus"],
  growth: [
    "siteStatus",
    "statusBundle",
    "analytics",
    "searchConsole",
    "leadsInbox",
    "reviewsMonitor",
    "monthlyReport",
  ],
  pro: [
    "siteStatus",
    "statusBundle",
    "analytics",
    "searchConsole",
    "leadsInbox",
    "reviewsMonitor",
    "monthlyReport",
    "aiContentStudio",
    "aiChatWidget",
    "adReports",
    "rankTracking",
    "aiReviewResponses",
    "callTracking",
  ],
};

export const REQUEST_QUOTAS: Record<DashboardTier, number> = {
  free: 2,
  growth: 6,
  pro: 20,
};

export function isDashboardTier(value: unknown): value is DashboardTier {
  return typeof value === "string" && (DASHBOARD_TIERS as readonly string[]).includes(value);
}

/** Every organization resolves to a concrete tier now that Free is a real,
 * billed (at $0) plan rather than "no dashboard access" — an invalid or
 * missing tier defaults to Free's entitlements rather than nothing. */
export function tierIncludes(tier: string | null, feature: DashboardFeature): boolean {
  const t = isDashboardTier(tier) ? tier : "free";
  return TIER_FEATURES[t].includes(feature);
}
