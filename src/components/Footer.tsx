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
  { label: "Web Design & Development", href: "/services" },
  { label: "SEO & Marketing", href: "/services" },
  { label: "AI & Automation", href: "/services" },
];

const pages = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { label: "Twitter / X", href: "https://x.com/spectecle", Icon: IconX },
  { label: "Instagram", href: "https://www.instagram.com/spectecle/", Icon: IconInstagram },
  { label: "GitHub", href: "https://github.com/Spectecle", Icon: IconGithub },
];

export default function Footer() {
  return (
    <footer className="bg-[#040408] border-t border-white/6">
      {/* CTA Strip */}
      <div className="border-b border-white/6">
        <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2
              className="text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Ready to build something{" "}
              <span className="gradient-text">extraordinary?</span>
            </h2>
            <p className="mt-2 text-slate-400 text-base">
              Let&apos;s discuss your project and create something remarkable together.
            </p>
          </div>
          <Link
            href="/contact"
            className="btn-primary flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold shrink-0 cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4 relative z-10" />
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 cursor-pointer group">
              <LogoMark className="w-7 h-8" />
              <span
                className="text-xl font-bold tracking-tight text-white"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Spectecle
              </span>
            </Link>
            <p className="mt-4 text-slate-500 text-sm leading-relaxed max-w-xs">
              Premium web design, SEO & AI automation agency building digital experiences that convert and scale.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center border border-white/8 text-slate-500 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-200 cursor-pointer"
                >
                  <s.Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3
              className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Services
            </h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-sm text-slate-500 hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h3
              className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Company
            </h3>
            <ul className="space-y-3">
              {pages.map((p) => (
                <li key={p.label}>
                  <Link
                    href={p.href}
                    className="text-sm text-slate-500 hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Get in Touch
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@spectecle.com"
                  className="text-sm text-slate-500 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  hello@spectecle.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+13133534105"
                  className="text-sm text-slate-500 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  +1 (313) 353-4105
                </a>
              </li>
              <li className="text-sm text-slate-500">
                Detroit, MI — Remote Worldwide
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Spectecle Agency LLC. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-slate-600 hover:text-slate-400 transition-colors cursor-pointer">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
