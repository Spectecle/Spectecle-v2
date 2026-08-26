"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Phone,
  ChevronDown,
} from "lucide-react";
import { projects } from "@/app/work/projects-data";
import Hero from "@/components/ui/hero";
import ServiceGrid from "@/components/ui/ServiceGrid";
import ServiceStickyScale from "@/components/ui/ServiceStickyScale";
import { TestimonialsSection } from "@/components/ui/testimonials-with-marquee";
import { marqueeTestimonials } from "@/lib/testimonials-data";
import { services } from "@/lib/services-data";

// ─── Data ────────────────────────────────────────────────────────────────────

const INDUSTRIES = [
  "E-commerce & Retail",
  "Law Firms & Attorneys",
  "Beauty Studios",
  "Medical Clinics",
  "Photography Studios",
  "IT & Tech Companies",
  "Contractors",
  "Home Services",
];

const FAQ_ITEMS = [
  {
    question: "How much does a professional website cost?",
    answer:
      "Every Spectecle project is custom quoted based on complexity, number of pages, and integrations needed, not a one-size-fits-all package. Every site is built from scratch in Next.js: faster, better-ranking, and entirely yours. SEO retainers and AI automation packages are available separately. Reach out for a free quote tailored to your business.",
  },
  {
    question: "What makes Spectecle different from other web design agencies?",
    answer:
      "Spectecle brings web design, SEO, ad campaigns, and AI automation together under one dedicated team, so every part of your digital presence is built to work together instead of being handled by separate vendors who never talk to each other. No account managers, no outsourcing, no handoffs. The team that talks to you also designs, builds, and launches your site.",
  },
  {
    question: "How long does it take to build a website?",
    answer:
      "Timelines depend on scope and complexity, and we agree on a clear timeline with you upfront before any work begins. E-commerce sites and projects with custom AI integrations naturally take longer. There is no team bureaucracy. Decisions happen fast and revisions never get lost in translation.",
  },
  {
    question: "What is local SEO and how does it help my business?",
    answer:
      "Local SEO is the process of optimizing your website and Google Business Profile so your business appears at the top of searches like 'web designer near me' or 'law firm in [your city].' Spectecle builds local SEO into every website, including structured data markup, Google Business Profile optimization, location-specific content, and a review acquisition strategy, so your site starts ranking from day one.",
  },
  {
    question: "Do I need an AI agent for my business?",
    answer:
      "If your business handles repetitive intake, quotes, scheduling, or customer questions, an AI agent can replace hours of manual work per week. Spectecle builds custom AI intake agents trained on your specific services, pricing, and FAQs, integrated directly with your CRM and communication tools. It's not a generic chatbot. It's a system that understands your business.",
  },
  {
    question: "Does Spectecle work with businesses nationwide?",
    answer:
      "Yes. Spectecle works with clients across the United States, with deep local-SEO expertise for businesses that also want to dominate their local market. If you are a serious business looking for a results-focused web design and digital growth partner, location is not a barrier.",
  },
];

const FEATURED = projects.slice(0, 3);

