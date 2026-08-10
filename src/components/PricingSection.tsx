"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Minus, ArrowUpRight, Info } from "lucide-react";
import { ProofGallery } from "@/components/ui/ProofGallery";

type BillingCycle = "monthly" | "yearly";

type DesignTier = {
  name: string;
  tagline: string;
  price: string;
  isCustom?: boolean;
  items: string[];
};

type CarePlan = {
  name: string;
  monthly: number;
  popular?: boolean;
};

type FeatureRow = {
  label: string;
  description: string;
  values: (string | boolean)[];
};

type FeatureGroup = {
  category: string;
  rows: FeatureRow[];
};

type AddOn = {
  name: string;
  price: string;
  description: string;
  items: string[];
  cta: string;
};

const YEARLY_DISCOUNT = 0.1;

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

const carePlans: CarePlan[] = [
  { name: "Spark", monthly: 149 },
  { name: "Momentum", monthly: 229, popular: true },
  { name: "Velocity", monthly: 399 },
  { name: "Surge", monthly: 599 },
  { name: "Overdrive", monthly: 999 },
  { name: "Apex", monthly: 1999 },
];

const featureGroups: FeatureGroup[] = [
  {
    category: "Hosting & Security",
    rows: [
      { label: "Managed hosting & security scanning", description: "We host your site on fast, secure servers and run automated malware and vulnerability scans around the clock.", values: [true, true, true, true, true, true] },
      { label: "Advanced protection", description: "Enhanced firewall rules, DDoS mitigation, and daily backups for extra peace of mind.", values: [false, false, true, true, true, true] },
    ],
  },
  {
    category: "Content",
    rows: [
      { label: "Changes per year", description: "How many content updates (text, images, small edits) are included before extra work is billed hourly.", values: ["4 (self-request)", "12 (done for you)", "Unlimited", "Unlimited", "Unlimited", "Unlimited"] },
    ],
  },
  {
    category: "SEO",
    rows: [
      { label: "Ongoing SEO", description: "Continuous on-page optimization, technical fixes, and keyword targeting to improve your search rankings.", values: [false, "Basic", "Full monthly", "Full monthly", "Full monthly", "Full monthly"] },
      { label: "Blog posts / month", description: "Professionally written, SEO-optimized blog posts published to your site each month.", values: [false, false, false, "2", "2", "4"] },
      { label: "AI search optimization (AEO/GEO)", description: "Optimizing your content to appear in AI-powered answers like ChatGPT and Google AI Overviews, not just traditional search results.", values: [false, false, false, false, true, true] },
    ],
  },
  {
    category: "Local Presence",
    rows: [
      { label: "Google Business Profile management", description: "We keep your Google Business listing accurate, active, and optimized so you show up in local map searches.", values: [false, true, true, true, true, true] },
    ],
  },
  {
    category: "Growth & Support",
    rows: [
      { label: "Reputation & review management", description: "We monitor your Google, Yelp, and Facebook reviews and help you respond, protecting your online reputation.", values: [false, false, false, true, true, true] },
      { label: "Strategy consultation", description: "Scheduled calls with your strategist to review performance and plan next steps.", values: [false, false, false, "Monthly", "Monthly", "Dedicated strategist"] },
      { label: "Managed ad campaigns", description: "We build, run, and optimize your Google and Meta ad campaigns within the included monthly ad spend.", values: [false, false, false, false, "Up to $1,000/mo spend", "Up to $2,000/mo spend"] },
      { label: "Quarterly performance reports", description: "A plain-English report every quarter covering traffic, rankings, and growth metrics.", values: [false, false, false, false, true, true] },
      { label: "Google Workspace", description: "A professional @yourdomain.com email address and business tools through Google Workspace.", values: [false, false, true, true, true, true] },
      { label: "Priority support", description: "Faster response times when you need help or have a request.", values: [false, "Priority email", "Priority email", "Priority email", "Priority", "Fastest / dedicated"] },
    ],
  },
];

