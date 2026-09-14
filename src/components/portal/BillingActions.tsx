"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import {
  PURCHASABLE_TIERS,
  DASHBOARD_TIER_LABELS,
  DASHBOARD_FEATURE_LABELS,
  DASHBOARD_ADDONS,
  DASHBOARD_ADDON_LABELS,
  DASHBOARD_ADDON_DESCRIPTIONS,
  TIER_FEATURES,
  REQUEST_QUOTAS,
  type DashboardTier,
  type PurchasableTier,
  type DashboardAddon,
} from "@/lib/dashboard-tiers";

type Interval = "monthly" | "annual";
type PlanPrices = Record<PurchasableTier, Record<Interval, string>>;

const PRICE_DISPLAY: Record<PurchasableTier, { monthly: string; annual: string }> = {
  essentials: { monthly: "$99", annual: "$990" },
  growth: { monthly: "$149", annual: "$1,490" },
  scale: { monthly: "$250", annual: "$2,500" },
};

const TIER_MONTHLY_AMOUNT: Record<PurchasableTier, number> = { essentials: 99, growth: 149, scale: 250 };

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

  // -1 when currentTier is "free" (no active plan) — every purchasable
  // tier's index is then > -1, so all three show as available, which is
  // exactly right for an org with nothing active yet.
  const currentRank = PURCHASABLE_TIERS.indexOf(currentTier as PurchasableTier);

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
        {PURCHASABLE_TIERS.map((tier, i) => {
          const isCurrent = tier === currentTier;
          const previousTier = PURCHASABLE_TIERS[i - 1];
          const ownFeatures = previousTier
            ? TIER_FEATURES[tier].filter((f) => !TIER_FEATURES[previousTier].includes(f))
            : TIER_FEATURES[tier];
          const price = PRICE_DISPLAY[tier][interval];
          const priceId = prices[tier][interval];
          const canUpgrade = i > currentRank;

          return (
            <div
              key={tier}
              className={`glass border p-6 flex flex-col ${
                isCurrent ? "border-[#cb7c46]/40" : "border-[var(--portal-border)]"
              }`}
            >
              {isCurrent ? (
                <span className="inline-block self-start mb-3 text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#cb7c46]/15 text-[#cb7c46]">
                  Your Plan
                </span>
              ) : tier === "growth" ? (
                <span className="inline-block self-start mb-3 text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[var(--portal-border)] text-[var(--portal-text-secondary)]">
                  Most Popular
                </span>
              ) : null}
              <p className="text-sm font-semibold text-[var(--portal-text-primary)] mb-1">
                {DASHBOARD_TIER_LABELS[tier]}
              </p>
              <p className="text-2xl font-bold text-[var(--portal-text-primary)] mb-1">
                {price}
                <span className="text-sm font-normal text-[var(--portal-text-muted)]">
                  /{interval === "monthly" ? "mo" : "yr"}
                </span>
              </p>
              <p className="text-xs text-[var(--portal-text-faint)] mb-4">
                {REQUEST_QUOTAS[tier]} content update{REQUEST_QUOTAS[tier] === 1 ? "" : "s"} / month
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
              ) : canUpgrade ? (
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

const ADDON_MONTHLY_AMOUNT: Record<DashboardAddon, number> = { seo: 149, paidAds: 250 };
const ADDON_PRICE_DISPLAY: Record<DashboardAddon, string> = { seo: "$149", paidAds: "$250" };

export function AddonSection({
  addonPrices,
  activeAddons,
  currentTier,
  currentInterval,
}: {
  addonPrices: Record<DashboardAddon, string>;
  activeAddons: DashboardAddon[];
  currentTier: DashboardTier;
  currentInterval: Interval | null;
}) {
  const [loadingAddon, setLoadingAddon] = useState<DashboardAddon | null>(null);

  const handleAdd = async (addon: DashboardAddon) => {
    setLoadingAddon(addon);
    try {
      const res = await fetch("/api/portal/billing/checkout-addon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId: addonPrices[addon] }),
      });
      const body = await res.json().catch(() => null);
      if (res.ok && body?.url) {
        window.location.assign(body.url);
      } else {
        setLoadingAddon(null);
      }
    } catch {
      setLoadingAddon(null);
    }
  };

  // Only a purchasable, monthly-billed tier has a clean combined "/mo"
  // total to show alongside monthly-only add-ons.
  const tierMonthlyAmount =
    (PURCHASABLE_TIERS as readonly string[]).includes(currentTier) && currentInterval === "monthly"
      ? TIER_MONTHLY_AMOUNT[currentTier as PurchasableTier]
      : null;
  const addonsTotal = activeAddons.reduce((sum, a) => sum + ADDON_MONTHLY_AMOUNT[a], 0);
  const combinedTotal = tierMonthlyAmount !== null && activeAddons.length > 0 ? tierMonthlyAmount + addonsTotal : null;

  return (
    <div>
      <p className="text-sm font-semibold text-[var(--portal-text-primary)] mb-1">Add-ons</p>
      <p className="text-xs text-[var(--portal-text-faint)] mb-4">
        Stack either or both with your plan, cancel anytime from Manage Billing.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {DASHBOARD_ADDONS.map((addon) => {
          const isActive = activeAddons.includes(addon);
          return (
            <div key={addon} className="glass border border-[var(--portal-border)] p-6 flex flex-col">
              {isActive && (
                <span className="inline-block self-start mb-3 text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#cb7c46]/15 text-[#cb7c46]">
                  Active
                </span>
              )}
              <p className="text-sm font-semibold text-[var(--portal-text-primary)] mb-1">
                {DASHBOARD_ADDON_LABELS[addon]}
              </p>
              <p className="text-2xl font-bold text-[var(--portal-text-primary)] mb-2">
                {ADDON_PRICE_DISPLAY[addon]}
                <span className="text-sm font-normal text-[var(--portal-text-muted)]">/mo</span>
              </p>
              <p className="text-sm text-[var(--portal-text-secondary)] mb-6 flex-1">
                {DASHBOARD_ADDON_DESCRIPTIONS[addon]}
              </p>
              {isActive ? (
                <p className="text-xs text-[var(--portal-text-muted)]">Manage or cancel from Manage Billing below.</p>
              ) : (
                <button
                  type="button"
                  onClick={() => handleAdd(addon)}
                  disabled={loadingAddon !== null}
                  className="btn-primary w-full px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer disabled:opacity-60"
                >
                  {loadingAddon === addon ? "Redirecting…" : `Add for ${ADDON_PRICE_DISPLAY[addon]}/mo`}
                </button>
              )}
            </div>
          );
        })}
      </div>
      {combinedTotal !== null && (
        <p className="mt-4 text-sm text-[var(--portal-text-secondary)]">
          Your combined monthly cost:{" "}
          <span className="font-semibold text-[var(--portal-text-primary)]">${combinedTotal}/mo</span>
        </p>
      )}
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
