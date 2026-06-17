"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import {
  ArrowUpRight,
  Monitor,
  TrendingUp,
  Cpu,
  Star,
  ChevronRight,
  Zap,
  Globe,
  BarChart3,
  Code2,
  ExternalLink,
} from "lucide-react";


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
const services = [
  {
    icon: Monitor,
    accent: "from-[#D25124]/15 to-[#A83418]/8",
    accentBorder: "group-hover:border-[#D25124]/40",
    iconColor: "text-[#D25124]",
    iconBg: "bg-[#D25124]/8",
    badge: "Design & Dev",
    title: "Web Design &\nDevelopment",
    desc: "Custom websites built for speed, search rankings, and real conversions. Every design decision comes from the same person writing the code — no translation layers.",
    features: ["Custom UI/UX Design", "Next.js & React", "E-commerce & CMS", "Performance Optimized"],
    href: "/services/web-design-detroit",
    linkColor: "text-[#D25124] hover:text-[#8B2800]",
  },
  {
    icon: TrendingUp,
    accent: "from-[#F07A3A]/15 to-[#D25124]/8",
    accentBorder: "group-hover:border-[#F07A3A]/40",
    iconColor: "text-[#D25124]",
    iconBg: "bg-[#D25124]/8",
    badge: "Growth",
    title: "SEO &\nMarketing",
    desc: "Local SEO that puts you in front of customers searching in your city. Technical audits, content, and link building — tracked with real numbers, not vanity metrics.",
    features: ["Technical SEO Audits", "Content Strategy", "Link Building", "Analytics & Reporting"],
    href: "/services/seo-agency-detroit",
    linkColor: "text-[#D25124] hover:text-[#8B2800]",
  },
  {
    icon: Cpu,
    accent: "from-[#D25124]/15 to-[#A83418]/8",
    accentBorder: "group-hover:border-[#D25124]/40",
    iconColor: "text-[#D25124]",
    iconBg: "bg-[#D25124]/8",
    badge: "AI & Automation",
    title: "AI &\nAutomation",
    desc: "Custom AI agents built from scratch — trained on your services, connected to your CRM, and tested until they actually work. Not a chatbot plugin.",
    features: ["Custom AI Agents", "Workflow Automation", "CRM & API Integrations", "ChatBot Development"],
    href: "/services/ai-automation",
    linkColor: "text-[#D25124] hover:text-[#8B2800]",
  },
];

const clients = [
  "NM Law Firm", "Stat Clinic", "Glam by Abeer", "City of Dearborn",
  "ICD", "Indoor Garden", "Thematek", "Detroit Glass & Mirror", "Salazar Drywall Services",
];

const projects = [
  {
    title: "Glam by Abeer",
    category: "Beauty Studio",
    url: "glambyabeer.com",
    desc: "Full brand website for a professional makeup artist featuring dark glamour aesthetic, service showcase, and online booking integration.",
    result: "+65% Bookings",
    resultColor: "text-[#D25124]",
    image: "/screenshots/glambyabeer.png",
    tag: "Web Design & SEO",
    tagColor: "bg-[#FFF3EE] text-[#D25124]",
  },
  {
    title: "NM Law Firm",
    category: "Legal Services",
    url: "nmlegalfirm.com",
    desc: "Authoritative legal website for a Michigan-based attorney with consultation request funnel, practice areas, and multilingual support.",
    result: "+120% Leads",
    resultColor: "text-[#D25124]",
    image: "/screenshots/nmlegalfirm.png",
    tag: "Web Dev + SEO",
    tagColor: "bg-[#FFF3EE] text-[#D25124]",
  },
  {
    title: "Thematek",
    category: "IT Solutions",
    url: "thematek.com",
    desc: "High-converting website for a retail & enterprise IT solutions company with free consultation funnel and service portfolio showcase.",
    result: "+200% Traffic",
    resultColor: "text-[#D25124]",
    image: "/screenshots/thematek.png",
    tag: "Web Design + AI",
    tagColor: "bg-[#FFF3EE] text-[#D25124]",
  },
];

