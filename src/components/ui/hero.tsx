"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const { scrollY } = useScroll();
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 90], [1, 0]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[var(--site-bg)] overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="text-center leading-[0.95] tracking-tight text-[var(--site-text-primary)] px-6"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <span className="block font-light text-[14vw] sm:text-[11vw] lg:text-[9vw]">
          SPECTECLE
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute bottom-16 left-0 right-0 px-8 sm:px-12 flex items-end justify-between"
      >
        <span className="text-xs uppercase tracking-widest text-[var(--site-text-muted)]">Scroll</span>
        <p className="text-sm sm:text-base text-[var(--site-text-secondary)] text-center max-w-md">
          Websites, SEO & AI automation for ambitious businesses.
        </p>
        <span className="text-xs uppercase tracking-widest text-[var(--site-text-muted)]">Est. 2012</span>
      </motion.div>

      <motion.div
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-6 left-8 sm:left-12 pointer-events-none"
      >
        <span className="text-[var(--site-text-muted)] text-lg">&#8595;</span>
      </motion.div>
      <motion.div
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-6 right-8 sm:right-12 pointer-events-none"
      >
        <span className="text-[var(--site-text-muted)] text-lg">&#8595;</span>
      </motion.div>
    </section>
  );
}
