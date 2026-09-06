"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, TrendingUp, Award, Users, Quote } from "lucide-react";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { LandingLeadForm } from "@/components/LandingLeadForm";
import { StickyMobileCallBar } from "@/components/StickyMobileCallBar";
import { testimonials } from "@/lib/testimonials-data";

const PAGE_PATH = "/services/web-design-detroit";
const SOURCE = "Web Design Detroit Landing Page";
const GOOGLE_REVIEW_URL = "https://g.page/r/CbSs-g26jjLnEBM/review";

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const outcomes = [
  {
    label: "More calls, more booked appointments",
    desc: "A site built around one job: turning the people already searching for you into people who reach out. Clear paths to call or contact you, on every page.",
    Icon: TrendingUp,
  },
  {
    label: "A site that looks as established as you are",
    desc: "No templates, no drag-and-drop builders. A custom design that matches the standard you already hold your business to, so visitors trust you the second the page loads.",
    Icon: Award,
  },
  {
    label: "Stop losing customers to competitors who rank higher",
    desc: "Fast load times, proper structure, and local SEO built in from day one, so you show up when someone nearby searches for what you do.",
    Icon: Users,
  },
];

const faqs = [
  {
    q: "What happens after I submit the form?",
    a: "We reply within one business day, usually sooner. No hard sell: we'll ask a few questions about your business and goals, then give you honest advice and a clear, itemized plan. If we're not the right fit, we'll tell you that too.",
  },
  {
    q: "How much does a website cost for a small business?",
    a: "Web design costs vary based on scope and goals. Simple brochure sites, custom web applications, and e-commerce stores each have different requirements. We provide transparent, itemized quotes after a free 30-minute discovery call. No hidden fees, no surprises.",
  },
  {
    q: "How long does it take to build a website?",
    a: "Most custom websites take a few weeks from kickoff to launch. Simpler brochure sites move faster. Timeline depends on feedback turnaround and the complexity of integrations required.",
  },
  {
    q: "Do you build websites with SEO built in?",
    a: "Yes. Every site we build includes on-page SEO from day one: proper heading structure, schema markup, fast load times, and Core Web Vitals optimization. SEO is not an afterthought.",
  },
];

const featuredTestimonials = testimonials.filter((t) =>
  ["Hassan MB", "Ali Saab", "Tim Kwiatkowski"].includes(t.name)
);

