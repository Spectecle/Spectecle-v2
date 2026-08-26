import Link from "next/link";

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "Instagram", href: "https://www.instagram.com/spectecle/" },
  { label: "LinkedIn", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--site-border)] px-6 py-10 sm:py-14 flex flex-wrap items-center justify-between gap-6">
      <span className="text-[13px] font-semibold uppercase tracking-[0.42em] text-[var(--site-text-primary)]">
        Spectecle
      </span>

      <nav className="flex flex-wrap gap-6 sm:gap-7" aria-label="Footer">
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

      <span className="text-xs tracking-wide text-[var(--site-text-muted)]">
        © {new Date().getFullYear()} Spectecle · Metro Detroit
      </span>
    </footer>
  );
}
