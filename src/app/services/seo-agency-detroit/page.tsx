"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, Search, BarChart3, Globe, Layers, Rocket, RefreshCw, CheckCircle2 } from "lucide-react";

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
  { icon: Search, label: "Technical SEO Audits", desc: "Deep analysis of crawlability, Core Web Vitals, indexation, and site health — with a clear action plan." },
  { icon: BarChart3, label: "Keyword & Competitor Strategy", desc: "Intent-mapped keyword targeting with competitive gap analysis to find where you can realistically rank." },
  { icon: Globe, label: "Content & Topical Authority", desc: "Editorial planning that builds subject-matter authority in your niche and earns organic rankings over time." },
  { icon: Layers, label: "Link Building", desc: "White-hat authority building through editorial and partnership links that actually move rankings." },
  { icon: Rocket, label: "Local SEO — Detroit & Michigan", desc: "Google Business Profile optimization and geo-targeted content for map pack visibility." },
  { icon: RefreshCw, label: "Monthly Reporting", desc: "Clear dashboards tracking rankings, traffic, conversions, and ROI — not vanity metrics." },
];

const deliverables = [
  "Full technical SEO audit & strategic roadmap",
  "Keyword research & competitor gap report",
  "On-page optimization (titles, schema, content)",
  "Google Business Profile optimization",
  "Monthly content production & link acquisition",
  "GA4, Search Console & conversion tracking setup",
];

const faqs = [
  {
    q: "How long does SEO take to show results in Detroit?",
    a: "Most businesses see meaningful ranking improvements within 3–6 months of consistent SEO work. For competitive local Detroit markets, expect 4–8 months to reach page one. We provide monthly reporting so you always know where you stand.",
  },
  {
    q: "What is local SEO and why does my Detroit business need it?",
    a: "Local SEO optimizes your business to appear in Google searches with geographic intent — 'web designer near me' or 'attorney Detroit.' It includes Google Business Profile optimization, local citations, and geo-targeted content. For any business serving a local area, it's the highest-ROI marketing channel available.",
  },
  {
    q: "Do you offer Google Business Profile optimization in Detroit?",
    a: "Yes. Google Business Profile optimization is a core part of our local SEO service. We handle category selection, service descriptions, photo optimization, Q&A, and review strategy — the factors that determine whether you appear in the local map pack.",
  },
  {
    q: "How do you measure SEO success?",
    a: "We track keyword rankings, organic traffic, click-through rates, and most importantly — leads and revenue attributed to organic search. Every month you receive a clear report with the metrics that actually matter to your business.",
  },
];

export default function SEOAgencyDetroitPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(210,81,36,0.1) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-400">SEO Agency Detroit</span>
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
            SEO Agency
            <br />
            <span className="gradient-text">Detroit, Michigan</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            Search-first strategies that push Detroit businesses to page one and keep them there. Technical SEO, local search, and content — built around what your customers are actually searching for.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold cursor-pointer">
              <span>Get a Free SEO Audit</span>
              <ArrowUpRight className="w-4 h-4 relative z-10" />
            </Link>
            <Link href="/work" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white glass border border-white/8 hover:border-white/15 transition-all duration-300 cursor-pointer">
              View Results <ChevronRight className="w-4 h-4" />
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
              A complete SEO engagement — from technical foundation to content, links, and local visibility.
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
              A full SEO roadmap and the execution to back it up — not just a report that sits in a drawer.
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
                <span>Start Your SEO Campaign</span>
                <ArrowUpRight className="w-4 h-4 relative z-10" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass rounded-2xl border border-white/6 p-8">
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Spectecle is a results-driven SEO agency serving businesses in Detroit, Michigan and across the United States. We combine technical SEO, local search optimization, intent-mapped keyword strategy, and high-authority content to push your business to page one.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                If your competitors are outranking you for the searches that matter, we change that — with clear reporting every step of the way.
              </p>
              <div className="mt-8 pt-6 border-t border-white/6 grid grid-cols-2 gap-4">
                {[
                  { value: "3–6 mo", label: "Avg. time to results" },
                  { value: "Detroit", label: "Local specialty" },
                  { value: "Monthly", label: "Reporting cadence" },
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
              { title: "Web Design & Development", desc: "A site that ranks needs to convert. We design and build high-performance websites too.", href: "/services/web-design-detroit" },
              { title: "AI & Automation", desc: "Turn the leads your SEO generates into automated follow-up sequences and booked calls.", href: "/services/ai-automation" },
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

      {/* ── FROM THE BLOG ────────────────────────────── */}
      <section className="py-20 px-6 border-t border-white/6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-inter)" }}>
              From the Blog
            </h2>
            <p className="text-slate-500 text-sm mb-8">Real-world SEO strategies from our client work.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5 max-w-3xl">
            {[
              {
                title: "How Michigan Photography Studios Can Get More Clients From Google",
                excerpt: "Most photographers compete hard on Instagram and ignore search entirely — which is exactly why local SEO is the highest-ROI channel most Michigan studios aren't using.",
                href: "/blog/photography-website-design-michigan",
                category: "Local SEO",
                readTime: "6 min read",
              },
              {
                title: "Local SEO for Michigan Contractors: How to Rank #1 for Your Trade",
                excerpt: "The best contractor in Michigan isn't always the one who wins the job. The one who shows up first on Google wins the job.",
                href: "/blog/contractor-website-design-michigan",
                category: "Local SEO",
                readTime: "7 min read",
              },
            ].map((post) => (
              <Reveal key={post.href}>
                <Link href={post.href} className="group glass rounded-xl p-6 border border-white/6 hover:border-[#D25124]/25 transition-all duration-300 block h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-[#F07A3A]">{post.category}</span>
                    <span className="text-slate-700">·</span>
                    <span className="text-xs text-slate-600">{post.readTime}</span>
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-2 group-hover:text-[#F07A3A] transition-colors leading-snug" style={{ fontFamily: "var(--font-inter)" }}>{post.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{post.excerpt}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#F07A3A]">
                    Read article <ArrowUpRight className="w-3 h-3" />
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
              Detroit expertise.
              <br />
              <span className="gradient-text">Nationwide reach.</span>
            </h2>
            <p className="mt-5 text-slate-400 text-lg max-w-xl mx-auto">
              Book a free 30-minute strategy call. We&apos;ll audit your current search presence and tell you exactly what it would take to rank.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold cursor-pointer">
                <span>Book a Free Strategy Call</span>
                <ArrowUpRight className="w-5 h-5 relative z-10" />
              </Link>
              <Link href="/work" className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-slate-300 hover:text-white glass hover:border-white/15 border border-white/8 transition-all duration-300 cursor-pointer">
                See Our Results <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
