"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, CheckCircle2, Quote } from "lucide-react";

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

const practiceAreas = [
  "Family Law",
  "Personal Injury",
  "Estate Planning & Probate",
  "Criminal Defense",
  "Business & Corporate Law",
  "Immigration Law",
  "Real Estate Law",
  "Bankruptcy Law",
];

const features = [
  { label: "Authority-First Design", desc: "Layouts built around credentials and case results, so visitors trust you before they call." },
  { label: "Practice Area Pages", desc: "A dedicated, SEO-structured page for every area you practice." },
  { label: "Consultation-Focused Forms", desc: "Low-friction intake built to convert a nervous first-time visitor." },
  { label: "Legal Schema & Structured Data", desc: "Markup that helps search engines surface your practice correctly." },
];

const deliverables = [
  "Custom-designed, fully responsive site",
  "Practice area pages built around search intent",
  "Attorney profile & credentials pages",
  "Legal schema & structured data markup",
];

const process = [
  { step: "Discovery", desc: "We learn your practice areas and ideal client." },
  { step: "Design", desc: "A custom direction built around authority and trust." },
  { step: "Development", desc: "Built from scratch in Next.js: fast and structured for search." },
  { step: "Launch & Care", desc: "A supported launch, then ongoing updates." },
];

const faqs = [
  {
    q: "How is a law firm website different?",
    a: "Visitors are often searching during a stressful moment. Your site has to establish credibility and a clear path to consultation, immediately.",
  },
  {
    q: "Do you design for solo attorneys or only large firms?",
    a: "Both. The same principles apply regardless of size: clear practice pages, strong credibility signals, and a consultation flow that converts.",
  },
  {
    q: "Do you follow attorney advertising rules?",
    a: "We build around the content and disclosures you provide, but recommend your own bar review before launch.",
  },
];

export default function LawFirmWebsiteDesignPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="pt-[176px] pb-14 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
          <div>
            <nav className="flex items-center gap-2 text-xs text-[var(--site-text-muted)] mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[var(--site-text-primary)] transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/services" className="hover:text-[var(--site-text-primary)] transition-colors">Services</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[var(--site-text-secondary)]">Law Firm Website Design</span>
            </nav>

            <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-[0.25em]">
              Law Firm & Attorney Websites · Serving Firms Nationwide
            </span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 text-5xl md:text-6xl font-light text-[var(--site-text-primary)] leading-[1.08]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Law firm website design <span className="italic text-[#9a5423]">built to earn trust.</span>
            </motion.h1>

            <p className="mt-6 text-[var(--site-text-secondary)] text-lg md:text-xl leading-relaxed">
              Custom-built websites for attorneys, designed to turn a stressful search into a booked consultation.
            </p>

            <div className="mt-8 flex flex-wrap gap-8">
              <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-0.5">
                Get a Free Quote
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link href="/work" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)] transition-colors">
                View Our Work <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <Reveal delay={0.15}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1619771678310-9f1e06085d86?q=80&w=1600&auto=format&fit=crop"
                alt="Elegant law library bookshelves"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CATCHPHRASE ──────────────────────────────── */}
      <section className="py-16 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-light text-[var(--site-text-primary)] leading-[1.15]" style={{ fontFamily: "var(--font-serif)" }}>
              Trust is won <span className="italic text-[#9a5423]">in the first five seconds.</span>
            </h2>
          </Reveal>
        </div>
      </section>

      {/* ── PRACTICE AREAS ───────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">Practice Areas</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-[var(--site-text-primary)] mb-8" style={{ fontFamily: "var(--font-serif)" }}>
              Built for every area of practice.
            </h2>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
              {practiceAreas.map((area) => (
                <span key={area} className="text-[var(--site-text-secondary)] text-sm">
                  {area}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-14">
            <h2 className="text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>What&apos;s included.</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {features.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.07}>
                <h3 className="text-[var(--site-text-primary)] font-semibold mb-2 text-sm">{f.label}</h3>
                <p className="text-[var(--site-text-muted)] text-sm leading-relaxed">{f.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ──────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <Quote className="w-8 h-8 text-[#9a5423] mx-auto mb-6" strokeWidth={1.5} />
            <blockquote
              className="text-2xl md:text-3xl font-light text-[var(--site-text-primary)] leading-snug"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              &ldquo;Working with Spectecle was hands down the best investment I made for my firm. Within a few months I was getting consultation requests from clients who found me on Google.&rdquo;
            </blockquote>
            <p className="mt-6 text-sm font-semibold text-[var(--site-text-primary)]">Neda Mohiedeen</p>
            <p className="text-xs text-[var(--site-text-muted)]">Attorney, MI Family Lawyer</p>
          </Reveal>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-14">
            <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">How We Work</span>
            <h2 className="mt-4 text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              A clear process, start to finish.
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.07}>
                <span className="text-xs text-[var(--site-text-muted)] font-mono">0{i + 1}</span>
                <h3 className="mt-2 text-[var(--site-text-primary)] font-semibold mb-2 text-sm">{p.step}</h3>
                <p className="text-[var(--site-text-muted)] text-sm leading-relaxed">{p.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DELIVERABLES ─────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-4xl font-light text-[var(--site-text-primary)] mb-8" style={{ fontFamily: "var(--font-serif)" }}>
              What you walk away with.
            </h2>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3 max-w-3xl">
              {deliverables.map((d) => (
                <li key={d} className="flex items-center gap-3 text-sm text-[var(--site-text-secondary)]">
                  <CheckCircle2 className="w-4 h-4 text-[#9a5423] shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-0.5">
                Start Your Firm&apos;s Website
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-3xl mx-auto">
          <Reveal className="mb-14">
            <h2 className="text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>Common questions.</h2>
          </Reveal>
          <div className="divide-y divide-[var(--site-border)]">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="py-7">
                  <h3 className="text-[var(--site-text-primary)] font-semibold mb-3">{faq.q}</h3>
                  <p className="text-[var(--site-text-secondary)] text-sm leading-relaxed">{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED SERVICES ─────────────────────────── */}
      <section className="py-12 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-8">
            <h2 className="text-2xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>Pair it with</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8 max-w-2xl">
            {[
              { title: "SEO for Law Firms", desc: "Rank for the searches your future clients are actually typing.", href: "/services/seo-agency-detroit" },
              { title: "AI & Automation", desc: "Automate intake and after-hours consultation requests.", href: "/services/ai-automation" },
            ].map((s) => (
              <Reveal key={s.title}>
                <Link href={s.href} className="group block">
                  <h3 className="text-[var(--site-text-primary)] font-semibold mb-2 group-hover:text-[#9a5423] transition-colors">{s.title}</h3>
                  <p className="text-[var(--site-text-muted)] text-sm leading-relaxed">{s.desc}</p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#9a5423]">
                    Learn more <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-[var(--site-border)]">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              Represent your firm <span className="italic text-[#9a5423]">the way it deserves.</span>
            </h2>
            <p className="mt-6 text-[var(--site-text-secondary)] text-lg max-w-xl mx-auto">
              Book a free strategy call. Honest advice on what your firm&apos;s site needs to earn trust and win consultations.
            </p>
            <div className="mt-10">
              <Link href="/contact" className="inline-flex items-center gap-2 text-lg font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-1">
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
