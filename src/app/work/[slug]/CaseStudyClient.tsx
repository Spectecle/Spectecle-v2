"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  Camera,
  Search,
  Calendar,
  MapPin,
  Star,
  ShoppingCart,
  BookOpen,
  Mail,
  Shield,
  Users,
  BarChart3,
  Rocket,
  Layers,
  Code2,
  Cpu,
  Bot,
  RefreshCw,
  Smartphone,
  TrendingUp,
  Monitor,
  Scale,
  Briefcase,
  Zap,
  MessageSquare,
  FileText,
  Link2,
} from "lucide-react";
import type { ProjectData } from "../projects-data";

type IconComponent = React.ComponentType<{ className?: string }>;

const ICON_MAP: Record<string, IconComponent> = {
  camera: Camera,
  search: Search,
  calendar: Calendar,
  "map-pin": MapPin,
  star: Star,
  "shopping-cart": ShoppingCart,
  "book-open": BookOpen,
  mail: Mail,
  shield: Shield,
  users: Users,
  "bar-chart": BarChart3,
  rocket: Rocket,
  layers: Layers,
  code: Code2,
  cpu: Cpu,
  bot: Bot,
  "refresh-cw": RefreshCw,
  smartphone: Smartphone,
  "trending-up": TrendingUp,
  monitor: Monitor,
  scale: Scale,
  briefcase: Briefcase,
  zap: Zap,
  "message-square": MessageSquare,
  "file-text": FileText,
  link: Link2,
};

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