const testimonials = [
  {
    quote: "From the get-go, the team at Spectecle took the time to understand my brand and what I wanted to achieve with my site. They designed a sleek, modern website that's easy to navigate and looks great on both desktop and mobile. It's clear they really care about the details, and it shows in the final product. We've already noticed an uptick in engagement since the launch.",
    name: "Hassan MB",
    role: "Business Owner",
    stars: 5,
    avatar: "HM",
    color: "from-[#F07A3A] to-[#D25124]",
  },
  {
    quote: "The team at Spectecle was fantastic! They answered all my questions and gave me insight into what would work best for my business and my budget. They went above and beyond expectations and delivered a wonderful design.",
    name: "Tim Kwiatkowski",
    role: "Business Owner",
    stars: 5,
    avatar: "TK",
    color: "from-[#D25124] to-[#A83418]",
  },
  {
    quote: "I had been needing to update my website and didn't know where to start. Walid made the process so simple. He was patient throughout the whole process and really helped me with my vision. I'm so happy I went with him and highly recommend that everyone does the same!",
    name: "Neda Mohiedeen",
    role: "Attorney, NM Law Firm",
    stars: 5,
    avatar: "NM",
    color: "from-[#E86830] to-[#B83020]",
  },
];

const process = [
  { step: "01", title: "Discovery", desc: "A real conversation about your goals, your customers, and where you stand against competitors — before a single line of code is written.", icon: Globe },
  { step: "02", title: "Strategy", desc: "A clear plan: what's getting built, what stack, how the SEO is structured, and what success looks like in measurable terms.", icon: BarChart3 },
  { step: "03", title: "Build", desc: "Weekly check-ins, live previews you can click through, and revisions until it's right. No handoffs, no guessing, no surprises at launch.", icon: Code2 },
  { step: "04", title: "Launch & Grow", desc: "We go live, monitor real performance, and keep improving. Most clients see meaningful results in the first 90 days.", icon: Zap },
];

