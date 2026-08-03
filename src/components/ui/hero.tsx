"use client";

import Link from "next/link";
import { MeshGradient } from "@paper-design/shaders-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ChevronRight } from "lucide-react";

export default function Hero() {
  const { scrollY } = useScroll();
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 90], [1, 0]);

  return (
    <section className="hero-section relative min-h-screen overflow-hidden" style={{ background: "#040408" }}>
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="hero-text-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={["#040408", "#D25124", "#A83418", "#7A1800", "#040408"]}
        speed={0.3}
      />
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-30"
        colors={["#040408", "#F07A3A", "#D25124"]}
        speed={0.2}
        distortion={0.6}
      />
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />

      <div className="relative z-20 flex min-h-screen items-end">
        <div className="max-w-3xl px-6 pb-28 pt-32 sm:px-10 sm:pb-32 lg:px-16">
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full glass border border-[#D25124]/20 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-[#F07A3A] text-sm font-medium tracking-wide">
              Est. 2012 · Serving Businesses Nationwide
            </span>
          </motion.div>

          <motion.h1
            className="mb-6 leading-[1.05] tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ fontFamily: "var(--font-inter)" }}
          >
            <span className="block font-medium text-white/90 text-3xl sm:text-4xl md:text-5xl mb-1">
              Websites, SEO & AI Automation
            </span>
            <span className="block font-black text-white text-5xl sm:text-6xl md:text-7xl drop-shadow-2xl">
              Built to Get You Found,
            </span>
            <motion.span
              className="block font-light italic text-4xl sm:text-5xl md:text-6xl mt-1"
              style={{
                background: "linear-gradient(135deg, #FFB347 0%, #D25124 45%, #F07A3A 75%, #FFB347 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "url(#hero-text-glow)",
              }}
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              And Turn Visitors Into Customers.
            </motion.span>
          </motion.h1>

          <motion.p
            className="mb-8 max-w-xl text-lg md:text-xl text-slate-300/90 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Custom-built websites, ongoing SEO, and AI-driven automation — everything
            you need to rank higher, convert more visitors, and grow without adding headcount.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
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
      </div>

      <motion.div
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
      >
        <span className="text-xs text-slate-500 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#D25124] to-transparent" />
      </motion.div>
    </section>
  );
}
