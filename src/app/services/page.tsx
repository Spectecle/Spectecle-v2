"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ProofGallery } from "@/components/ui/ProofGallery";
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

const services = [
  {
    n: "01",
    title: "Web Design & Development",
    tagline: "Custom websites built to rank, convert, and scale.",
    desc: "High-performance, Next.js-powered websites that score green on Core Web Vitals, climb Google rankings, and convert traffic into paying customers. No templates. No offshore handoffs.",
    href: "/services/web-design-detroit",
  },
  {
    n: "02",
    title: "SEO & Digital Marketing",
    tagline: "Page-one rankings for searches that actually matter.",
    desc: "Technical SEO, local search, and content strategy built around what your customers are actually searching for. Tracked with real numbers, not vanity metrics.",
    href: "/services/seo-agency-detroit",
  },
  {
    n: "03",
    title: "AI & Workflow Automation",
    tagline: "Eliminate manual work. Scale without hiring.",
    desc: "Custom AI agents and workflow automation built from scratch: trained on your services, connected to your CRM, and tested until they actually work. Not a chatbot plugin.",
    href: "/services/ai-automation",
  },
];

const additionalServices = [
  { title: "Brand Identity & Logo Design", desc: "Visual identity systems, brand guidelines, and logo design for new businesses and rebrands." },
  { title: "Analytics & Conversion Tracking", desc: "GA4, GTM, heatmaps, and conversion funnel setup to measure what's actually driving growth." },
  { title: "Hosting & Cloud Infrastructure", desc: "Managed cloud hosting, CDN configuration, and infrastructure optimized for speed and uptime." },
  { title: "Security Audits & Hardening", desc: "Vulnerability assessments, penetration testing, and hardening for web applications and APIs." },
];

const faqs = [
  {
    q: "Do you offer local SEO services?",
    a: "Yes, we help single-location and multi-location businesses show up in local search results anywhere in the country. We also work remotely with clients across the U.S. and internationally.",
  },
  {
    q: "How much does a website cost for a small business?",
    a: "Web design costs vary based on scope, complexity, and your goals. Simple brochure sites, custom web applications, and full e-commerce stores each have different requirements. We provide transparent, itemized quotes after a free 30-minute discovery call. No hidden fees, no surprises.",
  },
  {
    q: "How long does SEO take to show results?",
    a: "Most businesses see meaningful ranking improvements within 3–6 months of consistent SEO work. For competitive local or national keywords, expect 4–8 months to reach page one. We provide monthly reporting so you always know exactly where you stand.",
  },
  {
    q: "What is AI automation and how can it help my business?",
    a: "AI automation replaces time-consuming, repetitive tasks with intelligent workflows. Common examples include: automated lead follow-up sequences, AI-powered customer support chatbots, automated reporting, CRM data entry, and document processing. For most businesses, automation saves 5–20 hours per week and meaningfully reduces operational costs.",
  },
  {
    q: "Do you work with clients remotely?",
    a: "Absolutely. The majority of our work is done remotely with clients across the United States and internationally. Our process is built for seamless remote collaboration, from kickoff calls to launch. Distance is never a barrier.",
  },
  {
    q: "Can you take over an existing website or help with a redesign?",
    a: "Yes. We conduct a full audit of your existing site (performance, SEO health, UX, and conversion rate), then either optimize it in place or migrate it to a better platform. Many clients come to us with a site that just isn't performing and leave with one that does.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* ── HERO ────────────────────────────────────── */}
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-[0.25em]">
            Serving Clients Nationwide
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-6xl md:text-7xl font-light text-[var(--site-text-primary)] leading-[1.05]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Three disciplines. <span className="italic text-[#f87444]">One obsession.</span>
          </motion.h1>
          <p className="mt-6 text-[var(--site-text-secondary)] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Search-first design, bold development, and intelligent automation, built around what your business actually needs to grow.
          </p>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto divide-y divide-[var(--site-border)]">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <Link href={s.href} className="group grid md:grid-cols-[80px_1fr_auto] items-start gap-4 py-12">
                <span className="text-sm text-[var(--site-text-muted)] font-mono">{s.n}</span>
                <div>
                  <h2 className="text-3xl font-light text-[var(--site-text-primary)] group-hover:text-[#f87444] transition-colors" style={{ fontFamily: "var(--font-serif)" }}>
                    {s.title}
                  </h2>
                  <p className="mt-2 text-[#f87444] text-sm font-medium">{s.tagline}</p>
                  <p className="mt-3 text-[var(--site-text-secondary)] text-sm leading-relaxed max-w-xl">{s.desc}</p>
                </div>
                <ArrowUpRight className="w-6 h-6 text-[var(--site-text-muted)] group-hover:text-[#f87444] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all justify-self-end mt-2" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── ADD-ONS ─────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-14">
            <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">Add-ons</span>
            <h2 className="mt-4 text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              Additional digital services.
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
            {additionalServices.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.08}>
                <h3 className="text-[var(--site-text-primary)] font-semibold mb-2">{a.title}</h3>
                <p className="text-[var(--site-text-secondary)] text-sm leading-relaxed">{a.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-3xl mx-auto">
          <Reveal className="mb-14">
            <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">FAQ</span>
            <h2 className="mt-4 text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              Common questions.
            </h2>
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

      {/* ── PROOF GALLERY ────────────────────────────── */}
      <section className="py-24 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <ProofGallery
              slugs={["glam-by-abeer", "salazar-drywall-pros", "the-stat-clinic"]}
              heading="Real work, real results"
              subheading="A few of the businesses we've built and grown across different industries."
            />
          </Reveal>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────── */}
      <section className="py-32 px-6 border-t border-[var(--site-border)]">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              Nationwide reach. <span className="italic text-[#f87444]">Results-driven.</span>
            </h2>
            <p className="mt-6 text-[var(--site-text-secondary)] text-lg max-w-xl mx-auto">
              Book a free 30-minute strategy call. No sales pitch, just honest advice on what will move the needle for your business, wherever you are.
            </p>
            <div className="mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-lg font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-1"
              >
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
