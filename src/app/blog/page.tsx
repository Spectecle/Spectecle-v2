"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { posts, type BlogPost } from "./posts-data";
import { pickProjects } from "@/app/work/projects-data";
import { BrowserMockup } from "@/components/ui/BrowserMockup";

function PostCover({ post, size }: { post: BlogPost; size: "default" | "compact" }) {
  const project = post.caseStudySlug ? pickProjects([post.caseStudySlug])[0] : undefined;

  if (!project) {
    return (
      <div className={`relative w-full ${size === "compact" ? "h-40" : "h-56 md:h-72"} overflow-hidden bg-[var(--site-surface)] border border-[var(--site-border)] flex items-center justify-center`}>
        <span className="text-2xl text-[#9a5423]">✦</span>
      </div>
    );
  }

  return (
    <BrowserMockup
      url={project.domain}
      screenshotUrl={project.screenshotUrl}
      alt={`${project.title} website screenshot`}
      size={size}
    />
  );
}

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

export default function BlogPage() {
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="pt-[176px] pb-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-[0.25em]">
            Insights from the Agency
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-6xl md:text-7xl font-light text-[var(--site-text-primary)] leading-[1.05]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Guides that <span className="italic text-[#9a5423]">actually work.</span>
          </motion.h1>
          <p className="mt-6 text-[var(--site-text-secondary)] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Actionable guides for small businesses (photographers, contractors, attorneys,
            beauty studios, e-commerce shops, and tech companies) on web design, SEO, and AI automation.
          </p>
        </div>
      </section>

      {/* ── FEATURED POST ────────────────────────────── */}
      <section className="px-6 pb-12">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <Link href={`/blog/${featured.slug}`} className="group grid lg:grid-cols-[1fr_1fr] gap-8 items-center">
              <div className="relative">
                <span
                  className="absolute top-4 left-4 z-10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#1e1e1e] bg-[#9a5423]"
                >
                  Featured
                </span>
                <PostCover post={featured} size="compact" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className={`text-xs font-semibold ${featured.categoryColor} uppercase tracking-widest`}>
                    {featured.category}
                  </span>
                  <span className="w-1 h-1 bg-[var(--site-text-muted)]" />
                  <span className="text-xs text-[var(--site-text-muted)] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {featured.readTime}
                  </span>
                </div>
                <h2
                  className="text-3xl md:text-4xl font-light text-[var(--site-text-primary)] leading-snug group-hover:text-[#9a5423] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {featured.title}
                </h2>
                <p className="mt-4 text-[var(--site-text-secondary)] leading-relaxed">{featured.excerpt}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-0.5">
                  Read Article
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── POSTS GRID ───────────────────────────────── */}
      <section className="py-12 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-14">
            <h2 className="text-2xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              All Articles
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-x-10 gap-y-14">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.07}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <PostCover post={post} size="compact" />
                  <div className="mt-5 flex items-center gap-3">
                    <span className={`text-xs font-semibold ${post.categoryColor} uppercase tracking-widest`}>
                      {post.category}
                    </span>
                    <span className="w-1 h-1 bg-[var(--site-text-muted)]" />
                    <span className="text-xs text-[var(--site-text-muted)] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3
                    className="mt-3 text-xl font-light text-[var(--site-text-primary)] leading-snug group-hover:text-[#9a5423] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm text-[var(--site-text-secondary)] leading-relaxed line-clamp-3">{post.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-[var(--site-border)]">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              Ready to grow your <span className="italic text-[#9a5423]">business?</span>
            </h2>
            <p className="mt-6 text-[var(--site-text-secondary)] text-lg max-w-xl mx-auto">
              Book a free 30-minute strategy call and we&apos;ll map out exactly what it
              would take to grow your specific business through web design, SEO, or automation.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-lg font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-1"
              >
                Book a Free Call
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
