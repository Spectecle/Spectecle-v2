"use client";

import Link from "next/link";
import { Check, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type PricingFeature = {
  text: string;
  included: boolean;
  hasInfo?: boolean;
};

export type PricingTier = {
  name: string;
  subtitle?: string;
  description: string;
  badge?: string;
  features: PricingFeature[];
  buttonText: string;
  highlighted?: boolean;
};

export function AdaptivePricingCards({ tiers }: { tiers: PricingTier[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {tiers.map((tier) => (
        <div
          key={tier.name}
          className={cn(
            "relative flex flex-col h-full rounded-lg border transition-colors duration-300",
            tier.highlighted
              ? "bg-[#1e1e1e] border-[#1e1e1e] shadow-2xl lg:-translate-y-2 z-10"
              : "bg-[var(--site-bg)] border-[var(--site-border)] hover:border-[var(--site-text-muted)]"
          )}
        >
          {tier.badge && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <div className="bg-[#f87444] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full whitespace-nowrap">
                {tier.badge}
              </div>
            </div>
          )}

          <div className={cn("text-center pt-12 pb-6 px-6", tier.highlighted ? "text-white" : "text-[var(--site-text-primary)]")}>
            {tier.subtitle && (
              <div className={cn("text-[10px] font-semibold uppercase tracking-[0.2em] mb-4", tier.highlighted ? "text-white/50" : "text-[var(--site-text-muted)]")}>
                {tier.subtitle}
              </div>
            )}
            <div className="text-3xl font-light mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              {tier.name}
            </div>
            <p className={cn("text-sm font-light leading-relaxed", tier.highlighted ? "text-white/70" : "text-[var(--site-text-secondary)]")}>
              {tier.description}
            </p>
          </div>

          <div className="flex-1 px-6">
            <h4 className={cn("text-[10px] font-semibold uppercase tracking-[0.2em] mb-4", tier.highlighted ? "text-white/50" : "text-[var(--site-text-muted)]")}>
              Plan Highlights
            </h4>
            <div className="space-y-3">
              {tier.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  {feature.included ? (
                    <Check className="h-4 w-4 text-[#f87444] shrink-0 mt-0.5" />
                  ) : (
                    <X className="h-4 w-4 text-[var(--site-text-muted)] shrink-0 mt-0.5" />
                  )}
                  <span className={cn("text-sm font-light flex items-center gap-1.5 leading-relaxed", tier.highlighted ? "text-white/90" : "text-[var(--site-text-secondary)]")}>
                    {feature.text}
                    {feature.hasInfo && <Info className="h-3 w-3 text-[var(--site-text-muted)]" />}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6">
            <Link
              href="/contact"
              className={cn(
                "block w-full py-3 text-sm font-semibold text-center rounded-lg transition-colors duration-300",
                tier.highlighted
                  ? "bg-[#f87444] text-white hover:bg-[#e0602f]"
                  : "bg-[var(--site-border)] text-[var(--site-text-primary)] hover:bg-[var(--site-text-muted)] hover:text-white"
              )}
            >
              {tier.buttonText}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
