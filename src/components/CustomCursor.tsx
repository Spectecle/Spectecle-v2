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
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };
    window.addEventListener("pointermove", onMove);

    const follow = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(follow);
    };
    raf = requestAnimationFrame(follow);

    const hoverables = document.querySelectorAll("[data-cursor]");
    const onEnter = () => ring.classList.add("is-hover");
    const onLeave = () => ring.classList.remove("is-hover");
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
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
