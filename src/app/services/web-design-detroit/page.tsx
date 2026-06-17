"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, Layers, Code2, Globe, Rocket, Shield, RefreshCw, CheckCircle2 } from "lucide-react";

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const features = [
  { icon: Layers, label: "Custom UI/UX Design", desc: "Interfaces built around your brand and the actions you want visitors to take — not a template." },
  { icon: Code2, label: "Next.js & React Development", desc: "Lightning-fast, SEO-ready builds that score green on Core Web Vitals and hold up under traffic." },
  { icon: Globe, label: "E-commerce & CMS Solutions", desc: "Shopify, WooCommerce, and headless CMS builds designed to grow with your business." },
  { icon: Rocket, label: "Core Web Vitals & Speed", desc: "PageSpeed scores in the green. Faster sites rank higher and lose fewer visitors before the page loads." },
  { icon: Shield, label: "Accessibility & Security", desc: "WCAG-compliant, hardened against common vulnerabilities. Built right, not bolted on." },
  { icon: RefreshCw, label: "Ongoing Maintenance", desc: "Monthly retainers keeping your site fast, secure, and always current — without the overhead." },
];

const deliverables = [
  "Brand strategy & visual identity",
  "Wireframes & interactive prototypes",
  "Responsive, mobile-first design",
  "Full-stack development & CMS integration",
  "Google Analytics 4 & conversion tracking setup",
  "Launch support & post-launch optimization",
];

const faqs = [
  {
    q: "How much does a website cost for a small business in Detroit?",
    a: "Web design costs vary based on scope and goals. Simple brochure sites, custom web applications, and e-commerce stores each have different requirements. We provide transparent, itemized quotes after a free 30-minute discovery call — no hidden fees, no surprises.",
  },
  {
    q: "How long does it take to build a website?",
    a: "Most custom websites take 4–8 weeks from kickoff to launch. Simpler brochure sites can be done in 2–3 weeks. Timeline depends on feedback turnaround and the complexity of integrations required.",
  },
  {
    q: "Do you build websites with SEO built in?",
    a: "Yes — every site we build includes on-page SEO from day one: proper heading structure, schema markup, fast load times, and Core Web Vitals optimization. SEO is not an afterthought.",
  },
  {
    q: "What's included in your monthly website maintenance plans?",
    a: "Maintenance retainers include performance monitoring, security patches, content updates, uptime monitoring, and priority support with fast response times.",
  },
];

export default function WebDesignDetroitPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(210,81,36,0.1) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-400">Web Design & Development</span>
          </nav>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold text-[#F07A3A] uppercase tracking-widest"
          >
            Detroit, MI — Serving Clients Nationwide
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Web Design &amp;
            <br />
            <span className="gradient-text">Development</span>
            <br />
            Detroit, Michigan
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            Custom websites built to rank on Google, load before visitors leave, and convert traffic into paying customers. Every project is designed and developed in-house — no templates, no offshore teams.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold cursor-pointer">
              <span>Get a Free Quote</span>
              <ArrowUpRight className="w-4 h-4 relative z-10" />
            </Link>
            <Link href="/work" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white glass border border-white/8 hover:border-white/15 transition-all duration-300 cursor-pointer">
              View Our Work <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/6 bg-[#09090f]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-inter)" }}>
              What&apos;s included
            </h2>
            <p className="text-slate-400 text-base max-w-xl mb-12">
              Every web design engagement covers the full stack — from initial concept to post-launch performance.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.07}>
                <div className="glass rounded-xl p-6 border border-white/6 hover:border-[#D25124]/25 transition-colors duration-300 h-full">
                  <div className="w-10 h-10 rounded-lg bg-[#D25124]/10 flex items-center justify-center mb-4">
                    <f.icon className="w-5 h-5 text-[#F07A3A]" />
                  </div>
                  <h3 className="text-white font-semibold mb-2 text-sm">{f.label}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DELIVERABLES ─────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-inter)" }}>
              What you walk away with
            </h2>
            <p className="text-slate-400 text-base mb-8">
              A complete, production-ready website — not a handoff to another team to finish.
            </p>
            <ul className="space-y-3">
              {deliverables.map((d) => (
                <li key={d} className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#F07A3A] shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold cursor-pointer">
                <span>Start Your Project</span>
                <ArrowUpRight className="w-4 h-4 relative z-10" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass rounded-2xl border border-white/6 p-8">
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                We design and develop custom, high-performance websites for businesses in Detroit, Michigan and beyond. Using Next.js and React, we build sites that score green on Core Web Vitals, climb Google rankings, and convert visitors into paying customers.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Whether you&apos;re a local service business, law firm, or national e-commerce brand — every project starts with your business goals, not a template.
              </p>
              <div className="mt-8 pt-6 border-t border-white/6 grid grid-cols-2 gap-4">
                {[
                  { value: "4–8 weeks", label: "Avg. delivery time" },
                  { value: "Next.js", label: "Primary stack" },
                  { value: "Core Web Vitals", label: "Performance standard" },
                  { value: "24hr", label: "Response guarantee" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-lg font-bold gradient-text" style={{ fontFamily: "var(--font-inter)" }}>{s.value}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/6 bg-[#09090f]">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12" style={{ fontFamily: "var(--font-inter)" }}>
              Common questions
            </h2>
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

      {/* ── RELATED SERVICES ─────────────────────────── */}
      <section className="py-20 px-6 border-t border-white/6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-2xl font-bold text-white mb-8" style={{ fontFamily: "var(--font-inter)" }}>
              Pair it with
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5 max-w-2xl">
            {[
              { title: "SEO & Digital Marketing", desc: "A great website needs to be found. We handle search rankings too.", href: "/services/seo-agency-detroit" },
              { title: "AI & Automation", desc: "Automate lead follow-up, customer support, and internal workflows.", href: "/services/ai-automation" },
            ].map((s) => (
              <Reveal key={s.title}>
                <Link href={s.href} className="group glass rounded-xl p-6 border border-white/6 hover:border-[#D25124]/25 transition-all duration-300 block">
                  <h3 className="text-white font-semibold mb-2 group-hover:text-[#F07A3A] transition-colors">{s.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#F07A3A]">
                    Learn more <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/6 bg-[#09090f]">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-inter)" }}>
              Detroit-based.
              <br />
              <span className="gradient-text">Remote-ready. Results-driven.</span>
            </h2>
            <p className="mt-5 text-slate-400 text-lg max-w-xl mx-auto">
              Book a free 30-minute strategy call. No sales pitch — just honest advice on what your site needs to rank and convert.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold cursor-pointer">
                <span>Book a Free Strategy Call</span>
                <ArrowUpRight className="w-5 h-5 relative z-10" />
              </Link>
              <Link href="/work" className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-slate-300 hover:text-white glass hover:border-white/15 border border-white/8 transition-all duration-300 cursor-pointer">
                See Our Work <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
