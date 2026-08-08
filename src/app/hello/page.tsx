"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LogoMark } from "@/components/LogoMark";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Phone,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { projects } from "@/app/work/projects-data";
import { SiteThemeToggle } from "@/components/SiteThemeToggle";

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
    n: "01",
    title: "Web Design & Development",
    desc: "Custom Next.js websites engineered for speed, conversion, and search. Every pixel deliberate. Every line of code built to perform under real traffic, not just in demos.",
    bullets: ["Sub-2s load time", "Mobile-first responsive", "Conversion-optimized layout"],
  },
  {
    n: "02",
    title: "SEO & Local Search",
    desc: "Rank #1 for the searches that send revenue your way. Local SEO, technical SEO, and content strategy tailored to your market, not copy-pasted from a template.",
    bullets: ["Google Business Profile", "Local keyword domination", "Schema & structured data"],
  },
  {
    n: "03",
    title: "AI & Automation",
    desc: "Custom AI intake agents, workflow automation, and intelligent CRM integrations, built from scratch. Not a chatbot plugin. A system engineered for your business.",
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
    question: "How much does a professional website cost?",
    answer:
      "At Spectecle, custom website projects start at $2,500 for small businesses and scale based on complexity, number of pages, and integrations needed. Unlike agencies that charge $15,000–$50,000 for templated work, every Spectecle site is built from scratch in Next.js: faster, better-ranking, and entirely yours. SEO retainers and AI automation packages are available separately.",
  },
  {
    question: "What makes Spectecle different from other web design agencies?",
    answer:
      "Spectecle is founder-led. Every project is handled directly by Walid Alhassan, a web developer with 10 years of experience, an IT systems engineer with 12 years in enterprise infrastructure, and an AI practitioner for 4 years. You never deal with account managers or handoffs. The same person who talks to you also designs, builds, and launches your site.",
  },
  {
    question: "How long does it take to build a website?",
    answer:
      "Most Spectecle projects are delivered in 4–8 weeks from kickoff to launch, depending on complexity. E-commerce sites and projects with custom AI integrations may take longer. There is no team bureaucracy. Decisions happen fast and revisions never get lost in translation.",
  },
  {
    question: "What is local SEO and how does it help my business?",
    answer:
      "Local SEO is the process of optimizing your website and Google Business Profile so your business appears at the top of searches like 'web designer near me' or 'law firm in [your city].' Spectecle builds local SEO into every website, including structured data markup, Google Business Profile optimization, location-specific content, and a review acquisition strategy, so your site starts ranking from day one.",
  },
  {
    question: "Do I need an AI agent for my business?",
    answer:
      "If your business handles repetitive intake, quotes, scheduling, or customer questions, an AI agent can replace hours of manual work per week. Spectecle builds custom AI intake agents trained on your specific services, pricing, and FAQs, integrated directly with your CRM and communication tools. It's not a generic chatbot. It's a system that understands your business.",
  },
  {
    question: "Does Spectecle work with businesses nationwide?",
    answer:
      "Yes. Spectecle works with clients across the United States, with deep local-SEO expertise for businesses that also want to dominate their local market. If you are a serious business looking for a results-focused web design and digital growth partner, location is not a barrier.",
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
      <section className="relative min-h-screen flex flex-col bg-[var(--site-bg)]">
        <div className="relative z-10 flex items-center justify-between px-6 md:px-12 pt-8 pb-0">
          <Link href="/" className="flex items-center gap-2">
            <LogoMark className="w-8 h-8 drop-shadow-sm" />
            <span className="text-xl font-bold tracking-tight text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-sans)" }}>
              Spectecle
            </span>
          </Link>
          <SiteThemeToggle />
        </div>

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-8 text-center max-w-5xl mx-auto w-full">
          <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-[0.25em] mb-8">
            Founder-Led · Serving Businesses Nationwide · Available Now
          </span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl font-light text-[var(--site-text-primary)] leading-[1.06]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            We build websites
            <br />
            that&nbsp;
            <span className="inline-block min-w-[220px] sm:min-w-[280px] text-left">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIdx}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  className="italic text-[#c69947] inline-block"
                >
                  {ROTATE_WORDS[wordIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <p className="mt-7 text-[var(--site-text-secondary)] text-lg md:text-xl leading-relaxed max-w-2xl">
            Spectecle is an agency building custom websites, dominating local search, and
            deploying AI automation for six-figure businesses nationwide, all handled directly by the
            founder, start to finish.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
            <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-0.5">
              Start a Project
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link href="/work" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)] transition-colors">
              View Our Work
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 w-full max-w-2xl">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <span className="text-2xl sm:text-3xl font-light text-[#c69947]" style={{ fontFamily: "var(--font-serif)" }}>{s.value}</span>
                <p className="text-[var(--site-text-muted)] text-xs mt-1 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENT MARQUEE ────────────────────────────────────────────────── */}
      <div className="py-10 border-y border-[var(--site-border)] overflow-hidden bg-[var(--site-bg)]">
        <p className="text-center text-[var(--site-text-muted)] text-xs tracking-widest uppercase mb-6">Trusted by businesses nationwide</p>
        <div className="flex">
          <div className="marquee-track flex items-center gap-12 whitespace-nowrap">
            {[...CLIENTS, ...CLIENTS].map((c, i) => (
              <span key={i} className="text-[var(--site-text-secondary)] text-sm font-medium">{c.name}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── SERVICES ──────────────────────────────────────────────────────── */}
      <section className="py-28 px-6 border-b border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-16">
            <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">What We Do</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              Three disciplines. <span className="italic text-[#c69947]">One agency.</span>
            </h2>
          </Reveal>

          <div className="divide-y divide-[var(--site-border)]">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="grid md:grid-cols-[80px_1fr] gap-4 py-10">
                  <span className="text-sm text-[var(--site-text-muted)] font-mono">{s.n}</span>
                  <div>
                    <h3 className="text-2xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>{s.title}</h3>
                    <p className="mt-2 text-[var(--site-text-secondary)] text-sm leading-relaxed max-w-xl">{s.desc}</p>
                    <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1.5">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-2 text-[var(--site-text-muted)] text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#c69947] shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SELECTED WORK ─────────────────────────────────────────────────── */}
      <section className="py-28 px-6 border-b border-[var(--site-border)]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-16">
            <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">Selected Work</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              Real results. <span className="italic text-[#c69947]">Real clients.</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-x-8 gap-y-10 mb-10">
            {FEATURED.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.1}>
                <Link href={`/work/${p.slug}`} className="group block">
                  <div className="relative h-44 overflow-hidden">
                    <Image
                      src={p.screenshotUrl}
                      alt={`${p.title} homepage`}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[var(--site-text-primary)] font-semibold text-sm group-hover:text-[#c69947] transition-colors">{p.title}</span>
                    <span className="text-xs font-bold text-[#c69947]">{p.cardResult}</span>
                  </div>
                  <p className="mt-1 text-[var(--site-text-muted)] text-xs leading-relaxed line-clamp-2">{p.cardDesc}</p>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center">
            <Link href="/work" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-0.5">
              View all case studies
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── INDUSTRIES ────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-b border-[var(--site-border)]">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">Industries</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-[var(--site-text-primary)] mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              We know your industry.
            </h2>
            <p className="text-[var(--site-text-secondary)] mb-10">
              From law firms to beauty studios, we&apos;ve built for the full range of small business.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
              {INDUSTRIES.map((ind) => (
                <span key={ind} className="text-[var(--site-text-secondary)] text-sm">
                  {ind}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-28 px-6 border-b border-[var(--site-border)]">
        <div className="max-w-3xl mx-auto">
          <Reveal className="mb-16">
            <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">Common Questions</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              Everything you&apos;re <span className="italic text-[#c69947]">probably wondering.</span>
            </h2>
          </Reveal>

          <div className="divide-y divide-[var(--site-border)]">
            {FAQ_ITEMS.map((item, i) => (
              <Reveal key={item.question} delay={i * 0.05}>
                <div>
                  <button
                    className="w-full flex items-center justify-between gap-4 py-6 text-left group cursor-pointer"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span className="text-[var(--site-text-primary)] font-semibold text-sm leading-snug">{item.question}</span>
                    <ChevronDown
                      className="w-5 h-5 text-[#c69947] shrink-0 transition-transform duration-300"
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
                        <p className="pb-6 text-[var(--site-text-secondary)] text-sm leading-relaxed">{item.answer}</p>
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
      <section className="py-28 px-6 border-b border-[var(--site-border)]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden max-w-md mx-auto lg:mx-0">
              <Image
                src="/walid.jpg"
                alt="Walid Alhassan, Founder of Spectecle"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 448px"
                className="object-cover object-top"
                style={{ filter: "brightness(1.04) contrast(1.08) saturate(0.82)" }}
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">The Founder</span>
              <h2 className="mt-4 text-4xl md:text-5xl font-light text-[var(--site-text-primary)] leading-tight mb-6" style={{ fontFamily: "var(--font-serif)" }}>
                Hi, I&apos;m <span className="italic text-[#c69947]">Walid.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[var(--site-text-secondary)] leading-relaxed mb-4">
                I started Spectecle the same way I approach every client project: by building something for myself first. Self-taught from the ground up, I spent 10 years mastering web development alongside 12 years as an IT systems engineer in enterprise infrastructure.
              </p>
              <p className="text-[var(--site-text-secondary)] leading-relaxed mb-8">
                That combination is rare. I understand server-side performance, security, and architecture at a level most designers never touch. When I add AI automation to a client&apos;s workflow, I&apos;m building the agent from scratch: trained on their business, integrated with their systems, and tested until it actually works.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="flex flex-wrap gap-8 mb-8">
                {[
                  { years: "12 Yrs", label: "IT Systems Eng." },
                  { years: "10 Yrs", label: "Web Development" },
                  { years: "4 Yrs", label: "AI & Automation" },
                ].map((e) => (
                  <div key={e.label}>
                    <p className="text-[var(--site-text-primary)] font-light text-2xl" style={{ fontFamily: "var(--font-serif)" }}>{e.years}</p>
                    <p className="text-[var(--site-text-muted)] text-xs leading-tight mt-0.5">{e.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <Link href="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-0.5">
                Full story on the about page
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <Reveal className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">Let&apos;s Talk</span>
          <h2 className="mt-4 text-5xl md:text-6xl font-light text-[var(--site-text-primary)] leading-tight mb-6" style={{ fontFamily: "var(--font-serif)" }}>
            Ready to build something <span className="italic text-[#c69947]">that actually works?</span>
          </h2>
          <p className="text-[var(--site-text-secondary)] text-lg mb-10 max-w-xl mx-auto">
            You scanned the card. That&apos;s the first step. The second one is a 15-minute conversation about what your business actually needs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-10">
            <Link href="/contact" className="inline-flex items-center gap-2 text-lg font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-1">
              Start a Project
              <ArrowUpRight className="w-5 h-5" />
            </Link>
            <a href="tel:+13133534105" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)] transition-colors">
              <Phone className="w-4 h-4 text-[#c69947]" />
              (313) 353-4105
            </a>
          </div>

          <a href="mailto:hello@spectecle.com" className="inline-flex items-center gap-2 text-[var(--site-text-muted)] hover:text-[#c69947] text-sm transition-colors">
            <Mail className="w-4 h-4" />
            hello@spectecle.com
          </a>
        </Reveal>
      </section>

      {/* ── MINI FOOTER ───────────────────────────────────────────────────── */}
      <div className="border-t border-[var(--site-border)] py-6 px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[var(--site-text-muted)] text-xs">
        <Link href="/" className="text-[var(--site-text-muted)] hover:text-[#c69947] transition-colors font-semibold tracking-tight">
          spectecle.com
        </Link>
        <p>© {new Date().getFullYear()} Spectecle SEO & Web Design · All rights reserved.</p>
        <Link href="/privacy" className="hover:text-[var(--site-text-secondary)] transition-colors">Privacy Policy</Link>
      </div>
    </>
  );
}
