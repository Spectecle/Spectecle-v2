"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Clock, ChevronRight } from "lucide-react";
import type { BlogPost, ContentBlock } from "../posts-data";

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
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function renderBlock(block: ContentBlock, i: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          key={i}
          className="text-2xl md:text-3xl font-bold text-white mt-14 mb-5 leading-snug"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={i}
          className="text-lg md:text-xl font-semibold text-white mt-8 mb-3"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p key={i} className="text-slate-400 leading-relaxed mb-6">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul key={i} className="mb-6 space-y-2.5">
          {block.items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-slate-400">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#F07A3A] shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <div
          key={i}
          className="my-10 p-6 rounded-2xl bg-[#D25124]/8 border border-[#D25124]/20"
        >
          <p className="text-[#F07A3A] font-semibold text-sm mb-3">{block.text}</p>
          <Link
            href={`/work/${block.caseStudySlug}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D25124] text-white rounded-xl text-sm font-semibold hover:bg-[#b84520] transition-colors"
          >
            View Case Study
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      );
  }
}

const SERVICE_LINKS: Record<string, { title: string; href: string; desc: string }[]> = {
  "photography-website-design-michigan": [
    {
      title: "SEO & Digital Marketing",
      href: "/services/seo-agency-detroit",
      desc: "Local SEO, Google Business Profile optimization, and content strategy to get your photography studio ranking for the searches that book clients.",
    },
    {
      title: "Web Design & Development",
      href: "/services/web-design-detroit",
      desc: "Custom portfolio sites built for speed, local SEO, and frictionless online bookings.",
    },
  ],
  "contractor-website-design-michigan": [
    {
      title: "SEO & Digital Marketing",
      href: "/services/seo-agency-detroit",
      desc: "Map Pack rankings, service area pages, and citation building that consistently puts Michigan contractors at the top of local search.",
    },
    {
      title: "Web Design & Development",
      href: "/services/web-design-detroit",
      desc: "High-converting contractor websites with trust signals, portfolios, and lead generation forms built to win jobs from Google.",
    },
  ],
  "law-firm-website-design-michigan": [
    {
      title: "Web Design & Development",
      href: "/services/web-design-detroit",
      desc: "Custom attorney websites built on authority, trust, and conversion — with practice-area pages, schema markup, and a clear consultation path.",
    },
    {
      title: "SEO & Digital Marketing",
      href: "/services/seo-agency-detroit",
      desc: "Legal SEO targeting the high-intent Michigan search terms that turn into consultation calls — not just traffic.",
    },
  ],
  "makeup-artist-seo-michigan": [
    {
      title: "SEO & Digital Marketing",
      href: "/services/seo-agency-detroit",
      desc: "Local SEO and Google Business Profile optimization for Michigan beauty studios — ranking for the searches that fill booking calendars.",
    },
    {
      title: "Web Design & Development",
      href: "/services/web-design-detroit",
      desc: "Custom beauty studio websites with gallery-first design, online booking integration, and search-optimized service pages.",
    },
  ],
  "ai-business-automation-michigan": [
    {
      title: "AI & Workflow Automation",
      href: "/services/ai-automation",
      desc: "Custom AI agents and workflow automation built from scratch — trained on your services, integrated with your CRM, and tested until they work.",
    },
    {
      title: "Web Design & Development",
      href: "/services/web-design-detroit",
      desc: "A high-converting website that feeds your AI-powered intake and follow-up systems with qualified leads.",
    },
  ],
  "ecommerce-website-design-michigan": [
    {
      title: "Web Design & Development",
      href: "/services/web-design-detroit",
      desc: "Custom e-commerce websites for Michigan product businesses — optimized for search, built for conversion, and fully owned by you.",
    },
    {
      title: "SEO & Digital Marketing",
      href: "/services/seo-agency-detroit",
      desc: "E-commerce SEO that captures purchase-intent searches and compounds organic traffic month over month.",
    },
  ],
};

export default function BlogPostClient({
  post,
  nextPost,
}: {
  post: BlogPost;
  nextPost: BlogPost;
}) {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative pt-36 pb-16 px-6 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(210,81,36,0.12) 0%, transparent 70%)" }}
        />
        <div className="absolute inset-0 dot-pattern opacity-25 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto">
          {/* Back nav */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </motion.div>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <span className={`text-xs font-semibold ${post.categoryColor} uppercase tracking-widest`}>
              {post.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-700" />
            <span className="text-xs text-slate-500">{post.publishedAt}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl md:text-4xl xl:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {post.title}
          </motion.h1>

          {/* Excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-slate-400 text-lg leading-relaxed"
          >
            {post.excerpt}
          </motion.p>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="origin-left mt-10 h-px bg-gradient-to-r from-[#D25124]/40 via-white/6 to-transparent"
          />
        </div>
      </section>

      {/* ── ARTICLE BODY ─────────────────────────────── */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="prose-sm">
              {post.content.map((block, i) => renderBlock(block, i))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── RELATED SERVICES ─────────────────────────── */}
      {SERVICE_LINKS[post.slug] && (
        <section className="py-16 px-6 border-t border-white/6">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <p className="text-xs text-slate-600 uppercase tracking-widest mb-6">
                Related Services
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {SERVICE_LINKS[post.slug].map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="group glass rounded-xl p-5 border border-white/6 hover:border-[#D25124]/25 transition-all duration-300 block"
                  >
                    <h3
                      className="text-white font-semibold mb-1.5 text-sm group-hover:text-[#F07A3A] transition-colors"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {s.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed mb-3">{s.desc}</p>
                    <div className="flex items-center gap-1 text-xs font-semibold text-[#F07A3A]">
                      Learn more <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── RELATED CASE STUDY ───────────────────────── */}
      {post.caseStudySlug && (
        <section className="py-16 px-6 border-t border-white/6 bg-[#09090f]">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <p className="text-xs text-slate-600 uppercase tracking-widest mb-4">
                Related Case Study
              </p>
              <Link
                href={`/work/${post.caseStudySlug}`}
                className="group flex items-center justify-between glass rounded-2xl p-7 border border-white/6 hover:border-[#D25124]/20 transition-colors duration-300"
              >
                <div>
                  <p className="text-slate-500 text-sm">Real project. Real results.</p>
                  <h3
                    className="text-xl font-bold text-white mt-1 group-hover:text-[#F07A3A] transition-colors"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {post.caseStudyTitle}
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">View the full case study →</p>
                </div>
                <ChevronRight className="w-6 h-6 text-slate-600 group-hover:text-[#F07A3A] transition-colors shrink-0" />
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── NEXT ARTICLE ─────────────────────────────── */}
      <section className="py-16 px-6 border-t border-white/6">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <p className="text-xs text-slate-600 uppercase tracking-widest mb-4">Next Article</p>
            <Link
              href={`/blog/${nextPost.slug}`}
              className="group flex items-center justify-between glass rounded-2xl p-7 border border-white/6 hover:border-[#D25124]/20 transition-colors duration-300"
            >
              <div>
                <p className={`text-xs font-semibold ${nextPost.categoryColor} uppercase tracking-widest mb-1`}>
                  {nextPost.category}
                </p>
                <h3
                  className="text-xl font-bold text-white group-hover:text-[#F07A3A] transition-colors"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {nextPost.title}
                </h3>
                <p className="text-slate-500 text-xs mt-1">{nextPost.readTime}</p>
              </div>
              <ChevronRight className="w-6 h-6 text-slate-600 group-hover:text-[#F07A3A] transition-colors shrink-0" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/6 bg-[#09090f]">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2
              className="text-4xl md:text-5xl font-bold text-white"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Want these results
              <br />
              <span className="gradient-text">for your business?</span>
            </h2>
            <p className="mt-5 text-slate-400 text-lg max-w-xl mx-auto">
              Book a free 30-minute strategy call. We&apos;ll walk through exactly what it
              would take to grow your specific business.
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
                View All Case Studies
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
