"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, CheckCircle2, Quote } from "lucide-react";
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
  { label: "Authority-First Design", desc: "Layouts built around credentials, bar admissions, and case results, so a first-time visitor trusts you before they ever pick up the phone." },
  { label: "Practice Area Pages", desc: "A dedicated, SEO-structured page for every area you practice, written to answer what a prospective client is actually searching for." },
  { label: "Attorney Bio & Credentials Pages", desc: "Professional profiles that establish experience and approachability, the two things clients weigh most when choosing counsel." },
  { label: "Consultation-Focused Forms", desc: "Low-friction intake forms designed to convert a nervous first-time visitor into a booked consultation, not just a form-fill." },
  { label: "Legal Schema & Structured Data", desc: "Attorney and LegalService schema markup that helps search engines understand and surface your practice correctly." },
  { label: "Mobile-First, Always-On", desc: "Most legal searches happen on a phone, often outside business hours. Every site is built to load fast and convert on mobile first." },
];

const deliverables = [
  "Custom-designed, fully responsive website",
  "Practice area pages built around real search intent",
  "Attorney profile & credentials pages",
  "Consultation request flow, built to convert",
  "Legal schema & structured data markup",
  "GA4 & Search Console setup for ongoing visibility",
];

const process = [
  { step: "Discovery", desc: "We learn your practice areas, your ideal client, and what's actually held your current site back." },
  { step: "Design", desc: "A custom visual direction built around authority and trust, refined with your feedback before a line of code is written." },
  { step: "Development", desc: "Built from scratch in Next.js: fast, secure, and structured for search from day one." },
  { step: "Launch & Care", desc: "A supported launch, then ongoing updates as your practice, team, and content evolve." },
];

const faqs = [
  {
    q: "How is a law firm website different from a regular business website?",
    a: "Legal services are a high-trust, high-stakes purchase. Visitors are often searching during a stressful moment and deciding, in seconds, whether to trust you with something serious. A law firm site has to establish credibility immediately: credentials, case focus, and a clear, low-pressure path to a consultation, not just a generic contact form.",
  },
  {
    q: "Do you design sites for solo attorneys and small firms, or only large practices?",
    a: "Both. We've built sites for solo practitioners and small, focused practices, and the same principles apply regardless of size: clear practice area pages, strong credibility signals, and a consultation flow that actually converts.",
  },
  {
    q: "Can you build pages for multiple practice areas?",
    a: "Yes. Multi-practice firms get a dedicated, individually optimized page for each practice area, so someone searching for a specific issue, like custody or a DUI, lands on content built specifically for that search, not a generic services page.",
  },
  {
    q: "Do you follow attorney advertising rules?",
    a: "We build the site around the content and disclosures you provide and will work with your guidance on state bar advertising requirements. We are not a substitute for your own compliance review, and we recommend having your content reviewed against your state bar's advertising rules before launch.",
  },
  {
    q: "Will the site help with local SEO for my practice area and city?",
    a: "Yes. Local SEO is available alongside the website build: Google Business Profile optimization, location-specific content, and legal schema markup that helps you show up for searches like 'family lawyer near me' or 'personal injury attorney in [your city].'",
  },
  {
    q: "Can you migrate content from our current website?",
    a: "Yes. We audit your existing site's content, redirect old URLs properly to protect any search rankings you've already earned, and rebuild what's worth keeping into the new design.",
  },
  {
    q: "How much does a law firm website cost?",
    a: "Every project is custom quoted based on the number of practice areas, pages, and integrations you need. Reach out for a free, no-pressure quote scoped to your firm.",
  },
  {
    q: "Do you offer ongoing website maintenance for law firms?",
    a: "Yes. Ongoing care plans keep your site secure, current, and updated as your team, results, and practice areas change, without you needing an in-house web team.",
  },
];

