"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Minus, ArrowUpRight, Megaphone, Sparkles, Info } from "lucide-react";
import { projects } from "@/app/work/projects-data";

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
  // One entry per plan in `carePlans`, in order. `true` = included (check),
  // `false` = not included (dash), a string = a specific value for that tier.
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
    tagline: "A professional site, fast — built on a proven foundation.",
    price: "$1,800",
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
    price: "$6,000",
    items: [
      "Everything in Craft, plus:",
      "Fully custom design — unlimited creative direction",
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
  { name: "Overdrive", monthly: 899 },
  { name: "Apex", monthly: 1499 },
];

const featureGroups: FeatureGroup[] = [
  {
    category: "Hosting & Security",
    rows: [
      {
        label: "Managed hosting & security scanning",
        description: "We host your site on fast, secure servers and run automated malware and vulnerability scans around the clock.",
        values: [true, true, true, true, true, true],
      },
      {
        label: "Advanced protection",
        description: "Enhanced firewall rules, DDoS mitigation, and daily backups for extra peace of mind.",
        values: [false, false, true, true, true, true],
      },
    ],
  },
  {
    category: "Content",
    rows: [
      {
        label: "Changes per year",
        description: "How many content updates — text, images, small edits — are included before extra work is billed hourly.",
        values: ["4 (self-request)", "12 (done for you)", "Unlimited", "Unlimited", "Unlimited", "Unlimited"],
      },
    ],
  },
  {
    category: "SEO",
    rows: [
      {
        label: "Ongoing SEO",
        description: "Continuous on-page optimization, technical fixes, and keyword targeting to improve your search rankings.",
        values: [false, "Basic", "Full monthly", "Full monthly", "Full monthly", "Full monthly"],
      },
      {
        label: "Blog posts / month",
        description: "Professionally written, SEO-optimized blog posts published to your site each month.",
        values: [false, false, false, "2", "2", "4"],
      },
      {
        label: "AI search optimization (AEO/GEO)",
        description: "Optimizing your content to appear in AI-powered answers like ChatGPT and Google AI Overviews, not just traditional search results.",
        values: [false, false, false, false, true, true],
      },
    ],
  },
  {
    category: "Local Presence",
    rows: [
      {
        label: "Google Business Profile management",
        description: "We keep your Google Business listing accurate, active, and optimized so you show up in local map searches.",
        values: [false, true, true, true, true, true],
      },
    ],
  },
  {
    category: "Growth & Support",
    rows: [
      {
        label: "Reputation & review management",
        description: "We monitor your Google, Yelp, and Facebook reviews and help you respond, protecting your online reputation.",
        values: [false, false, false, true, true, true],
      },
      {
        label: "Strategy consultation",
        description: "Scheduled calls with your strategist to review performance and plan next steps.",
        values: [false, false, false, "Monthly", "Monthly", "Dedicated strategist"],
      },
      {
        label: "Managed ad campaigns",
        description: "We build, run, and optimize your Google and Meta ad campaigns within the included monthly ad spend.",
        values: [false, false, false, false, "Up to $500/mo spend", "Up to $2,000/mo spend"],
      },
      {
        label: "Quarterly performance reports",
        description: "A plain-English report every quarter covering traffic, rankings, and growth metrics.",
        values: [false, false, false, false, true, true],
      },
      {
        label: "Google Workspace",
        description: "A professional @yourdomain.com email address and business tools through Google Workspace.",
        values: [false, false, true, true, true, true],
      },
      {
        label: "Priority support",
        description: "Faster response times when you need help or have a request.",
        values: [false, "Priority email", "Priority email", "Priority email", "Priority", "Fastest / dedicated"],
      },
    ],
  },
];

