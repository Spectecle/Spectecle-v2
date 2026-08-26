"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

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

const expertise = [
  {
    n: "01",
    title: "Web Design & Development",
    desc: "Custom websites built for speed, search rankings, and real conversions. Design and development happen in the same room, with no translation layers in between.",
  },
  {
    n: "02",
    title: "SEO",
    desc: "Local SEO that puts you in front of customers searching in your city. Technical audits, content, and link building, tracked with real numbers, not vanity metrics.",
  },
  {
    n: "03",
    title: "Ad Campaigns",
    desc: "Paid search and social campaigns built to convert, not just get clicks. Every dollar tracked back to real leads and revenue, never vanity impressions.",
  },
  {
    n: "04",
    title: "AI & Automation",
    desc: "Custom AI agents built from scratch, trained on your services, connected to your CRM, and tested until they actually work. Not a chatbot plugin.",
  },
];

const values = [
  {
    title: "Results over aesthetics",
    desc: "A beautiful site that doesn't rank or convert is an expensive decoration. Every design decision is made with your business goal in mind: more leads, more bookings, more revenue.",
  },
  {
    title: "You work with the team",
    desc: "No account managers. No handoffs. No translating your requirements through layers of agency bureaucracy. You talk directly to the people who design, develop, and deploy your project.",
  },
  {
    title: "Transparency by default",
    desc: "No jargon, no mystery metrics, no inflated reports. You'll always know exactly what's being built, why it's being built, and what it's actually producing for your business.",
  },
  {
    title: "Long-term thinking",
    desc: "The tactics that generate results today (modern web architecture, compounding SEO, intelligent automation) are the same ones that hold up in three years. No growth hacks, no shortcuts.",
  },
];

const industries = [
  "Photography Studios",
  "E-commerce & Retail",
  "Drywall & Contractors",
  "Glass & Home Services",
  "Medical & Sports Clinics",
  "IT & Technology Companies",
  "Makeup Artists & Beauty Studios",
  "Law Firms & Attorneys",
];

export default function AboutPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────── */}
      <section className="pt-[260px] pb-14 px-6">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-[0.25em]">
            About Spectecle · Serving Businesses Nationwide
          </span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-6xl md:text-7xl font-light text-[var(--site-text-primary)] leading-[1.05]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Small team. <span className="italic text-[#9a5423]">Serious results.</span>
          </motion.h1>

          <p className="mt-6 text-[var(--site-text-secondary)] text-lg leading-relaxed max-w-lg">
            Spectecle is a web design, SEO, and AI automation agency. Every project is
            handled by a small, senior team, no account managers, no outsourced work,
            no handoffs.
          </p>

          <div className="mt-10 flex flex-wrap gap-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-0.5"
            >
              Work With Us
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)] transition-colors"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* ── EXPERTISE ─────────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-14">
            <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">
              What We Bring
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              Four disciplines. One agency.
            </h2>
          </Reveal>

          <div className="divide-y divide-[var(--site-border)]">
            {expertise.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.08}>
                <div className="grid md:grid-cols-[80px_1fr] items-start gap-4 py-8">
                  <span className="text-sm text-[var(--site-text-muted)] font-mono">{e.n}</span>
                  <div>
                    <h3 className="text-[var(--site-text-primary)] font-semibold text-xl mb-2" style={{ fontFamily: "var(--font-sans)" }}>
                      {e.title}
                    </h3>
                    <p className="text-[var(--site-text-secondary)] text-sm leading-relaxed max-w-2xl">{e.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORY ─────────────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">Our Story</span>

          <div className="mt-5 space-y-5 text-[var(--site-text-secondary)] leading-relaxed">
            <p>
              Spectecle grew out of hands-on experience in enterprise IT and systems
              engineering, learning firsthand what makes software perform, scale, and
              stay secure under real-world conditions. That background shapes everything
              we build.
            </p>
            <p>
              Spectecle was built specifically to serve the kinds of businesses that are
              often underserved by the industry: six-figure retailers converting their
              operations to e-commerce, top makeup artists trying to get off Instagram
              DMs, law firms competing in one of the most aggressive SEO verticals in
              existence, medical and sports clinics that need a digital presence as
              precise as their practice, and contractors who do excellent work but show
              up nowhere on Google.
            </p>
            <p>
              The AI piece adds a layer almost no web agency can match. When a client
              needs an AI intake agent, we build it from scratch: trained on their
              specific services, integrated with their CRM, routed through their
              existing tools. Not a widget. Actual automation that saves real team hours
              and compounds over time.
            </p>
          </div>
        </div>
      </section>

      {/* ── VISUAL BREAK ──────────────────────────────── */}
      <section className="relative h-[50vh] min-h-[340px] overflow-hidden border-t border-[var(--site-border)]">
        <Image
          src="https://images.unsplash.com/photo-1774477178005-bff823e43be8?q=80&w=2000&auto=format&fit=crop"
          alt="Warm, considered interior at golden hour"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-5xl mx-auto px-6 pb-14 w-full">
            <Reveal>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-3">How We Work</p>
              <h2 className="text-3xl md:text-5xl font-light text-white max-w-2xl leading-[1.15]" style={{ fontFamily: "var(--font-serif)" }}>
                Small enough to care about every detail. Senior enough to get it right the first time.
              </h2>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── VALUES ────────────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-14">
            <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">
              How Spectecle Works
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              The principles behind every project.
            </h2>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.07}>
                <div>
                  <h3 className="text-[var(--site-text-primary)] font-semibold text-lg mb-2" style={{ fontFamily: "var(--font-sans)" }}>
                    {v.title}
                  </h3>
                  <p className="text-[var(--site-text-secondary)] text-sm leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROOF ─────────────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">
              Real Work. Real Clients. Real Results.
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              Every case study is a business we&apos;ve helped grow.
            </h2>
            <p className="mt-4 text-[var(--site-text-secondary)] max-w-xl mx-auto">
              From top makeup artists and law firms to e-commerce retailers,
              medical clinics, and contractors, the industries are different, the approach
              is the same: build something that performs, ranks, and grows your business.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3">
              {industries.map((ind) => (
                <Link
                  key={ind}
                  href="/work"
                  className="text-sm text-[var(--site-text-secondary)] hover:text-[#9a5423] transition-colors"
                >
                  {ind}
                </Link>
              ))}
            </div>

            <div className="mt-10">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-0.5"
              >
                View the full portfolio
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-[var(--site-border)]">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              Let&apos;s build something <span className="italic text-[#9a5423]">worth talking about.</span>
            </h2>
            <p className="mt-6 text-[var(--site-text-secondary)] text-lg max-w-xl mx-auto">
              Free 30-minute strategy call. No sales pitch, just an honest
              conversation about what it would take to grow your business.
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