// ─── Helpers ─────────────────────────────────────────────────────────────────

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
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FeaturedWorkCard({ p }: { p: (typeof projects)[number] }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVideo = p.slug === "glam-by-abeer";

  useEffect(() => {
    if (isVideo) videoRef.current?.play().catch(() => {});
  }, [isVideo]);

  return (
    <Link href={`/work/${p.slug}`} className="group block">
      <div className="relative aspect-[1600/557] overflow-hidden">
        {isVideo ? (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src="/videos/glambyabeer.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        ) : (
          <Image
            src={p.screenshotUrl}
            alt={`${p.title} homepage`}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}
      </div>
      <div className="mt-4">
        <span className="text-[var(--site-text-primary)] font-semibold text-sm group-hover:text-[#9a5423] transition-colors">{p.title}</span>
      </div>
      <p className="mt-1 text-[var(--site-text-muted)] text-xs leading-relaxed line-clamp-2">{p.cardDesc}</p>
    </Link>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HelloPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <Hero />

      {/* ── SERVICES ──────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 border-b border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-16">
            <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">What We Do</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              Four disciplines. <span className="italic text-[#9a5423]">One agency.</span>
            </h2>
          </Reveal>

          <div className="hidden md:block">
            <Reveal delay={0.1}>
              <ServiceGrid items={services} />
            </Reveal>
          </div>
        </div>

        <div className="md:hidden">
          <ServiceStickyScale items={services} />
        </div>
      </section>

      {/* ── SELECTED WORK ─────────────────────────────────────────────────── */}
      <section className="py-16 px-6 border-b border-[var(--site-border)]">
        <div className="max-w-6xl mx-auto">
          <Reveal className="mb-16">
            <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">Selected Work</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              Real results. <span className="italic text-[#9a5423]">Real clients.</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-x-8 gap-y-10 mb-10">
            {FEATURED.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.1}>
                <FeaturedWorkCard p={p} />
              </Reveal>
            ))}
          </div>

          <Reveal className="text-center">
            <Link href="/work" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-0.5">
              View all case studies
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section className="border-b border-[var(--site-border)]">
        <TestimonialsSection
          title="Trusted across industries."
          description="What clients say about working with Spectecle."
          testimonials={marqueeTestimonials}
        />
      </section>

      {/* ── INDUSTRIES ────────────────────────────────────────────────────── */}
      <section className="py-14 px-6 border-b border-[var(--site-border)]">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">Industries</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-[var(--site-text-primary)] mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              We know your industry.
            </h2>
            <p className="text-[var(--site-text-secondary)] mb-10">
              From law firms to beauty studios, we&apos;ve built for the full range of small business.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
              {INDUSTRIES.map((ind) => (
                <span key={ind} className="text-[var(--site-text-secondary)] text-sm">
                  {ind}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 border-b border-[var(--site-border)]">
        <div className="max-w-3xl mx-auto">
          <Reveal className="mb-16">
            <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">Common Questions</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              Everything you&apos;re <span className="italic text-[#9a5423]">probably wondering.</span>
            </h2>
          </Reveal>

          <div className="divide-y divide-[var(--site-border)]">
            {FAQ_ITEMS.map((item, i) => (
              <Reveal key={item.question} delay={i * 0.05}>
                <div>
                  <button
                    className="w-full flex items-center justify-between gap-4 py-6 text-left group cursor-pointer"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span className="text-[var(--site-text-primary)] font-semibold text-sm leading-snug">{item.question}</span>
                    <ChevronDown
                      className="w-5 h-5 text-[#9a5423] shrink-0 transition-transform duration-300"
                      style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-[var(--site-text-secondary)] text-sm leading-relaxed">{item.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-6">
        <Reveal className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">Let&apos;s Talk</span>
          <h2 className="mt-4 text-5xl md:text-6xl font-light text-[var(--site-text-primary)] leading-tight mb-6" style={{ fontFamily: "var(--font-serif)" }}>
            Ready to build something <span className="italic text-[#9a5423]">that actually works?</span>
          </h2>
          <p className="text-[var(--site-text-secondary)] text-lg mb-10 max-w-xl mx-auto">
            You found us. That&apos;s the first step. The second one is a quick conversation about what your business actually needs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-10">
            <Link href="/contact" className="inline-flex items-center gap-2 text-lg font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-1">
              Start a Project
              <ArrowUpRight className="w-5 h-5" />
            </Link>
            <a href="tel:+13133534105" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)] transition-colors">
              <Phone className="w-4 h-4 text-[#9a5423]" />
              (313) 353-4105
            </a>
          </div>

          <a href="mailto:hello@spectecle.com" className="inline-flex items-center gap-2 text-[var(--site-text-muted)] hover:text-[#9a5423] text-sm transition-colors">
            <Mail className="w-4 h-4" />
            hello@spectecle.com
          </a>
        </Reveal>
      </section>
    </>
  );
}
