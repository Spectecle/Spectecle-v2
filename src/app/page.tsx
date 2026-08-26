"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/ui/hero";
import ServiceTicker from "@/components/ui/ServiceTicker";
import { services } from "@/lib/services-data";
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

/* ─── Data ─────────────────────────────────────────── */
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

const featuredProjects = projects.slice(0, 6);

function ProjectCard({ p, delay }: { p: (typeof projects)[number]; delay: number }) {
  return (
    <Reveal delay={delay}>
      <Link href={`/work/${p.slug}`} className="group block" data-cursor>
        <div className="relative aspect-[1600/557] overflow-hidden bg-[var(--site-surface)]">
          <Image
            src={p.image}
            alt={`${p.title} homepage`}
            fill
            className="object-cover object-top transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="mt-5 pb-4 border-b border-[var(--site-border)] group-hover:border-[var(--site-copper-soft)] transition-colors duration-400">
          <h3
            className="text-2xl font-light text-[var(--site-text-primary)]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {p.title}
          </h3>
        </div>
      </Link>
    </Reveal>
  );
}

/* ─── Page ─────────────────────────────────────────── */
export default function HomePage() {
  return (
    <SmoothScroll>
      <Hero />

      <ServiceTicker />

      {/* ══ THE STUDIO ═══════════════════════════════ */}
      <section className="py-20 sm:py-28 px-6" style={{ background: "#ECE5D8", color: "#1A1410" }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-24 items-start">
            <Reveal>
              <p
                className="text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.16] tracking-tight"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                A studio for brands that want to look <em className="italic" style={{ color: "#9a5423" }}>inevitable</em> online.
              </p>
            </Reveal>
            <div>
              <Reveal delay={0.1}>
                <p className="text-[1.06rem] leading-[1.72] max-w-[44ch]" style={{ color: "#544838" }}>
                  Strategy, design, development, and marketing live under one roof, so the work stays sharp from first sketch to launched site. No handoffs to lose the thread. No template doing the thinking for you. Just a team that treats your site like the storefront it actually is.
                </p>
              </Reveal>
              <div className="mt-12">
                <Reveal delay={0.16}>
                  <div>
                    <span className="block text-3xl sm:text-4xl lg:text-5xl leading-none" style={{ fontFamily: "var(--font-serif)" }}>
                      2014
                    </span>
                    <span className="block mt-2.5 text-[11.5px] tracking-[0.16em] uppercase" style={{ color: "#93856d" }}>
                      Founded
                    </span>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SELECTED WORK ═════════════════════════════ */}
      <section className="py-20 sm:py-28 px-6 bg-[var(--site-bg)] border-t border-[var(--site-border)]" id="work">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex items-end justify-between gap-6 mb-14 sm:mb-20">
              <div>
                <p className="inline-flex items-center gap-3.5 text-xs tracking-[0.26em] uppercase text-[var(--site-text-muted)]">
                  <span className="w-10 h-px bg-[rgba(219,197,163,.34)]" />
                  Selected Work
                </p>
                <h2
                  className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-normal text-[var(--site-text-primary)] tracking-tight"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Recent builds.
                </h2>
              </div>
              <Link
                href="/work"
                data-cursor
                className="hidden sm:inline-flex items-center gap-2.5 text-xs tracking-[0.16em] uppercase text-[var(--site-text-muted)] hover:text-[var(--site-text-primary)] transition-colors shrink-0 pb-1"
              >
                All projects
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-16 sm:gap-y-24 md:[&>*:nth-child(even)]:mt-16">
            {featuredProjects.map((p, i) => (
              <ProjectCard key={p.slug} p={p} delay={(i % 2) * 0.08} />
            ))}
          </div>

          <Reveal className="sm:hidden mt-14 flex justify-center">
            <Link
              href="/work"
              data-cursor
              className="inline-flex items-center gap-2.5 text-xs tracking-[0.16em] uppercase text-[var(--site-text-muted)] hover:text-[var(--site-text-primary)] transition-colors"
            >
              All projects
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══ CAPABILITIES ══════════════════════════════ */}
      <section className="py-20 sm:py-28 px-6 bg-[var(--site-bg)] border-t border-[var(--site-border)]" id="services">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2
              className="mb-10 sm:mb-14 text-4xl sm:text-5xl lg:text-6xl font-normal text-[var(--site-text-primary)] tracking-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Everything a site needs to earn its keep.
            </h2>
          </Reveal>

          <div>
            {services.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05}>
                <Link
                  href={s.href}
                  data-cursor
                  className="group relative grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-12 py-6 sm:py-8 border-t border-[var(--site-border)] last:border-b transition-[padding-left] duration-[450ms] ease-[cubic-bezier(.16,1,.3,1)] hover:pl-5"
                >
                  <span className="absolute inset-y-0 left-0 w-0 bg-[rgba(203,124,70,.06)] -z-10 transition-[width] duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:w-full" />
                  <span className="text-xs tracking-[0.14em] text-[var(--site-text-muted)] group-hover:text-[var(--site-copper)] transition-colors">
                    {s.n}
                  </span>
                  <span
                    className="text-2xl sm:text-3xl lg:text-4xl font-normal text-[var(--site-text-primary)] tracking-tight group-hover:text-[var(--site-copper-soft)] transition-colors"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {s.title}
                  </span>
                  <span className="hidden sm:block text-sm leading-relaxed text-[var(--site-text-secondary)] max-w-[34ch] justify-self-end text-right">
                    {s.desc}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CLOSING CTA ═══════════════════════════════ */}
      <section className="py-32 sm:py-40 px-6 bg-[var(--site-surface)] border-t border-[var(--site-border)]">
        <Reveal>
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs text-[var(--site-copper-soft)] font-medium uppercase tracking-[0.25em]">
              Let&apos;s Build Together
            </span>
            <h2
              className="mt-6 text-5xl md:text-7xl font-normal text-[var(--site-text-primary)] leading-[1.05] tracking-tight"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Let&apos;s build something worth{" "}
              <span className="italic text-[var(--site-copper-soft)]">looking twice</span> at.
            </h2>
            <p className="mt-8 text-[var(--site-text-secondary)] text-lg max-w-xl mx-auto">
              Work directly with the team. No middlemen, no account managers, just a direct line
              to the people designing, building, and launching your site.
            </p>
            <div className="mt-12">
              <Link
                href="/contact"
                data-cursor
                className="inline-flex items-center gap-2 text-lg font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-1"
              >
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
