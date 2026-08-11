"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/ui/hero";
import ServiceGrid from "@/components/ui/ServiceGrid";
import { posts } from "@/app/blog/posts-data";
import { ArrowUpRight } from "lucide-react";

/* ─── Reveal ───────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
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

/* ─── Rotating word ────────────────────────────────── */
const partnerWords = ["Website", "SEO Campaign", "AI Agent", "Rebrand", "Next Launch"];

function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % partnerWords.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-block align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={partnerWords[index]}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="italic text-[#f87444] underline underline-offset-8 decoration-1"
        >
          {partnerWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ─── Data ─────────────────────────────────────────── */
const services = [
  {
    n: "01",
    title: "Web Design & Development",
    desc: "Custom websites built for speed, search rankings, and real conversions. Design and development happen in the same room, with no translation layers in between.",
    href: "/services/web-design-detroit",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    n: "02",
    title: "SEO",
    desc: "Local SEO that puts you in front of customers searching in your city. Technical audits, content, and link building, tracked with real numbers, not vanity metrics.",
    href: "/services/seo-agency-detroit",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
  },
  {
    n: "03",
    title: "Ad Campaigns",
    desc: "Paid search and social campaigns built to convert, not just get clicks. Every dollar tracked back to real leads and revenue, never vanity impressions.",
    href: "/services",
    image: "https://images.unsplash.com/photo-1607703703674-df96af81dffa?q=80&w=1600&auto=format&fit=crop",
  },
  {
    n: "04",
    title: "AI & Automation",
    desc: "Custom AI agents built from scratch, trained on your services, connected to your CRM, and tested until they actually work. Not a chatbot plugin.",
    href: "/services/ai-automation",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1600&auto=format&fit=crop",
  },
];

const projects = [
  {
    slug: "glam-by-abeer",
    title: "Glam by Abeer",
    category: "Beauty Studio",
    tagline: "A bold beauty brand built for the Instagram generation.",
    result: "+65% Bookings",
    image: "/screenshots/glambyabeer.png",
  },
  {
    slug: "vue-optometry",
    title: "Vue Optometry",
    category: "Healthcare / Optometry",
    tagline: "Membership-based eye care, reimagined online.",
    result: "Always Up-to-Date",
    image: "/screenshots/vueoptometry.png",
  },
  {
    slug: "mi-family-lawyer",
    title: "MI Family Lawyer",
    category: "Legal / Family Law",
    tagline: "Authority-first web presence for a Michigan family law attorney.",
    result: "Custom Law Firm Site",
    image: "/screenshots/mifamilylawyer.png",
  },
  {
    slug: "dearborn-cleaners",
    title: "Dearborn Cleaners",
    category: "Home Services",
    tagline: "Mold remediation you can book in minutes.",
    result: "Complete Rebuild",
    image: "/screenshots/dearborncleaners.png",
  },
  {
    slug: "the-stat-clinic",
    title: "The Stat Clinic",
    category: "Sports Performance & Health",
    tagline: "Performance-grade digital presence for a data-driven clinic.",
    result: "+85% Appointments",
    image: "/screenshots/thestatclinic.png",
  },
  {
    slug: "thematek",
    title: "Thematek",
    category: "Technology / IT Services",
    tagline: "Cutting-edge website. Even sharper AI behind the scenes.",
    result: "68% Automated",
    image: "/screenshots/thematek.png",
  },
  {
    slug: "detroit-glass-mirror",
    title: "Detroit Glass & Mirror",
    category: "Home Services / Glass",
    tagline: "Detroit's premier glass shop, now impossible to miss on Google.",
    result: "Google Map Pack",
    image: "/screenshots/detroitglassandmirror.png",
  },
  {
    slug: "salazar-drywall-pros",
    title: "Salazar Drywall Pros",
    category: "Home Services / Construction",
    tagline: "From word of mouth to page one on Google.",
    result: "#1 Local Rankings",
    image: "/screenshots/salazardrywallpros.png",
  },
  {
    slug: "indoor-garden",
    title: "Indoor Garden",
    category: "Retail / E-commerce",
    tagline: "From Instagram DMs to a thriving online store.",
    result: "+220% Organic Traffic",
    image: "/screenshots/indoorgarden.png",
  },
];

const testimonials = [
  {
    quote: "From the get-go, the team at Spectecle took the time to understand my brand and what I wanted to achieve with my site. They designed a sleek, modern website that's easy to navigate and looks great on both desktop and mobile.",
    name: "Hassan MB",
    role: "Business Owner",
  },
  {
    quote: "The team at Spectecle was fantastic! They answered all my questions and gave me insight into what would work best for my business and my budget. They went above and beyond expectations.",
    name: "Tim Kwiatkowski",
    role: "Business Owner",
  },
  {
    quote: "I had been needing to update my website and didn't know where to start. Walid made the process so simple. I'm so happy I went with him and highly recommend that everyone does the same!",
    name: "Neda Mohiedeen",
    role: "Attorney, MI Family Lawyer",
  },
];

const journalPosts = posts.slice(0, 3);

const mobileFeaturedSlugs = ["vue-optometry", "glam-by-abeer", "mi-family-lawyer"];
const mobileFeaturedProjects = mobileFeaturedSlugs.map(
  (slug) => projects.find((p) => p.slug === slug)!
);

function ProjectCard({ p, delay }: { p: (typeof projects)[number]; delay: number }) {
  return (
    <Reveal delay={delay}>
      <Link href={`/work/${p.slug}`} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={p.image}
            alt={`${p.title} homepage`}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <h3
          className="mt-5 text-xl font-light text-[var(--site-text-primary)] group-hover:text-[#f87444] transition-colors"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {p.title}
        </h3>
        <p className="mt-1.5 text-sm text-[var(--site-text-muted)]">{p.tagline}</p>
      </Link>
    </Reveal>
  );
}

/* ─── Page ─────────────────────────────────────────── */
export default function HomePage() {
  const [showAllWork, setShowAllWork] = useState(false);
  const visibleProjects = showAllWork ? projects : projects.slice(0, 6);

  return (
    <SmoothScroll>
      <Hero />

      {/* ══ OUR LATEST WORK ══════════════════════════ */}
      <section className="py-32 px-6 bg-[var(--site-bg)] border-t border-[var(--site-border)]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="mb-14">
              <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-[0.25em]">Every Pixel. Every Website. Crafted.</span>
            </div>
          </Reveal>

          {/* Mobile: 3 featured projects, expands to all via View More */}
          <div className="grid md:hidden gap-y-16">
            {(showAllWork ? projects : mobileFeaturedProjects).map((p, i) => (
              <ProjectCard key={p.slug} p={p} delay={i * 0.08} />
            ))}
          </div>

          {/* Desktop/tablet: 6 projects, expands to all via View More */}
          <div className="hidden md:grid grid-cols-3 gap-x-8 gap-y-16">
            {visibleProjects.map((p, i) => (
              <ProjectCard key={p.slug} p={p} delay={i * 0.08} />
            ))}
          </div>

          {!showAllWork && (
            <div className="mt-16 flex justify-center">
              <button
                onClick={() => setShowAllWork(true)}
                className="bg-black text-white px-8 py-3.5 text-sm font-semibold uppercase tracking-widest cursor-pointer hover:bg-[#1e1e1e] transition-colors"
              >
                View More
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ══ SERVICES ═════════════════════════════════ */}
      <section className="py-32 px-6 bg-[var(--site-bg)] border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="mb-16">
              <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">What We Do</span>
              <h2
                className="mt-4 text-5xl md:text-6xl font-light text-[var(--site-text-primary)]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Four disciplines. <span className="italic text-[#f87444]">One obsession.</span>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <ServiceGrid items={services} />
          </Reveal>
        </div>
      </section>

      {/* ══ TESTIMONIALS ═════════════════════════════ */}
      <section className="py-32 px-6 border-t border-[var(--site-border)] bg-[var(--site-bg)]">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="mb-16">
              <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">Client Stories</span>
              <h2 className="mt-4 text-5xl md:text-6xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
                Trusted <span className="italic text-[#f87444]">across industries.</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-x-10 gap-y-12">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <div>
                  <blockquote
                    className="text-[var(--site-text-primary)] text-lg leading-relaxed font-light italic"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <p className="mt-6 text-sm font-semibold text-[var(--site-text-primary)]">{t.name}</p>
                  <p className="text-xs text-[var(--site-text-muted)]">{t.role}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-16 pt-10 border-t border-[var(--site-border)] flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-2xl font-semibold text-[var(--site-text-primary)]">5.0</span>
                <span className="text-[var(--site-text-muted)] text-sm ml-2">from Google Reviews</span>
              </div>
              <a
                href="https://g.page/r/CbSs-g26jjLnEBM/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-0.5"
              >
                See all reviews on Google
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ JOURNAL ══════════════════════════════════ */}
      <section className="py-32 px-6 border-t border-[var(--site-border)] bg-[var(--site-bg)]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
              <div>
                <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">Journal</span>
                <h2 className="mt-4 text-5xl md:text-6xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
                  Insights from <span className="italic text-[#f87444]">the agency.</span>
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-0.5 shrink-0"
              >
                Read the Journal
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-x-10 gap-y-12">
            {journalPosts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.1}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="relative aspect-[16/10] w-full mb-5 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <span className={`text-xs font-semibold ${post.categoryColor} uppercase tracking-widest`}>
                    {post.category}
                  </span>
                  <h3
                    className="mt-3 text-2xl font-light text-[var(--site-text-primary)] leading-snug group-hover:text-[#f87444] transition-colors"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm text-[var(--site-text-secondary)] leading-relaxed line-clamp-3">{post.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PARTNER CTA ══════════════════════════════ */}
      <section className="relative py-40 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1920&q=80"
            alt="Web design and development workspace"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <Reveal>
          <div className="relative max-w-3xl mx-auto text-center">
            <h2
              className="text-4xl md:text-6xl font-light text-white leading-[1.2]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Ready to partner with us on your <RotatingWord />?
            </h2>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-2 text-xs font-semibold text-white uppercase tracking-widest border-b border-white pb-1"
            >
              Start a Project
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ══ CTA ══════════════════════════════════════ */}
      <section className="py-40 px-6 bg-[#1e1e1e]">
        <Reveal>
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs text-[#f87444] font-medium uppercase tracking-[0.25em]">
              Let&apos;s Build Together
            </span>
            <h2 className="mt-6 text-5xl md:text-7xl font-light text-[#f4f1e9] leading-[1.05]" style={{ fontFamily: "var(--font-serif)" }}>
              Your site should be your{" "}
              <span className="italic text-[#f87444]">best salesperson.</span>
            </h2>
            <p className="mt-8 text-[#f4f1e9]/60 text-lg max-w-xl mx-auto">
              Work directly with the team. No middlemen, no account managers, just a direct line
              to the people designing, building, and launching your site.
            </p>
            <div className="mt-12">
              <Link href="/contact" className="inline-flex items-center gap-2 text-lg font-semibold text-[#f4f1e9] border-b border-[#f4f1e9] pb-1">
                <span>Book a Free Call</span>
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </SmoothScroll>
  );
}
