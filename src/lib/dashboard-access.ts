import { supabase } from "@/lib/supabase";

/** A signed-in user's organization + dashboard tier in one lookup, for
 * pages that need both (e.g. to fetch org-scoped data gated by tier). */
export async function getDashboardContextForUser(
  userId: string
): Promise<{ organizationId: string | null; tier: string | null }> {
  const { data: user } = await supabase
    .from("portal_users")
    .select("organization_id")
    .eq("id", userId)
    .maybeSingle();
  if (!user?.organization_id) return { organizationId: null, tier: null };

  const { data: org } = await supabase
    .from("organizations")
    .select("dashboard_tier")
    .eq("id", user.organization_id)
    .maybeSingle();
  return { organizationId: user.organization_id, tier: org?.dashboard_tier ?? null };
}

/** Resolves a signed-in user's dashboard tier via their organization.
 * Returns null if the user has no organization or the org has no tier set. */
export async function getDashboardTierForUser(userId: string): Promise<string | null> {
  const { tier } = await getDashboardContextForUser(userId);
  return tier;
}
