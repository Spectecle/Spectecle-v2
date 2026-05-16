"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, ChevronRight } from "lucide-react";
import { posts } from "./posts-data";

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
            Insights from the Agency
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Web Design & SEO
            <br />
            <span className="gradient-text">Guides That Work</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Actionable guides for Michigan businesses — photographers, contractors, attorneys,
            beauty studios, e-commerce shops, and tech companies — on web design, SEO, and AI automation.
          </motion.p>
        </div>
      </section>

      {/* ── FEATURED POST ────────────────────────────── */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <Link
              href={`/blog/${featured.slug}`}
              className="group block glass rounded-3xl border border-white/6 overflow-hidden hover:border-[#D25124]/20 transition-colors duration-300"
            >
              <div className="grid lg:grid-cols-[1fr_auto] gap-0">
                {/* Content */}
                <div className="p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-5">
                    <span className={`text-xs font-semibold ${featured.categoryColor} uppercase tracking-widest`}>
                      {featured.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-700" />
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {featured.readTime}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-700" />
                    <span className="text-xs text-slate-500">{featured.publishedAt}</span>
                  </div>

                  <h2
                    className="text-2xl md:text-3xl font-bold text-white leading-snug group-hover:text-[#F07A3A] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {featured.title}
                  </h2>

                  <p className="mt-4 text-slate-400 leading-relaxed max-w-xl">
                    {featured.excerpt}
                  </p>

                  <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#F07A3A] group-hover:gap-3 transition-all duration-200">
                    Read Article
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Featured badge */}
                <div className="hidden lg:flex items-center justify-center px-8 border-l border-white/6">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#D25124]/10 border border-[#D25124]/20 flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl">✦</span>
                    </div>
                    <p className="text-xs text-slate-600 uppercase tracking-widest">Featured</p>
                  </div>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── POSTS GRID ───────────────────────────────── */}
      <section className="py-20 px-6 bg-[#09090f] border-t border-white/6">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-12">
            <h2
              className="text-2xl font-bold text-white"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              All Articles
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5">
            {rest.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.07}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block glass rounded-2xl border border-white/6 p-7 hover:border-[#D25124]/20 transition-colors duration-300 h-full"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-semibold ${post.categoryColor} uppercase tracking-widest`}>
                      {post.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-700" />
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3
                    className="text-lg font-bold text-white leading-snug group-hover:text-[#F07A3A] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {post.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-400 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-xs text-slate-600">{post.publishedAt}</span>
                    <span className="flex items-center gap-1 text-xs font-semibold text-slate-500 group-hover:text-[#F07A3A] transition-colors duration-200">
                      Read <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
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
              Ready to grow your
              <br />
              <span className="gradient-text">Michigan business?</span>
            </h2>
            <p className="mt-5 text-slate-400 text-lg max-w-xl mx-auto">
              Book a free 30-minute strategy call and we&apos;ll map out exactly what it
              would take to grow your specific business through web design, SEO, or automation.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="btn-primary inline-flex items-center gap-2 px-9 py-4 rounded-2xl text-base font-semibold cursor-pointer"
              >
                <span>Book a Free Call</span>
                <ArrowUpRight className="w-5 h-5 relative z-10" />
              </Link>
              <Link
                href="/work"
                className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-slate-300 hover:text-white glass hover:border-white/15 border border-white/8 transition-all duration-300 cursor-pointer"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
