"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { LogoMark } from "@/components/LogoMark";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowUpRight,
  Globe,
  TrendingUp,
  Cpu,
  Monitor,
  Mail,
  Phone,
  CheckCircle2,
  Star,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { projects } from "@/app/work/projects-data";

// ─── Data ────────────────────────────────────────────────────────────────────

const ROTATE_WORDS = ["Convert.", "Rank.", "Scale.", "Perform."];

const STATS = [
  { value: "10+", label: "Years Web Dev" },
  { value: "12+", label: "Years IT Eng." },
  { value: "50+", label: "Projects Live" },
  { value: "$5.4M+", label: "Revenue Generated" },
];

const SERVICES = [
  {
    Icon: Globe,
    title: "Web Design & Development",
    desc: "Custom Next.js websites engineered for speed, conversion, and search. Every pixel deliberate. Every line of code built to perform under real traffic, not just in demos.",
    bullets: ["Sub-2s load time", "Mobile-first responsive", "Conversion-optimized layout"],
  },
  {
    Icon: TrendingUp,
    title: "SEO & Local Search",
    desc: "Rank #1 for the searches that send revenue your way. Local SEO, technical SEO, and content strategy tailored to your market — not copy-pasted from a template.",
    bullets: ["Google Business Profile", "Local keyword domination", "Schema & structured data"],
  },
  {
    Icon: Cpu,
    title: "AI & Automation",
    desc: "Custom AI intake agents, workflow automation, and intelligent CRM integrations — built from scratch. Not a chatbot plugin. A system engineered for your business.",
    bullets: ["Custom AI agents", "Lead capture automation", "CRM & workflow integration"],
  },
];

const INDUSTRIES = [
  "E-commerce & Retail",
  "Law Firms & Attorneys",
  "Beauty Studios",
  "Medical Clinics",
  "Photography Studios",
  "IT & Tech Companies",
  "Contractors",
  "Home Services",
];

const FAQ_ITEMS = [
  {
    question: "How much does a professional website cost in Michigan?",
    answer:
      "At Spectecle, custom website projects start at $2,500 for small businesses and scale based on complexity, number of pages, and integrations needed. Unlike agencies that charge $15,000–$50,000 for templated work, every Spectecle site is built from scratch in Next.js — faster, better-ranking, and entirely yours. SEO retainers and AI automation packages are available separately.",
  },
  {
    question: "What makes Spectecle different from other web design agencies in Detroit?",
    answer:
      "Spectecle is founder-led — every project is handled directly by Walid Alhassan, a web developer with 10 years of experience, an IT systems engineer with 12 years in enterprise infrastructure, and an AI practitioner for 4 years. You never deal with account managers or handoffs. The same person who talks to you also designs, builds, and launches your site.",
  },
  {
    question: "How long does it take to build a website?",
    answer:
      "Most Spectecle projects are delivered in 4–8 weeks from kickoff to launch, depending on complexity. E-commerce sites and projects with custom AI integrations may take longer. There is no team bureaucracy — decisions happen fast and revisions never get lost in translation.",
  },
  {
    question: "What is local SEO and how does it help my Michigan business?",
    answer:
      "Local SEO is the process of optimizing your website and Google Business Profile so your business appears at the top of searches like 'web designer near me' or 'law firm Detroit Michigan.' Spectecle builds local SEO into every website — including structured data markup, Google Business Profile optimization, location-specific content, and a review acquisition strategy — so your site starts ranking from day one.",
  },
  {
    question: "Do I need an AI agent for my business?",
    answer:
      "If your business handles repetitive intake, quotes, scheduling, or customer questions, an AI agent can replace hours of manual work per week. Spectecle builds custom AI intake agents trained on your specific services, pricing, and FAQs — integrated directly with your CRM and communication tools. It's not a generic chatbot — it's a system that understands your business.",
  },
  {
    question: "Does Spectecle work with businesses outside of Detroit?",
    answer:
      "Yes. Spectecle is headquartered in Detroit, MI and specializes in metro Detroit and Michigan businesses, but we work with clients across the United States. If you are a serious business looking for a results-focused web design and digital growth partner, location is not a barrier.",
  },
];

const FEATURED = projects.slice(0, 3);

const CLIENTS = projects.map((p) => ({ name: p.title, domain: p.domain }));

