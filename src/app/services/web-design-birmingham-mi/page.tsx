"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, Palette, Code2, ShoppingCart, RefreshCw } from "lucide-react";
import { FAQAccordion } from "@/components/ui/FAQAccordion";

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
  { label: "Custom UI/UX Design", desc: "Refined interfaces built around your brand and how Birmingham clients actually shop, book, and inquire.", Icon: Palette },
  { label: "Next.js & React Development", desc: "Fast, SEO-ready builds that score green on Core Web Vitals, with no compromise on polish.", Icon: Code2 },
  { label: "E-commerce & CMS", desc: "Shopify, WooCommerce, and headless CMS builds for boutiques and professional practices alike.", Icon: ShoppingCart },
  { label: "Ongoing Maintenance", desc: "Fast, secure, and current every month, without adding another thing to your plate.", Icon: RefreshCw },
];

const faqs = [
  {
    q: "How much does a website cost in Birmingham, MI?",
    a: "Web design costs vary based on scope and goals. Brochure sites, custom web applications, and e-commerce stores for boutiques or practices each have different requirements. We provide transparent, itemized quotes after a free 30-minute discovery call. No hidden fees, no surprises.",
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
    q: "Do you only work with businesses in Birmingham?",
    a: "No. Birmingham is a core part of our Oakland County service area alongside Bloomfield Hills, Royal Oak, Troy, and Franklin, and we work with businesses across Metro Detroit and beyond. If your brand holds itself to a high standard, we're a fit regardless of zip code.",
  },
];

export default function WebDesignBirminghamPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="pt-[176px] pb-14 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
          <div className="max-w-2xl">
            <nav className="flex items-center gap-2 text-xs text-[var(--site-text-muted)] mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[var(--site-text-primary)] transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/services" className="hover:text-[var(--site-text-primary)] transition-colors">Services</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-[var(--site-text-secondary)]">Web Design & Development</span>
            </nav>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 text-6xl md:text-7xl font-light text-[var(--site-text-primary)] leading-[1.05]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Web Design & <span className="italic text-[#9a5423]">Development</span> for Birmingham businesses.
            </motion.h1>

            <p className="mt-6 text-[var(--site-text-secondary)] text-lg md:text-xl leading-relaxed">
              Refined websites for Birmingham and Oakland County brands, built to rank, load fast, and convert. No templates, no offshore teams.
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

          <Reveal delay={0.15}>
            <div className="relative aspect-[4/3] overflow-hidden border border-[var(--site-border)]">
              <Image
                src="https://images.unsplash.com/photo-1758448500688-3ababa93fd67?q=80&w=1600&auto=format&fit=crop"
                alt="A refined modern lobby with marble and warm lighting"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CATCHPHRASE ──────────────────────────────── */}
      <section className="py-16 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-light text-[var(--site-text-primary)] leading-[1.15]" style={{ fontFamily: "var(--font-serif)" }}>
              Thoughtful design. Flawless execution. <span className="italic text-[#9a5423]">Built to convert.</span>
            </h2>
          </Reveal>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-14">
            <h2 className="text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>What&apos;s included.</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.07}>
                <div className="group border border-[var(--site-border)] p-6 h-full hover:border-[#9a5423]/50 hover:-translate-y-1 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-[#9a5423]/10 flex items-center justify-center mb-4 group-hover:bg-[#9a5423]/20 transition-colors">
                    <f.Icon className="w-5 h-5 text-[#9a5423]" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-[var(--site-text-primary)] font-semibold mb-2 text-sm">{f.label}</h3>
                  <p className="text-[var(--site-text-muted)] text-sm leading-relaxed">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCAL PROOF ──────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)] bg-[var(--site-surface)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-4">
            <h2 className="text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              Built for Oakland County businesses.
            </h2>
          </Reveal>
          <Reveal delay={0.05} className="mb-10">
            <p className="text-[var(--site-text-secondary)] text-lg max-w-2xl">
              From Birmingham to Bloomfield Hills, Royal Oak, and Troy, we&apos;ve designed and grown websites for boutiques, practices, and professional brands across <Link href="/services/web-design-detroit" className="text-[#9a5423] hover:underline">Metro Detroit</Link> that hold themselves to a high standard.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: "Glam by Abeer", location: "Michigan", result: "15+ Keywords Ranked", href: "/work/glam-by-abeer" },
              { title: "The Stat Clinic", location: "Michigan", result: "+85% Appointments", href: "/work/the-stat-clinic" },
              { title: "MI Family Lawyer", location: "Michigan", result: "Custom Law Firm Site", href: "/work/mi-family-lawyer" },
            ].map((p) => (
              <Reveal key={p.title}>
                <Link href={p.href} className="group block border border-[var(--site-border)] bg-[var(--site-bg)] p-6 h-full hover:border-[#9a5423]/50 hover:-translate-y-1 transition-all duration-300">
                  <p className="text-xs uppercase tracking-widest text-[var(--site-text-muted)] mb-2">{p.location}</p>
                  <h3 className="text-[var(--site-text-primary)] font-semibold mb-1">{p.title}</h3>
                  <p className="text-sm font-semibold text-[#9a5423] mb-3">{p.result}</p>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--site-text-secondary)] group-hover:text-[#9a5423] transition-colors">
                    View case study <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISUAL BREAK ──────────────────────────────── */}
      <section className="relative h-[50vh] min-h-[340px] overflow-hidden border-t border-[var(--site-border)]">
        <Image
          src="https://images.unsplash.com/photo-1745761321026-896e9d1c76b8?q=80&w=2000&auto=format&fit=crop"
          alt="An upscale boutique storefront with warm evening lighting"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-5xl mx-auto px-6 pb-14 w-full">
            <Reveal>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-3">Refined By Design</p>
              <h2 className="text-3xl md:text-5xl font-light text-white max-w-2xl leading-[1.15]" style={{ fontFamily: "var(--font-serif)" }}>
                Every detail considered, nothing left templated.
              </h2>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-3xl mx-auto">
          <Reveal className="mb-14">
            <h2 className="text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>Common questions.</h2>
          </Reveal>
          <Reveal>
            <FAQAccordion faqs={faqs} />
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
              { title: "SEO & Digital Marketing", desc: "A refined site still needs to be found. We handle search rankings too.", href: "/services/seo-agency-detroit" },
              { title: "AI & Automation", desc: "Automate lead follow-up, client intake, and internal workflows.", href: "/services/ai-automation" },
            ].map((s) => (
              <Reveal key={s.title}>
                <Link href={s.href} className="group block border border-[var(--site-border)] p-6 h-full hover:border-[#9a5423]/50 hover:-translate-y-1 transition-all duration-300">
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

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-[var(--site-border)]">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              Proven craft. <span className="italic text-[#9a5423]">Refined in Birmingham.</span>
            </h2>
            <p className="mt-6 text-[var(--site-text-secondary)] text-lg max-w-xl mx-auto">
              Book a free 30-minute strategy call. Honest advice on what your site needs to rank and convert.
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
