"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, CheckCircle2, Phone } from "lucide-react";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { RelatedReading } from "@/components/ui/RelatedReading";
import { ReviewsStrip } from "@/components/ui/ReviewsStrip";
import { dearbornFaqs } from "./faqs";

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.3, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const included = [
  "Custom design that matches your business, not a template",
  "Fast pages built for phones, where most local customers search",
  "A clear way to call, book, or request a quote on every page",
  "Local SEO basics built in: titles, structured data, and Google Business Profile guidance",
  "Ongoing updates after launch, requested through The Loop, your client portal",
];

const localWork = [
  {
    name: "Vue Optometry",
    kind: "Optometry practice, Dearborn Heights",
    desc: "Ongoing care for an independent eye care practice: a booking-first homepage, insurance and eyewear brand lists patients can scan on a phone, and Vision Source branding.",
    href: "/work/vue-optometry",
    image: "/screenshots/vueoptometry.png",
  },
  {
    name: "Glam by Abeer",
    kind: "Makeup artist, Dearborn",
    desc: "A portfolio-first site with galleries for bridal, full glam, and photoshoots, one simple booking page, and a makeup-tips blog that answers what clients search before they book.",
    href: "/work/glam-by-abeer",
    image: "/screenshots/glambyabeer.png",
  },
];

const steps = [
  { title: "Free call", desc: "We talk through your business, your customers, and what the site needs to do. In person in Dearborn or over video." },
  { title: "Plan", desc: "A written scope: pages, features, content, and timeline. You know exactly what you're getting before work starts." },
  { title: "Design and build", desc: "A custom design, then a fast build with local SEO in place from day one. You review it before launch." },
  { title: "Launch and care", desc: "We launch, then keep the site current. Updates come through The Loop, so nothing gets lost in email." },
];

export default function WebDesignDearbornPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="pt-[176px] pb-14 px-6">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-[var(--site-text-muted)] mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[var(--site-text-primary)] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/services" className="hover:text-[var(--site-text-primary)] transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[var(--site-text-secondary)]">Web Design Dearborn</span>
          </nav>

          <motion.h1
            initial={false}
            className="rise-in text-6xl md:text-7xl font-light text-[var(--site-text-primary)] leading-[1.1]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Web design in Dearborn and <span className="italic text-[#9a5423]">Dearborn Heights.</span>
          </motion.h1>

          <p className="mt-6 text-[var(--site-text-secondary)] text-lg md:text-xl max-w-[60ch] leading-relaxed">
            Spectecle is a web design studio based in Dearborn. We build custom, fast-loading websites for local
            businesses in Dearborn and Dearborn Heights, set them up to show up in local search, and keep them current
            after launch. Our clients here include an optometry practice and a makeup artist, and we built Explore
            Dearborn, our own events app for the city.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-0.5">
              Get a free quote
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <a href="tel:+13133534105" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)] transition-colors">
              <Phone className="w-4 h-4" />
              Call (313) 353-4105
            </a>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET ─────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-10">
          <Reveal>
            <h2 className="text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              Websites for Dearborn businesses.
            </h2>
            <p className="mt-4 text-[var(--site-text-secondary)] leading-relaxed max-w-[50ch]">
              Most people find a local business on their phone, in Google&apos;s map results or a quick search. Your
              site has to load fast, look established, and make the next step obvious.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <ul className="space-y-4">
              {included.map((item) => (
                <li key={item} className="flex gap-3 text-[var(--site-text-secondary)] leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 text-[#9a5423]" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── LOCAL WORK ───────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-10">
            <h2 className="text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              Recent work in Dearborn and Dearborn Heights.
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-8">
            {localWork.map((w) => (
              <Link key={w.href} href={w.href} className="group block">
                <div className="relative aspect-[1600/557] overflow-hidden border border-[var(--site-border)]">
                  <Image
                    src={w.image}
                    alt={`${w.name} website`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="mt-4 text-xs text-[var(--site-text-muted)] uppercase tracking-wider">{w.kind}</p>
                <h3 className="mt-1 text-2xl font-light text-[var(--site-text-primary)] group-hover:text-[#9a5423] transition-colors" style={{ fontFamily: "var(--font-serif)" }}>
                  {w.name}
                </h3>
                <p className="mt-2 text-sm text-[var(--site-text-secondary)] leading-relaxed">{w.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#9a5423]">
                  Read the case study <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPLORE DEARBORN ─────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)] bg-[var(--site-surface)]">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              We built Explore Dearborn.
            </h2>
            <p className="mt-5 text-[var(--site-text-secondary)] leading-relaxed">
              Explore Dearborn is our own events app for the city, with a website in English and Arabic. It lists
              what&apos;s happening around Dearborn and lets local businesses and organizers submit and promote their
              events. Building it meant learning the city&apos;s neighborhoods, venues, and calendar in detail, which
              is the same local knowledge we bring to every Dearborn website.
            </p>
            <a
              href="https://exploredearborn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm text-[var(--site-text-secondary)] underline underline-offset-4 hover:text-[var(--site-text-primary)]"
            >
              Visit exploredearborn.com <ArrowUpRight className="w-4 h-4" />
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-10">
            <h2 className="text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              How a project works.
            </h2>
          </Reveal>
          <ol className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="text-2xl font-light text-[#9a5423] leading-[1.1]" style={{ fontFamily: "var(--font-serif)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[var(--site-text-primary)] font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-[var(--site-text-secondary)] leading-relaxed">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────── */}
      <ReviewsStrip />

      {/* ── FAQ ──────────────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-3xl mx-auto">
          <Reveal className="mb-14">
            <h2 className="text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              Dearborn web design questions.
            </h2>
          </Reveal>
          <Reveal>
            <FAQAccordion faqs={dearbornFaqs} />
          </Reveal>
        </div>
      </section>

      {/* ── RELATED ──────────────────────────────────── */}
      <RelatedReading
        items={[
          { href: "/work/vue-optometry", title: "Vue Optometry: website care for an optometry practice", kind: "Case study" },
          { href: "/work/glam-by-abeer", title: "Glam by Abeer: portfolio website and local SEO", kind: "Case study" },
          { href: "/blog/bilingual-websites-dearborn", title: "Bilingual Websites for Dearborn Businesses: English and Arabic Done Right", kind: "Guide" },
          { href: "/services/web-design-detroit", title: "Web design in Detroit", kind: "Service" },
          { href: "/services/seo-agency-detroit", title: "Local SEO for Metro Detroit businesses", kind: "Service" },
        ]}
      />

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-[var(--site-border)]">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              Built in Dearborn. <span className="italic text-[#9a5423]">For Dearborn.</span>
            </h2>
            <p className="mt-6 text-[var(--site-text-secondary)] text-lg max-w-xl mx-auto">
              Book a free 30-minute call. We&apos;ll look at your business and tell you what your website needs.
            </p>
            <div className="mt-10">
              <Link href="/contact" className="inline-flex items-center gap-2 text-lg font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-1">
                Book a free strategy call
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
