"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, CheckCircle2 } from "lucide-react";

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
  { label: "Technical SEO Audits", desc: "Deep analysis of crawlability, Core Web Vitals, indexation, and site health, with a clear action plan." },
  { label: "Keyword & Competitor Strategy", desc: "Intent-mapped keyword targeting with competitive gap analysis to find where you can realistically rank." },
  { label: "Content & Topical Authority", desc: "Editorial planning that builds subject-matter authority in your niche and earns organic rankings over time." },
  { label: "Link Building", desc: "White-hat authority building through editorial and partnership links that actually move rankings." },
  { label: "Local SEO: Detroit & Michigan", desc: "Google Business Profile optimization and geo-targeted content for map pack visibility." },
  { label: "Monthly Reporting", desc: "Clear dashboards tracking rankings, traffic, conversions, and ROI, not vanity metrics." },
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
    a: "Local SEO optimizes your business to appear in Google searches with geographic intent, like 'web designer near me' or 'attorney Detroit.' It includes Google Business Profile optimization, local citations, and geo-targeted content. For any business serving a local area, it's the highest-ROI marketing channel available.",
  },
  {
    q: "Do you offer Google Business Profile optimization in Detroit?",
    a: "Yes. Google Business Profile optimization is a core part of our local SEO service. We handle category selection, service descriptions, photo optimization, Q&A, and review strategy: the factors that determine whether you appear in the local map pack.",
  },
  {
    q: "How do you measure SEO success?",
    a: "We track keyword rankings, organic traffic, click-through rates, and most importantly, leads and revenue attributed to organic search. Every month you receive a clear report with the metrics that actually matter to your business.",
  },
];

