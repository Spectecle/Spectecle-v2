"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LogoMark } from "@/components/LogoMark";

const IconX = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.261 5.631 5.903-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const IconInstagram = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);
const IconGithub = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const services = [
  { label: "Web Design & Development", href: "/services/web-design-detroit" },
  { label: "SEO & Marketing", href: "/services/seo-agency-detroit" },
  { label: "AI & Automation", href: "/services/ai-automation" },
];

const pages = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Meet Spectecle", href: "/hello" },
];

const socials = [
  { label: "Twitter / X", href: "https://x.com/spectecle", Icon: IconX },
  { label: "Instagram", href: "https://www.instagram.com/spectecle/", Icon: IconInstagram },
  { label: "GitHub", href: "https://github.com/Spectecle", Icon: IconGithub },
];

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return <p className="text-sm text-[#f87444]">You&apos;re subscribed. Thank you.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-stretch">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        className="flex-1 min-w-0 bg-transparent border-b border-[var(--site-border)] px-0 py-2 text-sm text-[var(--site-text-primary)] placeholder-[var(--site-text-muted)] focus:border-[#f87444] outline-none"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="ml-4 shrink-0 text-sm font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-0.5 cursor-pointer disabled:opacity-60"
      >
        {status === "loading" ? "..." : "Subscribe"}
      </button>
    </form>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[var(--site-bg)] border-t border-[var(--site-border)]">
      {/* CTA Strip */}
      <div className="border-b border-[var(--site-border)]">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2
              className="text-4xl md:text-5xl font-light text-[var(--site-text-primary)]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Ready to build something <span className="italic text-[#f87444]">extraordinary?</span>
            </h2>
            <p className="mt-3 text-[var(--site-text-secondary)] text-base">
              Let&apos;s discuss your project and create something remarkable together.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-lg font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-1 shrink-0"
          >
            Start a Project
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 cursor-pointer group">
              <LogoMark className="w-8 h-8" />
              <span className="text-xl font-bold tracking-tight text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-sans)" }}>
                Spectecle
              </span>
            </Link>
            <p className="mt-4 text-[var(--site-text-muted)] text-sm leading-relaxed max-w-xs">
              Premium web design, SEO & AI automation agency building digital experiences that convert and scale.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--site-text-muted)] hover:text-[var(--site-text-primary)] transition-colors duration-200 cursor-pointer"
                >
                  <s.Icon />
                </a>
              ))}
            </div>

            <h3 className="mt-10 text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest mb-3">
              Newsletter
            </h3>
            <NewsletterForm />
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest mb-5">Services</h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="text-sm text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)] transition-colors duration-200 cursor-pointer">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest mb-5">Company</h3>
            <ul className="space-y-3">
              {pages.map((p) => (
                <li key={p.label}>
                  <Link href={p.href} className="text-sm text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)] transition-colors duration-200 cursor-pointer">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest mb-5">Get in Touch</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@spectecle.com" className="text-sm text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)] transition-colors duration-200 cursor-pointer">
                  hello@spectecle.com
                </a>
              </li>
              <li>
                <a href="tel:+13133534105" className="text-sm text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)] transition-colors duration-200 cursor-pointer">
                  +1 (313) 353-4105
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[var(--site-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--site-text-muted)]">
            © {new Date().getFullYear()} Spectecle SEO & Web Design LLC. All rights reserved.
          </p>
          <Link href="/privacy" className="text-xs text-[var(--site-text-muted)] hover:text-[var(--site-text-primary)] transition-colors cursor-pointer">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
