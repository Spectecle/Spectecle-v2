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
  { label: "Custom AI Agents", desc: "LLM-powered agents built for your specific business tasks, not a generic chatbot plugin dropped on your site." },
  { label: "Workflow Automation", desc: "End-to-end process automation using n8n, Make, Zapier, and custom APIs. We build around your existing tools." },
  { label: "CRM & System Integrations", desc: "Seamless data flow between your platforms. No silos, no manual entry, no copy-pasting between tabs." },
  { label: "AI Chatbot Development", desc: "Intelligent, context-aware bots for customer support, sales qualification, and intake, built on your actual services." },
  { label: "Data & Analytics Pipelines", desc: "Automated reporting and real-time insight generation from your business data, delivered on a schedule." },
  { label: "AI Strategy & Consulting", desc: "A practical, honest assessment of where AI will actually save you time and money, not a buzzword pitch." },
];

const deliverables = [
  "AI opportunity assessment & ROI analysis",
  "Automation architecture design",
  "Custom AI agent development & testing",
  "System integration & deployment",
  "Team training & full documentation",
  "Ongoing monitoring & performance optimization",
];

const faqs = [
  {
    q: "What is AI automation and how can it help my business?",
    a: "AI automation replaces time-consuming, repetitive tasks with intelligent workflows. Common examples include automated lead follow-up, AI-powered customer support, automated reporting, CRM data entry, and document processing. For most businesses, automation saves 5–20 hours per week and meaningfully reduces operational costs.",
  },
  {
    q: "What's the difference between a custom AI agent and a chatbot plugin?",
    a: "A chatbot plugin is a generic, pre-built tool that answers basic FAQ-style questions. A custom AI agent is built specifically for your business: trained on your services, integrated with your CRM, and capable of handling complex, multi-step tasks. The difference in capability and outcome is significant.",
  },
  {
    q: "What tools do you use for workflow automation?",
    a: "We build with n8n, Make, Zapier, and custom API integrations depending on what best fits your stack. For AI agents, we use OpenAI and other LLM providers. Every build is designed around your existing tools. We don't force platform switches.",
  },
  {
    q: "How long does it take to build an AI automation system?",
    a: "Simple workflow automations can be built and deployed in 1–2 weeks. Custom AI agents with CRM integration and testing typically take 3–6 weeks. We always start with a scoping session to give you an accurate timeline before any work begins.",
  },
];

export default function AIAutomationPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="pt-[210px] pb-14 px-6">
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
              Custom AI agents and workflow automation built from scratch: trained on your services, integrated with your systems, and tested until they actually work. Not a chatbot plugin.
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
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop"
                alt="AI & Automation"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-14">
            <h2 className="text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>What&apos;s included.</h2>
            <p className="text-[var(--site-text-secondary)] text-base max-w-xl mt-3">
              From scoping to deployment, every automation is built, tested, and documented before handoff.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
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
            <p className="text-[var(--site-text-secondary)] text-base mb-8">
              A working system, full documentation, and a team that knows how to use it.
            </p>
            <ul className="space-y-3">
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
            <p className="text-[var(--site-text-secondary)] text-sm leading-relaxed mb-6">
              We build custom AI agents and workflow automation systems for small and mid-size businesses ready to gain a real competitive edge. Using OpenAI, n8n, and custom API integrations, we help businesses eliminate repetitive tasks, automate customer interactions, and get more done without adding headcount.
            </p>
            <p className="text-[var(--site-text-secondary)] text-sm leading-relaxed">
              Every system is built from scratch and tested against your real workflows before we hand it off.
            </p>
            <div className="mt-8 pt-6 border-t border-[var(--site-border)] grid grid-cols-2 gap-6">
              {[
                { value: "1–6 wks", label: "Build timeline" },
                { value: "n8n / Make", label: "Primary tools" },
                { value: "5–20 hrs", label: "Avg. weekly time saved" },
                { value: "24hr", label: "Response guarantee" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-lg font-light text-[#9a5423]" style={{ fontFamily: "var(--font-serif)" }}>{s.value}</div>
                  <div className="text-xs text-[var(--site-text-muted)] mt-0.5">{s.label}</div>
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
              { title: "Web Design & Development", desc: "A fast, high-converting website to capture the leads your automation will follow up on.", href: "/services/web-design-detroit" },
              { title: "SEO & Digital Marketing", desc: "Drive the organic traffic that feeds your AI-powered intake and follow-up systems.", href: "/services/seo-agency-detroit" },
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

      {/* ── FROM THE BLOG ────────────────────────────── */}
      <section className="py-12 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-8">
            <h2 className="text-2xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>From the Journal</h2>
            <p className="text-[var(--site-text-muted)] text-sm mt-2">Real-world automation strategies from our client work.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8 max-w-3xl">
            {[
              {
                title: "AI Business Automation in 2026: What Michigan Companies Are Actually Using It For",
                excerpt: "The conversation around AI has been dominated by hype. Here's what Michigan businesses are actually deploying, and what's genuinely delivering measurable ROI.",
                href: "/blog/ai-business-automation-michigan",
                category: "AI & Automation",
                readTime: "7 min read",
              },
              {
                title: "Local SEO for Michigan Contractors: How to Rank #1 for Your Trade",
                excerpt: "The one who shows up first on Google wins the job. Here's how Michigan service businesses are combining SEO with automated follow-up to convert more leads.",
                href: "/blog/contractor-website-design-michigan",
                category: "Local SEO",
                readTime: "7 min read",
              },
            ].map((post) => (
              <Reveal key={post.href}>
                <Link href={post.href} className="group block h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-[#9a5423]">{post.category}</span>
                    <span className="text-[var(--site-text-muted)]">·</span>
                    <span className="text-xs text-[var(--site-text-muted)]">{post.readTime}</span>
                  </div>
                  <h3 className="text-[var(--site-text-primary)] font-semibold text-sm mb-2 group-hover:text-[#9a5423] transition-colors leading-snug">{post.title}</h3>
                  <p className="text-[var(--site-text-muted)] text-xs leading-relaxed">{post.excerpt}</p>
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
              Book a free 30-minute call. We&apos;ll identify exactly where automation would save you the most time and what it would cost to build.
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
