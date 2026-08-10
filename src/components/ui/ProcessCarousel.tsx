"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface ProcessSlide {
  step: string;
  title: string;
  subtitle: string;
  desc: string;
  image: string;
}

const SLIDE_DURATION = 6000;
const TRANSITION_DURATION = 500;

export default function ProcessCarousel({ slides }: { slides: ProcessSlide[] }) {
  const [index, setIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(0);

  const goTo = useCallback(
    (next: number) => {
      if (transitioning || next === index) return;
      setTransitioning(true);
      setProgress(0);
      setTimeout(() => {
        setIndex(next);
        setTimeout(() => setTransitioning(false), 50);
      }, TRANSITION_DURATION / 2);
    },
    [transitioning, index]
  );

  const goNext = useCallback(() => goTo((index + 1) % slides.length), [index, goTo, slides.length]);
  const goPrev = useCallback(() => goTo((index - 1 + slides.length) % slides.length), [index, goTo, slides.length]);

  useEffect(() => {
    if (paused) return;
    const progressTimer = setInterval(() => {
      setProgress((p) => Math.min(p + 100 / (SLIDE_DURATION / 50), 100));
    }, 50);
    const slideTimer = setInterval(goNext, SLIDE_DURATION);
    return () => {
      clearInterval(progressTimer);
      clearInterval(slideTimer);
    };
  }, [index, paused, goNext]);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.targetTouches[0].clientX;
  }
  function handleTouchEnd(e: React.TouchEvent) {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 60) (diff > 0 ? goNext() : goPrev());
  }

  const slide = slides[index];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Text */}
        <div className={`transition-opacity duration-500 ${transitioning ? "opacity-0" : "opacity-100"}`}>
          <div className="flex items-center gap-3 text-xs font-mono text-[var(--site-text-muted)]">
            <span className="w-8 h-px bg-[var(--site-border)]" />
            {slide.step} / {String(slides.length).padStart(2, "0")}
          </div>
          <h3
            className="mt-6 text-4xl md:text-5xl font-light text-[var(--site-text-primary)]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {slide.title}
          </h3>
          <p className="mt-3 text-sm font-semibold uppercase tracking-widest text-[#f87444]">{slide.subtitle}</p>
          <p className="mt-5 text-[var(--site-text-secondary)] leading-relaxed max-w-md">{slide.desc}</p>

          <div className="mt-10 flex items-center gap-3">
            <button
              onClick={goPrev}
              aria-label="Previous step"
              className="w-10 h-10 flex items-center justify-center border border-[var(--site-border)] text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)] hover:border-[var(--site-text-primary)] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={goNext}
              aria-label="Next step"
              className="w-10 h-10 flex items-center justify-center border border-[var(--site-border)] text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)] hover:border-[var(--site-text-primary)] transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <div
            className={`relative aspect-[4/5] overflow-hidden border border-[var(--site-border)] transition-opacity duration-500 ${transitioning ? "opacity-0" : "opacity-100"}`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-[#f87444] hidden md:block" />
          <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-[#f87444] hidden md:block" />
        </div>
      </div>

      {/* Progress indicators */}
      <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {slides.map((s, i) => (
          <button key={s.step} onClick={() => goTo(i)} className="text-left cursor-pointer group">
            <div className="h-px w-full bg-[var(--site-border)] relative overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-[#f87444] transition-[width] duration-100"
                style={{ width: i === index ? `${progress}%` : i < index ? "100%" : "0%" }}
              />
            </div>
            <span
              className={`mt-3 block text-xs uppercase tracking-widest transition-colors ${
                i === index
                  ? "text-[var(--site-text-primary)]"
                  : "text-[var(--site-text-muted)] group-hover:text-[var(--site-text-secondary)]"
              }`}
            >
              {s.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