export default function SEOAgencyDetroitPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
          <div>
            <nav className="flex items-center gap-2 text-xs text-[var(--site-text-muted)] mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[var(--site-text-primary)] transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/services" className="hover:text-[var(--site-text-primary)] transition-colors">Services</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[var(--site-text-secondary)]">SEO Agency Detroit</span>
            </nav>

            <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-[0.25em]">
              Detroit, MI · Serving Clients Nationwide
            </span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 text-6xl md:text-7xl font-light text-[var(--site-text-primary)] leading-[1.05]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              SEO Agency <span className="italic text-[#f87444]">Detroit, Michigan.</span>
            </motion.h1>

            <p className="mt-6 text-[var(--site-text-secondary)] text-lg md:text-xl max-w-2xl leading-relaxed">
              Search-first strategies that push Detroit businesses to page one and keep them there. Technical SEO, local search, and content, built around what your customers are actually searching for.
            </p>

            <div className="mt-8 flex flex-wrap gap-8">
              <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-0.5">
                Get a Free SEO Audit
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link href="/work" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)] transition-colors">
                View Results <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <Reveal delay={0.15}>
            <div className="relative aspect-[4/3] overflow-hidden border border-[var(--site-border)]">
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop"
                alt="SEO & Digital Marketing"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-14">
            <h2 className="text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>What&apos;s included.</h2>
            <p className="text-[var(--site-text-secondary)] text-base max-w-xl mt-3">
              A complete SEO engagement, from technical foundation to content, links, and local visibility.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {features.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.07}>
                <h3 className="text-[var(--site-text-primary)] font-semibold mb-2 text-sm">{f.label}</h3>
                <p className="text-[var(--site-text-muted)] text-sm leading-relaxed">{f.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DELIVERABLES ─────────────────────────────── */}
      <section className="py-24 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <Reveal>
            <h2 className="text-4xl font-light text-[var(--site-text-primary)] mb-3" style={{ fontFamily: "var(--font-serif)" }}>
              What you walk away with.
            </h2>
            <p className="text-[var(--site-text-secondary)] text-base mb-8">
              A full SEO roadmap and the execution to back it up, not just a report that sits in a drawer.
            </p>
            <ul className="space-y-3">
              {deliverables.map((d) => (
                <li key={d} className="flex items-center gap-3 text-sm text-[var(--site-text-secondary)]">
                  <CheckCircle2 className="w-4 h-4 text-[#f87444] shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-0.5">
                Start Your SEO Campaign
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[var(--site-text-secondary)] text-sm leading-relaxed mb-6">
              Spectecle is a results-driven SEO agency serving businesses in Detroit, Michigan and across the United States. We combine technical SEO, local search optimization, intent-mapped keyword strategy, and high-authority content to push your business to page one.
            </p>
            <p className="text-[var(--site-text-secondary)] text-sm leading-relaxed">
              If your competitors are outranking you for the searches that matter, we change that, with clear reporting every step of the way.
            </p>
            <div className="mt-8 pt-6 border-t border-[var(--site-border)] grid grid-cols-2 gap-6">
              {[
                { value: "3–6 mo", label: "Avg. time to results" },
                { value: "Detroit", label: "Local specialty" },
                { value: "Monthly", label: "Reporting cadence" },
                { value: "24hr", label: "Response guarantee" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-lg font-light text-[#f87444]" style={{ fontFamily: "var(--font-serif)" }}>{s.value}</div>
                  <div className="text-xs text-[var(--site-text-muted)] mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-3xl mx-auto">
          <Reveal className="mb-14">
            <h2 className="text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>Common questions.</h2>
          </Reveal>
          <div className="divide-y divide-[var(--site-border)]">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="py-7">
                  <h3 className="text-[var(--site-text-primary)] font-semibold mb-3">{faq.q}</h3>
                  <p className="text-[var(--site-text-secondary)] text-sm leading-relaxed">{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED SERVICES ─────────────────────────── */}
      <section className="py-20 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-8">
            <h2 className="text-2xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>Pair it with</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8 max-w-2xl">
            {[
              { title: "Web Design & Development", desc: "A site that ranks needs to convert. We design and build high-performance websites too.", href: "/services/web-design-detroit" },
              { title: "AI & Automation", desc: "Turn the leads your SEO generates into automated follow-up sequences and booked calls.", href: "/services/ai-automation" },
            ].map((s) => (
              <Reveal key={s.title}>
                <Link href={s.href} className="group block">
                  <h3 className="text-[var(--site-text-primary)] font-semibold mb-2 group-hover:text-[#f87444] transition-colors">{s.title}</h3>
                  <p className="text-[var(--site-text-muted)] text-sm leading-relaxed">{s.desc}</p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#f87444]">
                    Learn more <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FROM THE BLOG ────────────────────────────── */}
      <section className="py-20 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-8">
            <h2 className="text-2xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>From the Journal</h2>
            <p className="text-[var(--site-text-muted)] text-sm mt-2">Real-world SEO strategies from our client work.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8 max-w-3xl">
            {[
              {
                title: "How Michigan Photography Studios Can Get More Clients From Google",
                excerpt: "Most photographers compete hard on Instagram and ignore search entirely, which is exactly why local SEO is the highest-ROI channel most Michigan studios aren't using.",
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
                <Link href={post.href} className="group block h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-[#f87444]">{post.category}</span>
                    <span className="text-[var(--site-text-muted)]">·</span>
                    <span className="text-xs text-[var(--site-text-muted)]">{post.readTime}</span>
                  </div>
                  <h3 className="text-[var(--site-text-primary)] font-semibold text-sm mb-2 group-hover:text-[#f87444] transition-colors leading-snug">{post.title}</h3>
                  <p className="text-[var(--site-text-muted)] text-xs leading-relaxed">{post.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="py-32 px-6 border-t border-[var(--site-border)]">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              Detroit expertise. <span className="italic text-[#f87444]">Nationwide reach.</span>
            </h2>
            <p className="mt-6 text-[var(--site-text-secondary)] text-lg max-w-xl mx-auto">
              Book a free 30-minute strategy call. We&apos;ll audit your current search presence and tell you exactly what it would take to rank.
            </p>
            <div className="mt-10">
              <Link href="/contact" className="inline-flex items-center gap-2 text-lg font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-1">
                Book a Free Strategy Call
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
