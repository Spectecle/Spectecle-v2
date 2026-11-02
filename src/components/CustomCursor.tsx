"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasHover = matchMedia("(hover: hover)").matches;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hasHover || reduce) return;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let scale = 1;
    let raf = 0;
    const HOVER_SCALE = 64 / 34; // ring grows from 34px to 64px over links and buttons

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };
    window.addEventListener("pointermove", onMove);

    // Ring trails the pointer (eased), centred on it; scale is eased in the same
    // transform so growing on hover never moves the ring off the pointer.
    const follow = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      const target = ring.classList.contains("is-hover") ? HOVER_SCALE : 1;
      scale += (target - scale) * 0.2;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(follow);
    };
    raf = requestAnimationFrame(follow);

    // Delegated, so links rendered after client-side navigation also grow the ring.
    const onOver = (e: PointerEvent) => {
      const hit = (e.target as Element | null)?.closest?.("[data-cursor]");
      ring.classList.toggle("is-hover", !!hit);
    };
    document.addEventListener("pointerover", onOver);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="cb-cursor fixed top-0 left-0 w-[34px] h-[34px] rounded-full border border-[var(--site-text-primary)] pointer-events-none z-[120] hidden md:block"
        style={{ mixBlendMode: "difference", transform: "translate(-50%,-50%)" }}
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[5px] h-[5px] rounded-full bg-[var(--site-text-primary)] pointer-events-none z-[120] hidden md:block"
        style={{ mixBlendMode: "difference", transform: "translate(-50%,-50%)" }}
        aria-hidden="true"
      />
    </>
  );
}
