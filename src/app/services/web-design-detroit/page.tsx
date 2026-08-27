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
  { label: "Custom UI/UX Design", desc: "Built around your brand and how visitors actually move through it.", Icon: Palette },
  { label: "Next.js & React Development", desc: "Fast, SEO-ready builds that score green on Core Web Vitals.", Icon: Code2 },
  { label: "E-commerce & CMS", desc: "Shopify, WooCommerce, and headless CMS builds that grow with you.", Icon: ShoppingCart },
  { label: "Ongoing Maintenance", desc: "Fast, secure, and current, every month, without the overhead.", Icon: RefreshCw },
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

export default function WebDesignDetroitPage() {
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
              Web Design & <span className="italic text-[#9a5423]">Development</span> for Detroit businesses.
            </motion.h1>

            <p className="mt-6 text-[var(--site-text-secondary)] text-lg md:text-xl leading-relaxed">
              Custom websites built to rank, load fast, and convert. No templates, no offshore teams.
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
                src="https://images.unsplash.com/photo-1487523117656-d5d117ad47c5?q=80&w=1600&auto=format&fit=crop"
                alt="Modern web design workspace"
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
              Built once. Built right. <span className="italic text-[#9a5423]">Built to convert.</span>
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
              Built for Detroit businesses.
            </h2>
          </Reveal>
          <Reveal delay={0.05} className="mb-10">
            <p className="text-[var(--site-text-secondary)] text-lg max-w-2xl">
              We&apos;ve designed and built websites for businesses across Detroit, Dearborn, and the surrounding Michigan suburbs: sites that show up on Google Maps, rank locally, and turn visitors into customers.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: "Detroit Glass & Mirror", location: "Detroit, MI", result: "Google Map Pack", href: "/work/detroit-glass-mirror" },
              { title: "Salazar Drywall Pros", location: "Michigan", result: "#1 Local Rankings", href: "/work/salazar-drywall-pros" },
              { title: "Dearborn Cleaners", location: "Dearborn, MI", result: "Complete Rebuild", href: "/work/dearborn-cleaners" },
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
              { title: "SEO & Digital Marketing", desc: "A great website needs to be found. We handle search rankings too.", href: "/services/seo-agency-detroit" },
              { title: "AI & Automation", desc: "Automate lead follow-up, customer support, and internal workflows.", href: "/services/ai-automation" },
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
              Proven craft. <span className="italic text-[#9a5423]">Built in Detroit.</span>
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
