"use client";

import Link from "next/link";
import Image from "next/image";
import { RelatedReading } from "@/components/ui/RelatedReading";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, TrendingUp, Award, Users, Quote, CheckCircle2, Phone, Star, PenTool, Search, MousePointerClick, ShieldCheck } from "lucide-react";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { LandingLeadForm } from "@/components/LandingLeadForm";
import { StickyMobileCallBar } from "@/components/StickyMobileCallBar";
import { testimonials } from "@/lib/testimonials-data";
import { webDesignFaqs } from "./faqs";

const PAGE_PATH = "/services/web-design-detroit";
const SOURCE = "Web Design Detroit Landing Page";
const GOOGLE_REVIEWS = "https://maps.google.com/?cid=16659534901346479284";

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

const outcomes = [
  {
    label: "More calls, more booked appointments",
    desc: "A site built around one job: turning the people already searching for you into people who reach out. Clear paths to call or contact you, on every page.",
    Icon: TrendingUp,
  },
  {
    label: "A site that looks as established as you are",
    desc: "No templates, no drag-and-drop builders. A custom design that matches the standard you already hold your business to, so visitors trust you the second the page loads.",
    Icon: Award,
  },
  {
    label: "Stop losing customers to competitors who rank higher",
    desc: "Fast load times, proper structure, and local SEO built in from day one, so you show up when someone nearby searches for what you do.",
    Icon: Users,
  },
];

const included = [
  {
    label: "Custom design",
    desc: "Designed around your business and your customers, not a theme with your logo swapped in.",
    points: [
      "Layouts planned around what visitors need to decide",
      "Mobile-first, because most local searches happen on a phone",
      "Your real work and photos, not stock filler",
    ],
    Icon: PenTool,
  },
  {
    label: "Built to rank",
    desc: "The search basics are done before launch, not bolted on later.",
    points: [
      "Page titles, descriptions, and headings for each service",
      "Structured data, a sitemap, and fast load times",
      "Google Search Console and Analytics set up at launch",
    ],
    Icon: Search,
  },
  {
    label: "Built to convert",
    desc: "Every page has one clear next step, so visitors call, book, or ask for a quote.",
    points: [
      "Click-to-call and quote buttons throughout, not just on the contact page",
      "Short forms that ask only what you need",
      "Booking, payment, and CRM connections where they help",
    ],
    Icon: MousePointerClick,
  },
  {
    label: "Care after launch",
    desc: "Websites need upkeep. We keep yours current, secure, and backed up.",
    points: [
      "Updates, with a backup before every change",
      "Content changes when your business changes",
      "Requests and reports in The Loop, your client portal",
    ],
    Icon: ShieldCheck,
  },
];

const industries = [
  { label: "Contractors and home services", href: "/blog/contractor-website-design-michigan" },
  { label: "Medical, dental, and optometry practices", href: "/services/medical-website-design" },
  { label: "Law firms", href: "/services/law-firm-website-design" },
  { label: "Beauty studios and makeup artists", href: "/blog/makeup-artist-seo-michigan" },
  { label: "Local retailers and online shops", href: "/blog/ecommerce-website-design-michigan" },
];

const steps = [
  { title: "Discovery call", desc: "A free 30-minute call about your business, your customers, and what the website needs to do. You get honest advice even if we're not the right fit." },
  { title: "Written plan and quote", desc: "An itemized scope: the pages, features, and connections your site needs, the timeline, and the cost. No surprises later." },
  { title: "Design", desc: "We design the key pages first, for mobile and desktop, and refine them with your feedback before anything is built." },
  { title: "Build and launch", desc: "We build the site, set up search and analytics, redirect old pages so you keep your rankings, and test on real phones before launch." },
  { title: "Care and growth", desc: "Updates, backups, and changes after launch, with requests and reports tracked in The Loop." },
];

