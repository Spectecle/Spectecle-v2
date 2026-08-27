import { supabase } from "@/lib/supabase";

/** A signed-in user's organization + dashboard tier + GA4 property linkage
 * in one lookup, for pages that need it (e.g. to fetch org-scoped data
 * gated by tier, or to know whether live analytics are connected). */
export async function getDashboardContextForUser(
  userId: string
): Promise<{ organizationId: string | null; tier: string | null; ga4PropertyId: string | null }> {
  const { data: user } = await supabase
    .from("portal_users")
    .select("organization_id")
    .eq("id", userId)
    .maybeSingle();
  if (!user?.organization_id) return { organizationId: null, tier: null, ga4PropertyId: null };

  const { data: org } = await supabase
    .from("organizations")
    .select("dashboard_tier, ga4_property_id")
    .eq("id", user.organization_id)
    .maybeSingle();
  return {
    organizationId: user.organization_id,
    tier: org?.dashboard_tier ?? null,
    ga4PropertyId: org?.ga4_property_id ?? null,
  };
}

/** Resolves a signed-in user's dashboard tier via their organization.
 * Returns null if the user has no organization or the org has no tier set. */
export async function getDashboardTierForUser(userId: string): Promise<string | null> {
  const { tier } = await getDashboardContextForUser(userId);
  return tier;
}
