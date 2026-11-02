"use client";

import Link from "next/link";
import Image from "next/image";
import { RelatedReading } from "@/components/ui/RelatedReading";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, Search, Target, BookOpen, MapPin, CheckCircle2, Phone, Star } from "lucide-react";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { seoFaqs } from "./faqs";
import { testimonials } from "@/lib/testimonials-data";

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

const features = [
  {
    label: "Technical SEO audits and fixes",
    desc: "We check how Google crawls, indexes, and loads your site, then fix what's holding it back.",
    points: [
      "Crawling and indexing checks in Google Search Console",
      "Page speed and Core Web Vitals",
      "Titles, descriptions, redirects, and structured data",
      "Fixes made in your site's code, not handed off as a report",
    ],
    Icon: Search,
  },
  {
    label: "Keyword and competitor strategy",
    desc: "We find the searches your customers actually use and the ones you can realistically win first.",
    points: [
      "Searches by service and by city",
      "Who ranks today, and why",
      "Clear targets for the first few months",
    ],
    Icon: Target,
  },
  {
    label: "Content and authority",
    desc: "Pages and posts that answer what customers ask, plus the listings and links that build trust.",
    points: [
      "Service and location pages that aren't copy-pasted",
      "Blog content that answers real customer questions",
      "Directory listings with consistent business details",
    ],
    Icon: BookOpen,
  },
  {
    label: "Local SEO",
    desc: "Everything that decides whether you show up in Google's map results and near-me searches.",
    points: [
      "Google Business Profile setup and upkeep",
      "Review requests on a steady schedule",
      "Local structured data and location signals",
    ],
    Icon: MapPin,
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
  { title: "Free SEO audit", desc: "We check how Google sees your site today: what's indexed, how fast it loads, which searches you appear for, and what your competitors do better." },
  { title: "Strategy and targets", desc: "We pick the searches worth winning first, by service and by city, and agree on what success looks like for your business." },
  { title: "Technical fixes", desc: "Speed, indexing, titles, structured data, and redirects, fixed directly in your site by the same team that builds websites." },
  { title: "Content, local, and authority", desc: "Service pages, your Google Business Profile, reviews, and directory listings, worked on every month." },
  { title: "Monthly reporting in The Loop", desc: "Rankings, search traffic, and leads from search in your client portal, with notes on what we did and what's next." },
];

const results = [
  {
    client: "The Stat Clinic",
    kind: "Walk-in and telemedicine clinic",
    result: "11,711 Google search impressions in 90 days, and the first result for “stat telemedicine & walk-in.”",
    href: "/work/the-stat-clinic",
  },
  {
    client: "Detroit Glass & Mirror",
    kind: "Detroit glass company",
    result: "In Google's top five for “detroit glass company” and top ten for “glass company detroit.”",
    href: "/work/detroit-glass-mirror",
  },
  {
    client: "Glam by Abeer",
    kind: "Dearborn makeup artist",
    result: "Her makeup-tips blog posts appeared in Google searches 3,142 times in 90 days, mostly for foundation and skin-tone questions.",
    href: "/work/glam-by-abeer",
  },
  {
    client: "Vue Optometry",
    kind: "Optometry practice, Dearborn Heights",
    result: "Ongoing care: a booking-first homepage, clear insurance lists, and contact details patients can trust, updated as the practice changes.",
    href: "/work/vue-optometry",
  },
];

const reviews = testimonials;

const reasons = [
  "One team for the website and the SEO, so technical fixes happen in your site's code by the people who built it.",
  "Based in Dearborn and working with Metro Detroit businesses we can meet in person.",
  "Monthly reporting in The Loop, your client portal: what we did, what moved, and what's next.",
  "Proof you can check: our clients' Search Console results above, and our own first-place Google rankings for Dearborn web design searches.",
  "No account managers. You talk directly to the people doing the work.",
];

export default function SEOAgencyDetroitPage() {
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
              <span className="text-[var(--site-text-secondary)]">SEO Agency Detroit</span>
            </nav>

            <motion.h1
              initial={false}
              className="rise-in mt-4 text-6xl md:text-7xl font-light text-[var(--site-text-primary)] leading-[1.1]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              SEO Agency <span className="italic text-[#9a5423]">Detroit, Michigan.</span>
            </motion.h1>

            <p className="mt-6 text-[var(--site-text-secondary)] text-lg md:text-xl max-w-2xl leading-relaxed">
              Search-first strategies that push you to page one and keep you there.
            </p>
            <p className="mt-4 text-[var(--site-text-secondary)] max-w-[60ch] leading-relaxed">
              Spectecle is a Metro Detroit SEO agency based in Dearborn. We help local businesses show up when nearby
              customers search, in Google&apos;s map results, regular results, and AI answers. The same small team that
              builds websites does the SEO, so fixes happen in your site, and every month you see what we did and what moved.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-0.5">
                Get a free SEO audit
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a href="tel:+13133534105" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)] transition-colors">
                <Phone className="w-4 h-4" />
                Call (313) 353-4105
              </a>
            </div>
            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--site-text-muted)]">
              <a href={GOOGLE_REVIEWS} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-[var(--site-text-primary)]">
                <Star className="w-3.5 h-3.5 fill-current text-[#9a5423]" />
                Rated 5.0 on Google
              </a>
              <span>·</span>
              <span>Updated November 2026</span>
            </p>
          </div>

          <div className="rise-in">
            <div className="relative aspect-[4/3] overflow-hidden border border-[var(--site-border)]">
              <Image
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop"
                alt="SEO performance analytics dashboard"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CATCHPHRASE ──────────────────────────────── */}
      <section className="py-16 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-light text-[var(--site-text-primary)] leading-[1.15]" style={{ fontFamily: "var(--font-serif)" }}>
              If they can&apos;t find you, <span className="italic text-[#9a5423]">you don&apos;t exist.</span>
            </h2>
          </Reveal>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-14">
            <h2 className="text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              What&apos;s included in our SEO services.
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((f, i) => (
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

      {/* ── WHO WE HELP ──────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-10">
          <Reveal>
            <h2 className="text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>Who we help.</h2>
            <p className="mt-4 text-[var(--site-text-secondary)] leading-relaxed max-w-[50ch]">
              Local businesses whose customers search before they call. These are the industries we know best.
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
              How our Detroit SEO process works.
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

      {/* ── VISUAL BREAK ──────────────────────────────── */}
      <section className="relative h-[50vh] min-h-[340px] overflow-hidden border-t border-[var(--site-border)]">
        <Image
          src="https://images.unsplash.com/photo-1672279410716-c676739163e9?q=80&w=2000&auto=format&fit=crop"
          alt="City skyline lit up at dusk"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-5xl mx-auto px-6 pb-14 w-full">
            <Reveal>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-3">Visibility Wins</p>
              <h2 className="text-3xl md:text-5xl font-light text-white max-w-2xl leading-[1.15]" style={{ fontFamily: "var(--font-serif)" }}>
                Being the best doesn&apos;t matter if no one can find you.
              </h2>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── RESULTS ──────────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-10">
            <h2 className="text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              Results for Metro Detroit businesses.
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {results.map((r) => (
              <Link key={r.client} href={r.href} className="group border border-[var(--site-border)] p-6 hover:border-[#9a5423]/50 transition-colors">
                <p className="text-xs text-[var(--site-text-muted)] uppercase tracking-wider">{r.kind}</p>
                <h3 className="mt-1 text-xl font-light text-[var(--site-text-primary)] group-hover:text-[#9a5423] transition-colors" style={{ fontFamily: "var(--font-serif)" }}>
                  {r.client}
                </h3>
                <p className="mt-3 text-sm text-[var(--site-text-secondary)] leading-relaxed">{r.result}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#9a5423]">
                  Read the case study <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-xs text-[var(--site-text-muted)]">
            Source: Google Search Console, August 4 to October 30, 2026, shared with our clients&apos; permission.
          </p>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)] bg-[var(--site-surface)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>What clients say.</h2>
            <a href={GOOGLE_REVIEWS} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-[var(--site-text-secondary)] underline underline-offset-4 hover:text-[var(--site-text-primary)]">
              Read all our Google reviews <ArrowUpRight className="w-4 h-4" />
            </a>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
            {reviews.map((r) => (
              <figure key={r.name} className="border-t border-[var(--site-border)] pt-5">
                <blockquote className="text-[var(--site-text-primary)] leading-relaxed" style={{ fontFamily: "var(--font-serif)" }}>
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-3 text-sm text-[var(--site-text-muted)]">{r.name} · {r.role}{r.role === "Google review" ? "" : " · Google review"}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY SPECTECLE ────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-10">
          <Reveal>
            <h2 className="text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              Why choose Spectecle as your Detroit SEO agency.
            </h2>
          </Reveal>
          <Reveal delay={0.05}>
            <ul className="space-y-4">
              {reasons.map((r) => (
                <li key={r} className="flex gap-3 text-[var(--site-text-secondary)] leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 text-[#9a5423]" />
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── HOW PRICING WORKS ────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>How pricing works.</h2>
            <p className="mt-5 text-[var(--site-text-secondary)] leading-relaxed">
              Every business starts in a different place, so we don&apos;t sell one-size packages. The work depends on how
              many services and areas you want to rank for, how competitive those searches are, the state of your current
              website, and whether you want us writing content. We start with a free SEO audit, then send a written scope and
              quote. No hidden fees.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-3xl mx-auto">
          <Reveal className="mb-14">
            <h2 className="text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>Detroit SEO questions.</h2>
          </Reveal>
          <Reveal>
            <FAQAccordion faqs={seoFaqs} />
          </Reveal>
        </div>
      </section>

      {/* ── RELATED SERVICES ─────────────────────────── */}
      <section className="py-12 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-8">
            <h2 className="text-2xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>Pair it with</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl">
            {[
              { title: "Web Design & Development", desc: "A site that ranks needs to convert. We design and build too.", href: "/services/web-design-detroit" },
              { title: "AI & Automation", desc: "Turn the leads your SEO generates into automated follow-up.", href: "/services/ai-automation" },
            ].map((s) => (
              <Reveal key={s.title}>
                <Link href={s.href} className="group block border border-[var(--site-border)] p-6 h-full hover:border-[#9a5423]/50 hover:-translate-y-1 transition duration-300">
                  <h3 className="text-[var(--site-text-primary)] font-semibold mb-2 group-hover:text-[#9a5423] transition-colors">{s.title}</h3>
                  <p className="text-[var(--site-text-muted)] text-sm leading-relaxed">{s.desc}</p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-[#9a5423]">
                    Learn more <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED WORK AND READING ──────────────────── */}
      <RelatedReading
        items={[
          { href: "/work/the-stat-clinic", title: "The Stat Clinic: clinic website and SEO", kind: "Case study" },
          { href: "/work/detroit-glass-mirror", title: "Detroit Glass & Mirror: website redesign and local SEO", kind: "Case study" },
          { href: "/work/glam-by-abeer", title: "Glam by Abeer: portfolio website and local SEO", kind: "Case study" },
          { href: "/blog/local-seo-detroit-guide", title: "Local SEO in Detroit: A Practical Guide for Small Businesses", kind: "Guide" },
          { href: "/blog/contractor-website-design-michigan", title: "Local SEO for Michigan Contractors: How to Rank #1 for Your Trade", kind: "Guide" },
        ]}
      />

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-[var(--site-border)]">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              Detroit expertise. <span className="italic text-[#9a5423]">Nationwide reach.</span>
            </h2>
            <p className="mt-6 text-[var(--site-text-secondary)] text-lg max-w-xl mx-auto">
              Book a free 30-minute strategy call. We&apos;ll audit your search presence and tell you exactly what it takes to rank.
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
