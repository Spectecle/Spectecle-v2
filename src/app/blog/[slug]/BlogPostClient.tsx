"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Clock, ChevronRight } from "lucide-react";
import type { BlogPost, ContentBlock } from "../posts-data";
import { pickProjects } from "@/app/work/projects-data";
import { BrowserMockup } from "@/components/ui/BrowserMockup";

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
        <h2 key={i} className="text-2xl md:text-3xl font-light text-[var(--site-text-primary)] mt-14 mb-5 leading-snug" style={{ fontFamily: "var(--font-serif)" }}>
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={i} className="text-lg md:text-xl font-semibold text-[var(--site-text-primary)] mt-8 mb-3">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p key={i} className="text-[var(--site-text-secondary)] leading-relaxed mb-6">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul key={i} className="mb-6 space-y-2.5">
          {block.items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-[var(--site-text-secondary)]">
              <span className="mt-1.5 w-1.5 h-1.5 bg-[#9a5423] shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <div key={i} className="my-10 py-6 border-t border-b border-[var(--site-border)]">
          <p className="text-[#9a5423] font-semibold text-sm mb-3">{block.text}</p>
          <Link
            href={`/work/${block.caseStudySlug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-0.5"
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
    { title: "SEO & Digital Marketing", href: "/services/seo-agency-detroit", desc: "Local SEO, Google Business Profile optimization, and content strategy to get your photography studio ranking for the searches that book clients." },
    { title: "Web Design & Development", href: "/services/web-design-detroit", desc: "Custom portfolio sites built for speed, local SEO, and frictionless online bookings." },
  ],
  "contractor-website-design-michigan": [
    { title: "SEO & Digital Marketing", href: "/services/seo-agency-detroit", desc: "Map Pack rankings, service area pages, and citation building that consistently puts Michigan contractors at the top of local search." },
    { title: "Web Design & Development", href: "/services/web-design-detroit", desc: "High-converting contractor websites with trust signals, portfolios, and lead generation forms built to win jobs from Google." },
  ],
  "law-firm-website-design-michigan": [
    { title: "Law Firm Website Design", href: "/services/law-firm-website-design", desc: "Custom attorney websites built on authority, trust, and conversion, with practice-area pages, schema markup, and a clear consultation path." },
    { title: "SEO & Digital Marketing", href: "/services/seo-agency-detroit", desc: "Legal SEO targeting the high-intent Michigan search terms that turn into consultation calls, not just traffic." },
  ],
  "makeup-artist-seo-michigan": [
    { title: "SEO & Digital Marketing", href: "/services/seo-agency-detroit", desc: "Local SEO and Google Business Profile optimization for Michigan beauty studios, ranking for the searches that fill booking calendars." },
    { title: "Web Design & Development", href: "/services/web-design-detroit", desc: "Custom beauty studio websites with gallery-first design, online booking integration, and search-optimized service pages." },
  ],
  "ai-business-automation-michigan": [
    { title: "AI & Workflow Automation", href: "/services/ai-automation", desc: "Custom AI agents and workflow automation built from scratch: trained on your services, integrated with your CRM, and tested until they work." },
    { title: "Web Design & Development", href: "/services/web-design-detroit", desc: "A high-converting website that feeds your AI-powered intake and follow-up systems with qualified leads." },
  ],
  "ecommerce-website-design-michigan": [
    { title: "Web Design & Development", href: "/services/web-design-detroit", desc: "Custom e-commerce websites for Michigan product businesses, optimized for search, built for conversion, and fully owned by you." },
    { title: "SEO & Digital Marketing", href: "/services/seo-agency-detroit", desc: "E-commerce SEO that captures purchase-intent searches and compounds organic traffic month over month." },
  ],
};

export default function BlogPostClient({
  post,
  nextPost,
}: {
  post: BlogPost;
  nextPost: BlogPost;
}) {
  const linkedProject = post.caseStudySlug ? pickProjects([post.caseStudySlug])[0] : undefined;

  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="pt-[228px] pb-10 px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[var(--site-text-muted)] hover:text-[var(--site-text-primary)] transition-colors text-sm mb-10">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`text-xs font-semibold ${post.categoryColor} uppercase tracking-widest`}>{post.category}</span>
            <span className="w-1 h-1 bg-[var(--site-text-muted)]" />
            <span className="text-xs text-[var(--site-text-muted)] flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
            <span className="w-1 h-1 bg-[var(--site-text-muted)]" />
            <span className="text-xs text-[var(--site-text-muted)]">{post.publishedAt}</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl xl:text-6xl font-light text-[var(--site-text-primary)] leading-[1.1]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {post.title}
          </motion.h1>

          <p className="mt-6 text-[var(--site-text-secondary)] text-lg leading-relaxed">{post.excerpt}</p>
        </div>
      </section>

      {/* ── COVER IMAGE ───────────────────────────────── */}
      <section className="px-6 pb-10">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            {linkedProject ? (
              <BrowserMockup
                url={linkedProject.domain}
                screenshotUrl={linkedProject.screenshotUrl}
                alt={`${linkedProject.title} website screenshot`}
              />
            ) : (
              <div className="relative w-full h-64 md:h-[420px] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  priority
                />
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ── ARTICLE BODY ─────────────────────────────── */}
      <section className="px-6 pb-14">
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
        <section className="py-10 px-6 border-t border-[var(--site-border)]">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <p className="text-xs text-[var(--site-text-muted)] uppercase tracking-widest mb-6">Related Services</p>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                {SERVICE_LINKS[post.slug].map((s) => (
                  <Link key={s.href} href={s.href} className="group block">
                    <h3 className="text-[var(--site-text-primary)] font-semibold mb-1.5 text-sm group-hover:text-[#9a5423] transition-colors">{s.title}</h3>
                    <p className="text-[var(--site-text-muted)] text-xs leading-relaxed">{s.desc}</p>
                  </Link>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── RELATED CASE STUDY ───────────────────────── */}
      {post.caseStudySlug && (
        <section className="py-10 px-6 border-t border-[var(--site-border)]">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <p className="text-xs text-[var(--site-text-muted)] uppercase tracking-widest mb-4">Related Case Study</p>
              <Link href={`/work/${post.caseStudySlug}`} className="group flex items-center justify-between">
                <div>
                  <p className="text-[var(--site-text-muted)] text-sm">Real project. Real results.</p>
                  <h3 className="text-2xl font-light text-[var(--site-text-primary)] mt-1 group-hover:text-[#9a5423] transition-colors" style={{ fontFamily: "var(--font-serif)" }}>
                    {post.caseStudyTitle}
                  </h3>
                </div>
                <ChevronRight className="w-6 h-6 text-[var(--site-text-muted)] group-hover:text-[#9a5423] transition-colors shrink-0" />
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── NEXT ARTICLE ─────────────────────────────── */}
      <section className="py-10 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <p className="text-xs text-[var(--site-text-muted)] uppercase tracking-widest mb-4">Next Article</p>
            <Link href={`/blog/${nextPost.slug}`} className="group flex items-center justify-between">
              <div>
                <p className={`text-xs font-semibold ${nextPost.categoryColor} uppercase tracking-widest mb-1`}>{nextPost.category}</p>
                <h3 className="text-2xl font-light text-[var(--site-text-primary)] group-hover:text-[#9a5423] transition-colors" style={{ fontFamily: "var(--font-serif)" }}>
                  {nextPost.title}
                </h3>
              </div>
              <ChevronRight className="w-6 h-6 text-[var(--site-text-muted)] group-hover:text-[#9a5423] transition-colors shrink-0" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-[var(--site-border)]">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              Want these results <span className="italic text-[#9a5423]">for your business?</span>
            </h2>
            <p className="mt-6 text-[var(--site-text-secondary)] text-lg max-w-xl mx-auto">
              Book a free 30-minute strategy call. We&apos;ll walk through exactly what it
              would take to grow your specific business.
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
