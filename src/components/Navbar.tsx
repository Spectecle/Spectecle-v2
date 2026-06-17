"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Phone } from "lucide-react";
import { LogoMark } from "@/components/LogoMark";

const navLinks = [
  { label: "Services", href: "/services" },
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
          scrolled
            ? "bg-[#040408]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer group">
            <LogoMark className="w-7 h-8 drop-shadow-sm" />
            <span
              className="text-xl font-bold tracking-tight text-white"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Spectecle
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer ${
                  pathname === link.href
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/8 rounded-lg"
                    transition={{ type: "spring", duration: 0.4 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+13133534105"
              className="hidden lg:flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors duration-200"
            >
              <Phone className="w-3.5 h-3.5" />
              (313) 353-4105
            </a>
            <Link
              href="/contact"
              className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 relative z-10" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-[#040408]/95 backdrop-blur-2xl"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-72 bg-[#09090f] border-l border-white/8 p-8 pt-24 flex flex-col gap-2"
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
                    className={`block px-4 py-3.5 rounded-xl text-base font-medium transition-colors cursor-pointer ${
                      pathname === link.href
                        ? "bg-white/8 text-white"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-6 pt-6 border-t border-white/8 flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="btn-primary flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl text-sm font-semibold cursor-pointer"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="w-4 h-4 relative z-10" />
                </Link>
                <a
                  href="tel:+13133534105"
                  className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white border border-white/8 hover:border-white/15 transition-all duration-200"
                >
                  <Phone className="w-4 h-4" />
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
