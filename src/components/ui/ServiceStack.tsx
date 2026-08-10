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
        const widthPct = 62 + i * 6;
        return (
          <div
            key={item.title}
            className="static sm:sticky w-full"
            style={{ top: `${i * 16}px`, zIndex: i + 1 }}
          >
            <div className="py-3 sm:py-0 sm:h-screen w-full flex items-center justify-center px-6">
              <Link
                href={item.href}
                className="group block w-full aspect-[4/5] sm:aspect-auto sm:h-[62%] md:h-[74%]"
                style={{ ["--stack-w" as string]: `${widthPct}%` }}
              >
                <div className="relative h-full w-full sm:mx-auto sm:max-w-[var(--stack-w)] overflow-hidden border border-[var(--site-border)] bg-black">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 768px) 100vw, 80vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {i > 0 && (
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-28 [box-shadow:0_-24px_48px_16px_rgba(0,0,0,0.7)]" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5" />

                  <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 md:p-14">
                    <span className="text-xs sm:text-sm font-mono text-white/70">{item.n}</span>
                    <h3
                      className="mt-2 sm:mt-3 text-2xl sm:text-5xl md:text-6xl font-light text-white leading-[1.05]"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {item.title}
                    </h3>
                    <p className="mt-3 sm:mt-4 max-w-xl text-white/80 text-sm sm:text-base md:text-lg leading-relaxed">
                      {item.desc}
                    </p>
                    <span className="mt-4 sm:mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white border-b border-white pb-0.5 w-fit">
                      Learn more
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
