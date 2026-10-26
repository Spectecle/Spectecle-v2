import Link from "next/link";
import { LogoMark } from "@/components/LogoMark";

const navLinks = [
  { label: "Sitemap", href: "/sitemap" },
  { label: "Blog", href: "/blog" },
  { label: "Privacy Policy", href: "/privacy" },
];

const serviceLinks = [
  { label: "Web Design Detroit", href: "/services/web-design-detroit" },
  { label: "SEO Agency Detroit", href: "/services/seo-agency-detroit" },
  { label: "AI & Automation", href: "/services/ai-automation" },
  { label: "Law Firm Websites", href: "/services/law-firm-website-design" },
  { label: "Medical Websites", href: "/services/medical-website-design" },
  { label: "The Loop Client Portal", href: "/services/the-loop" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--site-border)] px-8 sm:px-12 lg:px-20 py-10 sm:py-14">
      <nav className="mb-10 pb-10 border-b border-[var(--site-border)] text-center sm:text-left" aria-label="Services">
        <p className="mb-4 text-xs tracking-[0.15em] uppercase text-[var(--site-text-muted)]">Services</p>
        <ul className="flex flex-wrap justify-center sm:justify-start gap-x-6 gap-y-2">
          {serviceLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                data-cursor
                className="text-sm text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)] transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

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
