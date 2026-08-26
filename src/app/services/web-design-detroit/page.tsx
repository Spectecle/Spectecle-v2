"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, CheckCircle2 } from "lucide-react";
import { ProofGallery } from "@/components/ui/ProofGallery";
import { BrowserMockup } from "@/components/ui/BrowserMockup";
import { pickProjects } from "@/app/work/projects-data";

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
  { label: "Custom UI/UX Design", desc: "Interfaces built around your brand and the actions you want visitors to take, not a template." },
  { label: "Next.js & React Development", desc: "Lightning-fast, SEO-ready builds that score green on Core Web Vitals and hold up under traffic." },
  { label: "E-commerce & CMS Solutions", desc: "Shopify, WooCommerce, and headless CMS builds designed to grow with your business." },
  { label: "Core Web Vitals & Speed", desc: "PageSpeed scores in the green. Faster sites rank higher and lose fewer visitors before the page loads." },
  { label: "Accessibility & Security", desc: "WCAG-compliant, hardened against common vulnerabilities. Built right, not bolted on." },
  { label: "Ongoing Maintenance", desc: "Monthly retainers keeping your site fast, secure, and always current, without the overhead." },
];

const deliverables = [
  "Brand strategy & visual identity",
  "Wireframes & interactive prototypes",
  "Responsive, mobile-first design",
  "Full-stack development & CMS integration",
  "Google Analytics 4 & conversion tracking setup",
  "Launch support & post-launch optimization",
];

const faqs = [
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
  {
    q: "What's included in your monthly website maintenance plans?",
    a: "Maintenance retainers include performance monitoring, security patches, content updates, uptime monitoring, and priority support with fast response times.",
  },
];

const PROOF_SLUGS = ["indoor-garden", "vue-optometry"];

export default function WebDesignDetroitPage() {
  const heroProject = pickProjects(["vue-optometry"])[0];

  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="pt-40 pb-14 px-6">
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
              Custom websites built to rank on Google, load before visitors leave, and convert traffic into paying customers. Every project is designed and developed in-house. No templates, no offshore teams.
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

          {heroProject && (
            <Reveal delay={0.15}>
              <Link href={`/work/${heroProject.slug}`} className="group block">
                <BrowserMockup
                  url={heroProject.domain}
                  screenshotUrl={heroProject.screenshotUrl}
                  alt={`${heroProject.title} website screenshot`}
                />
              </Link>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-14">
            <h2 className="text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>What&apos;s included.</h2>
            <p className="text-[var(--site-text-secondary)] text-base max-w-xl mt-3">
              Every web design engagement covers the full stack, from initial concept to post-launch performance.
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
              A complete, production-ready website, not a handoff to another team to finish.
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
                Start Your Project
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[var(--site-text-secondary)] text-sm leading-relaxed mb-6">
              We design and develop custom, high-performance websites for growing businesses everywhere. Using Next.js and React, we build sites that score green on Core Web Vitals, climb Google rankings, and convert visitors into paying customers.
            </p>
            <p className="text-[var(--site-text-secondary)] text-sm leading-relaxed mb-8">
              Whether you&apos;re a local service business, law firm, or national e-commerce brand, every project starts with your business goals, not a template.
            </p>
            <div className="border border-[var(--site-border)] p-2">
              <BrowserMockup
                url="glambyabeer.com"
                screenshotUrl="/screenshots/glambyabeer.png"
                alt="Custom website design and development example"
                size="compact"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PROOF ─────────────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <ProofGallery
              slugs={PROOF_SLUGS}
              heading="Real sites. Real results."
              subheading="A few recent projects, built the same way yours would be."
            />
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
              Book a free 30-minute strategy call. No sales pitch, just honest advice on what your site needs to rank and convert.
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
