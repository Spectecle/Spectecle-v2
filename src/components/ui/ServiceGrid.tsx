"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export interface ServiceGridItem {
  n: string;
  title: string;
  desc: string;
  href: string;
  image: string;
}

export default function ServiceGrid({ items }: { items: ServiceGridItem[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
      {items.map((item) => (
        <Link
          key={item.title}
          href={item.href}
          className="group relative block aspect-[4/3] overflow-hidden border border-[var(--site-border)] bg-black"
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/0 transition-colors duration-500 group-hover:from-black/85" />

          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-white/60">{item.n}</span>
                <h3
                  className="mt-1 text-2xl sm:text-3xl md:text-4xl font-light text-white leading-none"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {item.title}
                </h3>
              </div>
              <ArrowUpRight className="w-6 h-6 shrink-0 text-white/70 transition-all duration-300 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>

            <p className="mt-3 max-h-0 overflow-hidden opacity-0 text-sm text-white/80 leading-relaxed transition-all duration-300 group-hover:max-h-24 group-hover:opacity-100">
              {item.desc}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