const detroitWork = [
  {
    client: "Detroit Glass & Mirror",
    kind: "Glass company, Detroit",
    built: "Separate pages for residential, commercial, and custom glass, a portfolio of completed installs, and quote and call buttons on every page.",
    result: "Now in Google's top five for “detroit glass company.”",
    href: "/work/detroit-glass-mirror",
  },
  {
    client: "Salazar Drywall Pros",
    kind: "Drywall contractor, Detroit and Southeast Michigan",
    built: "A section for each type of work, from basement finishing to commercial drywall, with project photos, testimonials, and estimate requests in the header.",
    result: "Ongoing care: updates, backups, and a full health check that fixed sitemap and duplicate-page issues.",
    href: "/work/salazar-drywall-pros",
  },
  {
    client: "The Stat Clinic",
    kind: "Walk-in and telemedicine clinic",
    built: "Services organized by patient need, insurance and directions easy to find, and booking prompts and click-to-call throughout.",
    result: "Keyword research and on-page SEO at launch, with conversion tracking in Google Analytics.",
    href: "/work/the-stat-clinic",
  },
  {
    client: "MI Family Lawyer",
    kind: "Family law practice, Michigan",
    built: "The attorney's credentials up front, one page per practice area, and a simple consultation request on every page.",
    result: "Search Console and Analytics set up at launch, so visibility is tracked for each practice area.",
    href: "/work/mi-family-lawyer",
  },
];

const recentWork = [
  { name: "Vue Optometry", kind: "Optometry practice, Dearborn Heights", href: "/work/vue-optometry", image: "/screenshots/vueoptometry.png" },
  { name: "The Stat Clinic", kind: "Walk-in and telemedicine clinic", href: "/work/the-stat-clinic", image: "/screenshots/thestatclinic.png" },
  { name: "Glam by Abeer", kind: "Makeup artist, Dearborn", href: "/work/glam-by-abeer", image: "/screenshots/glambyabeer.png" },
  { name: "Detroit Glass & Mirror", kind: "Glass company, Detroit", href: "/work/detroit-glass-mirror", image: "/screenshots/detroitglassandmirror.png" },
];

const reviews = testimonials;

