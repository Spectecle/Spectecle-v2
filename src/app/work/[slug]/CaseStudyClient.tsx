"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronRight,
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
import { BrowserMockup } from "@/components/ui/BrowserMockup";

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
      {/* ── HEADER ───────────────────────────────────── */}
      <section className="pt-[178px] pb-8 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href="/work" className="inline-flex items-center gap-2 text-[var(--site-text-muted)] hover:text-[var(--site-text-primary)] transition-colors text-sm mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>

          <p className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-[0.25em]">
            {project.category} · {project.industry}
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-5xl md:text-6xl xl:text-7xl font-light text-[var(--site-text-primary)] leading-[1.05]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {project.title}
          </motion.h1>
          <p className="mt-4 text-[#9a5423] font-medium text-lg">{project.tagline}</p>
        </div>
      </section>

      {/* ── FULL-BLEED SCREENSHOT ─────────────────────── */}
      <section className="px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <BrowserMockup
              url={project.domain}
              screenshotUrl={project.screenshotUrl}
              alt={`${project.title} website screenshot`}
              priority
            />
          </Reveal>
        </div>
      </section>

      {/* ── CHALLENGE + SOLUTION ─────────────────────── */}
      <section className="py-14 px-6">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16">
          <Reveal>
            <div>
              <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">The Challenge</span>
              <h2 className="mt-3 text-3xl font-light text-[var(--site-text-primary)] leading-snug" style={{ fontFamily: "var(--font-serif)" }}>
                What problem were we solving?
              </h2>
              <p className="mt-5 text-[var(--site-text-secondary)] leading-relaxed">{project.challenge}</p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div>
              <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">Our Solution</span>
              <h2 className="mt-3 text-3xl font-light text-[var(--site-text-primary)] leading-snug" style={{ fontFamily: "var(--font-serif)" }}>
                How we built the answer
              </h2>
              <p className="mt-5 text-[var(--site-text-secondary)] leading-relaxed">{project.solution}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-14">
            <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">What We Built</span>
            <h2 className="mt-3 text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              The full scope of work.
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {project.features.map((f, i) => {
              const Icon = ICON_MAP[f.icon] ?? Layers;
              return (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 + 0.1, duration: 0.5, ease: "easeOut" }}
                >
                  <Icon className="w-5 h-5 text-[#9a5423] mb-3" />
                  <p className="text-[var(--site-text-primary)] font-semibold text-sm mb-1">{f.label}</p>
                  <p className="text-[var(--site-text-muted)] text-xs leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DELIVERABLES ─────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-14 items-start">
          <Reveal>
            <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">Deliverables</span>
            <h2 className="mt-3 text-4xl font-light text-[var(--site-text-primary)] leading-snug" style={{ fontFamily: "var(--font-serif)" }}>
              Everything included in this engagement.
            </h2>
            <p className="mt-4 text-[var(--site-text-secondary)]">
              Scoped, built, and handed off, production-ready and live.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-3">
              {project.deliverables.map((d) => (
                <div key={d} className="flex items-center gap-3 text-sm text-[var(--site-text-secondary)]">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-[#9a5423]" />
                  {d}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIAL ────────────────────────────────── */}
      {project.testimonial && (
        <section className="py-14 px-6 border-t border-[var(--site-border)]">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">What They Said</span>
              <p
                className="mt-8 text-[var(--site-text-primary)] text-2xl md:text-3xl leading-relaxed font-light italic"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                &ldquo;{project.testimonial.quote}&rdquo;
              </p>
              <p className="mt-8 text-[var(--site-text-primary)] font-semibold">{project.testimonial.author}</p>
              <p className="text-[var(--site-text-muted)] text-sm">{project.testimonial.role}</p>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── NEXT PROJECT ─────────────────────────────── */}
      <section className="py-12 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-xs text-[var(--site-text-muted)] uppercase tracking-widest mb-4">Next Project</p>
            <Link href={`/work/${nextProject.slug}`} className="group flex items-center justify-between">
              <div>
                <p className="text-[var(--site-text-muted)] text-sm">{nextProject.category}</p>
                <h3 className="text-3xl font-light text-[var(--site-text-primary)] mt-1 group-hover:text-[#9a5423] transition-colors" style={{ fontFamily: "var(--font-serif)" }}>
                  {nextProject.title}
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
              Ready for results <span className="italic text-[#9a5423]">like these?</span>
            </h2>
            <p className="mt-6 text-[var(--site-text-secondary)] text-lg max-w-xl mx-auto">
              Book a free 30-minute strategy call. We&apos;ll map out exactly how we can
              drive the same kind of growth for your business.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-lg font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-1"
              >
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