// ─── Helpers ─────────────────────────────────────────────────────────────────

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
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D25124]/25 bg-[#D25124]/8 text-[#F07A3A] text-xs font-semibold tracking-widest uppercase mb-6">
      <span className="w-1.5 h-1.5 rounded-full bg-[#F07A3A]" />
      {children}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HelloPage() {
  const [wordIdx, setWordIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const t = setInterval(() => setWordIdx((i) => (i + 1) % ROTATE_WORDS.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-track { animation: marquee 28s linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col overflow-hidden" style={{ background: "#040408" }}>
        {/* Background atmosphere */}
        <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />
        <div className="absolute top-[-200px] left-[-100px] w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(210,81,36,0.18) 0%, transparent 65%)" }} />
        <div className="absolute bottom-0 right-[-100px] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(168,52,24,0.12) 0%, transparent 65%)" }} />

        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 flex items-center justify-between px-6 md:px-12 pt-8 pb-0"
        >
          <Link href="/" className="flex items-center gap-2">
            <LogoMark className="w-7 h-8 drop-shadow-sm" />
            <span className="text-xl font-bold tracking-tight text-white" style={{ fontFamily: "var(--font-inter)" }}>
              Spectecle
            </span>
          </Link>
          <Link
            href="/contact"
            className="btn-primary hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4 relative z-10" />
          </Link>
        </motion.div>

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-8 text-center max-w-5xl mx-auto w-full">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#D25124]/20 text-sm text-[#F07A3A] font-medium mb-10"
          >
            <span className="w-2 h-2 rounded-full bg-[#F07A3A] animate-pulse" />
            Detroit, MI &nbsp;·&nbsp; Founder-Led &nbsp;·&nbsp; Available Now
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.06] tracking-tight"
          >
            We Build Websites
            <br />
            That&nbsp;
            <span className="inline-block min-w-[220px] sm:min-w-[280px] text-left">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIdx}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  className="gradient-text inline-block"
                >
                  {ROTATE_WORDS[wordIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-7 text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl"
          >
            Spectecle is a Detroit-based agency building custom websites, dominating local search, and
            deploying AI automation for Michigan&apos;s six-figure businesses — all handled directly by the
            founder, start to finish.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.44 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 relative z-10" />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-white glass border border-white/10 hover:border-[#D25124]/40 transition-colors"
            >
              View Our Work
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.58 }}
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px glass rounded-2xl overflow-hidden border border-white/8 w-full max-w-2xl"
          >
            {STATS.map((s, i) => (
              <div key={s.label} className="flex flex-col items-center py-5 px-4 bg-white/[0.02]">
                <span className="text-2xl sm:text-3xl font-extrabold gradient-text tracking-tight">{s.value}</span>
                <span className="text-slate-500 text-xs mt-1 text-center leading-snug">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="relative z-10 flex justify-center pb-8"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-[#F07A3A]" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── CLIENT MARQUEE ────────────────────────────────────────────────── */}
      <div className="py-10 border-y border-white/5 overflow-hidden bg-[#06060c]">
        <p className="text-center text-slate-600 text-xs tracking-widest uppercase mb-6">Trusted by Michigan businesses</p>
        <div className="flex">
          <div className="marquee-track flex items-center gap-12 whitespace-nowrap">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <div key={i} className="flex items-center gap-3 flex-shrink-0">
                <div className="w-6 h-6 rounded bg-white/8 border border-white/10 flex items-center justify-center text-[10px] text-slate-400 font-bold flex-shrink-0">
                  {c.name[0]}
                </div>
                <span className="text-slate-500 text-sm font-medium">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SERVICES ──────────────────────────────────────────────────────── */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <SectionLabel>What We Do</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Three disciplines.
              <br />
              <span className="gradient-text">One agency.</span>
            </h2>
            <p className="mt-5 text-slate-400 text-lg max-w-xl mx-auto">
              Most agencies do one thing. Spectecle handles the full stack of digital growth — design, search, and automation — under a single roof.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="glass glass-hover rounded-2xl p-8 h-full flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-[#D25124]/10 border border-[#D25124]/20 flex items-center justify-center mb-6">
                    <s.Icon className="w-5 h-5 text-[#F07A3A]" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">{s.desc}</p>
                  <ul className="space-y-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-slate-400 text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#F07A3A] shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SELECTED WORK ─────────────────────────────────────────────────── */}
      <section className="py-28 px-6" style={{ background: "#06060c" }}>
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <SectionLabel>Selected Work</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Real results.
              <br />
              <span className="gradient-text">Real Michigan clients.</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {FEATURED.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.1}>
                <Link href={`/work/${p.slug}`} className="group block glass rounded-2xl overflow-hidden hover:border-[#D25124]/30 border border-white/8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                  {/* Card thumbnail */}
                  <div className={`relative h-44 bg-gradient-to-br ${p.gradient} overflow-hidden`}>
                    <div className="absolute inset-0 dot-pattern opacity-10" />
                    {p.shapes.map((s, si) => (
                      <div key={si} className={`absolute ${s.size} ${s.pos} ${s.opacity}`} />
                    ))}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                      <div className="relative w-12 h-12">
                        <div className="absolute inset-0 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                          <span className="text-white font-bold text-lg">{p.title[0]}</span>
                        </div>
                      </div>
                      <span className="text-white/40 text-[9px] font-mono tracking-widest">{p.domain}</span>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="flex items-center gap-1.5 text-white text-sm font-semibold">
                        View Case Study <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                  {/* Card body */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-semibold text-sm">{p.title}</span>
                      <span className={`text-xs font-bold ${p.cardResultColor}`}>{p.cardResult}</span>
                    </div>
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{p.cardDesc}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {p.tags.slice(0, 2).map((t) => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/8 text-slate-400">{t}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center">
            <Link href="/work" className="inline-flex items-center gap-2 text-[#F07A3A] hover:text-[#D25124] font-semibold text-sm transition-colors group">
              View all case studies
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── INDUSTRIES ────────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <SectionLabel>Industries</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
              We know your industry.
            </h2>
            <p className="text-slate-400 mb-10">
              From law firms to beauty studios — we&apos;ve built for the full range of Michigan business.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {INDUSTRIES.map((ind, i) => (
                <motion.span
                  key={ind}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="px-4 py-2 rounded-full glass border border-white/8 text-slate-300 text-sm"
                >
                  {ind}
                </motion.span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-16">
            <SectionLabel>Common Questions</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Everything you&apos;re
              <br />
              <span className="gradient-text">probably wondering.</span>
            </h2>
          </Reveal>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <Reveal key={item.question} delay={i * 0.05}>
                <div className="glass rounded-2xl border border-white/8 overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span className="text-white font-semibold text-sm leading-snug">{item.question}</span>
                    <ChevronDown
                      className="w-5 h-5 text-[#F07A3A] shrink-0 transition-transform duration-300"
                      style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-slate-400 text-sm leading-relaxed">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEET WALID ────────────────────────────────────────────────────── */}
      <section className="py-28 px-6" style={{ background: "#06060c" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Photo */}
            <Reveal className="relative">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden max-w-md mx-auto lg:mx-0">
                <Image
                  src="/walid.jpg"
                  alt="Walid Alhassan — Founder of Spectecle"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 448px"
                  className="object-cover object-top"
                  style={{ filter: "brightness(1.04) contrast(1.08) saturate(0.82)" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {/* Floating badge */}
                <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl border border-white/10 p-4 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#D25124]/20 border border-[#D25124]/30 flex items-center justify-center shrink-0">
                      <Star className="w-4 h-4 text-[#F07A3A]" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">Walid Alhassan</p>
                      <p className="text-slate-400 text-xs">Founder & Lead Strategist · Detroit, MI</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Bio */}
            <div>
              <Reveal>
                <SectionLabel>The Founder</SectionLabel>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
                  Hi, I&apos;m{" "}
                  <span className="gradient-text">Walid.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="text-slate-400 leading-relaxed mb-4">
                  I started Spectecle the same way I approach every client project — by building something for myself first. Self-taught from the ground up, I spent 10 years mastering web development alongside 12 years as an IT systems engineer in enterprise infrastructure.
                </p>
                <p className="text-slate-400 leading-relaxed mb-8">
                  That combination is rare. I understand server-side performance, security, and architecture at a level most designers never touch. When I add AI automation to a client&apos;s workflow, I&apos;m building the agent from scratch — trained on their business, integrated with their systems, and tested until it actually works.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { Icon: Monitor, years: "12 Yrs", label: "IT Systems Eng." },
                    { Icon: Globe, years: "10 Yrs", label: "Web Development" },
                    { Icon: Cpu, years: "4 Yrs", label: "AI & Automation" },
                  ].map((e) => (
                    <div key={e.label} className="glass rounded-xl p-4 text-center border border-white/8">
                      <e.Icon className="w-5 h-5 text-[#F07A3A] mx-auto mb-2" />
                      <p className="text-white font-bold text-sm">{e.years}</p>
                      <p className="text-slate-500 text-[10px] leading-tight mt-0.5">{e.label}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-[#F07A3A] hover:text-[#D25124] font-semibold text-sm transition-colors group"
                >
                  Full story on the about page
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(210,81,36,0.14) 0%, transparent 70%)" }}
        />
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />

        <Reveal className="relative max-w-3xl mx-auto text-center">
          <SectionLabel>Let&apos;s Talk</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Ready to build something
            <br />
            <span className="gradient-text">that actually works?</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            You scanned the card. That&apos;s the first step. The second one is a 15-minute conversation about what your business actually needs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Link
              href="/contact"
              className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl text-sm font-semibold"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 relative z-10" />
            </Link>
            <a
              href="tel:+13133534105"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold text-white glass border border-white/10 hover:border-[#D25124]/40 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#F07A3A]" />
              (313) 353-4105
            </a>
          </div>

          <a
            href="mailto:hello@spectecle.com"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-[#F07A3A] text-sm transition-colors"
          >
            <Mail className="w-4 h-4" />
            hello@spectecle.com
          </a>
        </Reveal>
      </section>

      {/* ── MINI FOOTER ───────────────────────────────────────────────────── */}
      <div className="border-t border-white/5 py-6 px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-600 text-xs" style={{ background: "#040408" }}>
        <Link href="/" className="text-slate-500 hover:text-[#F07A3A] transition-colors font-semibold tracking-tight">
          spectecle.com
        </Link>
        <p>© {new Date().getFullYear()} Spectecle SEO & Web Design · Detroit, MI · All rights reserved.</p>
        <Link href="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
      </div>
    </>
  );
}
