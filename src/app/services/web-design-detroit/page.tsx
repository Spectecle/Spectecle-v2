"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, CheckCircle2 } from "lucide-react";

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

const features = [
  { label: "Custom UI/UX Design", desc: "Built around your brand and how visitors actually move through it." },
  { label: "Next.js & React Development", desc: "Fast, SEO-ready builds that score green on Core Web Vitals." },
  { label: "E-commerce & CMS", desc: "Shopify, WooCommerce, and headless CMS builds that grow with you." },
  { label: "Ongoing Maintenance", desc: "Fast, secure, and current, every month, without the overhead." },
];

const deliverables = [
  "Brand strategy & visual identity",
  "Full-stack development & CMS integration",
  "Analytics & conversion tracking",
  "Launch support & optimization",
];

const stats = [
  { value: "2–4 wks", label: "Avg. build time" },
  { value: "In-house", label: "No offshore teams" },
  { value: "SEO-ready", label: "Every build" },
  { value: "24hr", label: "Response guarantee" },
];

const faqs = [
  {
    q: "How much does a website cost?",
    a: "Every quote is custom scoped to your goals. Free 30-minute discovery call, no hidden fees.",
  },
  {
    q: "How long does a build take?",
    a: "Most custom sites launch in a few weeks. Timeline depends on feedback speed and scope.",
  },
  {
    q: "Is SEO built in from day one?",
    a: "Yes. Heading structure, schema, speed, and Core Web Vitals are never an afterthought.",
  },
];

export default function WebDesignDetroitPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="pt-[176px] pb-14 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
          <div className="max-w-2xl">
            <nav className="flex items-center gap-2 text-xs text-[var(--site-text-muted)] mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[var(--site-text-primary)] transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/services" className="hover:text-[var(--site-text-primary)] transition-colors">Services</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[var(--site-text-secondary)]">Web Design & Development</span>
            </nav>

            <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-[0.25em]">
              Web Design & Development · Serving Businesses Nationwide
            </span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 text-6xl md:text-7xl font-light text-[var(--site-text-primary)] leading-[1.05]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Web Design & <span className="italic text-[#9a5423]">Development</span> that performs.
            </motion.h1>

            <p className="mt-6 text-[var(--site-text-secondary)] text-lg md:text-xl leading-relaxed">
              Custom websites built to rank, load fast, and convert. No templates, no offshore teams.
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
            <div className="relative aspect-[4/3] overflow-hidden border border-[var(--site-border)]">
              <Image
                src="https://images.unsplash.com/photo-1487523117656-d5d117ad47c5?q=80&w=1600&auto=format&fit=crop"
                alt="Modern web design workspace"
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
              Built once. Built right. <span className="italic text-[#9a5423]">Built to convert.</span>
            </h2>
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

      {/* ── DELIVERABLES ─────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <Reveal>
            <h2 className="text-4xl font-light text-[var(--site-text-primary)] mb-3" style={{ fontFamily: "var(--font-serif)" }}>
              What you walk away with.
            </h2>
            <ul className="mt-8 space-y-3">
              {deliverables.map((d) => (
                <li key={d} className="flex items-center gap-3 text-sm text-[var(--site-text-secondary)]">
                  <CheckCircle2 className="w-4 h-4 text-[#9a5423] shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-0.5">
                Start Your Project
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-light text-[#9a5423]" style={{ fontFamily: "var(--font-serif)" }}>{s.value}</div>
                  <div className="text-xs text-[var(--site-text-muted)] mt-1">{s.label}</div>
                </div>
              ))}
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
              { title: "SEO & Digital Marketing", desc: "A great website needs to be found. We handle search rankings too.", href: "/services/seo-agency-detroit" },
              { title: "AI & Automation", desc: "Automate lead follow-up, customer support, and internal workflows.", href: "/services/ai-automation" },
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
              Proven craft. <span className="italic text-[#9a5423]">Nationwide reach.</span>
            </h2>
            <p className="mt-6 text-[var(--site-text-secondary)] text-lg max-w-xl mx-auto">
              Book a free 30-minute strategy call. Honest advice on what your site needs to rank and convert.
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