export default function WebDesignDetroitPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="pt-[176px] pb-14 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-14 items-start">
          <div className="max-w-2xl">
            <nav className="flex items-center gap-2 text-xs text-[var(--site-text-muted)] mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[var(--site-text-primary)] transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/services" className="hover:text-[var(--site-text-primary)] transition-colors">Services</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[var(--site-text-secondary)]">Web Design & Development</span>
            </nav>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 text-6xl md:text-7xl font-light text-[var(--site-text-primary)] leading-[1.05]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              A website that turns clicks into <span className="italic text-[#9a5423]">clients.</span>
            </motion.h1>

            <p className="mt-6 text-[var(--site-text-secondary)] text-lg md:text-xl leading-relaxed">
              Custom-built, fast-loading, and designed to convert the traffic you&apos;re already paying
              for. Tell us about your business below, we&apos;ll tell you exactly what it needs.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-[var(--site-text-muted)]">
              <span>Serving Metro Detroit &amp; Oakland County</span>
              <span className="hidden sm:inline text-[var(--site-border)]">|</span>
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#9a5423] hover:underline font-medium"
              >
                Read our Google reviews
              </a>
              <span className="hidden sm:inline text-[var(--site-border)]">|</span>
              <span>Reply within 1 business day</span>
            </div>
          </div>

          <Reveal delay={0.15}>
            <LandingLeadForm id="lead-form" pagePath={PAGE_PATH} source={SOURCE} />
          </Reveal>
        </div>
      </section>

      {/* ── CATCHPHRASE ──────────────────────────────── */}
      <section className="py-16 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-light text-[var(--site-text-primary)] leading-[1.15]" style={{ fontFamily: "var(--font-serif)" }}>
              Built once. Built right. <span className="italic text-[#9a5423]">Built to convert.</span>
            </h2>
          </Reveal>
        </div>
      </section>

      {/* ── OUTCOMES ─────────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-14 text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              What you actually get.
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-6">
            {outcomes.map((o, i) => (
              <Reveal key={o.label} delay={i * 0.08}>
                <div className="group border border-[var(--site-border)] p-6 h-full hover:border-[#9a5423]/50 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-[#9a5423]/10 flex items-center justify-center mb-4 group-hover:bg-[#9a5423]/20 transition-colors">
                    <o.Icon className="w-5 h-5 text-[#9a5423]" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-[var(--site-text-primary)] font-semibold mb-2">{o.label}</h3>
                  <p className="text-[var(--site-text-muted)] text-sm leading-relaxed">{o.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2} className="mt-12 text-center">
            <a
              href="#lead-form"
              className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get My Free Quote
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── STORY ────────────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)] bg-[var(--site-surface)]">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">Why Spectecle</span>
            <h2 className="mt-4 text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              Not another web design mill.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="mt-6 space-y-5 text-[var(--site-text-secondary)] leading-relaxed">
            <p>
              Spectecle grew out of hands-on experience in enterprise IT and systems engineering,
              learning firsthand what makes software perform, scale, and stay secure under real-world
              conditions. That background shapes everything we build, including yours.
            </p>
            <p>
              We built Spectecle specifically to serve businesses that are often underserved by the
              industry: medical and legal practices that need a digital presence as precise as their
              work, contractors who do excellent work but show up nowhere on Google, and owners who are
              tired of agencies that hand off their site to a junior designer and an offshore team.
            </p>
            <p>
              Small enough to care about every detail. Senior enough to get it right the first time.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────── */}
      {featuredTestimonials.length > 0 && (
        <section className="py-14 px-6 border-t border-[var(--site-border)]">
          <div className="max-w-5xl mx-auto">
            <Reveal className="mb-10 text-center">
              <h2 className="text-3xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
                What clients say.
              </h2>
            </Reveal>
            <div className="grid sm:grid-cols-3 gap-6">
              {featuredTestimonials.map((t, i) => (
                <Reveal key={t.name} delay={i * 0.08}>
                  <div className="border border-[var(--site-border)] p-6 h-full">
                    <Quote className="w-5 h-5 text-[#9a5423]/50 mb-3" />
                    <p className="text-[var(--site-text-secondary)] text-sm leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                    <p className="text-[var(--site-text-primary)] text-sm font-semibold">{t.name}</p>
                    <p className="text-[var(--site-text-muted)] text-xs">{t.role}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── VISUAL BREAK ──────────────────────────────── */}
      <section className="relative h-[50vh] min-h-[340px] overflow-hidden border-t border-[var(--site-border)]">
        <Image
          src="/hero/detroit-office.jpg"
          alt="A lit office workspace inside a modern Detroit building at dusk"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-5xl mx-auto px-6 pb-14 w-full">
            <Reveal>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-3">Built In-House</p>
              <h2 className="text-3xl md:text-5xl font-light text-white max-w-2xl leading-[1.15]" style={{ fontFamily: "var(--font-serif)" }}>
                Every project shaped by real people, not a template.
              </h2>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-3xl mx-auto">
          <Reveal className="mb-14">
            <h2 className="text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>Common questions.</h2>
          </Reveal>
          <Reveal>
            <FAQAccordion faqs={faqs} />
          </Reveal>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-[var(--site-border)] pb-32 md:pb-20">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
          <Reveal>
            <h2 className="text-5xl md:text-6xl font-light text-[var(--site-text-primary)] leading-[1.1]" style={{ fontFamily: "var(--font-serif)" }}>
              Proven craft. <span className="italic text-[#9a5423]">Built in Detroit.</span>
            </h2>
            <p className="mt-6 text-[var(--site-text-secondary)] text-lg max-w-lg">
              Book a free 30-minute strategy call, or fill out the form. Honest advice on what your site
              needs to rank and convert, no hard sell.
            </p>
            <a
              href="tel:+13133534105"
              className="mt-6 inline-flex items-center gap-2 text-lg font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-1"
            >
              (313) 353-4105
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <LandingLeadForm
              pagePath={PAGE_PATH}
              source={SOURCE}
              heading="Ready when you are."
              subheading="Same form, same one-business-day reply."
            />
          </Reveal>
        </div>
      </section>

      <StickyMobileCallBar pagePath={PAGE_PATH} />
    </>
  );
}
