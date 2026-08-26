import { tierIncludes, type DashboardFeature } from "@/lib/dashboard-tiers";

export function DashboardFeatureCard({
  title,
  description,
  feature,
  tier,
}: {
  title: string;
  description: string;
  feature: DashboardFeature;
  tier: string | null;
}) {
  const included = tierIncludes(tier, feature);
  return (
    <div className="glass border border-[var(--portal-border)] p-6">
      <p className="text-sm font-semibold text-[var(--portal-text-primary)] mb-1.5">{title}</p>
      <p className="text-sm text-[var(--portal-text-faint)] mb-3">{description}</p>
      {included ? (
        <p className="text-sm text-[#cb7c46]">Included in your plan — reporting is launching soon.</p>
      ) : (
        <p className="text-sm text-[var(--portal-text-muted)]">
          Not included in your current plan.{" "}
          <a href="mailto:hello@spectecle.com" className="text-[#cb7c46] hover:underline">
            Contact us to upgrade.
          </a>
        </p>
      )}
    </div>
  );
}
