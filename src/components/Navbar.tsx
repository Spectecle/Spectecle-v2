"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Phone, User } from "lucide-react";
import { LogoMark } from "@/components/LogoMark";
import { SiteThemeToggle } from "@/components/SiteThemeToggle";

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

          {/* Theme toggle + menu button */}
          <div className="flex items-center gap-1">
            <SiteThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)] transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Slide-in menu — the only nav surface, at every breakpoint */}
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