export default function CaseStudyClient({
  project,
  nextProject,
}: {
  project: ProjectData;
  nextProject: ProjectData;
}) {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden">
        {/* Gradient orb */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(210,81,36,0.14) 0%, transparent 70%)" }}
        />
        <div className="absolute inset-0 dot-pattern opacity-25 pointer-events-none" />

        <div className="relative max-w-5xl mx-auto">
          {/* Back nav */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-start">
            <div>
              {/* Badges row */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="flex flex-wrap gap-3 mb-6"
              >
                <span className="px-3 py-1.5 rounded-full bg-[#D25124]/15 border border-[#D25124]/20 text-[#F07A3A] text-xs font-semibold uppercase tracking-widest">
                  {project.category}
                </span>
                <span className="px-3 py-1.5 rounded-full glass border border-white/8 text-slate-400 text-xs">
                  {project.industry}
                </span>
                <span className="px-3 py-1.5 rounded-full glass border border-white/8 text-slate-400 text-xs">
                  {project.location}
                </span>
                <span className="px-3 py-1.5 rounded-full glass border border-white/8 text-slate-400 text-xs">
                  {project.year}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl md:text-5xl xl:text-6xl font-bold text-white leading-tight"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {project.title}
              </motion.h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-4 text-[#F07A3A] font-semibold text-lg"
              >
                {project.tagline}
              </motion.p>

              {/* Domain link */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28 }}
                className="mt-4"
              >
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm group"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {project.domain}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-slate-600">
                    — View Live Site
                  </span>
                </a>
              </motion.div>
            </div>

            {/* Services tags */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden lg:flex flex-col gap-2 pt-2"
            >
              {project.services.map((s) => (
                <span
                  key={s}
                  className="px-4 py-2 glass border border-white/8 rounded-xl text-slate-300 text-sm text-right"
                >
                  {s}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Hero metrics strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {project.heroMetrics.map((m, i) => (
              <div
                key={m.label}
                className="glass rounded-2xl p-5 border border-white/6 text-center"
              >
                <div
                  className="text-2xl md:text-3xl font-bold gradient-text"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {m.value}
                </div>
                <p className="mt-1 text-slate-500 text-xs uppercase tracking-wider">{m.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BROWSER MOCKUP ───────────────────────────── */}
      <section className="px-6 pb-0">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            {/* Outer glow ring matching brand gradient */}
            <div
              className="rounded-2xl p-px"
              style={{
                background: `linear-gradient(135deg, rgba(240,122,58,0.4) 0%, rgba(210,81,36,0.2) 50%, rgba(168,52,24,0.4) 100%)`,
              }}
            >
              <div className="rounded-[calc(1rem-1px)] overflow-hidden shadow-2xl shadow-black/60">
                {/* Browser chrome bar */}
                <div className="bg-[#1a1a26] px-5 py-3.5 flex items-center gap-4 border-b border-white/6">
                  {/* Traffic lights */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                  </div>

                  {/* Nav arrows */}
                  <div className="hidden sm:flex items-center gap-2 shrink-0">
                    <div className="w-4 h-4 rounded-sm flex items-center justify-center">
                      <svg viewBox="0 0 8 12" className="w-2.5 h-2.5 fill-white/30"><path d="M6 1L1 6l5 5"/></svg>
                    </div>
                    <div className="w-4 h-4 rounded-sm flex items-center justify-center">
                      <svg viewBox="0 0 8 12" className="w-2.5 h-2.5 fill-white/30"><path d="M2 1l5 5-5 5"/></svg>
                    </div>
                  </div>

                  {/* URL bar */}
                  <div className="flex-1 max-w-sm mx-auto">
                    <div className="bg-[#0d0d18] rounded-lg px-3 py-1.5 flex items-center gap-2 border border-white/6">
                      <svg viewBox="0 0 24 24" className="w-3 h-3 shrink-0 fill-none stroke-white/30 stroke-2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                      <span className="text-xs text-slate-400 font-mono truncate">{project.domain}</span>
                    </div>
                  </div>

                  {/* Spacer to balance traffic lights */}
                  <div className="w-14 shrink-0 hidden sm:block" />
                </div>

                {/* Screenshot */}
                <div className="relative h-64 md:h-[420px] bg-[#0a0a14] overflow-hidden">
                  <Image
                    src={project.screenshotUrl}
                    alt={`${project.title} website screenshot`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    priority
                  />
                  {/* Subtle bottom fade into the page background */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CHALLENGE + SOLUTION ─────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <Reveal>
              <div>
                <span className="text-xs font-semibold text-[#F07A3A] uppercase tracking-widest">
                  The Challenge
                </span>
                <h2
                  className="mt-3 text-2xl md:text-3xl font-bold text-white leading-snug"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  What problem were we solving?
                </h2>
                <p className="mt-5 text-slate-400 leading-relaxed">{project.challenge}</p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div>
                <span className="text-xs font-semibold text-[#F07A3A] uppercase tracking-widest">
                  Our Solution
                </span>
                <h2
                  className="mt-3 text-2xl md:text-3xl font-bold text-white leading-snug"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  How we built the answer
                </h2>
                <p className="mt-5 text-slate-400 leading-relaxed">{project.solution}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ────────────────────────────── */}
      <section className="py-20 px-6 bg-[#09090f] border-y border-white/6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="mb-12 text-center">
              <span className="text-xs font-semibold text-[#F07A3A] uppercase tracking-widest">
                What We Built
              </span>
              <h2
                className="mt-3 text-3xl md:text-4xl font-bold text-white"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                The full scope of work
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.features.map((f, i) => {
              const Icon = ICON_MAP[f.icon] ?? Layers;
              return (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 + 0.1, duration: 0.5, ease: "easeOut" }}
                  className="glass rounded-xl p-5 border border-white/6 hover:border-[#D25124]/20 transition-colors duration-300"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#D25124]/10 flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4 text-[#F07A3A]" />
                  </div>
                  <p className="text-white font-semibold text-sm mb-1">{f.label}</p>
                  <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── RESULTS ──────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <span className="text-xs font-semibold text-[#F07A3A] uppercase tracking-widest">
                The Impact
              </span>
              <h2
                className="mt-3 text-3xl md:text-4xl font-bold text-white"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Results that speak for themselves
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {project.results.map((r, i) => (
              <Reveal key={r.label} delay={i * 0.08}>
                <div className="glass rounded-2xl p-7 border border-white/6 text-center hover:border-[#D25124]/20 transition-colors duration-300">
                  <div
                    className="text-3xl md:text-4xl font-bold gradient-text"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {r.value}
                  </div>
                  <p className="mt-3 text-slate-400 text-sm leading-snug">{r.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DELIVERABLES ─────────────────────────────── */}
      <section className="py-20 px-6 bg-[#09090f] border-t border-white/6">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <Reveal>
              <span className="text-xs font-semibold text-[#F07A3A] uppercase tracking-widest">
                Deliverables
              </span>
              <h2
                className="mt-3 text-3xl md:text-4xl font-bold text-white leading-snug"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Everything included in
                <br />
                this engagement
              </h2>
              <p className="mt-4 text-slate-400">
                Every deliverable below was scoped, built, and handed off as part of this project.
                No half-finished work — everything is production-ready and live.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-3">
                {project.deliverables.map((d) => (
                  <div key={d} className="flex items-center gap-3 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-[#F07A3A]" />
                    {d}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL (conditional) ─────────────────── */}
      {project.testimonial && (
        <section className="py-24 px-6 border-t border-white/6">
          <div className="max-w-3xl mx-auto">
            <Reveal>
              <div className="text-center mb-10">
                <span className="text-xs font-semibold text-[#F07A3A] uppercase tracking-widest">
                  What They Said
                </span>
              </div>
              <div className="glass rounded-3xl p-10 border border-white/6 hover:border-[#D25124]/15 transition-colors duration-300">
                <p className="text-white text-lg md:text-xl leading-relaxed font-light italic">
                  &ldquo;{project.testimonial.quote}&rdquo;
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${project.testimonial.avatarGradient} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                  >
                    {project.testimonial.initials}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{project.testimonial.author}</p>
                    <p className="text-slate-500 text-sm">{project.testimonial.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── NEXT PROJECT ─────────────────────────────── */}
      <section className="py-20 px-6 border-t border-white/6 bg-[#09090f]">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-xs text-slate-600 uppercase tracking-widest mb-4">Next Project</p>
            <Link
              href={`/work/${nextProject.slug}`}
              className="group flex items-center justify-between glass rounded-2xl p-7 border border-white/6 hover:border-[#D25124]/20 transition-colors duration-300"
            >
              <div>
                <p className="text-slate-500 text-sm">{nextProject.category}</p>
                <h3
                  className="text-2xl font-bold text-white mt-1 group-hover:text-[#F07A3A] transition-colors"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {nextProject.title}
                </h3>
                <p className="text-slate-400 text-sm mt-1">{nextProject.domain}</p>
              </div>
              <ChevronRight className="w-6 h-6 text-slate-600 group-hover:text-[#F07A3A] transition-colors shrink-0" />
            </Link>
          </Reveal>
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
              Ready for results
              <br />
              <span className="gradient-text">like these?</span>
            </h2>
            <p className="mt-5 text-slate-400 text-lg max-w-xl mx-auto">
              Book a free 30-minute strategy call. We&apos;ll map out exactly how we can
              drive the same kind of growth for your business.
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
                View All Work
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
