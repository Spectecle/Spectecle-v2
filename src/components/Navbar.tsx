"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Phone, User } from "lucide-react";
import { LogoMark } from "@/components/LogoMark";
import { HERO_TEXT, HERO_TEXT_MUTED, HERO_BORDER, HERO_ACCENT } from "@/components/ui/hero";
import { trackEvent } from "@/lib/track";

const DARK_HERO_ROUTES = ["/", "/hello"];

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // /hello is a standalone campaign landing page, not part of the normal
  // click-the-logo-to-go-home flow, so it gets an explicit Home link.
  const links = pathname === "/hello" ? [{ label: "Home", href: "/" }, ...navLinks] : navLinks;

  // "/" and "/hello" open on the dark photo hero, so the transparent,
  // pre-scroll navbar needs the hero's light text instead of the site's
  // (now light-theme) dark ink, or it disappears against the photo.
  // Once the mobile slide-in menu is open, a full-width light panel covers
  // the screen (see w-full below), so the header's icon/logo must switch to
  // the light-theme (dark) colors even while technically "over" the dark
  // hero — otherwise the white X blends into that light panel.
  const overDarkHero = DARK_HERO_ROUTES.includes(pathname) && !scrolled && !menuOpen;

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
        className={`fixed top-0 left-0 right-0 z-50 pt-[16px] transition-all duration-500 ${scrolled ? "backdrop-blur-xl border-b border-[var(--site-border)]" : ""}`}
        style={{ background: scrolled ? "rgba(247,242,233,0.95)" : "transparent" }}
      >
        <nav className="w-full px-6 lg:px-10 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3.5 cursor-pointer group" data-cursor>
            <LogoMark className="w-16 h-16 drop-shadow-sm" />
            <span
              className="text-[13px] font-semibold uppercase tracking-[0.32em]"
              style={{ fontFamily: "var(--font-sans)", color: overDarkHero ? HERO_TEXT : "var(--site-text-primary)" }}
            >
              Spectecle
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-cursor
                className={`group relative text-[13px] font-semibold uppercase tracking-[0.14em] transition-opacity cursor-pointer pb-1 ${
                  pathname === link.href ? "opacity-100" : "opacity-65 hover:opacity-100"
                }`}
                style={{ color: overDarkHero ? HERO_TEXT : "var(--site-text-primary)" }}
              >
                {link.label}
                <span
                  className="absolute left-0 bottom-0 h-px w-0 transition-[width] duration-300 group-hover:w-full"
                  style={{ background: overDarkHero ? HERO_ACCENT : "var(--site-copper-soft)" }}
                />
              </Link>
            ))}
          </div>

          {/* Phone + portal + desktop CTA + mobile menu button */}
          <div className="flex items-center gap-4">
            <div
              className="hidden lg:flex items-center gap-4 pr-4 mr-1 border-r"
              style={{ borderColor: overDarkHero ? HERO_BORDER : "var(--site-border)" }}
            >
              <a
                href="tel:+13133534105"
                data-cursor
                onClick={() => trackEvent("phone_click", { page_path: pathname })}
                className="flex items-center gap-1.5 text-sm transition-colors cursor-pointer"
                style={{ color: overDarkHero ? HERO_TEXT_MUTED : "var(--site-text-secondary)" }}
              >
                <Phone className="w-3.5 h-3.5" />
                (313) 353-4105
              </a>
            </div>
            <Link
              href="/portal"
              data-cursor
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium transition-colors cursor-pointer"
              style={{ color: overDarkHero ? HERO_TEXT_MUTED : "var(--site-text-secondary)" }}
            >
              <User className="w-3.5 h-3.5" />
              Client Portal
            </Link>
            <Link
              href="/contact"
              data-cursor
              className="hidden md:inline-flex items-center gap-2 text-[11.5px] font-medium uppercase tracking-[0.2em] border rounded-full px-[22px] py-3 cursor-pointer transition-colors duration-300 hover:border-[var(--site-copper-soft)] hover:bg-[var(--site-copper)] hover:text-[#f7f2e9]"
              style={{ borderColor: overDarkHero ? HERO_BORDER : "var(--site-border)", color: overDarkHero ? HERO_TEXT : "var(--site-text-primary)" }}
            >
              Start a project
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 transition-colors cursor-pointer"
              style={{ color: overDarkHero ? HERO_TEXT : "var(--site-text-secondary)" }}
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
              className="absolute right-0 top-0 h-full w-full sm:w-96 bg-[var(--site-bg)] border-l border-[var(--site-border)] p-10 pt-[116px] flex flex-col gap-2"
            >
              {links.map((link, i) => (
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
                  onClick={() => trackEvent("phone_click", { page_path: pathname })}
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
