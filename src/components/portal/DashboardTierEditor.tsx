"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { DASHBOARD_TIERS, DASHBOARD_TIER_LABELS } from "@/lib/dashboard-tiers";

const TIER_OPTIONS = DASHBOARD_TIERS.map((t) => ({ value: t, label: DASHBOARD_TIER_LABELS[t] }));

export function DashboardTierEditor({
  organizationId,
  domain,
  orgName,
  websiteUrl,
  currentTier,
}: {
  organizationId: string | null;
  domain: string | null;
  orgName: string;
  websiteUrl: string | null;
  currentTier: string | null;
}) {
  const router = useRouter();
  const [value, setValue] = useState(currentTier ?? "free");
  const [isPending, startTransition] = useTransition();

  if (!organizationId) {
    return (
      <span
        className="text-xs text-[var(--portal-text-faint)]"
        title="Give this client a dedicated business (via &quot;New Business&quot; on their client page) before assigning dashboard access."
      >
        No dashboard access — needs a business first
      </span>
    );
  }

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value;
    const prev = value;
    setValue(next);
    const res = await fetch("/api/portal/admin/organizations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: organizationId,
        domain,
        name: orgName,
        websiteUrl,
        dashboardTier: next,
      }),
    });
    if (res.ok) {
      startTransition(() => router.refresh());
    } else {
      setValue(prev);
    }
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      disabled={isPending}
      className="bg-[var(--portal-card)] border border-[var(--portal-border)] text-[var(--portal-text-primary)] px-2.5 py-1 text-sm cursor-pointer outline-none focus:border-[#cb7c46]/50 disabled:opacity-60"
    >
      {TIER_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
