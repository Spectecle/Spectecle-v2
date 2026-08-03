"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, Bot, RefreshCw, Layers, Code2, BarChart3, Shield, CheckCircle2 } from "lucide-react";

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
  { icon: Bot, label: "Custom AI Agents", desc: "LLM-powered agents built for your specific business tasks — not a generic chatbot plugin dropped on your site." },
  { icon: RefreshCw, label: "Workflow Automation", desc: "End-to-end process automation using n8n, Make, Zapier, and custom APIs. We build around your existing tools." },
  { icon: Layers, label: "CRM & System Integrations", desc: "Seamless data flow between your platforms — no silos, no manual entry, no copy-pasting between tabs." },
  { icon: Code2, label: "AI Chatbot Development", desc: "Intelligent, context-aware bots for customer support, sales qualification, and intake — built on your actual services." },
  { icon: BarChart3, label: "Data & Analytics Pipelines", desc: "Automated reporting and real-time insight generation from your business data, delivered on a schedule." },
  { icon: Shield, label: "AI Strategy & Consulting", desc: "A practical, honest assessment of where AI will actually save you time and money — not a buzzword pitch." },
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
    a: "A chatbot plugin is a generic, pre-built tool that answers basic FAQ-style questions. A custom AI agent is built specifically for your business — trained on your services, integrated with your CRM, and capable of handling complex, multi-step tasks. The difference in capability and outcome is significant.",
  },
  {
    q: "What tools do you use for workflow automation?",
    a: "We build with n8n, Make, Zapier, and custom API integrations depending on what best fits your stack. For AI agents, we use OpenAI and other LLM providers. Every build is designed around your existing tools — we don't force platform switches.",
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
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(210,81,36,0.1) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-400">AI & Automation</span>
          </nav>

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold text-[#F07A3A] uppercase tracking-widest"
          >
            Serving Clients Nationwide
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            AI &amp; Workflow
            <br />
            <span className="gradient-text">Automation</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            Custom AI agents and workflow automation built from scratch — trained on your services, integrated with your systems, and tested until they actually work. Not a chatbot plugin.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Link href="/contact" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold cursor-pointer">
              <span>Get a Free Assessment</span>
              <ArrowUpRight className="w-4 h-4 relative z-10" />
            </Link>
            <Link href="/work" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white glass border border-white/8 hover:border-white/15 transition-all duration-300 cursor-pointer">
              View Our Work <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/6 bg-[#09090f]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-inter)" }}>
              What&apos;s included
            </h2>
            <p className="text-slate-400 text-base max-w-xl mb-12">
              From scoping to deployment — every automation is built, tested, and documented before handoff.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.07}>
                <div className="glass rounded-xl p-6 border border-white/6 hover:border-[#D25124]/25 transition-colors duration-300 h-full">
                  <div className="w-10 h-10 rounded-lg bg-[#D25124]/10 flex items-center justify-center mb-4">
                    <f.icon className="w-5 h-5 text-[#F07A3A]" />
                  </div>
                  <h3 className="text-white font-semibold mb-2 text-sm">{f.label}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DELIVERABLES ─────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-inter)" }}>
              What you walk away with
            </h2>
            <p className="text-slate-400 text-base mb-8">
              A working system, full documentation, and a team that knows how to use it.
            </p>
            <ul className="space-y-3">
              {deliverables.map((d) => (
                <li key={d} className="flex items-center gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-[#F07A3A] shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold cursor-pointer">
                <span>Start Your Automation Project</span>
                <ArrowUpRight className="w-4 h-4 relative z-10" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass rounded-2xl border border-white/6 p-8">
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                We build custom AI agents and workflow automation systems for small and mid-size businesses ready to gain a real competitive edge. Using OpenAI, n8n, and custom API integrations, we help businesses eliminate repetitive tasks, automate customer interactions, and unlock operational capacity — without adding headcount.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Every system is built from scratch and tested against your real workflows before we hand it off.
              </p>
              <div className="mt-8 pt-6 border-t border-white/6 grid grid-cols-2 gap-4">
                {[
                  { value: "1–6 wks", label: "Build timeline" },
                  { value: "n8n / Make", label: "Primary tools" },
                  { value: "5–20 hrs", label: "Avg. weekly time saved" },
                  { value: "24hr", label: "Response guarantee" },
                ].map((s) => (
                  <div key={s.label}>
                    <div className="text-lg font-bold gradient-text" style={{ fontFamily: "var(--font-inter)" }}>{s.value}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/6 bg-[#09090f]">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-12" style={{ fontFamily: "var(--font-inter)" }}>
              Common questions
            </h2>
          </Reveal>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="glass rounded-2xl p-7 border border-white/6 hover:border-[#D25124]/15 transition-colors duration-300">
                  <h3 className="text-white font-semibold mb-3 flex items-start gap-3">
                    <span className="text-[#F07A3A] shrink-0 font-bold">Q.</span>
                    {faq.q}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed pl-6">{faq.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED SERVICES ─────────────────────────── */}
      <section className="py-20 px-6 border-t border-white/6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-2xl font-bold text-white mb-8" style={{ fontFamily: "var(--font-inter)" }}>
              Pair it with
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5 max-w-2xl">
            {[
              { title: "Web Design & Development", desc: "A fast, high-converting website to capture the leads your automation will follow up on.", href: "/services/web-design-detroit" },
              { title: "SEO & Digital Marketing", desc: "Drive the organic traffic that feeds your AI-powered intake and follow-up systems.", href: "/services/seo-agency-detroit" },
            ].map((s) => (
              <Reveal key={s.title}>
                <Link href={s.href} className="group glass rounded-xl p-6 border border-white/6 hover:border-[#D25124]/25 transition-all duration-300 block">
                  <h3 className="text-white font-semibold mb-2 group-hover:text-[#F07A3A] transition-colors">{s.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#F07A3A]">
                    Learn more <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FROM THE BLOG ────────────────────────────── */}
      <section className="py-20 px-6 border-t border-white/6">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-inter)" }}>
              From the Blog
            </h2>
            <p className="text-slate-500 text-sm mb-8">Real-world automation strategies from our client work.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5 max-w-3xl">
            {[
              {
                title: "AI Business Automation in 2026: What Michigan Companies Are Actually Using It For",
                excerpt: "The conversation around AI has been dominated by hype. Here's what Michigan businesses are actually deploying — and what's genuinely delivering measurable ROI.",
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
                <Link href={post.href} className="group glass rounded-xl p-6 border border-white/6 hover:border-[#D25124]/25 transition-all duration-300 block h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-[#F07A3A]">{post.category}</span>
                    <span className="text-slate-700">·</span>
                    <span className="text-xs text-slate-600">{post.readTime}</span>
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-2 group-hover:text-[#F07A3A] transition-colors leading-snug" style={{ fontFamily: "var(--font-inter)" }}>{post.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{post.excerpt}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#F07A3A]">
                    Read article <ArrowUpRight className="w-3 h-3" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/6 bg-[#09090f]">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-inter)" }}>
              Nationwide reach.
              <br />
              <span className="gradient-text">Remote-first. Results-driven.</span>
            </h2>
            <p className="mt-5 text-slate-400 text-lg max-w-xl mx-auto">
              Book a free 30-minute call. We&apos;ll identify exactly where automation would save you the most time and what it would cost to build.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold cursor-pointer">
                <span>Book a Free Strategy Call</span>
                <ArrowUpRight className="w-5 h-5 relative z-10" />
              </Link>
              <Link href="/work" className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-slate-300 hover:text-white glass hover:border-white/15 border border-white/8 transition-all duration-300 cursor-pointer">
                See Our Work <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