const addOns: AddOn[] = [
  {
    name: "Paid Advertising Management",
    price: "From $250/mo + your ad budget",
    description:
      "We build and manage your Google Ads and Meta (Facebook/Instagram) campaigns. You set your own monthly ad budget and pay that directly to Google/Meta — our fee is separate, and it's just for running and optimizing the campaigns. Already included starting at the Overdrive care plan.",
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
      "Chatbots, automated booking, follow-up emails, and other custom tools that save you time — scoped and priced around what your business actually needs.",
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
    <div className="inline-flex items-center rounded-full glass border border-white/8 p-1">
      {(["monthly", "yearly"] as BillingCycle[]).map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          className="relative px-5 py-2.5 rounded-full text-sm font-semibold cursor-pointer transition-colors"
        >
          {cycle === c && (
            <motion.span
              layoutId="billing-pill"
              className="absolute inset-0 rounded-full"
              style={{ background: "linear-gradient(135deg, #FF9A3A, #D25124)" }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className={`relative flex items-center gap-1.5 ${cycle === c ? "text-white" : "text-slate-400"}`}>
            {c === "monthly" ? "Monthly" : "Yearly"}
            {c === "yearly" && (
              <span
                className={`text-[10px] font-bold rounded-full px-1.5 py-0.5 ${
                  cycle === "yearly" ? "bg-white/20 text-white" : "bg-[#D25124]/15 text-[#F07A3A]"
                }`}
              >
                SAVE {Math.round(YEARLY_DISCOUNT * 100)}%
              </span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
}

/* ─── Part 1: one-time Website Design cards ─────────────── */
function DesignTierCard({ tier }: { tier: DesignTier }) {
  return (
    <div className="glass border border-white/8 rounded-3xl p-7 flex flex-col h-full">
      <h3 className="text-xl font-bold text-white mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>
        {tier.name}
      </h3>
      <p className="text-sm text-slate-400 mb-5 min-h-[2.5rem]">{tier.tagline}</p>

      <div className="mb-6">
        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-1">
          One-Time Design Investment
        </p>
        <span className={`font-bold text-white ${tier.isCustom ? "text-xl" : "text-3xl md:text-4xl"}`}>
          {tier.price}
        </span>
      </div>

      <Link
        href="/contact"
        className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl text-sm font-semibold cursor-pointer border border-white/12 text-white hover:border-[#D25124]/40 hover:bg-white/5 transition-all mb-7"
      >
        <span>{tier.isCustom ? "Contact Us" : "Get Started"}</span>
        <ArrowUpRight className="w-4 h-4" />
      </Link>

      <ul className="space-y-2.5 pt-6 border-t border-white/8 flex-1">
        {tier.items.map((item, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
            <Check className="w-4 h-4 text-[#F07A3A] shrink-0 mt-0.5" />
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
      <div className="text-center mb-10">
        <p className="text-xs font-semibold text-[#F07A3A] uppercase tracking-widest mb-3">Step 1</p>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-inter)" }}>
          Choose your website design
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto text-sm">
          A one-time investment to design and build your site. Pick the level of customization
          that fits — then choose an ongoing care plan below to keep it growing.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {designTiers.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <DesignTierCard tier={tier} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─── Feature row label with a hover/tap info tooltip ───────
   Desktop: hover the info icon. Mobile: tap it (tap elsewhere to close).
   Tooltip is portaled to <body> with fixed positioning so it's never
   clipped by the table's rounded, overflow-hidden container. */
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
      <p className="text-xs text-slate-300">{label}</p>
      <button
        ref={anchorRef}
        type="button"
        onMouseEnter={() => {
          updatePosition();
          setOpen(true);
        }}
        onMouseLeave={() => setOpen(false)}
        onClick={(e) => {
          e.stopPropagation();
          updatePosition();
          setOpen((o) => !o);
        }}
        aria-label={`What is "${label}"?`}
        className="shrink-0 mt-0.5 text-slate-600 hover:text-[#F07A3A] transition-colors cursor-pointer"
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
            className="z-50 w-56 rounded-lg glass border border-white/10 p-3 text-xs text-slate-300 leading-relaxed shadow-xl"
          >
            {description}
          </div>,
          document.body
        )}
    </div>
  );
}

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return <Check className="w-4 h-4 text-[#F07A3A] mx-auto" />;
  if (value === false) return <Minus className="w-3.5 h-3.5 text-slate-700 mx-auto" />;
  return <span className="text-xs text-slate-300 leading-tight">{value}</span>;
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
      <div className="text-center mb-10">
        <p className="text-xs font-semibold text-[#F07A3A] uppercase tracking-widest mb-3">Step 2</p>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-inter)" }}>
          Choose your care & growth plan
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto text-sm mb-8">
          Ongoing hosting, content, SEO, and support — sold separately from your website design,
          with no build cost baked in.
        </p>
        <BillingToggle cycle={cycle} onChange={onCycleChange} />
      </div>

      <div className="overflow-x-auto -mx-6 px-6 pb-2">
        <div className="min-w-[880px] rounded-2xl border border-white/8 glass overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-[200px_repeat(6,1fr)]">
            <div className="p-4" />
            {carePlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-4 text-center border-l border-white/8 ${
                  plan.popular ? "bg-[#D25124]/10" : ""
                }`}
              >
                {plan.popular && (
                  <span className="absolute top-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide text-white bg-gradient-to-r from-[#FF9A3A] to-[#D25124]">
                    Popular
                  </span>
                )}
                <p className="text-sm font-bold text-white mt-3" style={{ fontFamily: "var(--font-inter)" }}>
                  {plan.name}
                </p>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={`${plan.name}-${cycle}`}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="text-lg font-bold text-white mt-1"
                  >
                    ${(cycle === "monthly" ? plan.monthly : yearlyPrice(plan.monthly)).toLocaleString()}
                    <span className="text-xs font-normal text-slate-400">/{cycle === "monthly" ? "mo" : "yr"}</span>
                  </motion.p>
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div className="grid grid-cols-[200px_repeat(6,1fr)] border-t border-white/8">
            <div className="p-3" />
            {carePlans.map((plan) => (
              <div key={plan.name} className="p-3 border-l border-white/8 flex items-center justify-center">
                <Link
                  href="/contact"
                  className={`w-full text-center px-2 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    plan.popular
                      ? "btn-primary"
                      : "text-white border border-white/12 hover:border-[#D25124]/40 hover:bg-white/5"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>

          {/* Feature groups */}
          {featureGroups.map((group) => (
            <div key={group.category}>
              <div className="grid grid-cols-[200px_repeat(6,1fr)] border-t border-white/8 bg-white/[0.02]">
                <div className="p-3 col-span-7">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#F07A3A]">
                    {group.category}
                  </p>
                </div>
              </div>
              {group.rows.map((row) => (
                <div key={row.label} className="grid grid-cols-[200px_repeat(6,1fr)] border-t border-white/6">
                  <div className="p-3 flex items-center">
                    <FeatureLabel label={row.label} description={row.description} />
                  </div>
                  {row.values.map((value, i) => (
                    <div key={i} className="p-3 border-l border-white/8 flex items-center justify-center text-center">
                      <Cell value={value} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-sm text-slate-500 mt-8 max-w-xl mx-auto">
        All plans require a 12-month commitment, billed monthly or upfront annually for a
        discount. Need something outside your plan&apos;s change allowance? Extra work is billed
        at $100/hour.
      </p>
    </div>
  );
}

const PROOF_SLUGS = ["dearborn-cleaners", "vue-optometry", "mi-family-lawyer"];

function ProofSection() {
  const featured = PROOF_SLUGS.map((slug) => projects.find((p) => p.slug === slug)).filter(
    (p): p is NonNullable<typeof p> => !!p
  );

  if (featured.length === 0) return null;

  return (
    <div className="mt-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-inter)" }}>
          See what businesses like yours are getting
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto text-sm">
          Real clients, real results — on plans just like these.
        </p>
      </div>
      <div className="grid sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {featured.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="glass border border-white/8 rounded-2xl p-6 hover:border-[#D25124]/30 transition-colors group"
          >
            <p className="text-xs text-slate-500 mb-1">{project.industry}</p>
            <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#F07A3A] transition-colors">
              {project.title}
            </h3>
            <p className={`text-sm font-semibold ${project.cardResultColor}`}>{project.cardResult}</p>
            <span className="inline-flex items-center gap-1 text-xs text-slate-400 group-hover:text-white mt-4 transition-colors">
              View case study <ArrowUpRight className="w-3 h-3" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

const addOnIcons = [Megaphone, Sparkles];

function AddOnsSection() {
  return (
    <div className="mt-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-inter)" }}>
          Want to grow faster? Add these on.
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto text-sm">
          Available alongside any care plan above. These are priced separately because the right
          amount depends on your business.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
        {addOns.map((addOn, i) => {
          const Icon = addOnIcons[i];
          return (
            <div key={addOn.name} className="glass border border-white/8 rounded-2xl p-7 flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-[#D25124]/10 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-[#F07A3A]" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{addOn.name}</h3>
              <p className="text-sm font-semibold text-[#F07A3A] mb-3">{addOn.price}</p>
              <p className="text-sm text-slate-400 leading-relaxed mb-5">{addOn.description}</p>
              <ul className="space-y-2 mb-6 flex-1">
                {addOn.items.map((item, ii) => (
                  <li key={ii} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-[#F07A3A] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl text-sm font-semibold cursor-pointer border border-white/12 text-white hover:border-[#D25124]/40 hover:bg-white/5 transition-all"
              >
                <span>{addOn.cta}</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function PricingSection() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");

  return (
    <section className="relative px-6 pb-24">
      <div className="max-w-6xl mx-auto space-y-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <WebsiteDesignSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <CarePlansTable cycle={cycle} onCycleChange={setCycle} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <ProofSection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <AddOnsSection />
        </motion.div>
      </div>
    </section>
  );
}
