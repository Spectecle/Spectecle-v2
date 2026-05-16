"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Home, Briefcase, Mail } from "lucide-react";

const links = [
  { label: "Back to Home", href: "/", Icon: Home },
  { label: "View Our Work", href: "/work", Icon: Briefcase },
  { label: "Contact Us", href: "/contact", Icon: Mail },
];

export default function NotFound() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Background */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(210,81,36,0.12) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />

      <div className="relative text-center max-w-xl mx-auto">
        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span
            className="text-[9rem] md:text-[12rem] font-black leading-none gradient-text block"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            404
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl md:text-3xl font-bold text-white mt-2"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Page not found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          className="mt-4 text-slate-400 leading-relaxed"
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Here are a few places to go instead.
        </motion.p>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.26 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          {links.map(({ label, href, Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/8 text-sm font-medium text-slate-300 hover:text-white hover:border-white/20 transition-all duration-200"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </motion.div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.36 }}
          className="mt-8"
        >
          <Link
            href="/contact"
            className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-5 h-5 relative z-10" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
