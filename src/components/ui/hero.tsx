"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.35], ["0vh", "-70vh"]);

  const videoOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const videoWidth = useTransform(scrollYProgress, [0, 1], ["38vh", "100vw"]);
  const videoHeight = useTransform(scrollYProgress, [0, 1], ["38vh", "100vh"]);

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen w-screen overflow-hidden bg-[var(--site-bg)]">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="relative z-20 text-center px-6 pointer-events-none"
          >
            <span
              className="block font-light leading-none tracking-tight text-[var(--site-text-primary)] text-[14vw] sm:text-[11vw] lg:text-[9vw]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              SPECTECLE
            </span>
          </motion.div>
        </div>

        <motion.div
          style={{
            width: videoWidth,
            height: videoHeight,
            opacity: videoOpacity,
            top: "50%",
            left: "50%",
            x: "-50%",
            y: "-50%",
          }}
          className="absolute overflow-hidden z-10"
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-transparent" />
        </motion.div>
      </div>
    </div>
  );
}