const addOns: AddOn[] = [
  {
    name: "Paid Advertising Management",
    price: "From $250/mo + your ad budget",
    description:
      "We build and manage your Google Ads and Meta (Facebook/Instagram) campaigns. You set your own monthly ad budget and pay that directly to Google/Meta. Our fee is separate, and it's just for running and optimizing the campaigns. Already included starting at the Overdrive care plan.",
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

function yearlyPrice(monthly: number): number {
  return Math.round(monthly * 12 * (1 - YEARLY_DISCOUNT));
}

function BillingToggle({
  cycle,
  onChange,
}: {
  cycle: BillingCycle;
  onChange: (c: BillingCycle) => void;
}) {
  return (
    <div className="inline-flex items-center gap-6 border-b border-[var(--site-border)] pb-2">
      {(["monthly", "yearly"] as BillingCycle[]).map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          className={`text-sm font-semibold cursor-pointer transition-colors flex items-center gap-1.5 ${
            cycle === c ? "text-[var(--site-text-primary)]" : "text-[var(--site-text-muted)]"
          }`}
        >
          {c === "monthly" ? "Monthly" : "Yearly"}
          {c === "yearly" && (
            <span className="text-[10px] font-bold text-[#f87444]">
              SAVE {Math.round(YEARLY_DISCOUNT * 100)}%
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

/* ─── Website Design tiers ───────────────────────────────── */
function DesignTierCard({ tier }: { tier: DesignTier }) {
  return (
    <div className="pt-6 flex flex-col h-full">
      <h3 className="text-2xl font-light text-[var(--site-text-primary)] mb-1.5" style={{ fontFamily: "var(--font-serif)" }}>
        {tier.name}
      </h3>
      <p className="text-sm text-[var(--site-text-muted)] mb-5 min-h-[2.5rem]">{tier.tagline}</p>

      <div className="mb-6">
        <p className="text-[10px] text-[var(--site-text-muted)] uppercase tracking-widest font-semibold mb-1">
          One-Time Design Investment
        </p>
        <span className={`font-light text-[#f87444] ${tier.isCustom ? "text-xl" : "text-3xl md:text-4xl"}`} style={{ fontFamily: "var(--font-serif)" }}>
          {tier.price}
        </span>
      </div>

      <Link
        href="/contact"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-0.5 w-fit mb-7"
      >
        <span>{tier.isCustom ? "Contact Us" : "Get Started"}</span>
        <ArrowUpRight className="w-4 h-4" />
      </Link>

      <ul className="space-y-2.5 pt-6 border-t border-[var(--site-border)] flex-1">
        {tier.items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--site-text-secondary)]">
            <Check className="w-4 h-4 text-[#f87444] shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WebsiteDesignSection() {
  return (
    <div>
      <div className="mb-10">
        <p className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest mb-3">Step 1</p>
        <h2 className="text-4xl md:text-5xl font-light text-[var(--site-text-primary)] mb-3" style={{ fontFamily: "var(--font-serif)" }}>
          Choose your website design.
        </h2>
        <p className="text-[var(--site-text-secondary)] max-w-xl text-sm">
          A one-time investment to design and build your site. Pick the level of customization
          that fits, then choose an ongoing care plan below to keep it growing.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:divide-x sm:divide-[var(--site-border)]">
        {designTiers.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="sm:pl-8 sm:first:pl-0"
          >
            <DesignTierCard tier={tier} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Feature row label with a hover/tap info tooltip ─────── */
function FeatureLabel({ label, description }: { label: string; description: string }) {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, openUpward: false });
  const anchorRef = useRef<HTMLButtonElement>(null);

  const updatePosition = () => {
    const rect = anchorRef.current?.getBoundingClientRect();
    if (!rect) return;
    const openUpward = rect.bottom > window.innerHeight - 160;
    setCoords({ top: openUpward ? rect.top - 8 : rect.bottom + 8, left: rect.left, openUpward });
  };

  useEffect(() => {
    if (!open) return;
    const handleOutside = (e: MouseEvent) => {
      if (anchorRef.current && !anchorRef.current.contains(e.target as Node)) setOpen(false);
    };
    const handleScroll = () => setOpen(false);
    document.addEventListener("click", handleOutside);
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      document.removeEventListener("click", handleOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [open]);

  return (
    <div className="flex items-start gap-1.5">
      <p className="text-xs text-[var(--site-text-secondary)]">{label}</p>
      <button
        ref={anchorRef}
        type="button"
        onMouseEnter={() => { updatePosition(); setOpen(true); }}
        onMouseLeave={() => setOpen(false)}
        onClick={(e) => { e.stopPropagation(); updatePosition(); setOpen((o) => !o); }}
        aria-label={`What is "${label}"?`}
        className="shrink-0 mt-0.5 text-[var(--site-text-muted)] hover:text-[#f87444] transition-colors cursor-pointer"
      >
        <Info className="w-3 h-3" />
      </button>
      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: coords.top,
              left: coords.left,
              transform: coords.openUpward ? "translateY(-100%)" : undefined,
            }}
            className="z-50 w-56 bg-[var(--site-bg)] border border-[var(--site-border)] p-3 text-xs text-[var(--site-text-secondary)] leading-relaxed shadow-xl"
          >
            {description}
          </div>,
          document.body
        )}
    </div>
  );
}

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return <Check className="w-4 h-4 text-[#f87444] mx-auto" />;
  if (value === false) return <Minus className="w-3.5 h-3.5 text-[var(--site-text-muted)] mx-auto" />;
  return <span className="text-xs text-[var(--site-text-secondary)] leading-tight">{value}</span>;
}

function CarePlansTable({
  cycle,
  onCycleChange,
}: {
  cycle: BillingCycle;
  onCycleChange: (c: BillingCycle) => void;
}) {
  return (
    <div>
      <div className="mb-10">
        <p className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest mb-3">Step 2</p>
        <h2 className="text-4xl md:text-5xl font-light text-[var(--site-text-primary)] mb-3" style={{ fontFamily: "var(--font-serif)" }}>
          Choose your care & growth plan.
        </h2>
        <p className="text-[var(--site-text-secondary)] max-w-xl text-sm mb-8">
          Ongoing hosting, content, SEO, and support, sold separately from your website design,
          with no build cost baked in.
        </p>
        <BillingToggle cycle={cycle} onChange={onCycleChange} />
      </div>

      <div className="overflow-x-auto -mx-6 px-6 pb-2">
        <div className="min-w-[880px] border-t border-[var(--site-border)]">
          <div className="grid grid-cols-[200px_repeat(6,1fr)]">
            <div className="p-4" />
            {carePlans.map((plan) => (
              <div key={plan.name} className="relative p-4 text-center border-l border-[var(--site-border)]">
                {plan.popular && (
                  <span className="absolute top-1.5 left-1/2 -translate-x-1/2 text-[9px] font-bold uppercase tracking-wide text-[#f87444]">
                    Popular
                  </span>
                )}
                <p className="text-sm font-semibold text-[var(--site-text-primary)] mt-3" style={{ fontFamily: "var(--font-sans)" }}>
                  {plan.name}
                </p>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={`${plan.name}-${cycle}`}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="text-lg font-light text-[#f87444] mt-1"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    ${(cycle === "monthly" ? plan.monthly : yearlyPrice(plan.monthly)).toLocaleString()}
                    <span className="text-xs font-sans font-normal text-[var(--site-text-muted)]">/{cycle === "monthly" ? "mo" : "yr"}</span>
                  </motion.p>
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-[200px_repeat(6,1fr)] border-t border-[var(--site-border)]">
            <div className="p-3" />
            {carePlans.map((plan) => (
              <div key={plan.name} className="p-3 border-l border-[var(--site-border)] flex items-center justify-center">
                <Link
                  href="/contact"
                  className={`text-xs font-semibold cursor-pointer border-b pb-0.5 ${
                    plan.popular ? "text-[#f87444] border-[#f87444]" : "text-[var(--site-text-primary)] border-[var(--site-text-primary)]"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>

          {featureGroups.map((group) => (
            <div key={group.category}>
              <div className="grid grid-cols-[200px_repeat(6,1fr)] border-t border-[var(--site-border)]">
                <div className="p-3 col-span-7">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#f87444]">
                    {group.category}
                  </p>
                </div>
              </div>
              {group.rows.map((row) => (
                <div key={row.label} className="grid grid-cols-[200px_repeat(6,1fr)] border-t border-[var(--site-border)]">
                  <div className="p-3 flex items-center">
                    <FeatureLabel label={row.label} description={row.description} />
                  </div>
                  {row.values.map((value, i) => (
                    <div key={i} className="p-3 border-l border-[var(--site-border)] flex items-center justify-center text-center">
                      <Cell value={value} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

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
          Available alongside any care plan above. These are priced separately because the right
          amount depends on your business.
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
  const [cycle, setCycle] = useState<BillingCycle>("monthly");

  return (
    <section className="relative px-6 pb-24">
      <div className="max-w-6xl mx-auto space-y-24">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <WebsiteDesignSection />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="pt-8 border-t border-[var(--site-border)]">
          <CarePlansTable cycle={cycle} onCycleChange={setCycle} />
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
