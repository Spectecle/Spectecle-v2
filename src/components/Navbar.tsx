"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Phone, User } from "lucide-react";
import { LogoMark } from "@/components/LogoMark";
import { SiteThemeToggle } from "@/components/SiteThemeToggle";

const IconX = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.261 5.631 5.903-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const IconInstagram = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const socials = [
  { label: "Twitter / X", href: "https://x.com/spectecle", Icon: IconX },
  { label: "Instagram", href: "https://www.instagram.com/spectecle/", Icon: IconInstagram },
];

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Our Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[var(--site-bg)]/95 backdrop-blur-xl border-b border-[var(--site-border)]" : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center cursor-pointer group">
            <LogoMark className="w-16 h-16 drop-shadow-sm" />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors cursor-pointer ${
                  pathname === link.href
                    ? "text-[var(--site-text-primary)]"
                    : "text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Theme toggle + desktop CTA + mobile menu button */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-4 pr-4 mr-1 border-r border-[var(--site-border)]">
              <a
                href="tel:+13133534105"
                className="flex items-center gap-1.5 text-sm text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)] transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                (313) 353-4105
              </a>
              <div className="flex items-center gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--site-text-muted)] hover:text-[var(--site-text-primary)] transition-colors cursor-pointer"
                  >
                    <s.Icon />
                  </a>
                ))}
              </div>
            </div>
            <SiteThemeToggle />
            <Link
              href="/portal"
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)] transition-colors cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              Client Portal
            </Link>
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-0.5 cursor-pointer"
            >
              Start a Project
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)] transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Slide-in menu — mobile only */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40"
          >
            <div
              className="absolute inset-0 bg-[var(--site-text-primary)]/30 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-full sm:w-96 bg-[var(--site-bg)] border-l border-[var(--site-border)] p-10 pt-28 flex flex-col gap-2"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.1 }}
                >
                  <Link
                    href={link.href}
                    className={`block py-3 text-2xl font-light transition-colors cursor-pointer ${
                      pathname === link.href
                        ? "text-[var(--site-text-primary)]"
                        : "text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)]"
                    }`}
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-8 pt-8 border-t border-[var(--site-border)] flex flex-col gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-0.5 w-fit cursor-pointer"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/portal"
                  className="inline-flex items-center gap-2 text-sm text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)] transition-colors cursor-pointer w-fit"
                >
                  <User className="w-3.5 h-3.5" />
                  Client Portal
                </Link>
                <a
                  href="tel:+13133534105"
                  className="inline-flex items-center gap-2 text-sm text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)] transition-colors w-fit"
                >
                  <Phone className="w-3.5 h-3.5" />
                  (313) 353-4105
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
