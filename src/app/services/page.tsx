"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Monitor,
  TrendingUp,
  Cpu,
  ChevronRight,
  Globe,
  Layers,
  BarChart3,
  Shield,
} from "lucide-react";

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const services = [
  {
    icon: Monitor,
    badge: "Service 01",
    title: "Web Design & Development",
    tagline: "Custom websites built to rank, convert, and scale.",
    desc: "High-performance, Next.js-powered websites that score green on Core Web Vitals, climb Google rankings, and convert traffic into paying customers. No templates. No offshore handoffs.",
    bullets: ["Custom UI/UX design", "Next.js & React development", "Core Web Vitals & speed optimization", "Ongoing maintenance retainers"],
    href: "/services/web-design-detroit",
    cta: "See Web Design Details",
  },
  {
    icon: TrendingUp,
    badge: "Service 02",
    title: "SEO & Digital Marketing",
    tagline: "Page-one rankings for searches that actually matter.",
    desc: "Technical SEO, local search, and content strategy — built around what your customers are searching for in Detroit and beyond. Tracked with real numbers, not vanity metrics.",
    bullets: ["Technical SEO audits", "Local SEO & Google Business Profile", "Content & topical authority", "Monthly reporting & analytics"],
    href: "/services/seo-agency-detroit",
    cta: "See SEO Details",
  },
  {
    icon: Cpu,
    badge: "Service 03",
    title: "AI & Workflow Automation",
    tagline: "Eliminate manual work. Scale without hiring.",
    desc: "Custom AI agents and workflow automation built from scratch — trained on your services, connected to your CRM, and tested until they actually work. Not a chatbot plugin.",
    bullets: ["Custom AI agents", "Workflow automation (n8n, Make, Zapier)", "CRM & system integrations", "AI strategy & consulting"],
    href: "/services/ai-automation",
    cta: "See AI & Automation Details",
  },
];

const additionalServices = [
  {
    icon: Layers,
    title: "Brand Identity & Logo Design",
    desc: "Visual identity systems, brand guidelines, and logo design for new businesses and rebrands.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Conversion Tracking",
    desc: "GA4, GTM, heatmaps, and conversion funnel setup to measure what's actually driving growth.",
  },
  {
    icon: Globe,
    title: "Hosting & Cloud Infrastructure",
    desc: "Managed cloud hosting, CDN configuration, and infrastructure optimized for speed and uptime.",
  },
  {
    icon: Shield,
    title: "Security Audits & Hardening",
    desc: "Vulnerability assessments, penetration testing, and hardening for web applications and APIs.",
  },
];

