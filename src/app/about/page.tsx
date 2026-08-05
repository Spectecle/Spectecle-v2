"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

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
    years: "12 Years",
    title: "IT Systems Engineering",
    desc: "Built and maintained enterprise infrastructure for a decade-plus before pivoting to the web. That background lives in every site Spectecle ships: performance architecture, server-side rendering, security, and uptime that most web designers simply don't know to think about.",
  },
  {
    n: "02",
    years: "10 Years",
    title: "Web Design & Development",
    desc: "Self-taught. Started by building his own website from scratch, kept going until he was outperforming agencies that charged multiples of what he was doing it for. Every line of code at Spectecle is written by the same person who talks to the client.",
  },
  {
    n: "03",
    years: "4 Years",
    title: "AI & Automation",
    desc: "Working with large language models and workflow automation before it was mainstream. When Spectecle deploys an AI intake agent, it's built from scratch: trained on the client's services, integrated with their CRM, tested until it works. Real automation, not a chatbot plugin.",
  },
];

const values = [
  {
    title: "Results over aesthetics",
    desc: "A beautiful site that doesn't rank or convert is an expensive decoration. Every design decision is made with your business goal in mind: more leads, more bookings, more revenue.",
  },
  {
    title: "You work with the builder",
    desc: "No account managers. No handoffs. No one translating your requirements through three layers of agency bureaucracy. You talk directly to the person who designs, develops, and deploys your project.",
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

const services = [
  "Custom web design & development",
  "Local SEO & Google Business Profile",
  "Technical SEO & content strategy",
  "AI intake agents & workflow automation",
  "E-commerce design & optimization",
  "Analytics, tracking & reporting setup",
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
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 xl:gap-20 items-end">
          <div>
            <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-[0.25em]">
              Founder-Led · Serving Businesses Nationwide
            </span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-6xl md:text-7xl font-light text-[var(--site-text-primary)] leading-[1.05]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Hi, I&apos;m <span className="italic text-[#c69947]">Walid.</span>
            </motion.h1>

            <p className="mt-6 text-[var(--site-text-secondary)] text-lg leading-relaxed max-w-lg">
              Web developer. IT systems engineer. AI practitioner. Landscape photographer.
              And the founder of Spectecle, an agency that builds digital
              experiences that actually grow businesses.
            </p>

            <div className="mt-8 flex flex-wrap gap-8">
              {[
                { val: "10 yrs", lbl: "Web Dev" },
                { val: "12 yrs", lbl: "IT Engineering" },
                { val: "4 yrs", lbl: "AI & Automation" },
              ].map((b) => (
                <div key={b.lbl}>
                  <span className="text-2xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
                    {b.val}
                  </span>
                  <p className="text-[var(--site-text-muted)] text-xs mt-1">{b.lbl}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-0.5"
              >
                Work With Me
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)] transition-colors"
              >
                View My Work
              </Link>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <Image
              src="/walid.jpg"
              alt="Walid Alhassan, Founder of Spectecle, web design & SEO agency"
              fill
              className="object-cover object-top"
              style={{ filter: "brightness(1.04) contrast(1.08) saturate(0.82)" }}
              priority
            />
          </motion.div>
        </div>
      </section>

      {/* ── EXPERTISE ─────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-14">
            <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">
              The Background
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              Three disciplines. One agency.
            </h2>
          </Reveal>

          <div className="divide-y divide-[var(--site-border)]">
            {expertise.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.08}>
                <div className="grid md:grid-cols-[80px_1fr_100px] items-start gap-4 py-8">
                  <span className="text-sm text-[var(--site-text-muted)] font-mono">{e.n}</span>
                  <div>
                    <h3 className="text-[var(--site-text-primary)] font-semibold text-xl mb-2" style={{ fontFamily: "var(--font-sans)" }}>
                      {e.title}
                    </h3>
                    <p className="text-[var(--site-text-secondary)] text-sm leading-relaxed max-w-2xl">{e.desc}</p>
                  </div>
                  <span className="text-xs font-semibold text-[#c69947] uppercase tracking-widest md:text-right">
                    {e.years}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORY + PROFILE ───────────────────────────── */}
      <section className="py-24 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[300px_1fr] gap-14 items-start">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <div className="relative h-64 overflow-hidden mb-6">
                <Image
                  src="/walid.jpg"
                  alt="Walid Alhassan"
                  fill
                  className="object-cover object-top"
                  style={{ filter: "brightness(1.04) contrast(1.08) saturate(0.82)" }}
                />
              </div>
              <h2 className="text-2xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
                Walid Alhassan
              </h2>
              <p className="text-[#c69947] font-semibold mt-0.5 text-sm">Founder & Lead Strategist</p>
              <p className="text-[var(--site-text-muted)] text-xs mt-0.5">Serving Businesses Nationwide</p>

              <div className="mt-6 pt-5 border-t border-[var(--site-border)]">
                <p className="text-[10px] text-[var(--site-text-muted)] uppercase tracking-widest mb-3">Services</p>
                <div className="space-y-2">
                  {services.map((s) => (
                    <div key={s} className="flex items-center gap-2.5 text-sm text-[var(--site-text-secondary)]">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#c69947]" />
                      {s}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-0.5"
                >
                  Work With Me
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">The Story</span>

              <div className="mt-5 space-y-5 text-[var(--site-text-secondary)] leading-relaxed">
                <p>
                  Walid Alhassan spent the first chapter of his career on the infrastructure side
                  of technology: 12 years as an IT systems engineer, building and maintaining the
                  servers, networks, and systems that businesses depend on. That work taught him
                  something most web designers never learn: what actually makes software perform,
                  scale, and stay secure under real-world conditions.
                </p>
                <p>
                  He taught himself web development while working in IT, not through a bootcamp,
                  but by building his own personal website from scratch and figuring out everything
                  that made it better. What started as a side project turned into a second career.
                  He realized he was building cleaner, faster, more effective sites than agencies
                  charging multiples of what he was producing independently.
                </p>
                <p>
                  Spectecle was built specifically to serve the kinds of businesses that are often
                  underserved by the industry: six-figure retailers converting their operations to
                  e-commerce, top makeup artists trying to get off Instagram DMs, law
                  firms competing in one of the most aggressive SEO verticals in existence, medical
                  and sports clinics that need a digital presence as precise as their practice, and
                  contractors who do excellent work but show up nowhere on Google.
                </p>
                <p>
                  The AI piece, four years deep into working with large language models and
                  workflow automation, adds a layer almost no web agency can match.
                  When a client needs an AI intake agent, Walid builds it from scratch: trained on
                  their specific services, integrated with their CRM, routed through their existing
                  tools. Not a widget. Actual automation that saves real team hours and compounds
                  over time.
                </p>
                <p>
                  Outside of building digital products, Walid is a landscape photographer,
                  traveling the country&apos;s national parks and capturing the American wilderness
                  on camera. It&apos;s the same discipline: patience, attention to light, knowing
                  what to keep and what to cut. That eye for composition and detail carries directly
                  into how he approaches visual design, which is why Spectecle&apos;s work tends
                  to look different from what most agencies produce.
                </p>
              </div>

              <div className="mt-10 pl-6 border-l-2 border-[#c69947]/40">
                <p
                  className="text-[var(--site-text-primary)] text-2xl font-light italic leading-relaxed"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  &ldquo;Most web designers don&apos;t understand infrastructure. Most IT engineers
                  can&apos;t design. I spent 12 years on one side and built my way to the other,
                  and that combination is what makes Spectecle different.&rdquo;
                </p>
                <p className="mt-3 text-[var(--site-text-muted)] text-sm">Walid Alhassan, Founder</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── VALUES ────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-[var(--site-border)]">
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
      <section className="py-24 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">
              Real Work. Real Clients. Real Results.
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              Every case study is a business Walid personally worked on.
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
                  className="text-sm text-[var(--site-text-secondary)] hover:text-[#c69947] transition-colors"
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
      <section className="py-32 px-6 border-t border-[var(--site-border)]">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              Let&apos;s build something <span className="italic text-[#c69947]">worth talking about.</span>
            </h2>
            <p className="mt-6 text-[var(--site-text-secondary)] text-lg max-w-xl mx-auto">
              Free 30-minute strategy call with Walid directly. No sales pitch, just an honest
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
