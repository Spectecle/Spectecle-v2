"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronRight, ListChecks, TrendingUp, MessageSquare, FileText } from "lucide-react";
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
  { label: "Request Tracking", desc: "Submit requests and watch them move from New to Done, in real time.", Icon: ListChecks },
  { label: "Analytics & Rankings", desc: "Your traffic, rankings, and site health, without having to ask.", Icon: TrendingUp },
  { label: "Direct Messaging & Files", desc: "Message our team and share files, attached right to the request.", Icon: MessageSquare },
  { label: "Invoices & Reports", desc: "Invoices and weekly ad performance reports, always on hand.", Icon: FileText },
];

const faqs = [
  {
    q: "Is The Loop included with every project?",
    a: "Yes. Every client gets access at no extra cost, from kickoff through launch and beyond.",
  },
  {
    q: "What can I see inside The Loop?",
    a: "Open requests, site analytics, rankings, invoices, and reports, all tied to your account.",
  },
  {
    q: "How do I get access?",
    a: "You'll get an email invite once your project starts. Sign in anytime with a secure link, no password required.",
  },
];

export default function TheLoopPage() {
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
              <span className="text-[var(--site-text-secondary)]">The Loop</span>
            </nav>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 text-6xl md:text-7xl font-light text-[var(--site-text-primary)] leading-[1.05]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Your project, always in <span className="italic text-[#9a5423]">The Loop.</span>
            </motion.h1>

            <p className="mt-6 text-[var(--site-text-secondary)] text-lg md:text-xl leading-relaxed">
              Every request, report, and result, in one place, always current. No more chasing updates over email.
            </p>

            <div className="mt-8 flex flex-wrap gap-8">
              <Link href="/portal" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-0.5">
                Sign In to The Loop
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)] transition-colors">
                Start a Project <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <Reveal delay={0.15}>
            <div className="relative aspect-[4/3] overflow-hidden border border-[var(--site-border)]">
              <Image
                src="https://images.unsplash.com/photo-1748764720733-3bb4c52ab6f9?q=80&w=1600&auto=format&fit=crop"
                alt="A sleek, modern architectural interior"
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
              Everything about your project. <span className="italic text-[#9a5423]">Nothing left to guess.</span>
            </h2>
          </Reveal>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-14">
            <h2 className="text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>What&apos;s inside.</h2>
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

      {/* ── VISUAL BREAK ──────────────────────────────── */}
      <section className="relative h-[50vh] min-h-[340px] overflow-hidden border-t border-[var(--site-border)]">
        <Image
          src="https://images.unsplash.com/photo-1495321308589-43affb814eee?q=80&w=2000&auto=format&fit=crop"
          alt="An elegant spiral staircase viewed from above"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-5xl mx-auto px-6 pb-14 w-full">
            <Reveal>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-3">Always Current</p>
              <h2 className="text-3xl md:text-5xl font-light text-white max-w-2xl leading-[1.15]" style={{ fontFamily: "var(--font-serif)" }}>
                Every step of your project, clearly laid out.
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
              { title: "Web Design & Development", desc: "Every new build comes with The Loop from day one.", href: "/services/web-design-detroit" },
              { title: "SEO & Digital Marketing", desc: "Track your rankings and traffic without waiting on a report.", href: "/services/seo-agency-detroit" },
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
              Curious what&apos;s inside? <span className="italic text-[#9a5423]">See for yourself.</span>
            </h2>
            <p className="mt-6 text-[var(--site-text-secondary)] text-lg max-w-xl mx-auto">
              Already a client? Sign in anytime. New here? Let&apos;s start a project, The Loop comes with it.
            </p>
            <div className="mt-10 flex items-center justify-center gap-8 flex-wrap">
              <Link href="/portal" className="inline-flex items-center gap-2 text-lg font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-1">
                Sign In to The Loop
                <ArrowUpRight className="w-5 h-5" />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 text-lg font-semibold text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)] transition-colors">
                Start a Project
                <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
