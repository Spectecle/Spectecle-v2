"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

const ROTATE_WORDS = ["Convert.", "Rank.", "Scale.", "Perform."];

const SLIDES = [
  {
    slug: "vue-optometry",
    image: "/screenshots/vueoptometry.png",
    caption: "Vue Optometry · Brand & Website",
  },
  {
    slug: "glam-by-abeer",
    image: "/screenshots/glambyabeer.png",
    caption: "Glam by Abeer · Brand & Website",
  },
  {
    slug: "indoor-garden",
    image: "/screenshots/indoorgarden.png",
    caption: "Indoor Garden · Content & SEO",
  },
];

const SLIDE_DURATION = 5600;

function RotatingWord() {
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setWordIdx((i) => (i + 1) % ROTATE_WORDS.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="inline-block min-w-[7ch] text-left">
      <AnimatePresence mode="wait">
        <motion.span
          key={wordIdx}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          className="italic text-[var(--site-copper-soft)] inline-block"
        >
          {ROTATE_WORDS[wordIdx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const t0 = useRef(0);

  useEffect(() => {
    t0.current = performance.now();
    const id = requestAnimationFrame(() => setLoaded(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const goTo = useCallback((i: number) => {
    setIndex(((i % SLIDES.length) + SLIDES.length) % SLIDES.length);
    setProgress(0);
    t0.current = performance.now();
  }, []);

  useEffect(() => {
    if (paused) return;
    let raf: number;
    const loop = (now: number) => {
      const p = (now - t0.current) / SLIDE_DURATION;
      if (p >= 1) {
        goTo(index + 1);
      } else {
        setProgress(p);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [index, paused, goTo]);

  return (
    <div
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        t0.current = performance.now();
      }}
    >
      {/* Background image reel */}
      <div className="absolute inset-0 z-0">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.slug}
            className="absolute inset-0 transition-opacity duration-[1400ms]"
            style={{ opacity: i === index ? 1 : 0 }}
          >
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ animation: i === index ? "kenburns 8s ease-out forwards" : undefined }}
            >
              <Image
                src={slide.image}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover object-top"
                style={{ filter: "brightness(.55) contrast(1.05) saturate(.85)" }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Scrim */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: `
            linear-gradient(90deg, rgba(12,10,8,.93) 0%, rgba(12,10,8,.62) 30%, rgba(12,10,8,.12) 62%, rgba(12,10,8,.35) 100%),
            linear-gradient(0deg, rgba(12,10,8,.92) 0%, rgba(12,10,8,.15) 32%, transparent 58%),
            linear-gradient(180deg, rgba(12,10,8,.75) 0%, transparent 26%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 pt-20">
        <div className="max-w-[1080px]">
          <p
            className="flex items-center gap-3.5 text-xs tracking-[0.26em] uppercase text-[var(--site-text-secondary)] mb-6 transition-all duration-1000"
            style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(14px)", transitionDelay: "100ms" }}
          >
            <span className="w-[46px] h-px bg-[rgba(219,197,163,.34)]" />
            Web Design &amp; Marketing · Serving Businesses Nationwide
          </p>

          <h1
            className="font-normal leading-[0.99] tracking-tight text-[var(--site-text-primary)] text-[11vw] sm:text-[6vw] lg:text-[4.6vw]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            <span className="block overflow-hidden pb-[0.06em]">
              <span
                className="block transition-transform duration-[1050ms]"
                style={{ transform: loaded ? "none" : "translateY(112%)", transitionDelay: "180ms" }}
              >
                We build websites that
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <span
                className="block transition-transform duration-[1050ms]"
                style={{ transform: loaded ? "none" : "translateY(112%)", transitionDelay: "300ms" }}
              >
                <RotatingWord />
              </span>
            </span>
          </h1>

          <p
            className="mt-6 sm:mt-8 italic text-[var(--site-copper-soft)] leading-none tracking-tight text-[7vw] sm:text-[3.4vw] lg:text-[2.4vw] transition-all duration-1000"
            style={{ fontFamily: "var(--font-serif)", opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(16px)", transitionDelay: "500ms" }}
          >
            Custom Web Design. Marketing That Works.
          </p>

          <div
            className="mt-8 sm:mt-10 flex flex-wrap items-center gap-6 sm:gap-8 transition-all duration-1000"
            style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(16px)", transitionDelay: "660ms" }}
          >
            <Link
              href="/contact"
              data-cursor
              className="btn-primary inline-flex items-center gap-3 text-[15px] font-medium px-[30px] py-[17px]"
            >
              <span className="flex items-center gap-3">
                Start a project
                <ArrowUpRight className="w-[15px] h-[15px]" />
              </span>
            </Link>
            <Link
              href="/work"
              data-cursor
              className="group inline-flex items-center gap-2.5 text-sm text-[var(--site-text-primary)] pb-[5px] border-b border-[var(--site-border)] hover:border-[var(--site-copper-soft)] transition-colors"
            >
              See our work
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>

        {/* Reel bar */}
        <div
          className="mt-auto pb-8 sm:pb-10 grid grid-cols-2 md:grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-10 transition-all duration-1000"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(18px)", transitionDelay: "900ms" }}
        >
          <div className="flex items-baseline gap-4 min-w-0">
            <span className="text-[15px] text-[var(--site-text-secondary)] whitespace-nowrap" style={{ fontFamily: "var(--font-serif)" }}>
              <span className="text-[var(--site-copper-soft)]">{String(index + 1).padStart(2, "0")}</span> / {String(SLIDES.length).padStart(2, "0")}
            </span>
            <Link
              href={`/work/${SLIDES[index].slug}`}
              data-cursor
              className="hidden md:block text-[12.5px] tracking-[0.14em] uppercase text-[var(--site-text-primary)] truncate hover:text-[var(--site-copper-soft)] transition-colors"
            >
              {SLIDES[index].caption}
            </Link>
          </div>

          <div className="hidden md:block relative h-px bg-[var(--site-border)] w-full max-w-[340px] justify-self-center">
            <span
              className="absolute left-0 top-0 h-px bg-[var(--site-copper-soft)]"
              style={{ width: `${Math.min(progress, 1) * 100}%` }}
            />
          </div>

          <div className="flex items-center gap-2.5 justify-self-end">
            <button
              onClick={() => goTo(index - 1)}
              aria-label="Previous work"
              data-cursor
              className="w-11 h-11 rounded-full border border-[var(--site-border)] grid place-items-center text-[var(--site-text-primary)] hover:border-[var(--site-copper-soft)] hover:bg-[var(--site-text-primary)]/[0.06] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => goTo(index + 1)}
              aria-label="Next work"
              data-cursor
              className="w-11 h-11 rounded-full border border-[var(--site-border)] grid place-items-center text-[var(--site-text-primary)] hover:border-[var(--site-copper-soft)] hover:bg-[var(--site-text-primary)]/[0.06] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="hidden sm:flex items-center gap-2 ml-1.5">
              {SLIDES.map((slide, i) => (
                <button
                  key={slide.slug}
                  onClick={() => goTo(i)}
                  aria-label={`Go to work ${i + 1}`}
                  data-cursor
                  className={`w-[7px] h-[7px] rounded-full transition-all cursor-pointer ${
                    i === index ? "bg-[var(--site-copper-soft)] scale-125" : "bg-[var(--site-border)]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes kenburns {
          from { transform: scale(1.02); }
          to { transform: scale(1.16); }
        }
      `}</style>
    </div>
  );
}
