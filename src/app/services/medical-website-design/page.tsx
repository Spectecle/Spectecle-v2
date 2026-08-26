"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronRight,
  CheckCircle2,
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
  UserCheck,
  CalendarCheck,
  Database,
  ShieldCheck,
} from "lucide-react";
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
  { label: "Patient-First Design", desc: "Calm, clear layouts that reduce anxiety and make it obvious what to do next, whether that's booking, calling, or finding a location.", Icon: HeartHandshake },
  { label: "Service & Treatment Pages", desc: "A dedicated page for every service you offer, written in language patients actually search for, not clinical jargon.", Icon: ClipboardList },
  { label: "Provider Bio Pages", desc: "Profiles that build confidence in your team's credentials and approach, the details patients look for before choosing a provider.", Icon: UserCheck },
  { label: "Appointment Request Flow", desc: "A low-friction booking or request flow, built to integrate with the scheduling tools your practice already uses.", Icon: CalendarCheck },
  { label: "Medical Schema & Structured Data", desc: "Structured data that helps search engines understand your specialties, locations, and services correctly.", Icon: Database },
  { label: "Privacy-Conscious Forms", desc: "Contact and intake forms built with patient privacy in mind. We'll work with your practice's compliance requirements during setup.", Icon: ShieldCheck },
];

const deliverables = [
  "Custom-designed, fully responsive website",
  "Service & treatment pages built around patient search intent",
  "Provider bio & credentials pages",
  "Appointment request flow, built to convert",
  "Medical schema & structured data markup",
  "GA4 & Search Console setup for ongoing visibility",
];

const faqs = [
  {
    q: "How is a medical website different from a regular business website?",
    a: "Patients research providers before they ever call, and they're often anxious, in discomfort, or comparing options quickly. A healthcare site has to build credibility and calm at the same time: clear provider credentials, an easy way to see what you treat, and a simple, low-pressure way to request an appointment.",
  },
  {
    q: "Do you design sites for dentists and other specialty practices?",
    a: "Yes. We've designed for dentists, optometrists, internal medicine, chiropractic and physical therapy practices, med spas, mental health practices, and specialty clinics. Every specialty gets service pages written around what that specific type of patient is actually searching for.",
  },
  {
    q: "Can the site integrate with our existing scheduling software?",
    a: "In most cases, yes. We'll work with the booking or patient portal system your practice already uses, whether that's an embedded widget, a request form that routes to your front desk, or a link to your existing scheduler.",
  },
  {
    q: "Will our website be HIPAA compliant?",
    a: "We build with patient privacy as a priority: privacy-conscious forms, secure hosting, and no unnecessary collection of health information on the public site. HIPAA compliance for your practice as a whole depends on your specific systems and processes beyond just the website, so we recommend confirming your full compliance setup with your own legal or compliance advisor.",
  },
  {
    q: "Will the site help with local SEO for my practice?",
    a: "Yes. Local SEO is available alongside the website build: Google Business Profile optimization, location-specific content, and medical schema markup that helps you show up for searches like 'dentist near me' or 'internal medicine doctor in [your city].'",
  },
  {
    q: "Can you migrate content from our current website?",
    a: "Yes. We audit your existing site's content, redirect old URLs properly to protect any search rankings you've already earned, and rebuild what's worth keeping into the new design.",
  },
  {
    q: "How much does a medical practice website cost?",
    a: "Every project is custom quoted based on the number of services, providers, and integrations you need. Reach out for a free, no-pressure quote scoped to your practice.",
  },
  {
    q: "Do you offer ongoing website maintenance for medical practices?",
    a: "Yes. Ongoing care plans keep your site secure, current, and updated as your providers, services, and hours change, without you needing an in-house web team.",
  },
];

