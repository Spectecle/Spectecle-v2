"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

/* This hero sits over a dark-scrimmed photo reel, so its text stays a
   fixed light-on-dark palette regardless of the rest of the site's
   (now light/cream) theme — it does not use the --site-* tokens.
   Exported so Navbar can match while it floats transparently over this
   same hero (on "/" and "/hello") before the user scrolls. */
export const HERO_TEXT = "#f2ece1";
export const HERO_TEXT_MUTED = "#c9bea9";
export const HERO_BORDER = "rgba(242,236,225,.22)";
export const HERO_ACCENT = "#e3a876";

const SLIDES = [
  {
    id: "web-design",
    image: "/hero/web-design.jpg",
    caption: "Website & Development",
  },
  {
    id: "seo",
    image: "/hero/seo.jpg",
    caption: "SEO & Ad Campaigns",
  },
  {
    id: "brand",
    image: "/hero/typography.jpg",
    caption: "Brand & Identity",
  },
];

const SLIDE_DURATION = 5600;

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
            key={slide.id}
            className="absolute inset-0 transition-opacity duration-[1400ms]"
            style={{ opacity: i === index ? 1 : 0 }}
          >
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                animation: "kenburns 8s ease-out forwards",
                animationPlayState: i === index ? "running" : "paused",
              }}
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
      <div className="relative z-10 h-full flex flex-col px-6 pt-20">
        <div className="flex-1 flex flex-col justify-center">
          <div className="max-w-[1080px]">
            <h1
              className="font-normal leading-[0.99] tracking-tight text-[11vw] sm:text-[6vw] lg:text-[4.6vw]"
              style={{ fontFamily: "var(--font-serif)", color: HERO_TEXT }}
            >
              <span className="block overflow-hidden pb-[0.18em]">
                <span
                  className="block transition-transform duration-[1050ms]"
                  style={{ transform: loaded ? "none" : "translateY(112%)", transitionDelay: "180ms" }}
                >
                  Websites worth
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.18em]">
                <span
                  className="block transition-transform duration-[1050ms]"
                  style={{ transform: loaded ? "none" : "translateY(112%)", transitionDelay: "300ms" }}
                >
                  looking at <em className="italic" style={{ color: HERO_ACCENT }}>twice.</em>
                </span>
              </span>
            </h1>

            <p
              className="mt-6 sm:mt-8 max-w-[32em] text-base sm:text-[1.16rem] leading-[1.6] transition-all duration-1000"
              style={{ color: HERO_TEXT_MUTED, opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(16px)", transitionDelay: "500ms" }}
            >
              Every brand has a moment it&apos;s finally seen: someone stops scrolling, looks twice, and stays.
              We build that moment into your site,{" "}
              <b className="font-medium" style={{ color: HERO_TEXT }}>engineered to load fast, rank higher, and convert</b>, then keep it growing long after launch.
            </p>

            <div
              className="mt-8 sm:mt-10 flex flex-wrap items-center gap-6 sm:gap-8 transition-all duration-1000"
              style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(16px)", transitionDelay: "660ms" }}
            >
              <Link
                href="/contact"
                data-cursor
                className="hero-cta inline-flex items-center gap-3 text-[15px] font-medium px-[30px] py-[17px] rounded-full cursor-pointer"
                style={{ background: HERO_TEXT, color: "#160f09" }}
              >
                <span className="relative z-10 inline-flex items-center gap-3">
                  Start a project
                  <ArrowUpRight className="w-[15px] h-[15px]" />
                </span>
              </Link>
              <Link
                href="/work"
                data-cursor
                className="group inline-flex items-center gap-2.5 text-sm pb-[5px] border-b transition-colors"
                style={{ color: HERO_TEXT, borderColor: HERO_BORDER }}
              >
                See our work
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>
        </div>

        {/* Reel bar */}
        <div
          className="pb-8 sm:pb-10 grid grid-cols-2 md:grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-10 transition-all duration-1000"
          style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(18px)", transitionDelay: "900ms" }}
        >
          <div className="flex items-baseline gap-4 min-w-0">
            <span className="text-[15px] whitespace-nowrap" style={{ fontFamily: "var(--font-serif)", color: HERO_TEXT_MUTED }}>
              <span style={{ color: HERO_ACCENT }}>{String(index + 1).padStart(2, "0")}</span> / {String(SLIDES.length).padStart(2, "0")}
            </span>
            <Link
              href="/work"
              data-cursor
              className="hidden md:block text-[12.5px] tracking-[0.14em] uppercase truncate transition-colors"
              style={{ color: HERO_TEXT }}
            >
              {SLIDES[index].caption}
            </Link>
          </div>

          <div className="hidden md:block relative h-px w-full max-w-[340px] justify-self-center" style={{ background: HERO_BORDER }}>
            <span
              className="absolute left-0 top-0 h-px"
              style={{ width: `${Math.min(progress, 1) * 100}%`, background: HERO_ACCENT }}
            />
          </div>

          <div className="flex items-center gap-2.5 justify-self-end">
            <button
              onClick={() => goTo(index - 1)}
              aria-label="Previous work"
              data-cursor
              className="w-11 h-11 rounded-full border grid place-items-center transition-colors cursor-pointer"
              style={{ borderColor: HERO_BORDER, color: HERO_TEXT }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => goTo(index + 1)}
              aria-label="Next work"
              data-cursor
              className="w-11 h-11 rounded-full border grid place-items-center transition-colors cursor-pointer"
              style={{ borderColor: HERO_BORDER, color: HERO_TEXT }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="hidden sm:flex items-center gap-2 ml-1.5">
              {SLIDES.map((slide, i) => (
                <button
                  key={slide.id}
                  onClick={() => goTo(i)}
                  aria-label={`Go to work ${i + 1}`}
                  data-cursor
                  className="w-[7px] h-[7px] rounded-full transition-all cursor-pointer"
                  style={{
                    background: i === index ? HERO_ACCENT : HERO_BORDER,
                    transform: i === index ? "scale(1.25)" : "none",
                  }}
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
        .hero-cta { position: relative; overflow: hidden; transition: transform .25s ease; }
        .hero-cta::before {
          content: "";
          position: absolute;
          inset: 0;
          background: ${HERO_ACCENT};
          transform: translateY(101%);
          transition: transform .4s cubic-bezier(.16,1,.3,1);
          z-index: 0;
        }
        .hero-cta:hover::before { transform: translateY(0); }
        .hero-cta:hover { transform: translateY(-2px); }
      `}</style>
    </div>
  );
}
