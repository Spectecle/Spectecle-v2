"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronRight,
  Quote,
  Smile,
  Stethoscope,
  Building2,
  Eye,
  Activity,
  Sparkles,
  Brain,
  HeartPulse,
  HeartHandshake,
  ClipboardList,
  CalendarCheck,
  ShieldCheck,
} from "lucide-react";

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

const specialties = [
  { label: "Dentists", Icon: Smile },
  { label: "Internal Medicine", Icon: Stethoscope },
  { label: "Private Practice", Icon: Building2 },
  { label: "Optometry", Icon: Eye },
  { label: "Chiropractic & Physical Therapy", Icon: Activity },
  { label: "Med Spas & Aesthetics", Icon: Sparkles },
  { label: "Mental Health Practices", Icon: Brain },
  { label: "Specialty Clinics", Icon: HeartPulse },
];

const features = [
  { label: "Patient-First Design", desc: "Calm, clear layouts that make it obvious what to do next.", Icon: HeartHandshake },
  { label: "Service & Treatment Pages", desc: "Written in language patients actually search for.", Icon: ClipboardList },
  { label: "Appointment Request Flow", desc: "Built to integrate with the scheduling tools you already use.", Icon: CalendarCheck },
  { label: "Privacy-Conscious Forms", desc: "Built with patient privacy in mind from the start.", Icon: ShieldCheck },
];

const faqs = [
  {
    q: "How is a medical website different?",
    a: "Patients are often anxious or comparing options quickly. Your site has to build credibility and calm at once, with a simple path to book.",
  },
  {
    q: "Can the site integrate with our scheduling software?",
    a: "In most cases, yes, whether that's an embedded widget, a request form, or a link to your existing scheduler.",
  },
  {
    q: "Will our website be HIPAA compliant?",
    a: "We build with patient privacy as a priority. Full compliance depends on your systems beyond the website, so confirm your setup with your own advisor.",
  },
];

export default function MedicalWebsiteDesignPage() {
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
              <span className="text-[var(--site-text-secondary)]">Medical Website Design</span>
            </nav>

            <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-[0.25em]">
              Medical & Healthcare Websites · Serving Practices Nationwide
            </span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 text-5xl md:text-6xl font-light text-[var(--site-text-primary)] leading-[1.08]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Medical website design <span className="italic text-[#9a5423]">built to earn patient trust.</span>
            </motion.h1>

            <p className="mt-6 text-[var(--site-text-secondary)] text-lg md:text-xl leading-relaxed">
              Custom-built websites for doctors, dentists, and private practices, designed to turn a search into a booked appointment.
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
            <div className="relative aspect-[4/3] overflow-hidden [clip-path:polygon(0_0,100%_0,100%_88%,88%_100%,0_100%)]">
              <Image
                src="https://images.unsplash.com/photo-1762625570087-6d98fca29531?q=80&w=1600&auto=format&fit=crop"
                alt="Modern medical practice waiting room"
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
              Patients decide <span className="italic text-[#9a5423]">before they ever call.</span>
            </h2>
          </Reveal>
        </div>
      </section>

      {/* ── WHY IT'S DIFFERENT ───────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_0.85fr] gap-16 items-center">
          <div>
            <Reveal>
              <p className="text-[var(--site-text-secondary)] text-sm leading-relaxed">
                A slow, dated, or confusing site quietly pushes patients toward a competitor before you ever get the chance to make your case. We design around calm, credible visuals, plain-language service pages, and a booking path simple enough to use from a phone in a waiting room.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="relative aspect-[4/3] overflow-hidden [clip-path:polygon(0_0,100%_0,100%_88%,88%_100%,0_100%)]">
              <Image
                src="https://images.unsplash.com/photo-1642844819197-5f5f21b89ff8?q=80&w=1200&auto=format&fit=crop"
                alt="Modern private practice treatment room"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SPECIALTIES ──────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-5xl mx-auto">
          <Reveal className="mb-14 text-center">
            <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">Specialties</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              Built for every kind of practice.
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {specialties.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05}>
                <div className="group flex flex-col items-center text-center gap-3 border border-[var(--site-border)] p-6 h-full hover:border-[#9a5423]/50 transition-colors">
                  <div className="w-11 h-11 rounded-full bg-[#9a5423]/10 flex items-center justify-center">
                    <s.Icon className="w-5 h-5 text-[#9a5423]" strokeWidth={1.75} />
                  </div>
                  <span className="text-[var(--site-text-secondary)] text-sm leading-snug">{s.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISUAL BREAK ──────────────────────────────── */}
      <section className="relative h-[55vh] min-h-[380px] overflow-hidden border-t border-[var(--site-border)]">
        <Image
          src="https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=2000&auto=format&fit=crop"
          alt="Clean, precise medical equipment"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-5xl mx-auto px-6 pb-14 w-full">
            <Reveal>
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-3">Our Approach</p>
              <h2 className="text-3xl md:text-5xl font-light text-white max-w-2xl leading-[1.15]" style={{ fontFamily: "var(--font-serif)" }}>
                Every detail designed to feel as precise as your practice.
              </h2>
            </Reveal>
          </div>
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
                <div className="border border-[var(--site-border)] p-6 h-full hover:border-[#9a5423]/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#9a5423]/10 flex items-center justify-center mb-4">
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

      {/* ── TESTIMONIAL ──────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <Quote className="w-8 h-8 text-[#9a5423] mx-auto mb-6" strokeWidth={1.5} />
            <blockquote
              className="text-2xl md:text-3xl font-light text-[var(--site-text-primary)] leading-snug"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              &ldquo;Great designer, responsive, high quality work. Highly recommend.&rdquo;
            </blockquote>
            <p className="mt-6 text-sm font-semibold text-[var(--site-text-primary)]">Hassan Saab</p>
            <p className="text-xs text-[var(--site-text-muted)]">Owner, Vue Optometry</p>
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
          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
            {[
              { title: "SEO for Medical Practices", desc: "Rank for the searches patients are actually typing into Google.", href: "/services/seo-agency-detroit" },
              { title: "AI & Automation", desc: "Automate appointment reminders and after-hours patient questions.", href: "/services/ai-automation" },
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
              Give your practice <span className="italic text-[#9a5423]">the site it deserves.</span>
            </h2>
            <p className="mt-6 text-[var(--site-text-secondary)] text-lg max-w-xl mx-auto">
              Book a free strategy call. Honest advice on what your practice&apos;s site needs to earn trust and fill your schedule.
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