export default function MedicalWebsiteDesignPage() {
  const featuredProjects = pickProjects(["vue-optometry", "the-stat-clinic"]);
  const heroProject = featuredProjects[0];

  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="pt-[210px] pb-14 px-6">
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
              Custom-built websites for doctors, dentists, and private practices, designed to turn a nervous search into a booked appointment. Patient-first design, service pages built around real search intent, and a calm, credible experience from the first click.
            </p>

            <div className="mt-8 flex flex-wrap gap-8">
              <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-0.5">
                Get a Free Quote
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link href="/work/vue-optometry" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)] transition-colors">
                View a Practice Case Study <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <Reveal delay={0.15}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1600&auto=format&fit=crop"
                alt="Modern private medical practice interior"
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
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_0.85fr] gap-16 items-center">
          <div>
            <Reveal>
              <h2 className="text-4xl font-light text-[var(--site-text-primary)] mb-3" style={{ fontFamily: "var(--font-serif)" }}>
                Patients choose a provider before they ever call.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[var(--site-text-secondary)] text-sm leading-relaxed mb-4">
                By the time someone picks up the phone to book, they&apos;ve already formed an opinion of your practice from your website. A slow, dated, or confusing site quietly pushes them toward a competitor, before you ever get the chance to make your case in person.
              </p>
              <p className="text-[var(--site-text-secondary)] text-sm leading-relaxed">
                We design medical and dental websites around that moment: calm, credible visuals, service pages written in plain language, provider profiles that build confidence, and a booking path simple enough to use from a phone in a waiting room. Every specialty, from general dentistry to internal medicine, gets content built around what that patient is actually searching for.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/vue-optometry-reception.png"
                alt="Vue Optometry practice reception and boutique interior"
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
            <h2 className="mt-4 text-3xl md:text-4xl font-light text-[var(--site-text-primary)] mb-4" style={{ fontFamily: "var(--font-serif)" }}>
              Built for every kind of practice.
            </h2>
            <p className="text-[var(--site-text-secondary)] max-w-2xl mx-auto">
              From solo private practices to multi-provider clinics, every specialty gets a site built around its patients.
            </p>
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
            <p className="text-[var(--site-text-secondary)] text-base max-w-xl mt-3">
              Every medical website engagement is built around one goal: turning a visitor&apos;s search into a booked appointment.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* ── CASE STUDY SHOWCASE ──────────────────────── */}
      {heroProject && (
        <section className="py-14 px-6 border-t border-[var(--site-border)]">
          <div className="max-w-5xl mx-auto">
            <Reveal className="mb-10">
              <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">Real Work</span>
              <h2 className="mt-4 text-4xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
                Practice websites built the same way yours would be.
              </h2>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredProjects.map((project, i) => (
                <Reveal key={project.slug} delay={i * 0.1}>
                  <Link href={`/work/${project.slug}`} className="group block border border-[var(--site-border)] p-2">
                    <BrowserMockup
                      url={project.domain}
                      screenshotUrl={project.screenshotUrl}
                      alt={`${project.title} website screenshot`}
                      size="compact"
                    />
                    <div className="flex items-center justify-between px-4 py-4">
                      <span className="text-sm font-semibold text-[var(--site-text-primary)] group-hover:text-[#9a5423] transition-colors">
                        View the {project.title} case study
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[var(--site-text-muted)] group-hover:text-[#9a5423] transition-colors" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
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
              &ldquo;Great designer, responsive, high quality work. Highly recommend.&rdquo;
            </blockquote>
            <p className="mt-6 text-sm font-semibold text-[var(--site-text-primary)]">Hassan Saab</p>
            <p className="text-xs text-[var(--site-text-muted)]">Owner, Vue Optometry</p>
          </Reveal>
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
                Start Your Practice&apos;s Website
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
              slugs={["vue-optometry", "the-stat-clinic", "dearborn-cleaners"]}
              heading="Real sites. Real practices."
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
              Book a free strategy call. No sales pitch, just honest advice on what your practice&apos;s site needs to earn trust and fill your schedule.
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
