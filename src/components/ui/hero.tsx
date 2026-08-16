"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const DEFAULT_TOP = (
  <h1
    className="font-light leading-[1.05] tracking-tight text-[var(--site-text-primary)] text-[9vw] sm:text-[5vw] lg:text-[3.4vw]"
    style={{ fontFamily: "var(--font-sans)" }}
  >
    Let&apos;s turn your website into a Spectecle
  </h1>
);

const DEFAULT_BOTTOM = (
  <>
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
  </>
);

export default function Hero({
  topContent = DEFAULT_TOP,
  bottomContent = DEFAULT_BOTTOM,
}: {
  topContent?: React.ReactNode;
  bottomContent?: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Raw scroll progress is 1:1 with wheel/trackpad input, so a fast flick
  // snaps the video/text instantly instead of animating. Springing it adds
  // a touch of lag so fast scrolls settle in smoothly instead of feeling
  // "grabby" or over-sensitive.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.6,
  });

  // Text and video grow apart on the exact same schedule: the video's
  // scale fraction always equals the text's movement fraction, so the
  // gap the text has opened (2 * fraction * 60vh) is always well ahead of
  // the video's height (fraction * 100vh) — it can never catch up to the
  // wording. Once both finish, the box just holds at fullscreen for the
  // rest of the scroll before the section releases.
  const TEXT_END = 0.42;

  // Top line moves up and out, bottom line + CTAs move down and out,
  // opening a gap at the vertical center for the video to grow into.
  const topOpacity = useTransform(smoothProgress, [0, TEXT_END], [1, 0]);
  const topY = useTransform(smoothProgress, [0, TEXT_END], ["0vh", "-60vh"]);
  const bottomOpacity = useTransform(smoothProgress, [0, TEXT_END], [1, 0]);
  const bottomY = useTransform(smoothProgress, [0, TEXT_END], ["0vh", "60vh"]);

  // Scale + opacity only, never width/height/top/left — those force a
  // synchronous layout reflow on every scroll frame, which is what made
  // the old version feel janky. Scale/opacity are handled entirely by the
  // compositor, so growth stays smooth no matter how fast the page scrolls.
  const boxScale = useTransform(smoothProgress, [0, TEXT_END], [0.02, 1]);
  const boxOpacity = useTransform(smoothProgress, [0, 0.08], [0, 1]);

  return (
    <div ref={containerRef} className="relative h-[280vh]">
      <div className="sticky top-0 h-screen w-screen overflow-hidden bg-[var(--site-bg)]">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div style={{ opacity: topOpacity, y: topY }} className="relative z-20 max-w-3xl mx-auto">
            {topContent}
          </motion.div>

          <motion.div style={{ opacity: bottomOpacity, y: bottomY }} className="relative z-20 max-w-3xl mx-auto">
            {bottomContent}
          </motion.div>
        </div>

        <motion.div
          style={{ scale: boxScale, opacity: boxOpacity }}
          className="absolute inset-0 w-screen h-screen overflow-hidden z-10"
        >
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
        </motion.div>
      </div>
    </div>
  );
}
