export const DASHBOARD_TIERS = ["pulse", "signal", "radar"] as const;
export type DashboardTier = (typeof DASHBOARD_TIERS)[number];

export const DASHBOARD_TIER_LABELS: Record<DashboardTier, string> = {
  pulse: "Pulse",
  signal: "Signal",
  radar: "Radar",
};

export type DashboardFeature = "analytics" | "rankings" | "adReports";

export const DASHBOARD_FEATURE_LABELS: Record<DashboardFeature, string> = {
  analytics: "Website Analytics",
  rankings: "SEO Ranking Status",
  adReports: "Weekly Ad Reports",
};

const TIER_FEATURES: Record<DashboardTier, DashboardFeature[]> = {
  pulse: ["analytics"],
  signal: ["analytics", "rankings"],
  radar: ["analytics", "rankings", "adReports"],
};

export function isDashboardTier(value: unknown): value is DashboardTier {
  return typeof value === "string" && (DASHBOARD_TIERS as readonly string[]).includes(value);
}

export function tierIncludes(tier: string | null, feature: DashboardFeature): boolean {
  return !!tier && isDashboardTier(tier) && TIER_FEATURES[tier].includes(feature);
}
