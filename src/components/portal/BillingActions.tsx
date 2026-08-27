"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import {
  DASHBOARD_TIERS,
  DASHBOARD_TIER_LABELS,
  DASHBOARD_FEATURE_LABELS,
  TIER_FEATURES,
  REQUEST_QUOTAS,
  type DashboardTier,
} from "@/lib/dashboard-tiers";

type PaidTier = "growth" | "pro";
type Interval = "monthly" | "annual";
type PlanPrices = Record<PaidTier, Record<Interval, string>>;

const PRICE_DISPLAY: Record<DashboardTier, { monthly: string; annual: string }> = {
  free: { monthly: "$0", annual: "$0" },
  growth: { monthly: "$29.95", annual: "$299.50" },
  pro: { monthly: "$49.95", annual: "$499.50" },
};

export function PlanComparison({ prices, currentTier }: { prices: PlanPrices; currentTier: DashboardTier }) {
  const [interval, setInterval] = useState<Interval>("monthly");
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);

  const handleChoose = async (priceId: string) => {
    setLoadingPriceId(priceId);
    try {
      const res = await fetch("/api/portal/billing/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const body = await res.json().catch(() => null);
      if (res.ok && body?.url) {
        window.location.assign(body.url);
      } else {
        setLoadingPriceId(null);
      }
    } catch {
      setLoadingPriceId(null);
    }
  };

  const currentRank = DASHBOARD_TIERS.indexOf(currentTier);

  return (
    <div>
      <div className="inline-flex items-center gap-1 mb-6 p-1 rounded-xl bg-[var(--portal-border)]">
        {(["monthly", "annual"] as const).map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => setInterval(opt)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-colors ${
              interval === opt
                ? "bg-[var(--portal-card)] text-[var(--portal-text-primary)]"
                : "text-[var(--portal-text-muted)]"
            }`}
          >
            {opt === "monthly" ? "Monthly" : "Annual — 2 months free"}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {DASHBOARD_TIERS.map((tier, i) => {
          const isCurrent = tier === currentTier;
          const previousTier = DASHBOARD_TIERS[i - 1];
          const ownFeatures = previousTier
            ? TIER_FEATURES[tier].filter((f) => !TIER_FEATURES[previousTier].includes(f))
            : TIER_FEATURES[tier];
          const price = PRICE_DISPLAY[tier][interval];
          const priceId = tier !== "free" ? prices[tier as PaidTier][interval] : null;
          const canUpgrade = i > currentRank;

          return (
            <div
              key={tier}
              className={`glass border p-6 flex flex-col ${
                isCurrent ? "border-[#cb7c46]/40" : "border-[var(--portal-border)]"
              }`}
            >
              {isCurrent && (
                <span className="inline-block self-start mb-3 text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#cb7c46]/15 text-[#cb7c46]">
                  Your Plan
                </span>
              )}
              <p className="text-sm font-semibold text-[var(--portal-text-primary)] mb-1">
                {DASHBOARD_TIER_LABELS[tier]}
              </p>
              <p className="text-2xl font-bold text-[var(--portal-text-primary)] mb-1">
                {price}
                {tier !== "free" && (
                  <span className="text-sm font-normal text-[var(--portal-text-muted)]">
                    /{interval === "monthly" ? "mo" : "yr"}
                  </span>
                )}
              </p>
              <p className="text-xs text-[var(--portal-text-faint)] mb-4">
                {REQUEST_QUOTAS[tier]} service requests / month
              </p>

              <ul className="space-y-2 mb-6 flex-1">
                {previousTier && (
                  <li className="text-xs text-[var(--portal-text-muted)] mb-1">
                    Everything in {DASHBOARD_TIER_LABELS[previousTier]}, plus:
                  </li>
                )}
                {ownFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-[var(--portal-text-secondary)]">
                    <Check className="w-4 h-4 text-[#cb7c46] shrink-0 mt-0.5" />
                    {DASHBOARD_FEATURE_LABELS[feature]}
                  </li>
                ))}
              </ul>

              {isCurrent ? (
                <button
                  type="button"
                  disabled
                  className="w-full px-4 py-2.5 rounded-xl text-sm font-semibold border border-[var(--portal-border)] text-[var(--portal-text-muted)] cursor-default"
                >
                  Current Plan
                </button>
              ) : canUpgrade && priceId ? (
                <button
                  type="button"
                  onClick={() => handleChoose(priceId)}
                  disabled={loadingPriceId !== null}
                  className="btn-primary w-full px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer disabled:opacity-60"
                >
                  {loadingPriceId === priceId ? "Redirecting…" : `Choose ${DASHBOARD_TIER_LABELS[tier]}`}
                </button>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ManageBillingButton({ label = "Manage Billing" }: { label?: string }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/portal/billing/portal-session", { method: "POST" });
      const body = await res.json().catch(() => null);
      if (res.ok && body?.url) {
        window.location.assign(body.url);
      } else {
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="btn-primary px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer disabled:opacity-60"
    >
      {loading ? "Redirecting…" : label}
    </button>
  );
}
