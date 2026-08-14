"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import { ProofGallery } from "@/components/ui/ProofGallery";
import { AdaptivePricingCards, type PricingTier as AdaptivePricingTier } from "@/components/ui/AdaptivePricingCards";

type DesignTier = {
  name: string;
  tagline: string;
  price: string;
  isCustom?: boolean;
  featured?: boolean;
  items: string[];
};

type AddOn = {
  name: string;
  price: string;
  description: string;
  items: string[];
  cta: string;
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

const addOns: AddOn[] = [
  {
    name: "Paid Advertising Management",
    price: "From $250/mo + your ad budget",
    description:
      "We build and manage your Google Ads and Meta (Facebook/Instagram) campaigns. You set your own monthly ad budget and pay that directly to Google/Meta. Our fee is separate, and it's just for running and optimizing the campaigns.",
    items: [
      "Google Ads & Meta Ads setup and management",
      "You control your own monthly ad budget",
      "Monthly performance reporting, in plain English",
    ],
    cta: "Get a Quote",
  },
  {
    name: "AI & Automation",
    price: "Custom pricing",
    description:
      "Chatbots, automated booking, follow-up emails, and other custom tools that save you time, scoped and priced around what your business actually needs.",
    items: [
      "Built around your specific workflow",
      "Available as a one-time project or ongoing support",
    ],
    cta: "Let's Talk",
  },
];

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

const PROOF_SLUGS = ["dearborn-cleaners", "vue-optometry", "mi-family-lawyer"];

function ProofSection() {
  return (
    <div className="mt-16">
      <ProofGallery
        slugs={PROOF_SLUGS}
        heading="See what businesses like yours are getting"
        subheading="Real clients, real results: on plans just like these."
      />
    </div>
  );
}

function AddOnsSection() {
  return (
    <div className="mt-16">
      <div className="mb-10">
        <h2 className="text-4xl md:text-5xl font-light text-[var(--site-text-primary)] mb-3" style={{ fontFamily: "var(--font-serif)" }}>
          Want to grow faster? <span className="italic text-[#f87444]">Add these on.</span>
        </h2>
        <p className="text-[var(--site-text-secondary)] max-w-xl text-sm">
          Available alongside your website design, priced separately because the right amount
          depends on your business.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10 max-w-4xl sm:divide-x sm:divide-[var(--site-border)]">
        {addOns.map((addOn) => (
          <div key={addOn.name} className="flex flex-col sm:pl-8 sm:first:pl-0">
            <h3 className="text-xl font-light text-[var(--site-text-primary)] mb-1" style={{ fontFamily: "var(--font-serif)" }}>{addOn.name}</h3>
            <p className="text-sm font-semibold text-[#f87444] mb-3">{addOn.price}</p>
            <p className="text-sm text-[var(--site-text-secondary)] leading-relaxed mb-5">{addOn.description}</p>
            <ul className="space-y-2 mb-6 flex-1">
              {addOn.items.map((item, ii) => (
                <li key={ii} className="flex items-start gap-2.5 text-sm text-[var(--site-text-secondary)]">
                  <Check className="w-4 h-4 text-[#f87444] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-0.5 w-fit"
            >
              <span>{addOn.cta}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PricingSection() {
  return (
    <section className="relative px-6 pb-24">
      <div className="max-w-6xl mx-auto space-y-24">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <WebsiteDesignSection />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="pt-8 border-t border-[var(--site-border)]">
          <ProofSection />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="pt-8 border-t border-[var(--site-border)]">
          <AddOnsSection />
        </motion.div>
      </div>
    </section>
  );
}
