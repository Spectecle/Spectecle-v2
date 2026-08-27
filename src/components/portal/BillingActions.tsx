"use client";

import { useState } from "react";

type Tier = "growth" | "pro";
type Interval = "monthly" | "annual";
type PlanPrices = Record<Tier, Record<Interval, string>>;

const PLAN_INFO: Record<Tier, { label: string; monthlyPrice: string; annualPrice: string }> = {
  growth: { label: "Growth", monthlyPrice: "$29.95", annualPrice: "$299.50" },
  pro: { label: "Pro", monthlyPrice: "$49.95", annualPrice: "$499.50" },
};

export function UpgradeCards({ prices }: { prices: PlanPrices }) {
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

      <div className="grid sm:grid-cols-2 gap-4">
        {(["growth", "pro"] as const).map((tier) => {
          const priceId = prices[tier][interval];
          const info = PLAN_INFO[tier];
          return (
            <div key={tier} className="glass border border-[var(--portal-border)] p-6">
              <p className="text-sm font-semibold text-[var(--portal-text-primary)] mb-1">{info.label}</p>
              <p className="text-2xl font-bold text-[var(--portal-text-primary)] mb-4">
                {interval === "monthly" ? info.monthlyPrice : info.annualPrice}
                <span className="text-sm font-normal text-[var(--portal-text-muted)]">
                  /{interval === "monthly" ? "mo" : "yr"}
                </span>
              </p>
              <button
                type="button"
                onClick={() => handleChoose(priceId)}
                disabled={loadingPriceId !== null}
                className="btn-primary w-full px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer disabled:opacity-60"
              >
                {loadingPriceId === priceId ? "Redirecting…" : `Choose ${info.label}`}
              </button>
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
