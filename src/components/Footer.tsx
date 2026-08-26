import Link from "next/link";
import { LogoMark } from "@/components/LogoMark";

const navLinks = [
  { label: "Sitemap", href: "/sitemap.xml" },
  { label: "Blog", href: "/blog" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Instagram", href: "https://www.instagram.com/spectecle/" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--site-border)] px-8 sm:px-12 lg:px-20 py-10 sm:py-14">
      <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-6">
        <Link href="/" className="flex items-center gap-3 cursor-pointer group justify-self-center sm:justify-self-start" data-cursor>
          <LogoMark className="w-10 h-10" />
          <span className="text-[13px] font-semibold uppercase tracking-[0.42em] text-[var(--site-text-primary)]">
            Spectecle
          </span>
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 justify-self-center" aria-label="Footer">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              data-cursor
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-xs tracking-[0.15em] uppercase text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <span className="text-xs tracking-wide text-[var(--site-text-muted)] justify-self-center sm:justify-self-end">
          © {new Date().getFullYear()} Spectecle · Metro Detroit
        </span>
      </div>
    </footer>
  );
}