/* ─── Page ─────────────────────────────────────────── */
export default function HomePage() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 90], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".orb-1", {
        y: -180,
        ease: "none",
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 1.5 },
      });
      gsap.to(".orb-2", {
        y: -120, x: 60,
        ease: "none",
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 2 },
      });
      gsap.to(".orb-3", {
        y: -80,
        ease: "none",
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 1 },
      });
    });
    return () => ctx.revert();
  }, []);


  return (
    <>
      {/* ══ HERO — DARK ══════════════════════════════ */}
      <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden" style={{ background: "#040408" }}>
        <div className="orb-1 absolute top-[-200px] left-[-100px] w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(210,81,36,0.18) 0%, transparent 70%)" }} />
        <div className="orb-2 absolute top-[-100px] right-[-150px] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(168,52,24,0.15) 0%, transparent 70%)" }} />
        <div className="orb-3 absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(210,81,36,0.1) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 dot-pattern opacity-40 pointer-events-none" />

        <div className="hero-content relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#D25124]/20 text-sm text-[#F07A3A] font-medium mb-8 pulse-glow"
          >
            <span className="w-2 h-2 rounded-full bg-[#F07A3A] animate-pulse" />
            Detroit, Michigan · Est. 2012
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight text-white"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Where Detroit Brands
            <br />
            Come to Get Found,
            <br />
            <span className="gradient-text">And Own Their Market.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            A performance-obsessed Detroit studio shaping high-converting digital presences
            through search-first design, bold development, and intelligent automation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/contact" className="btn-primary flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold cursor-pointer">
              <span>Start a Project</span>
              <ArrowUpRight className="w-5 h-5 relative z-10" />
            </Link>
            <Link href="/work" className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold text-slate-300 hover:text-white glass hover:border-white/15 border border-white/8 transition-all duration-300 cursor-pointer">
              View Our Work <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

        </div>

        <motion.div
          style={{ opacity: scrollIndicatorOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-xs text-slate-600 uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#D25124] to-transparent" />
        </motion.div>
      </section>

      {/* ══ CLIENT MARQUEE — DARK ════════════════════ */}
      <section className="py-10 border-y border-white/6 overflow-hidden" style={{ background: "#09090f" }}>
        <p className="text-center text-xs font-medium text-slate-600 uppercase tracking-[0.25em] mb-6 px-6">
          Who Spectecle has worked with
        </p>
        <div className="flex whitespace-nowrap select-none">
          <div className="marquee-track flex items-center">
            {[...clients, ...clients, ...clients, ...clients].map((name, i) => (
              <span key={i} className="flex items-center">
                <span className="text-slate-500 font-semibold text-sm tracking-wide px-7" style={{ fontFamily: "var(--font-inter)" }}>
                  {name}
                </span>
                <span className="text-slate-700 text-xs">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SERVICES — WHITE ═════════════════════════ */}
      <section className="services-section py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-xs font-semibold text-[#D25124] uppercase tracking-widest">What We Do</span>
              <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900" style={{ fontFamily: "var(--font-inter)" }}>
                Three disciplines.
                <br />
                <span className="gradient-text">One performance obsession.</span>
              </h2>
              <p className="mt-5 text-slate-500 max-w-xl mx-auto text-lg">
                Search-first design, bold development, and intelligent automation — built around what your business actually needs to grow.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className={`service-card group bg-white rounded-2xl p-8 h-full flex flex-col border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#D25124]/30 transition-all duration-300 ${s.accentBorder} cursor-default`}>
                  <div className={`w-14 h-14 rounded-2xl ${s.iconBg} flex items-center justify-center mb-6`}>
                    <s.icon className={`w-6 h-6 ${s.iconColor}`} />
                  </div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">{s.badge}</span>
                  <h3 className="text-2xl font-bold text-slate-900 leading-tight mb-4"
                    style={{ fontFamily: "var(--font-inter)", whiteSpace: "pre-line" }}>
                    {s.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">{s.desc}</p>
                  <ul className="space-y-2.5 mb-8">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D25124] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href={s.href} className={`flex items-center gap-2 text-sm font-semibold ${s.linkColor} transition-colors cursor-pointer group mt-auto`}>
                    Learn More
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>



      {/* ══ WORK PREVIEW — DARK BENTO ═══════════════ */}
      <section className="relative py-32 px-6 overflow-hidden" style={{ background: "#060610" }}>
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[560px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(210,81,36,0.09) 0%, transparent 65%)" }} />
        <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          {/* Header */}
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
              <div>
                <span className="text-xs font-semibold text-[#F07A3A] uppercase tracking-widest">Portfolio</span>
                <h2 className="mt-3 text-4xl md:text-5xl xl:text-6xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-inter)" }}>
                  Work That <span className="gradient-text">Speaks</span>
                  <br />
                  For Itself
                </h2>
                <p className="mt-4 text-slate-400 text-base max-w-md leading-relaxed">
                  Real businesses. Measurable growth. Every project tells a story.
                </p>
              </div>
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:border-[#D25124]/50 text-slate-300 hover:text-white glass transition-all duration-300 text-sm font-semibold cursor-pointer shrink-0"
              >
                View All Projects
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </Reveal>

          {/* Bento grid */}
          <div className="grid md:grid-cols-3 gap-4 lg:gap-5 items-start">

            {/* Featured card — 2/3 width */}
            <Reveal delay={0} className="md:col-span-2">
              <Link
                href="/work"
                className="group relative rounded-2xl overflow-hidden block border border-white/8 hover:border-[#D25124]/35 transition-all duration-500 cursor-pointer"
                style={{ background: "linear-gradient(160deg, #0e0e1c 0%, #090912 100%)" }}
                onMouseEnter={() => setHoveredProject(0)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative h-[310px] overflow-hidden">
                  <Image src={projects[0].image} alt={projects[0].title} fill className="object-cover object-top" />
                  <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
                    style={{ background: "linear-gradient(to top, #0e0e1c, transparent)" }} />
                  {/* Result badge */}
                  <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full text-xs font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #D25124 0%, #A83418 100%)" }}>
                    {projects[0].result}
                  </div>
                  {/* Tag pill */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full text-[10px] font-medium text-white/80 border border-white/15"
                      style={{ background: "rgba(255,255,255,0.07)" }}>
                      {projects[0].tag}
                    </span>
                  </div>
                  {/* Hover overlay — pointer-events-none so card Link handles click */}
                  <motion.div
                    initial={false}
                    animate={{ opacity: hoveredProject === 0 ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                    style={{ background: "rgba(4,4,12,0.6)", backdropFilter: "blur(3px)" }}
                  >
                    <span className="flex items-center gap-2.5 px-6 py-3 bg-white text-black rounded-xl text-sm font-semibold shadow-2xl">
                      View Case Study <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </motion.div>
                </div>

                {/* Card body */}
                <div className="p-6 pb-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">{projects[0].category}</p>
                      <h3 className="mt-1 text-xl font-bold text-white" style={{ fontFamily: "var(--font-inter)" }}>{projects[0].title}</h3>
                    </div>
                    <span className="flex items-center gap-1 text-[10px] text-slate-600 font-mono mt-6 shrink-0">
                      <ExternalLink className="w-2.5 h-2.5" />{projects[0].url}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed line-clamp-2">{projects[0].desc}</p>
                  <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-[#F07A3A] group-hover:gap-2.5 transition-all duration-300">
                    <span>Read the case study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            </Reveal>

            {/* Right column — two stacked cards */}
            <div className="flex flex-col gap-4 lg:gap-5">
              {projects.slice(1).map((p, idx) => (
                <Reveal key={p.title} delay={(idx + 1) * 0.12}>
                  <Link
                    href="/work"
                    className="group relative rounded-2xl overflow-hidden block border border-white/8 hover:border-[#D25124]/35 transition-all duration-500 cursor-pointer"
                    style={{ background: "linear-gradient(160deg, #0e0e1c 0%, #090912 100%)" }}
                    onMouseEnter={() => setHoveredProject(idx + 1)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <div className="relative h-40 overflow-hidden">
                      <Image src={p.image} alt={p.title} fill className="object-cover object-top" />
                      <div className="absolute inset-x-0 bottom-0 h-14 pointer-events-none"
                        style={{ background: "linear-gradient(to top, #0e0e1c, transparent)" }} />
                      {/* Result badge */}
                      <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-bold text-white"
                        style={{ background: "linear-gradient(135deg, #D25124 0%, #A83418 100%)" }}>
                        {p.result}
                      </div>
                      {/* Hover overlay */}
                      <motion.div
                        initial={false}
                        animate={{ opacity: hoveredProject === idx + 1 ? 1 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                        style={{ background: "rgba(4,4,12,0.6)", backdropFilter: "blur(3px)" }}
                      >
                        <span className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-xs font-semibold shadow-xl">
                          View Case Study <ArrowUpRight className="w-3 h-3" />
                        </span>
                      </motion.div>
                    </div>

                    {/* Card body */}
                    <div className="p-4 pb-5">
                      <p className="text-[9px] text-slate-500 uppercase tracking-widest font-medium">{p.category}</p>
                      <h3 className="mt-0.5 text-sm font-bold text-white" style={{ fontFamily: "var(--font-inter)" }}>{p.title}</h3>
                      <p className="mt-1.5 text-xs text-slate-400 leading-relaxed line-clamp-2">{p.desc}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="flex items-center gap-1 text-[9px] text-slate-600 font-mono">
                          <ExternalLink className="w-2 h-2" />{p.url}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-[#F07A3A] group-hover:gap-1.5 transition-all duration-300">
                          Case study <ArrowUpRight className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Bottom CTA strip */}
          <Reveal delay={0.3}>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/6">
              <Link
                href="/work"
                className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold cursor-pointer"
              >
                <span>See All Case Studies</span>
                <ArrowUpRight className="w-4 h-4 relative z-10" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ PROCESS — DARK ═══════════════════════════ */}
      <section className="process-section py-32 border-y border-white/6" style={{ background: "#09090f" }}>
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-xs font-semibold text-[#F07A3A] uppercase tracking-widest">Our Process</span>
              <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-inter)" }}>
                How We Work
              </h2>
              <p className="mt-5 text-slate-400 max-w-xl mx-auto">
                A proven four-phase process refined over 12 years of delivering exceptional digital products.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 0.1}>
                <div className="process-card relative glass rounded-2xl p-7 border border-white/6 hover:border-[#D25124]/20 transition-colors duration-300">
                  <div className="text-6xl font-black text-white/4 leading-none mb-4" style={{ fontFamily: "var(--font-inter)" }}>
                    {p.step}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#D25124]/10 flex items-center justify-center mb-4">
                    <p.icon className="w-5 h-5 text-[#F07A3A]" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3" style={{ fontFamily: "var(--font-inter)" }}>{p.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS — WHITE ═════════════════════ */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-xs font-semibold text-[#D25124] uppercase tracking-widest">Client Stories</span>
              <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900" style={{ fontFamily: "var(--font-inter)" }}>
                Trusted by Leaders
                <br />
                <span className="gradient-text">Across Industries</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8 flex flex-col h-full border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#D25124]/30 transition-all duration-300 cursor-default">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: t.stars }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                      </svg>
                      <span className="text-slate-500 text-[10px] font-medium">Google Review</span>
                    </div>
                  </div>
                  <blockquote className="text-slate-600 text-sm leading-relaxed flex-1 italic">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="mt-8 pt-6 border-t border-slate-200 flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-slate-900 font-semibold text-sm">{t.name}</p>
                      <p className="text-slate-400 text-xs">{t.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 border-t border-slate-200">
              <div className="flex items-center gap-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <div>
                  <span className="text-2xl font-bold text-slate-900">5.0</span>
                  <span className="text-slate-500 text-sm ml-2">from Google Reviews</span>
                </div>
              </div>
              <a
                href="https://g.page/r/CbSs-g26jjLnEBM/review"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl border border-slate-200 hover:border-[#D25124]/30 hover:shadow-md transition-all duration-300 text-sm font-semibold text-slate-700 hover:text-[#D25124]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                See all reviews on Google
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ CTA — DARK ════════════════════════════════ */}
      <section className="py-32 px-6" style={{ background: "#040408" }}>
        <Reveal>
          <div className="max-w-4xl mx-auto text-center relative">
            <div className="absolute inset-0 -z-10 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(210,81,36,0.12) 0%, transparent 70%)" }} />
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#D25124]/20 text-sm text-[#F07A3A] font-medium mb-8">
              <Zap className="w-4 h-4" />
              Let&apos;s Build Together
            </span>
            <h2 className="text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-inter)" }}>
              Your Site Should Be
              <br />
              Your <span className="gradient-text">Best Salesperson.</span>
            </h2>
            <p className="mt-6 text-slate-400 text-lg max-w-xl mx-auto">
              Work directly with Walid — no agencies, no account managers. A direct line to the
              person designing, building, and launching your site.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-primary flex items-center gap-2 px-9 py-4 rounded-2xl text-base font-semibold cursor-pointer">
                <span>Book a Free Call</span>
                <ArrowUpRight className="w-5 h-5 relative z-10" />
              </Link>
              <Link href="/work" className="flex items-center gap-2 px-9 py-4 rounded-2xl text-base font-semibold text-slate-300 hover:text-white glass hover:border-white/15 border border-white/8 transition-all duration-300 cursor-pointer">
                See Our Work <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <p className="mt-8 text-slate-600 text-sm">
              30-minute call · No commitment · Response within 24 hours
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
