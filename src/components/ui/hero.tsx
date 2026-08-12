"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Top line moves up and out, bottom line + CTAs move down and out,
  // opening a gap at the vertical center for the video to grow into.
  const topOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const topY = useTransform(scrollYProgress, [0, 0.5], ["0vh", "-60vh"]);
  const bottomOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const bottomY = useTransform(scrollYProgress, [0, 0.5], ["0vh", "60vh"]);

  const viewport = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const measure = () => {
      viewport.current = { w: window.innerWidth, h: window.innerHeight };
      applyBoxStyle(scrollYProgress.get());
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function applyBoxStyle(p: number) {
    const el = boxRef.current;
    if (!el) return;
    const { w: vw, h: vh } = viewport.current;
    if (!vw || !vh) return;

    // Grows from a small box centered in the gap between the two lines
    // of text out to a fullscreen video by the end of the scroll.
    const startSize = vh * 0.16;
    const width = startSize + (vw - startSize) * p;
    const height = startSize + (vh - startSize) * p;
    const top = vh / 2 - height / 2;
    const left = vw / 2 - width / 2;
    const opacity = Math.min(p / 0.12, 1);

    el.style.width = `${width}px`;
    el.style.height = `${height}px`;
    el.style.top = `${top}px`;
    el.style.left = `${left}px`;
    el.style.opacity = String(opacity);
  }

  useMotionValueEvent(scrollYProgress, "change", (p) => applyBoxStyle(p));

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-screen overflow-hidden bg-[var(--site-bg)]">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div style={{ opacity: topOpacity, y: topY }} className="relative z-20 max-w-3xl mx-auto">
            <h1
              className="font-bold leading-[1.05] tracking-tight text-[var(--site-text-primary)] text-[9vw] sm:text-[5vw] lg:text-[3.4vw]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Let&apos;s turn your website into a Spectecle
            </h1>
          </motion.div>

          <motion.div style={{ opacity: bottomOpacity, y: bottomY }} className="relative z-20 max-w-3xl mx-auto">
            <p
              className="mt-4 italic font-light leading-none tracking-tight text-[9vw] sm:text-[4.6vw] lg:text-[3vw]"
              style={{ fontFamily: "var(--font-serif)", color: "#f87444" }}
            >
              Custom Web Design. Marketing That Works.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-base font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-0.5 cursor-pointer"
              >
                Start a project
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 text-base font-semibold text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)] transition-colors cursor-pointer"
              >
                See our work
              </Link>
            </div>
          </motion.div>
        </div>

        <div ref={boxRef} className="absolute overflow-hidden z-10" style={{ opacity: 0 }}>
          <video
            className="absolute inset-0 w-full h-full object-cover hidden md:block"
            src="/videos/hero-desktop.mp4"
            poster="/videos/hero-desktop-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <video
            className="absolute inset-0 w-full h-full object-cover md:hidden"
            src="/videos/hero-mobile.mp4"
            poster="/videos/hero-mobile-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>
      </div>
    </div>
  );
}
