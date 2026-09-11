/** "free" is not a purchasable plan — it's the internal "no active plan"
 * state an org resolves to before ever subscribing, or after a tier
 * subscription is canceled. It's never shown as a choice in the pricing UI;
 * see PURCHASABLE_TIERS for what a customer can actually pick. */
export const DASHBOARD_TIERS = ["free", "essentials", "growth", "scale"] as const;
export type DashboardTier = (typeof DASHBOARD_TIERS)[number];

export const PURCHASABLE_TIERS = ["essentials", "growth", "scale"] as const;
export type PurchasableTier = (typeof PURCHASABLE_TIERS)[number];

export const DASHBOARD_TIER_LABELS: Record<DashboardTier, string> = {
  free: "No Active Plan",
  essentials: "Essentials",
  growth: "Growth",
  scale: "Scale",
};

export type DashboardFeature =
  | "siteStatus" // Essentials+: basic up/down monitoring
  | "statusBundle" // Essentials+: PageSpeed, SSL, and backup status (superset of siteStatus)
  | "analytics" // Essentials+: live GA4 dashboard
  | "searchConsole" // Essentials+
  | "monthlyReport" // Essentials+: automated monthly PDF report
  | "leadsInbox" // Growth+
  | "reviewsMonitor" // Growth+: Google reviews monitor
  | "adReports" // Scale only: Google + Meta ads reporting
  | "rankTracking" // Scale only: keyword rank tracking + competitor snapshot
  | "callTracking"; // Scale only

export const DASHBOARD_FEATURE_LABELS: Record<DashboardFeature, string> = {
  siteStatus: "Site Up/Down Status",
  statusBundle: "PageSpeed, SSL & Backup Status",
  analytics: "Website Analytics",
  searchConsole: "Search Console",
  monthlyReport: "Monthly PDF Report",
  leadsInbox: "Leads Inbox",
  reviewsMonitor: "Reviews Monitor",
  adReports: "Ads Reporting",
  rankTracking: "Rank Tracking",
  callTracking: "Call Tracking",
};

export const TIER_FEATURES: Record<DashboardTier, DashboardFeature[]> = {
  free: [],
  essentials: ["siteStatus", "statusBundle", "analytics", "searchConsole", "monthlyReport"],
  growth: [
    "siteStatus",
    "statusBundle",
    "analytics",
    "searchConsole",
    "monthlyReport",
    "leadsInbox",
    "reviewsMonitor",
  ],
  scale: [
    "siteStatus",
    "statusBundle",
    "analytics",
    "searchConsole",
    "monthlyReport",
    "leadsInbox",
    "reviewsMonitor",
    "adReports",
    "rankTracking",
    "callTracking",
  ],
};

/** "Content updates / month" in the pricing copy — an org with no active
 * plan gets none; minor-change work there is quoted and billed
 * individually rather than pooled into a monthly allowance. */
export const REQUEST_QUOTAS: Record<DashboardTier, number> = {
  free: 0,
  essentials: 1,
  growth: 3,
  scale: 6,
};

export function isDashboardTier(value: unknown): value is DashboardTier {
  return typeof value === "string" && (DASHBOARD_TIERS as readonly string[]).includes(value);
}

/** An invalid or missing tier resolves to "free" (no active plan) — the
 * safe, zero-entitlement default now that there's no $0 purchasable tier. */
export function tierIncludes(tier: string | null, feature: DashboardFeature): boolean {
  const t = isDashboardTier(tier) ? tier : "free";
  return TIER_FEATURES[t].includes(feature);
}

/** Recurring add-ons, sold independently of (and stackable with) any tier.
 * Each is its own Stripe Subscription against the same customer — see
 * addon_subscriptions in supabase/schema.sql and src/lib/stripe.ts. */
export const DASHBOARD_ADDONS = ["seo", "paidAds"] as const;
export type DashboardAddon = (typeof DASHBOARD_ADDONS)[number];

export const DASHBOARD_ADDON_LABELS: Record<DashboardAddon, string> = {
  seo: "SEO Optimization",
  paidAds: "Paid Ads Management",
};

export const DASHBOARD_ADDON_DESCRIPTIONS: Record<DashboardAddon, string> = {
  seo: "Rank tracking, content strategy, monthly optimization.",
  paidAds: "Google & Meta ads, monthly optimization, reporting.",
};

export function isDashboardAddon(value: unknown): value is DashboardAddon {
  return typeof value === "string" && (DASHBOARD_ADDONS as readonly string[]).includes(value);
}