const faqs = [
  {
    q: "Do you offer web design and SEO services in Detroit, Michigan?",
    a: "Yes — Spectecle is based in Detroit, MI and serves businesses across Metro Detroit, Dearborn, Southfield, Ann Arbor, Grand Rapids, and throughout Michigan. We also work remotely with clients across the U.S. and internationally.",
  },
  {
    q: "How much does a website cost for a small business?",
    a: "Web design costs vary based on scope, complexity, and your goals. Simple brochure sites, custom web applications, and full e-commerce stores each have different requirements. We provide transparent, itemized quotes after a free 30-minute discovery call — no hidden fees, no surprises.",
  },
  {
    q: "How long does SEO take to show results?",
    a: "Most businesses see meaningful ranking improvements within 3–6 months of consistent SEO work. For competitive local markets like Detroit or statewide Michigan keywords, expect 4–8 months to reach page one. We provide monthly reporting so you always know exactly where you stand.",
  },
  {
    q: "What is AI automation and how can it help my business?",
    a: "AI automation replaces time-consuming, repetitive tasks with intelligent workflows. Common examples include: automated lead follow-up sequences, AI-powered customer support chatbots, automated reporting, CRM data entry, and document processing. For most businesses, automation saves 5–20 hours per week and meaningfully reduces operational costs.",
  },
  {
    q: "Do you work with clients outside of Detroit?",
    a: "Absolutely. While we're proud to serve Metro Detroit and Michigan, the majority of our work is done remotely with clients across the United States and internationally. Our process is built for seamless remote collaboration — distance is never a barrier.",
  },
  {
    q: "Can you take over an existing website or help with a redesign?",
    a: "Yes. We conduct a full audit of your existing site — performance, SEO health, UX, and conversion rate — then either optimize it in place or migrate it to a better platform. Many clients come to us with a site that just isn't performing and leave with one that does.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── HERO ────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(210,81,36,0.12) 0%, transparent 70%)" }}
        />
        <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#D25124]/20 text-sm text-[#F07A3A] font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#F07A3A]" />
            Detroit, MI — Serving Clients Worldwide
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Three Disciplines.
            <br />
            <span className="gradient-text">One Performance Obsession.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Search-first design, bold development, and intelligent automation — built around what your business actually needs to grow.
          </motion.p>
        </div>
      </section>

      {/* ── SERVICE CARDS ────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/6 bg-[#09090f]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <Link
                  href={s.href}
                  className="group glass rounded-2xl p-8 border border-white/6 hover:border-[#D25124]/30 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#D25124]/10 flex items-center justify-center">
                      <s.icon className="w-6 h-6 text-[#F07A3A]" />
                    </div>
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-widest">{s.badge}</span>
                  </div>

                  <h2
                    className="text-xl font-bold text-white mb-2 group-hover:text-[#F07A3A] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {s.title}
                  </h2>
                  <p className="text-[#F07A3A] text-xs font-semibold mb-4">{s.tagline}</p>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{s.desc}</p>

                  <ul className="space-y-2 mb-8">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="w-1 h-1 rounded-full bg-[#D25124] shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-2 text-sm font-semibold text-[#F07A3A] mt-auto">
                    {s.cta}
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ADD-ONS ─────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-xs font-semibold text-[#F07A3A] uppercase tracking-widest">
                Add-ons
              </span>
              <h2
                className="mt-3 text-3xl md:text-4xl font-bold text-white"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Additional Digital Services
              </h2>
              <p className="mt-3 text-slate-400 text-base max-w-xl mx-auto">
                Complement your core engagement with targeted solutions that fill gaps and accelerate results.
              </p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {additionalServices.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.08}>
                <div className="glass rounded-2xl p-6 border border-white/6 hover:border-[#D25124]/20 transition-colors duration-300 cursor-default h-full">
                  <div className="w-10 h-10 rounded-xl bg-[#D25124]/10 flex items-center justify-center mb-4">
                    <a.icon className="w-5 h-5 text-[#F07A3A]" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{a.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{a.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────── */}
      <section className="py-28 px-6 bg-[#09090f] border-t border-white/6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <span className="text-xs font-semibold text-[#F07A3A] uppercase tracking-widest">
                FAQ
              </span>
              <h2
                className="mt-3 text-3xl md:text-4xl font-bold text-white"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Common Questions
              </h2>
              <p className="mt-3 text-slate-400 text-base">
                Everything you need to know before getting started.
              </p>
            </div>
          </Reveal>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="glass rounded-2xl p-7 border border-white/6 hover:border-[#D25124]/15 transition-colors duration-300">
                  <h3 className="text-white font-semibold mb-3 flex items-start gap-3">
                    <span className="text-[#F07A3A] shrink-0 font-bold">Q.</span>
                    {faq.q}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed pl-6">{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/6">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-4xl md:text-5xl font-bold text-white"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Detroit-based.
              <br />
              <span className="gradient-text">Remote-ready. Results-driven.</span>
            </h2>
            <p className="mt-5 text-slate-400 text-lg max-w-xl mx-auto">
              Book a free 30-minute strategy call. No sales pitch — just honest advice on what will move the needle for your business, wherever you are.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="btn-primary flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold cursor-pointer"
              >
                <span>Book a Free Strategy Call</span>
                <ArrowUpRight className="w-5 h-5 relative z-10" />
              </Link>
              <Link
                href="/work"
                className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-slate-300 hover:text-white glass hover:border-white/15 border border-white/8 transition-all duration-300 cursor-pointer"
              >
                See Our Work <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
