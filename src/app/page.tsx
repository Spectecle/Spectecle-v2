"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  animate,
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
  Shield,
  Globe,
  BarChart3,
  Code2,
  ExternalLink,
} from "lucide-react";

/* ─── Animated Counter ─────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const springVal = useSpring(count, { stiffness: 60, damping: 20 });
  useEffect(() => { if (!inView) return; animate(count, to, { duration: 2.4, ease: "easeOut" }); }, [inView, count, to]);
  useEffect(() => { return springVal.on("change", (v) => { if (ref.current) ref.current.textContent = Math.round(v) + suffix; }); }, [springVal, suffix]);
  return <span ref={ref}>{to}{suffix}</span>;
}

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

/* ─── Browser Shell ────────────────────────────────── */
function BrowserShell({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="bg-[#1e1e2a] px-3 py-1.5 flex items-center gap-2 shrink-0">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-[#FF5F57]" />
          <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
          <div className="w-2 h-2 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex-1 mx-2">
          <div className="bg-[#2d2d3d] rounded px-2 py-0.5 text-[8px] text-slate-500 font-mono">
            {url}
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

/* ─── Glam by Abeer Mockup ─────────────────────────── */
function GlamMockup() {
  const sparkles = [
    { top: "12%", left: "8%" }, { top: "5%", left: "55%" }, { top: "20%", left: "80%" },
    { top: "35%", left: "15%" }, { top: "28%", left: "92%" }, { top: "45%", left: "40%" },
    { top: "8%", left: "30%" }, { top: "50%", left: "72%" }, { top: "18%", left: "65%" },
    { top: "40%", left: "5%" }, { top: "25%", left: "48%" }, { top: "55%", left: "25%" },
  ];
  return (
    <BrowserShell url="glambyabeer.com">
      <div className="h-full flex flex-col overflow-hidden">
        {/* Navbar */}
        <div className="bg-white flex items-center justify-between px-3 py-1.5 border-b border-gray-100">
          <div className="leading-none">
            <div className="text-[8px] font-black text-gray-900 tracking-[0.2em]" style={{ fontFamily: "Georgia, serif" }}>GLAM</div>
            <div className="text-[5px] text-gray-400 tracking-[0.35em]">by ABEER</div>
          </div>
          <div className="flex items-center gap-2">
            {["HOME", "BOOKING", "SERVICES"].map(n => (
              <span key={n} className="text-[5px] text-gray-500 tracking-wider">{n}</span>
            ))}
          </div>
        </div>
        {/* Hero — dark with golden glitter */}
        <div className="relative flex-1 flex flex-col items-center justify-center overflow-hidden" style={{ background: "#0a0a0a" }}>
          {/* Radial gold glow from top */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 120% 60% at 50% -10%, rgba(200,165,60,0.45) 0%, transparent 65%)" }} />
          {/* Gold sparkle particles */}
          {sparkles.map((s, i) => (
            <div key={i} className="absolute rounded-full bg-yellow-300"
              style={{ top: s.top, left: s.left, width: i % 3 === 0 ? "3px" : "2px", height: i % 3 === 0 ? "3px" : "2px", opacity: 0.5 + (i % 4) * 0.12 }} />
          ))}
          {/* Gold powder burst shapes */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-12 opacity-25"
            style={{ background: "radial-gradient(ellipse, rgba(218,165,32,0.9) 0%, transparent 70%)", filter: "blur(8px)" }} />
          {/* Text content */}
          <div className="relative z-10 text-center px-3">
            <div className="text-[7px] text-gray-300 tracking-[0.4em] mb-0.5">GLAM</div>
            <div className="text-[7px] text-gray-400 tracking-[0.3em] mb-0.5" style={{ fontStyle: "italic", fontFamily: "Georgia,serif" }}>by</div>
            <div className="text-[24px] font-black text-white leading-none tracking-wider mb-3"
              style={{ fontFamily: "Georgia, serif", textShadow: "0 0 30px rgba(218,165,32,0.3)" }}>
              ABEER
            </div>
            <div className="inline-block px-5 py-1.5 text-[7px] font-bold text-black"
              style={{ background: "linear-gradient(135deg, #D4AF37, #B8860B)", borderRadius: "2px", letterSpacing: "0.1em" }}>
              BOOK NOW
            </div>
          </div>
        </div>
        {/* Services strip */}
        <div className="bg-white px-3 py-2 border-t border-gray-100">
          <div className="text-[7px] font-bold text-gray-800 text-center mb-1.5" style={{ fontFamily: "Georgia,serif" }}>Services</div>
          <div className="flex gap-1.5">
            {[
              { name: "Full Glam", shade: "#E8D5C4" },
              { name: "Engagement", shade: "#D4C4B0" },
              { name: "Bridal Glam", shade: "#F0D9C8" },
              { name: "Photoshoots", shade: "#D8C4B8" },
            ].map(s => (
              <div key={s.name} className="flex-1 text-center">
                <div className="h-9 rounded-sm mb-0.5" style={{ background: `linear-gradient(160deg, ${s.shade}, #B8A090)` }} />
                <div className="text-[5px] text-gray-600 leading-tight">{s.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserShell>
  );
}

/* ─── NM Legal Mockup ──────────────────────────────── */
function NMLegalMockup() {
  return (
    <BrowserShell url="nmlegalfirm.com">
      <div className="h-full flex flex-col overflow-hidden bg-white">
        {/* Top contact bar */}
        <div className="bg-gray-100 px-3 py-0.5 flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
          <span className="text-[6px] text-gray-500">Call Me: (313) 632-2056</span>
        </div>
        {/* Navbar */}
        <div className="bg-white px-3 py-1.5 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-1.5">
            {/* NM hexagon badge */}
            <svg viewBox="0 0 24 28" className="w-5 h-6">
              <polygon points="12,1 23,7 23,21 12,27 1,21 1,7" fill="#0B1F4A" stroke="#1a3570" strokeWidth="0.5" />
              <text x="12" y="17" textAnchor="middle" fill="#C9A84C" fontSize="8" fontWeight="900" fontFamily="Georgia">NM</text>
            </svg>
            <div>
              <div className="text-[7px] font-bold text-gray-900 leading-none">NM</div>
              <div className="text-[5px] text-gray-500 tracking-wide leading-none">LAW FIRM</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {["Home", "About", "Contacts"].map((n, i) => (
              <span key={n} className={`text-[6px] ${i === 0 ? "text-gray-800 font-semibold" : "text-gray-400"}`}>{n}</span>
            ))}
          </div>
        </div>
        {/* Hero — dark split */}
        <div className="flex-1 flex overflow-hidden" style={{ background: "linear-gradient(135deg, #0D1B2A 0%, #1a2c44 100%)" }}>
          {/* Left: attorney */}
          <div className="w-2/5 relative flex items-end justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-20"
              style={{ background: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100' height='100' fill='%23334455'/%3E%3C/svg%3E\")" }} />
            {/* Silhouette */}
            <div className="relative z-10 flex flex-col items-center pb-1">
              <div className="w-10 h-10 rounded-full mb-0.5" style={{ background: "linear-gradient(180deg,#8B9BB4 0%,#5A6B80 100%)" }} />
              <div className="w-14 h-14 rounded-t-2xl" style={{ background: "linear-gradient(180deg,#6B7C92 0%,#4A5C70 100%)" }} />
            </div>
          </div>
          {/* Right: headline */}
          <div className="flex-1 flex flex-col justify-center px-3 py-3">
            {/* NM Badge */}
            <div className="w-8 h-8 mb-1.5 relative">
              <svg viewBox="0 0 32 36" className="w-full h-full">
                <polygon points="16,1 31,9 31,27 16,35 1,27 1,9" fill="#0B2060" stroke="#C9A84C" strokeWidth="1.5" />
                <text x="16" y="22" textAnchor="middle" fill="#C9A84C" fontSize="9" fontWeight="900" fontFamily="Georgia">NM</text>
              </svg>
            </div>
            {/* Tagline */}
            <div className="text-[6px] text-[#C9A84C] mb-1 uppercase tracking-widest">Law Firm</div>
            {/* Main headline */}
            <div className="text-white font-black leading-none mb-2.5" style={{ fontSize: "13px", fontFamily: "Georgia, serif", lineHeight: 1.05 }}>
              EVERY<br />CLIENT<br />MATTERS.
            </div>
            <div className="flex flex-col gap-1">
              <div className="px-2.5 py-1 text-[6px] text-black font-bold w-fit" style={{ background: "#C9A84C" }}>
                About Me
              </div>
              <div className="px-2.5 py-1 text-[6px] font-bold w-fit border" style={{ borderColor: "#C9A84C", color: "#C9A84C" }}>
                REQUEST A CONSULTATION →
              </div>
            </div>
          </div>
        </div>
        {/* Stats bar */}
        <div className="bg-white border-t-2 border-gray-200 flex">
          {[["1090+", "TRUSTED CLIENTS"], ["628", "SETTLED CASES"], ["98%", "SUCCESSFUL"], ["2726+", "COFFEE CUPS CONSUMED"]].map(([v, l]) => (
            <div key={l} className="flex-1 py-1.5 text-center border-r border-gray-200 last:border-r-0">
              <div className="font-bold text-[#C9A84C]" style={{ fontSize: "9px" }}>{v}</div>
              <div className="text-[4.5px] text-gray-400 uppercase tracking-wide leading-tight">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </BrowserShell>
  );
}

/* ─── Thematek Mockup ──────────────────────────────── */
function ThematekMockup() {
  return (
    <BrowserShell url="thematek.com">
      <div className="h-full flex flex-col overflow-hidden bg-white">
        {/* Navbar */}
        <div className="bg-white px-3 py-1.5 flex items-center justify-between border-b border-gray-100 shadow-sm">
          <div className="flex items-center gap-1.5">
            {/* Circuit-style logo */}
            <div className="w-5 h-5 rounded-sm relative overflow-hidden" style={{ background: "linear-gradient(135deg, #F5A623, #D4861A)" }}>
              <svg viewBox="0 0 20 20" className="w-full h-full" fill="none">
                <circle cx="10" cy="10" r="3" fill="white" opacity="0.9" />
                <line x1="10" y1="4" x2="10" y2="7" stroke="white" strokeWidth="1.5" opacity="0.7" />
                <line x1="10" y1="13" x2="10" y2="16" stroke="white" strokeWidth="1.5" opacity="0.7" />
                <line x1="4" y1="10" x2="7" y2="10" stroke="white" strokeWidth="1.5" opacity="0.7" />
                <line x1="13" y1="10" x2="16" y2="10" stroke="white" strokeWidth="1.5" opacity="0.7" />
              </svg>
            </div>
            <span className="text-[8px] font-black text-gray-900 tracking-[0.15em]">THEMATEK</span>
          </div>
          <div className="flex items-center gap-2">
            {["HOME", "PORTFOLIO", "BLOG"].map(n => (
              <span key={n} className="text-[5.5px] text-gray-500 tracking-wide">{n}</span>
            ))}
            <div className="px-2 py-0.5 text-[5.5px] font-bold text-black rounded-sm" style={{ background: "#F5A623" }}>
              FREE QUOTE
            </div>
          </div>
        </div>
        {/* Hero split */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: network/server image simulation */}
          <div className="w-2/5 relative overflow-hidden" style={{ background: "#1A1A2E" }}>
            {/* Server rack simulation */}
            <div className="absolute inset-0 flex flex-col gap-1 p-2 justify-center">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-2 rounded-sm opacity-60" style={{ background: i % 2 === 0 ? "#2A2A4E" : "#222238" }}>
                  <div className="flex items-center gap-0.5 px-1 h-full">
                    <div className="w-1 h-1 rounded-full" style={{ background: i === 2 ? "#00FF88" : "#F5A623" }} />
                  </div>
                </div>
              ))}
              {/* Cable simulation */}
              <div className="absolute top-2 right-0 w-3 h-full flex flex-col gap-0.5 justify-center">
                <div className="h-0.5 rounded" style={{ background: "#F5A623", opacity: 0.8 }} />
                <div className="h-0.5 rounded" style={{ background: "#F5A623", opacity: 0.6, marginLeft: "4px" }} />
                <div className="h-0.5 rounded" style={{ background: "#4488FF", opacity: 0.7 }} />
                <div className="h-0.5 rounded" style={{ background: "#F5A623", opacity: 0.5, marginLeft: "2px" }} />
              </div>
            </div>
          </div>
          {/* Right: headline */}
          <div className="flex-1 px-3 py-2.5 flex flex-col justify-center bg-white">
            <div className="text-[6px] font-semibold uppercase tracking-widest mb-1.5" style={{ color: "#F5A623" }}>
              Business Technology Solutions
            </div>
            <div className="font-black text-gray-900 leading-tight mb-2" style={{ fontSize: "13px" }}>
              Optimizing
              <br />
              local retail IT
            </div>
            {/* Two solution boxes */}
            <div className="flex gap-2">
              <div className="flex-1 pl-1.5 border-l-2" style={{ borderColor: "#F5A623" }}>
                <div className="text-[6px] font-bold mb-0.5" style={{ color: "#F5A623" }}>Retail Business</div>
                <div className="text-[5px] text-gray-500 leading-tight">IT Solutions for your retail space</div>
              </div>
              <div className="flex-1 pl-1.5 border-l-2" style={{ borderColor: "#F5A623" }}>
                <div className="text-[6px] font-bold mb-0.5" style={{ color: "#F5A623" }}>Enterprise</div>
                <div className="text-[5px] text-gray-500 leading-tight">Enterprise IT solutions.</div>
              </div>
            </div>
          </div>
        </div>
        {/* Free consultation banner */}
        <div className="flex items-center justify-between px-3 py-1.5" style={{ background: "#F5A623" }}>
          <div>
            <div className="text-[7px] font-bold text-white">Free project consultation</div>
            <div className="text-[5px] text-white/80">Share your number, we&apos;ll call you back</div>
          </div>
          <div className="flex gap-1 items-center">
            <div className="px-2 py-0.5 bg-white text-[5px] text-gray-500 rounded-sm" style={{ minWidth: "60px" }}>Phone number</div>
            <div className="px-1.5 py-0.5 bg-[#D4861A] text-[5.5px] text-white font-bold rounded-sm">SUBMIT</div>
          </div>
        </div>
        {/* Service chips row */}
        <div className="bg-gray-50 border-t border-gray-200 px-3 py-1.5 flex gap-1.5">
          {["Low Voltage Cabling", "Security Cameras", "POS Setup", "Network"].map(s => (
            <div key={s} className="flex items-center gap-0.5">
              <div className="w-1.5 h-1.5 rounded-sm border border-gray-400 flex items-center justify-center">
                <div className="w-0.5 h-0.5 bg-gray-600 rounded-sm" />
              </div>
              <span className="text-[5px] text-gray-600">{s}</span>
            </div>
          ))}
        </div>
      </div>
    </BrowserShell>
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
    href: "/services",
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
    href: "/services",
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
    href: "/services",
    linkColor: "text-[#D25124] hover:text-[#8B2800]",
  },
];

const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Retention" },
  { value: 12, suffix: "+", label: "Years of Experience" },
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
    mockup: "glam",
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
    mockup: "nmlegal",
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
    mockup: "thematek",
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

  function renderMockup(key: string) {
    if (key === "glam") return <GlamMockup />;
    if (key === "nmlegal") return <NMLegalMockup />;
    if (key === "thematek") return <ThematekMockup />;
    return null;
  }

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
            Detroit Web Design
            <br />
            Built By The Person
            <br />
            Who <span className="gradient-text">Actually Builds It</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            No account managers. No handoffs. You work directly with Walid — 12 years
            in IT infrastructure, 10 building websites — on sites that load fast, rank, and convert.
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-6 text-slate-600 text-xs font-medium uppercase tracking-widest"
          >
            {["Detroit-Based Studio", "Accessibility-First Builds", "No Account Managers", "Est. 2012"].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <Shield className="w-3 h-3 text-[#D25124]" />
                {item}
              </span>
            ))}
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
                Web design, SEO, and AI —
                <br />
                <span className="gradient-text">done by one person.</span>
              </h2>
              <p className="mt-5 text-slate-500 max-w-xl mx-auto text-lg">
                Every project — from initial brief to final deployment — handled by the same person.
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

      {/* ══ STATS — DARK ═════════════════════════════ */}
      <section className="py-24 border-y border-white/6" style={{ background: "#040408" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-bold gradient-text" style={{ fontFamily: "var(--font-inter)" }}>
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <p className="mt-3 text-slate-500 text-sm font-medium uppercase tracking-wider">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WORK PREVIEW — WHITE ═════════════════════ */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <span className="text-xs font-semibold text-[#D25124] uppercase tracking-widest">Portfolio</span>
                <h2 className="mt-3 text-4xl md:text-5xl font-bold text-slate-900" style={{ fontFamily: "var(--font-inter)" }}>
                  Work That <span className="gradient-text">Speaks</span>
                  <br />
                  For Itself
                </h2>
              </div>
              <Link href="/work" className="flex items-center gap-2 text-sm font-semibold text-[#D25124] hover:text-[#8B2800] transition-colors cursor-pointer shrink-0 group">
                View All Projects
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <div
                  className="group rounded-2xl overflow-hidden cursor-pointer border border-slate-200 hover:border-[#D25124]/40 hover:shadow-2xl transition-all duration-300 bg-white"
                  onMouseEnter={() => setHoveredProject(i)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Browser Mockup */}
                  <div className="relative h-64 overflow-hidden bg-[#1e1e2a]">
                    {renderMockup(p.mockup)}
                    {/* Tag pill */}
                    <div className="absolute top-8 left-3 z-10">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${p.tagColor}`}>
                        {p.tag}
                      </span>
                    </div>
                    {/* Hover overlay */}
                    <motion.div
                      initial={false}
                      animate={{ opacity: hoveredProject === i ? 1 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20"
                    >
                      <Link href="/work" className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-xl text-sm font-semibold cursor-pointer shadow-xl">
                        View Project <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </motion.div>
                  </div>

                  {/* Card body */}
                  <div className="p-5 bg-slate-50 border-t border-slate-200">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs text-slate-400 uppercase tracking-wider">{p.category}</span>
                        <h3 className="mt-0.5 text-base font-bold text-slate-900" style={{ fontFamily: "var(--font-inter)" }}>
                          {p.title}
                        </h3>
                      </div>
                      <span className={`text-xs font-semibold ${p.resultColor} shrink-0 mt-5`}>{p.result}</span>
                    </div>
                    <p className="mt-2 text-xs text-slate-500 leading-relaxed line-clamp-2">{p.desc}</p>
                    <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-400">
                      <ExternalLink className="w-3 h-3" />
                      <span className="font-mono">{p.url}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
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
                  <div className="flex items-center gap-1 mb-6">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
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
                <span>Start a Project</span>
                <ArrowUpRight className="w-5 h-5 relative z-10" />
              </Link>
              <Link href="/services" className="flex items-center gap-2 px-9 py-4 rounded-2xl text-base font-semibold text-slate-300 hover:text-white glass hover:border-white/15 border border-white/8 transition-all duration-300 cursor-pointer">
                Explore Services <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <p className="mt-8 text-slate-600 text-sm">
              Free consultation · No commitment · Response within 24 hours
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
