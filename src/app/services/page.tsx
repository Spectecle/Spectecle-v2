"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Monitor,
  TrendingUp,
  Cpu,
  CheckCircle2,
  ChevronRight,
  Globe,
  Search,
  Bot,
  Code2,
  BarChart3,
  Shield,
  Rocket,
  Layers,
  RefreshCw,
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
    id: "web-design",
    icon: Monitor,
    gradient: "from-[#F07A3A] to-[#D25124]",
    glowColor: "rgba(210,81,36,0.15)",
    accentLight: "text-[#F07A3A]",
    accentBg: "bg-[#D25124]/10",
    accentBorder: "border-[#D25124]/20",
    badge: "Service 01",
    title: "Web Design &\nDevelopment",
    tagline: "Custom websites built to rank, convert, and scale",
    desc: "We design and develop custom, high-performance websites for businesses in Detroit, Michigan and beyond. Using Next.js and React, we build lightning-fast sites that score green on Core Web Vitals, climb Google rankings, and convert visitors into paying customers. Whether you're a local service business, law firm, or national e-commerce brand — we build websites that work as hard as you do.",
    features: [
      { icon: Layers, label: "Custom UI/UX Design", desc: "Bespoke interfaces built around your brand identity and target audience" },
      { icon: Code2, label: "Next.js & React Development", desc: "Lightning-fast, SEO-ready builds on enterprise-grade infrastructure" },
      { icon: Globe, label: "E-commerce & CMS Solutions", desc: "Shopify, WooCommerce, and headless solutions built to grow with you" },
      { icon: Rocket, label: "Core Web Vitals & Speed", desc: "PageSpeed scores in the green — faster sites rank higher and convert more" },
      { icon: Shield, label: "Accessibility & Security", desc: "WCAG 2.1 AA compliance and enterprise-level security hardening" },
      { icon: RefreshCw, label: "Ongoing Maintenance", desc: "Monthly retainers keeping your site fast, secure, and always current" },
    ],
    deliverables: [
      "Brand strategy & visual identity",
      "Wireframes & interactive prototypes",
      "Responsive, mobile-first design",
      "Full-stack development & CMS integration",
      "Google Analytics 4 & conversion tracking setup",
      "Launch support & post-launch optimization",
    ],
  },
  {
    id: "seo",
    icon: TrendingUp,
    gradient: "from-[#D25124] to-[#A83418]",
    glowColor: "rgba(210,81,36,0.15)",
    accentLight: "text-[#F07A3A]",
    accentBg: "bg-[#D25124]/10",
    accentBorder: "border-[#D25124]/20",
    badge: "Service 02",
    title: "SEO &\nDigital Marketing",
    tagline: "Dominate Google. Drive qualified traffic. Grow revenue.",
    desc: "Spectecle is a results-driven SEO agency serving businesses in Detroit, Michigan and across the United States. We combine technical SEO, local search optimization, intent-mapped keyword strategy, and high-authority content to push your business to page one — and keep it there. If your competitors are outranking you, we change that.",
    features: [
      { icon: Search, label: "Technical SEO Audits", desc: "Deep analysis of crawlability, Core Web Vitals, indexation, and site health" },
      { icon: BarChart3, label: "Keyword & Competitor Strategy", desc: "Intent-mapped keyword targeting with competitive gap analysis" },
      { icon: Globe, label: "Content & Topical Authority", desc: "Editorial planning that builds subject-matter authority and organic rankings" },
      { icon: Layers, label: "Link Building", desc: "White-hat authority building through editorial and partnership links" },
      { icon: Rocket, label: "Local SEO — Detroit & Michigan", desc: "Google Business Profile optimization and geo-targeted search strategies" },
      { icon: RefreshCw, label: "Monthly Reporting & Analytics", desc: "Clear dashboards tracking rankings, traffic, conversions, and ROI" },
    ],
    deliverables: [
      "Full technical SEO audit & strategic roadmap",
      "Keyword research & competitor gap report",
      "On-page optimization (titles, schema, content)",
      "Google Business Profile optimization",
      "Monthly content production & link acquisition",
      "GA4, Search Console & conversion tracking setup",
    ],
  },
  {
    id: "ai",
    icon: Cpu,
    gradient: "from-[#E86830] to-[#B83020]",
    glowColor: "rgba(210,81,36,0.15)",
    accentLight: "text-[#F07A3A]",
    accentBg: "bg-[#D25124]/10",
    accentBorder: "border-[#D25124]/20",
    badge: "Service 03",
    title: "AI &\nAutomation",
    tagline: "Eliminate manual work. Move faster. Scale without hiring.",
    desc: "We build custom AI agents and workflow automation systems for small and mid-size businesses ready to gain a real competitive edge. Using OpenAI, n8n, and custom API integrations, we help businesses in Detroit, Michigan and nationwide eliminate repetitive tasks, automate customer interactions, and unlock new operational capacity — without adding headcount.",
    features: [
      { icon: Bot, label: "Custom AI Agents", desc: "LLM-powered agents that handle complex, multi-step business tasks autonomously" },
      { icon: RefreshCw, label: "Workflow Automation", desc: "End-to-end process automation using n8n, Zapier, Make, and custom APIs" },
      { icon: Layers, label: "CRM & System Integrations", desc: "Seamless data flow between your tools — no silos, no manual entry" },
      { icon: Code2, label: "AI Chatbot Development", desc: "Intelligent, context-aware bots for customer support, sales, and operations" },
      { icon: BarChart3, label: "Data & Analytics Pipelines", desc: "Automated reporting and real-time insight generation from your business data" },
      { icon: Shield, label: "AI Strategy & Consulting", desc: "Practical roadmap for responsible, high-ROI AI adoption in your business" },
    ],
    deliverables: [
      "AI opportunity assessment & ROI analysis",
      "Automation architecture design",
      "Custom AI agent development & testing",
      "System integration & deployment",
      "Team training & full documentation",
      "Ongoing monitoring & performance optimization",
    ],
  },
];

