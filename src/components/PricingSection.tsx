"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowUpRight, Megaphone, Sparkles } from "lucide-react";
import { projects } from "@/app/work/projects-data";

type BillingCycle = "monthly" | "yearly";

type Plan = {
  name: string;
  tagline: string;
  monthly: number;
  setupFee: number;
  popular?: boolean;
  groups: { label: string; items: string[] }[];
};

type AddOn = {
  name: string;
  price: string;
  description: string;
  items: string[];
  cta: string;
};

const YEARLY_DISCOUNT = 0.1;

// Setup fee scales up with tier — the more full-service the plan, the more
// upfront build work it actually takes.
const plans: Plan[] = [
  {
    name: "Spark",
    tagline: "A professional website, live and looked after.",
    monthly: 149,
    setupFee: 299,
    groups: [
      { label: "Hosting & Security", items: ["Fast, secure website hosting", "Security scanning to catch problems early"] },
      { label: "Content", items: ["Up to 4 changes per year", "Submit requests anytime through your client portal"] },
    ],
  },
  {
    name: "Momentum",
    tagline: "For businesses ready to actively grow their presence.",
    monthly: 229,
    setupFee: 499,
    popular: true,
    groups: [
      { label: "Everything in Spark, plus:", items: [] },
      { label: "Content", items: ["Up to 12 changes per year — we make the edits for you"] },
      { label: "SEO", items: ["We keep your site optimized to show up in Google search", "Ongoing improvements based on what's working"] },
      { label: "Local Presence", items: ["We manage and update your Google Business Profile"] },
      { label: "Support", items: ["Priority email support"] },
    ],
  },
  {
    name: "Velocity",
    tagline: "Full-service growth, hands-off for you.",
    monthly: 399,
    setupFee: 799,
    groups: [
      { label: "Everything in Momentum, plus:", items: [] },
      { label: "Content", items: ["Unlimited changes, anytime"] },
      { label: "SEO", items: ["Full monthly SEO — we actively work to improve your rankings", "Track how you rank in Google over time"] },
      { label: "Included Add-Ons", items: ["Professional email (Google Workspace) set up for you", "Advanced security protection"] },
      { label: "Support", items: ["Fastest turnaround on requests"] },
    ],
  },
];

const addOns: AddOn[] = [
  {
    name: "Paid Advertising Management",
    price: "From $250/mo + your ad budget",
    description:
      "We build and manage your Google Ads and Meta (Facebook/Instagram) campaigns. You set your own monthly ad budget and pay that directly to Google/Meta — our fee is separate, and it's just for running and optimizing the campaigns.",
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

function PriceDisplay({ plan, cycle }: { plan: Plan; cycle: BillingCycle }) {
  const price = cycle === "monthly" ? plan.monthly : yearlyPrice(plan.monthly);
  return (
    <div className="flex items-baseline gap-1">
      <span className="text-lg font-semibold text-white/70">$</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={`${plan.name}-${cycle}`}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-white tabular-nums"
        >
          {price.toLocaleString()}
        </motion.span>
      </AnimatePresence>
      <span className="text-slate-400 text-sm ml-1">/{cycle === "monthly" ? "mo" : "yr"}</span>
    </div>
  );
}

function PlanCard({ plan, cycle }: { plan: Plan; cycle: BillingCycle }) {
  return (
    <div
      className={`relative rounded-3xl p-8 flex flex-col h-full ${
        plan.popular
          ? "glass border-2 border-[#D25124]/50 shadow-[0_0_60px_rgba(210,81,36,0.2)] md:-translate-y-3"
          : "glass border border-white/8"
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide text-white"
            style={{ background: "linear-gradient(135deg, #FF9A3A, #D25124)" }}
          >
            Most Popular
          </span>
        </div>
      )}

      <h3 className="text-2xl font-bold text-white mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>
        {plan.name}
      </h3>
      <p className="text-sm text-slate-400 mb-6 min-h-[2.5rem]">{plan.tagline}</p>

      <PriceDisplay plan={plan} cycle={cycle} />
      <p className="text-xs text-slate-500 mt-2 mb-6">
        {plan.setupFee > 0
          ? `+ $${plan.setupFee} one-time setup`
          : "No setup fee"}
        {" · "}12-month term
      </p>

      <Link
        href="/contact"
        className={`flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl text-sm font-semibold cursor-pointer transition-all mb-8 ${
          plan.popular
            ? "btn-primary"
            : "text-white border border-white/12 hover:border-[#D25124]/40 hover:bg-white/5"
        }`}
      >
        <span className="relative z-10">Get Started</span>
        <ArrowUpRight className="w-4 h-4 relative z-10" />
      </Link>

      <div className="space-y-5 pt-6 border-t border-white/8 flex-1">
        {plan.groups.map((group, gi) => (
          <div key={gi}>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#F07A3A] mb-2.5">
              {group.label}
            </p>
            {group.items.length > 0 && (
              <ul className="space-y-2">
                {group.items.map((item, ii) => (
                  <li key={ii} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <Check className="w-4 h-4 text-[#F07A3A] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const PROOF_SLUGS = ["indoor-garden", "salazar-drywall-pros", "the-stat-clinic"];

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
          Available alongside any plan above. These are priced separately because the right
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
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-14"
        >
          <BillingToggle cycle={cycle} onChange={setCycle} />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-5 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <PlanCard plan={plan} cycle={cycle} />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-sm text-slate-500 mt-10 max-w-xl mx-auto"
        >
          The one-time setup fee covers building and configuring your site; the monthly fee
          covers hosting and ongoing care after that. All plans require a 12-month commitment,
          billed monthly or upfront annually for a discount. Need something outside your plan&apos;s
          change allowance? Extra work is billed at $100/hour.
        </motion.p>

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
