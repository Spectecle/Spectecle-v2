"use client";

import { motion } from "framer-motion";
import { AdaptivePricingCards, type PricingTier as AdaptivePricingTier } from "@/components/ui/AdaptivePricingCards";

type DesignTier = {
  name: string;
  tagline: string;
  price: string;
  isCustom?: boolean;
  featured?: boolean;
  items: string[];
};

const designTiers: DesignTier[] = [
  {
    name: "Blueprint",
    tagline: "A professional site, fast, built on a proven foundation.",
    price: "$1,500",
    items: [
      "Pre-designed, industry-proven foundation",
      "Customized with your colors, content & branding",
      "Fast turnaround",
    ],
  },
  {
    name: "Craft",
    tagline: "Semi-custom design, shaped around your brand.",
    price: "$2,500",
    featured: true,
    items: [
      "Everything in Blueprint, plus:",
      "Custom mockup + a round of revisions",
      "Built on our proven, conversion-focused structure",
    ],
  },
  {
    name: "Bespoke",
    tagline: "Fully custom, built from a blank canvas.",
    price: "$3,000",
    items: [
      "Everything in Craft, plus:",
      "Fully custom design, unlimited creative direction",
      "Dedicated strategy sessions with our team",
    ],
  },
  {
    name: "Enterprise",
    tagline: "Multi-location businesses and custom integrations.",
    price: "Contact for pricing",
    isCustom: true,
    items: [
      "Everything in Bespoke, plus:",
      "Multi-location & franchise support",
      "Custom integrations and a dedicated account team",
    ],
  },
];

const DESIGN_TIER_SUBTITLES = ["Foundation", "Semi-Custom", "Fully Custom", "Enterprise"];

const designCardTiers: AdaptivePricingTier[] = designTiers.map((tier, i) => ({
  name: tier.name,
  subtitle: DESIGN_TIER_SUBTITLES[i % DESIGN_TIER_SUBTITLES.length],
  description: tier.tagline,
  badge: tier.featured ? "Most Popular" : undefined,
  features: tier.items.map((item) => ({ text: item, included: true })),
  buttonText: tier.isCustom ? "Contact Us" : "Get Started",
  highlighted: tier.featured,
}));

/* ─── Website Design tiers ───────────────────────────────── */
function WebsiteDesignSection() {
  return (
    <div>
      <div className="mb-10">
        <h2 className="text-4xl md:text-5xl font-light text-[var(--site-text-primary)] mb-3" style={{ fontFamily: "var(--font-serif)" }}>
          Choose your website design.
        </h2>
        <p className="text-[var(--site-text-secondary)] max-w-xl text-sm">
          A one-time investment to design and build your site. Pick the level of customization
          that fits your business.
        </p>
      </div>
      <AdaptivePricingCards tiers={designCardTiers} />
    </div>
  );
}

export function PricingSection() {
  return (
    <section className="relative px-6 pb-14">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <WebsiteDesignSection />
        </motion.div>
      </div>
    </section>
  );
}
