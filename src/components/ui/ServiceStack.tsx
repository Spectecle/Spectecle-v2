"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export interface ServiceStackItem {
  n: string;
  title: string;
  desc: string;
  href: string;
  image: string;
}

export default function ServiceStack({ items }: { items: ServiceStackItem[] }) {
  return (
    <div className="w-full">
      {items.map((item, i) => {
        const widthPct = 47 + i * 1;
        return (
          <div
            key={item.title}
            className="sticky w-full"
            style={{ top: `${i * 16}px`, zIndex: i + 1 }}
          >
            <div className="h-screen sm:h-[70vh] w-full flex items-center justify-center px-6">
              <Link
                href={item.href}
                className="group block w-full h-[70%] sm:h-[54%]"
                style={{ ["--stack-w" as string]: `${widthPct}%` }}
              >
                <div className="relative h-full w-full mx-auto sm:max-w-[var(--stack-w)] overflow-hidden border border-[var(--site-border)] bg-black">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {i > 0 && (
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-14 [box-shadow:0_-12px_24px_8px_rgba(0,0,0,0.7)]" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  <div className="absolute inset-0 flex flex-col justify-end">
                    <div className="bg-black px-6 py-6 sm:px-4 sm:py-4 md:px-6 md:py-5">
                      <span className="text-xs sm:text-[10px] font-mono text-white/70">{item.n}</span>
                      <h3
                        className="mt-2 sm:mt-1.5 text-2xl sm:text-lg md:text-xl font-light text-white leading-[1.05]"
                        style={{ fontFamily: "var(--font-serif)" }}
                      >
                        {item.title}
                      </h3>
                      <p className="mt-3 sm:mt-2 max-w-xl text-white/80 text-sm sm:text-xs leading-relaxed">
                        {item.desc}
                      </p>
                      <span className="mt-4 sm:mt-3 inline-flex items-center gap-2 text-sm sm:text-xs font-semibold text-white border-b border-white pb-0.5 w-fit">
                        Learn more
                        <ArrowUpRight className="w-4 h-4 sm:w-3.5 sm:h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        );
      })}
      {/* Trailing spacer: without a sibling after the last card, its containing
          block ends exactly where it ends, leaving it zero room to stick —
          it would un-stick immediately and leave a gap. */}
      <div className="w-full h-screen sm:h-[70vh]" aria-hidden="true" />
    </div>
  );
}