const additionalServices = [
  {
    icon: Layers,
    title: "Brand Identity & Logo Design",
    desc: "Visual identity systems, brand guidelines, and logo design for new businesses and rebrands",
  },
  {
    icon: BarChart3,
    title: "Analytics & Conversion Tracking",
    desc: "GA4, GTM, heatmaps, and conversion funnel setup to measure what's actually driving growth",
  },
  {
    icon: Globe,
    title: "Hosting & Cloud Infrastructure",
    desc: "Managed cloud hosting, CDN configuration, and infrastructure optimized for speed and uptime",
  },
  {
    icon: Shield,
    title: "Security Audits & Hardening",
    desc: "Vulnerability assessments, penetration testing, and hardening for web applications and APIs",
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
    q: "Do you work with startups or only established companies?",
    a: "Both. We have packages designed for early-stage startups building their first digital presence, and enterprise-grade solutions for scaling businesses that need a serious competitive edge. We tailor our approach to where you are and where you're going.",
  },
  {
    q: "Can you take over an existing website or help with a redesign?",
    a: "Yes. We conduct a full audit of your existing site — performance, SEO health, UX, and conversion rate — then either optimize it in place or migrate it to a better platform. Many clients come to us with a site that just isn't performing and leave with one that does.",
  },
  {
    q: "What's included in your monthly maintenance plans?",
    a: "Maintenance retainers include performance monitoring, security patches, content updates, uptime monitoring, and priority support with fast response times. Think of us as your dedicated on-call digital team — without the overhead of a full-time hire.",
  },
];

export default function ServicesPage() {
  return (
    <>
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
            Web Design, SEO &amp; AI
            <br />
            <span className="gradient-text">Services That Drive Growth</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Three focused disciplines. One expert team. We help businesses in Detroit, Michigan
            and beyond dominate search, convert more visitors, and automate the work that slows them down.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500"
          >
            {[
              "Web Design & Development",
              "SEO & Digital Marketing",
              "AI & Workflow Automation",
            ].map((label) => (
              <span key={label} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D25124]" />
                {label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SERVICE DETAILS ──────────────────────────── */}
      {services.map((s, idx) => (
        <section
          key={s.id}
          id={s.id}
          aria-label={s.title.replace("\n", " ")}
          className={`py-28 px-6 ${idx % 2 === 1 ? "bg-[#09090f]" : ""} border-t border-white/6`}
        >
          <div className="max-w-7xl mx-auto">
            <div className={`grid lg:grid-cols-2 gap-16 items-center ${idx % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
              {/* Text */}
              <div className={idx % 2 === 1 ? "lg:col-start-2" : ""}>
                <Reveal>
                  <span className={`text-xs font-semibold uppercase tracking-widest ${s.accentLight}`}>
                    {s.badge}
                  </span>
                  <h2
                    className="mt-3 text-4xl md:text-5xl font-bold text-white leading-tight"
                    style={{ fontFamily: "var(--font-inter)", whiteSpace: "pre-line" }}
                  >
                    {s.title}
                  </h2>
                  <p className={`mt-2 text-sm font-semibold ${s.accentLight}`}>{s.tagline}</p>
                  <p className="mt-5 text-slate-400 text-base leading-relaxed">{s.desc}</p>

                  <div className="mt-8 space-y-3">
                    {s.deliverables.map((d) => (
                      <div key={d} className="flex items-center gap-3 text-sm text-slate-300">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 ${s.accentLight}`} />
                        {d}
                      </div>
                    ))}
                  </div>

                  <div className="mt-10">
                    <Link
                      href="/contact"
                      className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold cursor-pointer"
                    >
                      <span>Get Started</span>
                      <ArrowUpRight className="w-4 h-4 relative z-10" />
                    </Link>
                  </div>
                </Reveal>
              </div>

              {/* Features Grid */}
              <div className={idx % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                <Reveal delay={0.1}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {s.features.map((f, fi) => (
                      <motion.div
                        key={f.label}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: fi * 0.07 + 0.2, duration: 0.5, ease: "easeOut" }}
                        className={`glass rounded-xl p-5 border border-white/6 hover:border-opacity-30 transition-all duration-300 group cursor-default hover:${s.accentBorder}`}
                      >
                        <div className={`w-9 h-9 rounded-lg ${s.accentBg} flex items-center justify-center mb-3`}>
                          <f.icon className={`w-4 h-4 ${s.accentLight}`} />
                        </div>
                        <p className="text-white font-semibold text-sm mb-1">{f.label}</p>
                        <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── ADD-ONS ─────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#09090f] border-y border-white/6">
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
                <div className="glass rounded-2xl p-6 border border-white/6 hover:border-[#D25124]/20 transition-colors duration-300 group cursor-default h-full">
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
      <section className="py-28 px-6">
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
