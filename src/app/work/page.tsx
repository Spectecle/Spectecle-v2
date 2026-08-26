"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
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

export default function WorkPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="pt-[176px] pb-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-7xl font-light text-[var(--site-text-primary)] leading-[1.05]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Work that drives <span className="italic text-[#9a5423]">measurable growth.</span>
          </motion.h1>
          <p className="mt-6 text-[var(--site-text-secondary)] text-lg max-w-2xl mx-auto leading-relaxed">
            Web design, SEO, and AI automation projects for businesses across the country.
            Every case study is a real client with a real result.
          </p>
        </div>
      </section>

      {/* ── FILTER + GRID ────────────────────────────── */}
      <section className="pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-16">
              {projects.map((p) => (
                <Link key={p.slug} href={`/work/${p.slug}`} className="group block">
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={p.screenshotUrl}
                      alt={`${p.title} homepage`}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <h2 className="mt-5 text-2xl font-light text-[var(--site-text-primary)] group-hover:text-[#9a5423] transition-colors" style={{ fontFamily: "var(--font-serif)" }}>
                    {p.title}
                  </h2>
                  <p className="mt-2 text-sm text-[var(--site-text-secondary)] leading-relaxed max-w-md">{p.tagline}</p>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-[var(--site-border)]">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              Your business could be <span className="italic text-[#9a5423]">our next case study.</span>
            </h2>
            <p className="mt-6 text-[var(--site-text-secondary)] text-lg max-w-xl mx-auto">
              Serving businesses nationwide. Let&apos;s build
              something that generates real, measurable results for you.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-lg font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-1"
              >
                Start a Project
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