export default function LawFirmWebsiteDesignPage() {
  const heroProject = pickProjects(["mi-family-lawyer"])[0];

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
              Custom-built websites for attorneys and law firms, designed to convert a stressful search into a booked consultation. Authority-first design, practice area pages built around real search intent, and a client experience that reflects the seriousness of what you do.
            </p>

            <div className="mt-8 flex flex-wrap gap-8">
              <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-0.5">
                Get a Free Quote
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link href="/work/mi-family-lawyer" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)] transition-colors">
                View a Law Firm Case Study <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <Reveal delay={0.15}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1600&auto=format&fit=crop"
                alt="Elegant law firm library and office interior"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WHY IT'S DIFFERENT ───────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
          <Reveal>
            <h2 className="text-4xl font-light text-[var(--site-text-primary)] mb-3" style={{ fontFamily: "var(--font-serif)" }}>
              Legal services are sold on trust, not price.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[var(--site-text-secondary)] text-sm leading-relaxed mb-4">
              Most people don&apos;t search for an attorney on a good day. They&apos;re dealing with a divorce, an arrest, an injury, or a business dispute, and they&apos;re trying to decide, in a matter of seconds, who they can trust with it. A generic, template-driven website undermines that decision before you ever get a phone call.
            </p>
            <p className="text-[var(--site-text-secondary)] text-sm leading-relaxed">
              We design law firm websites around that reality: clear credentials, an approachable but authoritative tone, and a path to consultation that feels like a first conversation, not a form dropped into a queue. Every practice area gets its own page, written for the specific questions a client in that situation is actually asking Google.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── PRACTICE AREAS ───────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">Practice Areas</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-[var(--site-text-primary)] mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              Built for every area of practice.
            </h2>
            <p className="text-[var(--site-text-secondary)] mb-10 max-w-2xl mx-auto">
              Whether you run a solo practice or a multi-attorney firm, every practice area gets a dedicated, purpose-built page.
            </p>
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
            <p className="text-[var(--site-text-secondary)] text-base max-w-xl mt-3">
              Every law firm website engagement is built around one goal: turning a visitor&apos;s hardest moment into a booked consultation.
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

      {/* ── CASE STUDY SHOWCASE ──────────────────────── */}
      {heroProject && (
        <section className="py-14 px-6 border-t border-[var(--site-border)]">
          <div className="max-w-5xl mx-auto">
            <Reveal className="mb-10">
              <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">Real Work</span>
              <h2 className="mt-4 text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
                A law firm site built the same way yours would be.
              </h2>
              <p className="text-[var(--site-text-secondary)] text-base max-w-xl mt-3">
                {heroProject.title}, a Michigan family law practice, needed a site that reflected the trust and sensitivity family law requires.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Link href={`/work/${heroProject.slug}`} className="group block border border-[var(--site-border)] p-2">
                <BrowserMockup
                  url={heroProject.domain}
                  screenshotUrl={heroProject.screenshotUrl}
                  alt={`${heroProject.title} law firm website screenshot`}
                />
                <div className="flex items-center justify-between px-4 py-4">
                  <span className="text-sm font-semibold text-[var(--site-text-primary)] group-hover:text-[#9a5423] transition-colors">
                    View the {heroProject.title} case study
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-[var(--site-text-muted)] group-hover:text-[#9a5423] transition-colors" />
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── TESTIMONIAL ──────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <Quote className="w-8 h-8 text-[#9a5423] mx-auto mb-6" strokeWidth={1.5} />
            <blockquote
              className="text-2xl md:text-3xl font-light text-[var(--site-text-primary)] leading-snug"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              &ldquo;Working with Spectecle was hands down the best investment I made for my firm. The website looks professional and authoritative, and within a few months I was getting consultation requests from clients who found me on Google.&rdquo;
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
            <h2 className="text-4xl font-light text-[var(--site-text-primary)] mb-3" style={{ fontFamily: "var(--font-serif)" }}>
              What you walk away with.
            </h2>
            <p className="text-[var(--site-text-secondary)] text-base mb-8 max-w-xl">
              A complete, production-ready website, not a handoff to another team to finish.
            </p>
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

      {/* ── PROOF ─────────────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <ProofGallery
              slugs={["mi-family-lawyer", "salazar-drywall-pros", "the-stat-clinic"]}
              heading="Real sites. Real clients."
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
          <div className="grid sm:grid-cols-3 gap-x-10 gap-y-8">
            {[
              { title: "SEO for Law Firms", desc: "Rank for the searches your future clients are actually typing into Google.", href: "/services/seo-agency-detroit" },
              { title: "AI & Automation", desc: "Automate intake questions and after-hours consultation requests.", href: "/services/ai-automation" },
              { title: "Law Firm SEO Guide", desc: "Read our full guide on what makes a Michigan law firm rank.", href: "/blog/law-firm-website-design-michigan" },
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
              Book a free strategy call. No sales pitch, just honest advice on what your firm&apos;s site needs to earn trust and win consultations.
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
