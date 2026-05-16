"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Monitor, Globe, Cpu } from "lucide-react";

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
    Icon: Monitor,
    years: "12 Years",
    title: "IT Systems Engineering",
    desc: "Built and maintained enterprise infrastructure for a decade-plus before pivoting to the web. That background lives in every site Spectecle ships — performance architecture, server-side rendering, security, and uptime that most web designers simply don't know to think about.",
  },
  {
    Icon: Globe,
    years: "10 Years",
    title: "Web Design & Development",
    desc: "Self-taught. Started by building his own website from scratch, kept going until he was outperforming agencies that charged multiples of what he was doing it for. Every line of code at Spectecle is written by the same person who talks to the client.",
  },
  {
    Icon: Cpu,
    years: "4 Years",
    title: "AI & Automation",
    desc: "Working with large language models and workflow automation before it was mainstream. When Spectecle deploys an AI intake agent, it's built from scratch — trained on the client's services, integrated with their CRM, tested until it works. Real automation, not a chatbot plugin.",
  },
];

const values = [
  {
    title: "Results over aesthetics",
    desc: "A beautiful site that doesn't rank or convert is an expensive decoration. Every design decision is made with your business goal in mind — more leads, more bookings, more revenue.",
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
    desc: "The tactics that generate results today — modern web architecture, compounding SEO, intelligent automation — are the same ones that hold up in three years. No growth hacks, no shortcuts.",
  },
];

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "$5.4M+", label: "Revenue Generated" },
  { value: "98%", label: "Client Retention" },
  { value: "3×", label: "Avg Traffic Growth" },
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
  "E-commerce & Retail",
  "Beauty Studios & Makeup Artists",
  "Law Firms & Attorneys",
  "Medical & Healthcare Clinics",
  "Contractors & Home Services",
  "IT & Technology Companies",
];

