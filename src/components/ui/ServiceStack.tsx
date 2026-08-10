"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export interface ServiceStackItem {
  n: string;
  title: string;
  desc: string;
  href: string;
  image: string;
}

function ServiceCard({ item, index }: { item: ServiceStackItem; index: number }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const washRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const local = Math.min(Math.max((p - 0.15) / 0.85, 0), 1);
    if (washRef.current) washRef.current.style.opacity = String(local * 0.88);
    if (cardRef.current) cardRef.current.style.transform = `scale(${1 - local * 0.06})`;
  });

  return (
    <div ref={wrapperRef} className="relative h-[125vh] sm:h-[135vh] md:h-[145vh]">
      <div
        className="sticky h-[68vh] sm:h-[74vh] md:h-[80vh] w-full"
        style={{ top: `calc(5rem + ${index * 18}px)`, zIndex: index + 1 }}
      >
        <div
          ref={cardRef}
          className="relative h-full w-full overflow-hidden border border-[var(--site-border)] origin-top"
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            priority={index === 0}
            sizes="(max-width: 768px) 100vw, 90vw"
            className="object-cover"
          />

          {/* baseline scrim for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

          {/* scroll-driven brass colorize wash — ramps in as the next card rises over this one */}
          <div
            ref={washRef}
            style={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-[#c69947] via-[#c69947] to-[#1e1e1e] mix-blend-color"
          />

          <div className="relative h-full w-full flex flex-col justify-end p-7 sm:p-10 md:p-14">
            <span className="text-xs sm:text-sm font-mono text-white/70">{item.n}</span>
            <h3
              className="mt-2 sm:mt-3 text-3xl sm:text-5xl md:text-6xl font-light text-white leading-[1.05]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {item.title}
            </h3>
            <p className="mt-3 sm:mt-4 max-w-xl text-white/80 text-sm sm:text-base md:text-lg leading-relaxed">
              {item.desc}
            </p>
            <Link
              href={item.href}
              className="group mt-5 sm:mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white border-b border-white pb-0.5 w-fit cursor-pointer"
            >
              Learn more
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServiceStack({ items }: { items: ServiceStackItem[] }) {
  return (
    <div className="relative">
      {items.map((item, i) => (
        <ServiceCard key={item.title} item={item} index={i} />
      ))}
    </div>
  );
}
