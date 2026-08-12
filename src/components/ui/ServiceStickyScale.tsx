"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export interface ServiceStickyScaleItem {
  n: string;
  title: string;
  desc: string;
  href: string;
  image: string;
}

function StickyCard({
  index,
  total,
  item,
  progress,
}: {
  index: number;
  total: number;
  item: ServiceStickyScaleItem;
  progress: MotionValue<number>;
}) {
  const targetScale = Math.max(0.82, 1 - (total - index - 1) * 0.06);
  const scale = useTransform(progress, [index * 0.2, 1], [1, targetScale]);

  return (
    <div className="sticky top-0 flex items-center justify-center px-6">
      <motion.div
        style={{ scale, top: `calc(-5vh + ${index * 16 + 96}px)`, zIndex: index + 1 }}
        className="relative -top-1/4 flex origin-top flex-col overflow-hidden border border-[var(--site-border)] bg-black w-[86vw] h-[280px]"
      >
        <Link href={item.href} className="group block h-full w-full">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="86vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/0" />
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-white/60">{item.n}</span>
                <h3
                  className="mt-1 text-2xl font-light text-white leading-none"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {item.title}
                </h3>
              </div>
              <ArrowUpRight className="w-5 h-5 shrink-0 text-white/70" />
            </div>
            <p className="mt-3 text-sm text-white/80 leading-relaxed">{item.desc}</p>
          </div>
        </Link>
      </motion.div>
    </div>
  );
}

export default function ServiceStickyScale({ items }: { items: ServiceStickyScaleItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative flex w-full flex-col items-center justify-center pt-[2vh] pb-[8vh]">
      {items.map((item, i) => (
        <StickyCard key={item.title} index={i} total={items.length} item={item} progress={scrollYProgress} />
      ))}
    </div>
  );
}
