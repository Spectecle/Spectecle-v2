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
  { label: "Custom AI Agents", desc: "LLM-powered agents built for your business, not a generic chatbot." },
  { label: "Workflow Automation", desc: "End-to-end automation using n8n, Make, Zapier, and custom APIs." },
  { label: "CRM & System Integrations", desc: "Seamless data flow between your platforms. No manual entry." },
  { label: "AI Chatbots", desc: "Context-aware bots for support, sales, and intake." },
];

const deliverables = [
  "AI opportunity assessment",
  "Custom agent development & testing",
  "System integration & deployment",
  "Team training & documentation",
];

const faqs = [
  {
    q: "How can AI automation help my business?",
    a: "It replaces repetitive tasks with intelligent workflows. Most businesses save 5–20 hours per week.",
  },
  {
    q: "What's different about a custom AI agent vs. a chatbot plugin?",
    a: "A custom agent is trained on your services, integrated with your CRM, and handles multi-step tasks.",
  },
  {
    q: "How long does a build take?",
    a: "Simple automations: 1–2 weeks. Custom agents with CRM integration: 3–6 weeks.",
  },
];

export default function AIAutomationPage() {
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
              <span className="text-[var(--site-text-secondary)]">AI & Automation</span>
            </nav>

            <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-[0.25em]">
              Serving Clients Nationwide
            </span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 text-6xl md:text-7xl font-light text-[var(--site-text-primary)] leading-[1.05]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              AI & Workflow <span className="italic text-[#9a5423]">Automation.</span>
            </motion.h1>

            <p className="mt-6 text-[var(--site-text-secondary)] text-lg md:text-xl max-w-2xl leading-relaxed">
              Custom AI agents and automation, trained on your business, tested until they work. Not a chatbot plugin.
            </p>

            <div className="mt-8 flex flex-wrap gap-8">
              <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-0.5">
                Get a Free Assessment
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
                src="https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1600&auto=format&fit=crop"
                alt="Abstract AI neural network"
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
              Every hour automation saves is <span className="italic text-[#9a5423]">an hour spent growing.</span>
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
                Start Your Automation Project
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: "1–6 wks", label: "Build timeline" },
                { value: "n8n / Make", label: "Primary tools" },
                { value: "5–20 hrs", label: "Avg. weekly time saved" },
                { value: "24hr", label: "Response guarantee" },
              ].map((s) => (
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
              { title: "Web Design & Development", desc: "A fast, high-converting site to capture the leads your automation follows up on.", href: "/services/web-design-detroit" },
              { title: "SEO & Digital Marketing", desc: "Drive the organic traffic that feeds your AI-powered intake.", href: "/services/seo-agency-detroit" },
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
              Nationwide reach. <span className="italic text-[#9a5423]">Results-driven.</span>
            </h2>
            <p className="mt-6 text-[var(--site-text-secondary)] text-lg max-w-xl mx-auto">
              Book a free 30-minute call. We&apos;ll identify exactly where automation saves you the most time.
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
