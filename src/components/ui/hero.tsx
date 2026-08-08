"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(videoBoxRef.current, { xPercent: -50, yPercent: -50 });

      // Video box: pinned in place while it grows from a small centered square to full-bleed.
      // Text fades up (lifts + fades out) in lockstep with the same pin/scrub, not a separate trigger.
      const mm = gsap.matchMedia();

      mm.add({ desktop: "(min-width: 768px)", mobile: "(max-width: 767px)" }, (context) => {
        const { desktop } = context.conditions as { desktop: boolean };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=100%",
            scrub: desktop ? 0.8 : 0.6,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.to(textRef.current, { opacity: 0, y: "-70vh", ease: "power1.in", duration: 0.35 }, 0).to(
          videoBoxRef.current,
          { opacity: 1, width: "100vw", height: "100vh", ease: "power2.out", duration: 1 },
          0
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen w-screen bg-[var(--site-bg)]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div ref={textRef} className="relative z-20 text-center px-6 pointer-events-none">
          <span
            className="block font-light leading-none tracking-tight text-[var(--site-text-primary)] text-[14vw] sm:text-[11vw] lg:text-[9vw]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            SPECTECLE
          </span>
        </div>
      </div>

      <div
        ref={videoBoxRef}
        className="absolute top-1/2 left-1/2 overflow-hidden opacity-0 z-10"
        style={{ width: "38vh", height: "38vh" }}
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
      </div>
    </section>
  );
}