export default function AboutPage() {
  return (
    <>
      {/* ── HERO — SPLIT LAYOUT ──────────────────────── */}
      <section className="relative pt-32 pb-0 px-6 overflow-hidden">
        {/* Background elements */}
        <div
          className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(210,81,36,0.1) 0%, transparent 65%)" }}
        />
        <div className="absolute inset-0 dot-pattern opacity-25 pointer-events-none" />

        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center pb-0 lg:pb-0">

            {/* ── Left: Text content ── */}
            <div className="pt-8 lg:pt-0">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#D25124]/20 text-sm text-[#F07A3A] font-medium mb-8"
              >
                <span className="w-2 h-2 rounded-full bg-[#F07A3A]" />
                Founder-Led · Detroit, MI
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="text-5xl md:text-6xl font-bold text-white leading-tight"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Hi, I&apos;m{" "}
                <span className="gradient-text">Walid.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.18 }}
                className="mt-5 text-slate-400 text-lg leading-relaxed max-w-lg"
              >
                Web developer. IT systems engineer. AI practitioner. Landscape photographer.
                And the founder of Spectecle — a Detroit-based agency that builds digital
                experiences that actually grow businesses.
              </motion.p>

              {/* Experience badges */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                {[
                  { val: "10 yrs", lbl: "Web Dev" },
                  { val: "12 yrs", lbl: "IT Engineering" },
                  { val: "4 yrs", lbl: "AI & Automation" },
                ].map((b) => (
                  <div
                    key={b.lbl}
                    className="flex items-center gap-2 px-4 py-2 glass rounded-xl border border-white/8"
                  >
                    <span
                      className="text-base font-bold gradient-text"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      {b.val}
                    </span>
                    <span className="text-slate-500 text-xs">{b.lbl}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.38 }}
                className="mt-10 flex flex-col sm:flex-row gap-3"
              >
                <Link
                  href="/contact"
                  className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-semibold cursor-pointer"
                >
                  <span>Work With Me</span>
                  <ArrowUpRight className="w-4 h-4 relative z-10" />
                </Link>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-semibold text-slate-300 hover:text-white glass hover:border-white/15 border border-white/8 transition-all duration-300 cursor-pointer"
                >
                  View My Work
                </Link>
              </motion.div>
            </div>

            {/* ── Right: Photo ── */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Glow behind photo */}
              <div
                className="absolute -inset-4 rounded-3xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 60% 40%, rgba(210,81,36,0.18) 0%, transparent 70%)",
                }}
              />

              {/* Photo frame */}
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl shadow-black/60">
                <Image
                  src="/walid.jpg"
                  alt="Walid Alhassan — Founder of Spectecle, Detroit web design & SEO agency"
                  fill
                  className="object-cover object-top"
                  style={{
                    filter: "brightness(1.04) contrast(1.08) saturate(0.82)",
                  }}
                  priority
                />
                {/* Subtle bottom-to-top gradient for card overlap */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090f]/70 via-[#09090f]/10 to-transparent" />
              </div>

              {/* Floating stats card over bottom of photo */}
              <div className="absolute bottom-6 left-6 right-6 glass rounded-2xl px-5 py-4 border border-white/12 backdrop-blur-md">
                <div className="grid grid-cols-4 gap-3">
                  {stats.map((s) => (
                    <div key={s.label} className="text-center">
                      <div
                        className="text-lg font-bold gradient-text leading-tight"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {s.value}
                      </div>
                      <p className="text-slate-500 text-[10px] mt-0.5 leading-tight">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── EXPERTISE PILLARS ────────────────────────── */}
      <section className="py-20 px-6 border-t border-white/6 mt-16">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-12">
            <span className="text-xs font-semibold text-[#F07A3A] uppercase tracking-widest">
              The Background
            </span>
            <h2
              className="mt-3 text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Three disciplines. One agency.
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-5">
            {expertise.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.08}>
                <div className="glass rounded-2xl p-7 border border-white/6 hover:border-[#D25124]/20 transition-colors duration-300 h-full">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-10 h-10 rounded-xl bg-[#D25124]/10 flex items-center justify-center">
                      <e.Icon className="w-5 h-5 text-[#F07A3A]" />
                    </div>
                    <span className="text-xs font-bold text-[#F07A3A] uppercase tracking-widest">
                      {e.years}
                    </span>
                  </div>
                  <h3
                    className="text-white font-bold text-lg mb-3 leading-snug"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {e.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{e.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORY + PROFILE CARD ─────────────────────── */}
      <section className="py-24 px-6 border-t border-white/6 bg-[#09090f]">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-[340px_1fr] gap-14 items-start">

            {/* Profile card with photo thumbnail */}
            <Reveal>
              <div className="glass rounded-3xl border border-white/6 overflow-hidden lg:sticky lg:top-28">
                {/* Card photo header */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src="/walid.jpg"
                    alt="Walid Alhassan"
                    fill
                    className="object-cover object-top"
                    style={{ filter: "brightness(1.04) contrast(1.08) saturate(0.82)" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d1a] via-[#0d0d1a]/20 to-transparent" />
                </div>

                {/* Card info */}
                <div className="p-7 -mt-2">
                  <h2
                    className="text-2xl font-bold text-white"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Walid Alhassan
                  </h2>
                  <p className="text-[#F07A3A] font-semibold mt-0.5 text-sm">
                    Founder & Lead Strategist
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Detroit, MI — Metro Detroit & Nationwide
                  </p>

                  {/* Services */}
                  <div className="mt-6 pt-5 border-t border-white/6">
                    <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-3">
                      Services
                    </p>
                    <div className="space-y-2">
                      {services.map((s) => (
                        <div key={s} className="flex items-center gap-2.5 text-sm text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-[#F07A3A]" />
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Industries */}
                  <div className="mt-5 pt-5 border-t border-white/6">
                    <p className="text-[10px] text-slate-600 uppercase tracking-widest mb-3">
                      Industries
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {industries.map((ind) => (
                        <span
                          key={ind}
                          className="px-2.5 py-1 rounded-full bg-white/4 border border-white/6 text-slate-400 text-xs"
                        >
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link
                      href="/contact"
                      className="btn-primary flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-semibold cursor-pointer"
                    >
                      <span>Work With Me</span>
                      <ArrowUpRight className="w-4 h-4 relative z-10" />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Story */}
            <Reveal delay={0.1}>
              <div>
                <span className="text-xs font-semibold text-[#F07A3A] uppercase tracking-widest">
                  The Story
                </span>

                <div className="mt-5 space-y-5 text-slate-400 leading-relaxed">
                  <p>
                    Walid Alhassan spent the first chapter of his career on the infrastructure side
                    of technology — 12 years as an IT systems engineer, building and maintaining the
                    servers, networks, and systems that businesses depend on. That work taught him
                    something most web designers never learn: what actually makes software perform,
                    scale, and stay secure under real-world conditions.
                  </p>

                  <p>
                    He taught himself web development while working in IT — not through a bootcamp,
                    but by building his own personal website from scratch and figuring out everything
                    that made it better. What started as a side project turned into a second career.
                    He realized he was building cleaner, faster, more effective sites than agencies
                    charging multiples of what he was producing independently.
                  </p>

                  <p>
                    Spectecle was built specifically to serve the kinds of businesses that are often
                    underserved by the industry — six-figure retailers converting their operations to
                    e-commerce, top makeup artists in Detroit trying to get off Instagram DMs, law
                    firms competing in one of the most aggressive SEO verticals in existence, medical
                    and sports clinics that need a digital presence as precise as their practice, and
                    contractors who do excellent work but show up nowhere on Google.
                  </p>

                  <p>
                    The AI piece — four years deep into working with large language models and
                    workflow automation — adds a layer almost no Detroit-area web agency can match.
                    When a client needs an AI intake agent, Walid builds it from scratch: trained on
                    their specific services, integrated with their CRM, routed through their existing
                    tools. Not a widget. Actual automation that saves real team hours and compounds
                    over time.
                  </p>

                  <p>
                    Outside of building digital products, Walid is a landscape photographer —
                    traveling the country&apos;s national parks and capturing the American wilderness
                    on camera. It&apos;s the same discipline: patience, attention to light, knowing
                    what to keep and what to cut. That eye for composition and detail carries directly
                    into how he approaches visual design — which is why Spectecle&apos;s work tends
                    to look different from what most agencies produce.
                  </p>
                </div>

                {/* Pull quote */}
                <div className="mt-10 pl-5 border-l-2 border-[#D25124]/40">
                  <p className="text-white text-lg font-light italic leading-relaxed">
                    &ldquo;Most web designers don&apos;t understand infrastructure. Most IT engineers
                    can&apos;t design. I spent 12 years on one side and built my way to the other —
                    and that combination is what makes Spectecle different.&rdquo;
                  </p>
                  <p className="mt-3 text-slate-500 text-sm">— Walid Alhassan, Founder</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal className="text-center mb-14">
            <span className="text-xs font-semibold text-[#F07A3A] uppercase tracking-widest">
              How Spectecle Works
            </span>
            <h2
              className="mt-3 text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              The principles behind every project
            </h2>
            <p className="mt-4 text-slate-400 max-w-xl mx-auto">
              These aren&apos;t agency buzzwords. They&apos;re the rules Walid built Spectecle
              around after watching how most agencies actually operate.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.07}>
                <div className="glass rounded-2xl p-7 border border-white/6 hover:border-[#D25124]/20 transition-colors duration-300 h-full">
                  <h3
                    className="text-white font-bold text-lg mb-3"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {v.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROOF STRIP ──────────────────────────────── */}
      <section className="py-16 px-6 bg-[#09090f] border-t border-white/6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-10">
              <span className="text-xs font-semibold text-[#F07A3A] uppercase tracking-widest">
                Real Work. Real Clients. Real Results.
              </span>
              <h2
                className="mt-3 text-2xl font-bold text-white"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Every case study is a business Walid personally worked on.
              </h2>
              <p className="mt-3 text-slate-500 text-sm max-w-xl mx-auto">
                From top Detroit makeup artists and Michigan law firms to e-commerce retailers,
                medical clinics, and contractors — the industries are different, the approach
                is the same: build something that performs, ranks, and grows your business.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Photography Studios",
                "E-commerce & Retail",
                "Drywall & Contractors",
                "Glass & Home Services",
                "Medical & Sports Clinics",
                "IT & Technology Companies",
                "Makeup Artists & Beauty Studios",
                "Law Firms & Attorneys",
              ].map((ind) => (
                <Link
                  key={ind}
                  href="/work"
                  className="px-4 py-2 rounded-full glass border border-white/8 text-slate-400 text-sm hover:text-white hover:border-white/20 transition-all duration-200"
                >
                  {ind}
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#F07A3A] hover:gap-3 transition-all duration-200"
              >
                View the full portfolio
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
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
              Let&apos;s build something
              <br />
              <span className="gradient-text">worth talking about.</span>
            </h2>
            <p className="mt-5 text-slate-400 text-lg max-w-xl mx-auto">
              Free 30-minute strategy call with Walid directly. No sales pitch — just an honest
              conversation about what it would take to grow your business.
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
                href="/work"
                className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-slate-300 hover:text-white glass hover:border-white/15 border border-white/8 transition-all duration-300 cursor-pointer"
              >
                View My Work
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