export default function WebDesignDetroitPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="pt-[176px] pb-14 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-14 items-start">
          <div className="max-w-2xl">
            <nav className="flex items-center gap-2 text-xs text-[var(--site-text-muted)] mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[var(--site-text-primary)] transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/services" className="hover:text-[var(--site-text-primary)] transition-colors">Services</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[var(--site-text-secondary)]">Web Design & Development</span>
            </nav>

            <motion.h1
              initial={false}
              className="rise-in mt-4 text-6xl md:text-7xl font-light text-[var(--site-text-primary)] leading-[1.1]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Web design in Detroit that turns clicks into <span className="italic text-[#9a5423]">clients.</span>
            </motion.h1>

            <p className="mt-6 text-[var(--site-text-secondary)] text-lg md:text-xl leading-relaxed">
              Spectecle is a Dearborn-based web design studio that builds custom, fast-loading websites for
              Detroit and Metro Detroit businesses, designed to convert the traffic you&apos;re already paying for.
              Tell us about your business, and we&apos;ll tell you exactly what it needs.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-[var(--site-text-muted)]">
              <span>Serving Detroit and Metro Detroit</span>
              <span className="hidden sm:inline text-[var(--site-border)]">|</span>
              <a
                href={GOOGLE_REVIEWS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#9a5423] hover:underline font-normal"
              >
                <Star className="w-3.5 h-3.5 fill-current" />
                Rated 5.0 on Google
              </a>
              <span className="hidden sm:inline text-[var(--site-border)]">|</span>
              <span>Reply within 1 business day</span>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[var(--site-text-muted)]">
              <a href="tel:+13133534105" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)] transition-colors">
                <Phone className="w-4 h-4" />
                Call (313) 353-4105
              </a>
              <span>Updated November 2026</span>
            </div>
          </div>

          <div className="rise-in">
            <LandingLeadForm id="lead-form" pagePath={PAGE_PATH} source={SOURCE} />
          </div>
        </div>
      </section>

      {/* ── RECENT WORK STRIP ─────────────────────────── */}
      <section className="pb-14 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest mb-5">Recent websites</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {recentWork.map((w) => (
              <Link key={w.href} href={w.href} className="group block">
                <div className="relative aspect-[1600/557] overflow-hidden border border-[var(--site-border)]">
                  <Image
                    src={w.image}
                    alt={`${w.name} website`}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <p className="mt-2 text-sm text-[var(--site-text-primary)] group-hover:text-[#9a5423] transition-colors">{w.name}</p>
                <p className="text-xs text-[var(--site-text-muted)]">{w.kind}</p>
              </Link>
            ))}
          </div>
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

      {/* ── OUTCOMES ─────────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-14 text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              What you actually get.
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-6">
            {outcomes.map((o, i) => (
              <Reveal key={o.label} delay={i * 0.03}>
                <div className="group border border-[var(--site-border)] p-6 h-full hover:border-[#9a5423]/50 hover:-translate-y-1 transition duration-300">
                  <div className="w-10 h-10 rounded-full bg-[#9a5423]/10 flex items-center justify-center mb-4 group-hover:bg-[#9a5423]/20 transition-colors">
                    <o.Icon className="w-5 h-5 text-[#9a5423]" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-[var(--site-text-primary)] font-semibold mb-2">{o.label}</h3>
                  <p className="text-[var(--site-text-muted)] text-sm leading-relaxed">{o.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2} className="mt-12 text-center">
            <a
              href="#lead-form"
              className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get My Free Quote
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ───────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-14">
            <h2 className="text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              What&apos;s included in every Detroit website.
            </h2>
            <p className="mt-4 text-[var(--site-text-secondary)] leading-relaxed max-w-[60ch]">
              Design, development, and search setup from one team, so nothing gets lost between a designer, a developer,
              and an SEO agency.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {included.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.03}>
                <div className="group border border-[var(--site-border)] p-6 h-full hover:border-[#9a5423]/50 hover:-translate-y-1 transition duration-300">
                  <div className="w-10 h-10 rounded-full bg-[#9a5423]/10 flex items-center justify-center mb-4 group-hover:bg-[#9a5423]/20 transition-colors">
                    <f.Icon className="w-5 h-5 text-[#9a5423]" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-[var(--site-text-primary)] font-semibold mb-2">{f.label}</h3>
                  <p className="text-[var(--site-text-secondary)] text-sm leading-relaxed">{f.desc}</p>
                  <ul className="mt-4 space-y-2">
                    {f.points.map((p) => (
                      <li key={p} className="flex gap-2 text-sm text-[var(--site-text-muted)]">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-[#9a5423]" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── DETROIT WORK ─────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-10">
            <h2 className="text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              Websites we&apos;ve built for Metro Detroit businesses.
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {detroitWork.map((w) => (
              <Link key={w.client} href={w.href} className="group border border-[var(--site-border)] p-6 hover:border-[#9a5423]/50 transition-colors">
                <p className="text-xs text-[var(--site-text-muted)] uppercase tracking-wider">{w.kind}</p>
                <h3 className="mt-1 text-xl font-light text-[var(--site-text-primary)] group-hover:text-[#9a5423] transition-colors" style={{ fontFamily: "var(--font-serif)" }}>
                  {w.client}
                </h3>
                <p className="mt-3 text-sm text-[var(--site-text-secondary)] leading-relaxed">{w.built}</p>
                <p className="mt-2 text-sm text-[var(--site-text-muted)] leading-relaxed">{w.result}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#9a5423]">
                  Read the case study <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-xs text-[var(--site-text-muted)]">
            Ranking source: Google Search Console, August 4 to October 30, 2026, shared with our client&apos;s permission.
          </p>
        </div>
      </section>

      {/* ── WHO WE BUILD FOR ─────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-10">
          <Reveal>
            <h2 className="text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>Who we build for.</h2>
            <p className="mt-4 text-[var(--site-text-secondary)] leading-relaxed max-w-[50ch]">
              Local businesses whose customers look them up before they call. These are the industries we know best.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <ul className="divide-y divide-[var(--site-border)] border-y border-[var(--site-border)]">
              {industries.map((it) => (
                <li key={it.href}>
                  <Link href={it.href} className="group flex items-center justify-between py-4 text-[var(--site-text-primary)] hover:text-[#9a5423] transition-colors">
                    {it.label}
                    <ArrowUpRight className="w-4 h-4 text-[var(--site-text-muted)] group-hover:text-[#9a5423]" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-10">
            <h2 className="text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              How our web design process works.
            </h2>
          </Reveal>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
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

      {/* ── STORY ────────────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)] bg-[var(--site-surface)]">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">Why Spectecle</span>
            <h2 className="mt-4 text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              Not another web design mill.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="mt-6 space-y-5 text-[var(--site-text-secondary)] leading-relaxed">
            <p>
              Spectecle grew out of hands-on experience in enterprise IT and systems engineering,
              learning firsthand what makes software perform, scale, and stay secure under real-world
              conditions. That background shapes everything we build, including yours.
            </p>
            <p>
              We built Spectecle specifically to serve businesses that are often underserved by the
              industry: medical and legal practices that need a digital presence as precise as their
              work, contractors who do excellent work but show up nowhere on Google, and owners who are
              tired of agencies that hand off their site to a junior designer and an offshore team.
            </p>
            <p>
              Small enough to care about every detail. Senior enough to get it right the first time.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>What clients say.</h2>
            <a href={GOOGLE_REVIEWS} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-[var(--site-text-secondary)] underline underline-offset-4 hover:text-[var(--site-text-primary)]">
              Read all our Google reviews <ArrowUpRight className="w-4 h-4" />
            </a>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {reviews.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.03}>
                <figure className="border border-[var(--site-border)] p-6 h-full">
                  <Quote className="w-5 h-5 text-[#9a5423]/50 mb-3" />
                  <blockquote className="text-[var(--site-text-secondary)] text-sm leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</blockquote>
                  <figcaption>
                    <p className="text-[var(--site-text-primary)] text-sm font-semibold">{t.name}</p>
                    <p className="text-[var(--site-text-muted)] text-xs">{t.role}{t.role === "Google review" ? "" : " · Google review"}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISUAL BREAK ──────────────────────────────── */}
      <section className="relative h-[50vh] min-h-[340px] overflow-hidden border-t border-[var(--site-border)]">
        <Image
          src="/hero/detroit-office.jpg"
          alt="A lit office workspace inside a modern Detroit building at dusk"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-5xl mx-auto px-6 pb-14 w-full">
            <Reveal>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-3">Built In-House</p>
              <h2 className="text-3xl md:text-5xl font-light text-white max-w-2xl leading-[1.15]" style={{ fontFamily: "var(--font-serif)" }}>
                Every project shaped by real people, not a template.
              </h2>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── HOW PRICING WORKS ────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>How pricing works.</h2>
            <p className="mt-5 text-[var(--site-text-secondary)] leading-relaxed">
              Every business needs something different, so we don&apos;t sell one-size packages. The cost depends on how many
              pages and services the site covers, whether you take bookings or sell online, what needs to connect to it, and
              whether you want ongoing care after launch. We start with a free discovery call, then send a written, itemized
              scope and quote. No hidden fees.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-3xl mx-auto">
          <Reveal className="mb-14">
            <h2 className="text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>Detroit web design questions.</h2>
          </Reveal>
          <Reveal>
            <FAQAccordion faqs={webDesignFaqs} />
          </Reveal>
        </div>
      </section>

      {/* ── RELATED WORK AND READING ──────────────────── */}
      <RelatedReading
        items={[
          { href: "/services/web-design-dearborn", title: "Web design in Dearborn and Dearborn Heights", kind: "Service" },
          { href: "/work/detroit-glass-mirror", title: "Detroit Glass & Mirror: website redesign and local SEO", kind: "Case study" },
          { href: "/work/the-stat-clinic", title: "The Stat Clinic: clinic website and SEO", kind: "Case study" },
          { href: "/work/salazar-drywall-pros", title: "Salazar Drywall Pros: contractor website and ongoing care", kind: "Case study" },
          { href: "/services/seo-agency-detroit", title: "SEO in Detroit: local search, technical fixes, and monthly reporting", kind: "Service" },
          { href: "/blog/local-seo-detroit-guide", title: "Local SEO in Detroit: A Practical Guide for Small Businesses", kind: "Guide" },
          { href: "/blog/contractor-website-design-michigan", title: "Local SEO for Michigan Contractors: How to Rank #1 for Your Trade", kind: "Guide" },
          { href: "/blog/ecommerce-website-design-michigan", title: "E-commerce Website Design: How Michigan Shops Are Moving Beyond Instagram Sales", kind: "Guide" },
        ]}
      />

      {/* ── FINAL CTA ────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-[var(--site-border)] pb-32 md:pb-20">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
          <Reveal>
            <h2 className="text-5xl md:text-6xl font-light text-[var(--site-text-primary)] leading-[1.1]" style={{ fontFamily: "var(--font-serif)" }}>
              Proven craft. <span className="italic text-[#9a5423]">Built for Detroit.</span>
            </h2>
            <p className="mt-6 text-[var(--site-text-secondary)] text-lg max-w-lg">
              Book a free 30-minute strategy call, or fill out the form. Honest advice on what your site
              needs to rank and convert, no hard sell.
            </p>
            <a
              href="tel:+13133534105"
              className="mt-6 inline-flex items-center gap-2 text-lg font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-1"
            >
              (313) 353-4105
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </Reveal>
          <Reveal delay={0.1}>
            <LandingLeadForm
              pagePath={PAGE_PATH}
              source={SOURCE}
              heading="Ready when you are."
              subheading="Same form, same one-business-day reply."
            />
          </Reveal>
        </div>
      </section>

      <StickyMobileCallBar pagePath={PAGE_PATH} />
    </>
  );
}
