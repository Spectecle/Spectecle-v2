"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "./projects-data";

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

const categories = ["All", "Web Design", "Local SEO", "SEO", "AI & Automation"];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

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
            Real Clients. Real Results.
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Work That Drives
            <br />
            <span className="gradient-text">Measurable Growth</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Web design, SEO, and AI automation projects for businesses in Detroit, Michigan
            and beyond. Every case study is a real client with a real result.
          </motion.p>
        </div>
      </section>


      {/* ── FILTER + GRID ────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Filter Pills */}
          <Reveal>
            <div className="flex flex-wrap items-center gap-3 mb-14 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                    activeCategory === cat
                      ? "bg-[#D25124] text-white shadow-lg shadow-[#D25124]/25"
                      : "glass border border-white/8 text-slate-400 hover:text-white hover:border-white/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          {/* SEO intro — keyword-rich context for crawlers and users */}
          <Reveal>
            <p className="text-center text-slate-500 text-sm max-w-2xl mx-auto -mt-6 mb-12 leading-relaxed">
              Real Michigan clients across every industry — photography studios, drywall contractors, glass shops,
              sports clinics, law firms, beauty studios, e-commerce stores, and IT companies.
              Browse by service type to find a project that mirrors your business.
            </p>
          </Reveal>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((p) => (
                <Link
                  key={p.slug}
                  href={`/work/${p.slug}`}
                  className="group rounded-2xl overflow-hidden block"
                >
                  {/* Thumbnail — clean real homepage screenshot, no overlays */}
                  <div className="relative h-56 overflow-hidden bg-[#0a0a14]">
                    <Image
                      src={p.screenshotUrl}
                      alt={`${p.title} homepage`}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>

                  {/* Card Body */}
                  <div className="p-6 glass border border-white/6 border-t-0 rounded-b-2xl group-hover:border-[#D25124]/20 transition-colors duration-300">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="text-xs text-slate-500 uppercase tracking-wider">{p.category}</span>
                        <h2
                          className="mt-1 text-lg font-bold text-white"
                          style={{ fontFamily: "var(--font-inter)" }}
                        >
                          {p.title}
                        </h2>
                      </div>
                      <span className={`text-xs font-semibold ${p.cardResultColor} shrink-0 mt-5`}>
                        {p.cardResult}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-slate-400 leading-relaxed line-clamp-2">{p.cardDesc}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-[#F07A3A] group-hover:gap-2.5 transition-all">
                      View Case Study
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-24 text-slate-600">
              No projects in this category yet.
            </div>
          )}
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
              Your business could be
              <br />
              <span className="gradient-text">our next case study.</span>
            </h2>
            <p className="mt-5 text-slate-400 text-lg max-w-xl mx-auto">
              Based in Detroit, Michigan — working with businesses worldwide. Let&apos;s build
              something that generates real, measurable results for you.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="btn-primary inline-flex items-center gap-2 px-9 py-4 rounded-2xl text-base font-semibold cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-5 h-5 relative z-10" />
              </Link>
              <Link
                href="/services"
                className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-slate-300 hover:text-white glass hover:border-white/15 border border-white/8 transition-all duration-300 cursor-pointer"
              >
                View Our Services
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
