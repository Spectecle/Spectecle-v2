import { supabase } from "@/lib/supabase";
import { getDashboardContextForUser } from "@/lib/dashboard-access";
import { REQUEST_QUOTAS, isDashboardTier, type DashboardTier } from "@/lib/dashboard-tiers";

function startOfCurrentMonthUtc(): string {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();
}

export type RequestQuotaStatus = {
  tier: DashboardTier;
  limit: number;
  used: number;
  remaining: number;
  exceeded: boolean;
};

/** Monthly request quota is pooled per organization (plans are billed per
 * business), not per individual login — otherwise a multi-seat client could
 * get N× their quota by having teammates submit separately. Returns null
 * only when the user has no organization at all (shouldn't happen for an
 * active client, but degrades gracefully rather than throwing). */
export async function getRequestQuotaStatusForUser(userId: string): Promise<RequestQuotaStatus | null> {
  const { organizationId, tier: rawTier } = await getDashboardContextForUser(userId);
  if (!organizationId) return null;

  const tier: DashboardTier = isDashboardTier(rawTier) ? rawTier : "free";
  const limit = REQUEST_QUOTAS[tier];

  const { data: orgUsers } = await supabase
    .from("portal_users")
    .select("id")
    .eq("organization_id", organizationId);
  const userIds = (orgUsers ?? []).map((u) => u.id);
  if (userIds.length === 0) {
    return { tier, limit, used: 0, remaining: limit, exceeded: false };
  }

  const { count } = await supabase
    .from("service_requests")
    .select("id", { count: "exact", head: true })
    .in("user_id", userIds)
    .neq("status", "deleted")
    .gte("created_at", startOfCurrentMonthUtc());

  const used = count ?? 0;
  return { tier, limit, used, remaining: Math.max(0, limit - used), exceeded: used >= limit };
}
