"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.35], ["0vh", "-70vh"]);

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

    const startSize = vh * 0.38;
    const width = startSize + (vw - startSize) * p;
    const height = startSize + (vh - startSize) * p;
    // Nudge the box down while it's growing, tapering to 0 by full growth
    // so the fully-scrolled state still fills the viewport with no gap.
    const shiftDown = 350 * (1 - p);
    const top = vh / 2 - height / 2 + shiftDown;
    const left = vw / 2 - width / 2;
    const opacity = Math.min(p / 0.15, 1);

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
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="relative z-20 text-center px-6 pointer-events-none"
          >
            <span
              className="block font-light leading-tight tracking-tight text-[var(--site-text-primary)] text-[6vw] sm:text-[3.5vw] lg:text-[2.4vw]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Let&apos;s turn your website into a
            </span>
            <span
              className="block italic font-light leading-none tracking-tight text-[14vw] sm:text-[11vw] lg:text-[9vw]"
              style={{ fontFamily: "var(--font-sans)", color: "#f75c23" }}
            >
              Spectecle
            </span>
            <span
              className="block mt-4 sm:mt-6 font-light leading-snug tracking-tight text-[var(--site-text-secondary)] text-[3.6vw] sm:text-[1.9vw] lg:text-[1.3vw]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Custom Design Worth Looking at. Marketing That Works.
            </span>
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
