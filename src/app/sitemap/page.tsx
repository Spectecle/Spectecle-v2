import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/app/work/projects-data";
import { posts } from "@/app/blog/posts-data";

export const metadata: Metadata = {
  title: "Sitemap",
  description: "Every page on spectecle.com in one place.",
};

const mainPages = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

const services = [
  { label: "Web Design & Development", href: "/services/web-design-detroit" },
  { label: "Web Design & Development: Birmingham, MI", href: "/services/web-design-birmingham-mi" },
  { label: "SEO Agency Detroit", href: "/services/seo-agency-detroit" },
  { label: "AI & Automation", href: "/services/ai-automation" },
  { label: "Law Firm Website Design", href: "/services/law-firm-website-design" },
  { label: "Medical Website Design", href: "/services/medical-website-design" },
  { label: "The Loop", href: "/services/the-loop" },
];

const legal = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "The Loop (Client Portal)", href: "/portal" },
];

function LinkList({ links, className = "space-y-1" }: { links: { label: string; href: string }[]; className?: string }) {
  return (
    <ul className={className}>
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="group flex items-center justify-between gap-3 py-2 text-sm text-[var(--site-text-secondary)] hover:text-[#9a5423] transition-colors"
          >
            <span>{link.label}</span>
            <ArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Category({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div className="border border-[var(--site-border)] p-7">
      <p className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest mb-4">
        {title}
      </p>
      <LinkList links={links} />
    </div>
  );
}

export default function SitemapPage() {
  const caseStudies = projects.map((p) => ({ label: p.title, href: `/work/${p.slug}` }));
  const blogPosts = posts.map((p) => ({ label: p.title, href: `/blog/${p.slug}` }));

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(198,153,71,0.08) 0%, transparent 70%)" }}
      />

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative pt-[176px] pb-10 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="inline-flex items-center gap-2 px-4 py-2 border border-[#9a5423]/20 text-sm text-[#9a5423] font-medium">
            <span className="w-2 h-2 bg-[#9a5423]" />
            Site Map
          </h1>
        </div>
      </section>

      {/* ── MAIN CATEGORIES ───────────────────────────── */}
      <section className="px-6 pb-8">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-6">
          <Category title="Main Pages" links={mainPages} />
          <Category title="Services" links={services} />
          <Category title="Legal & Portal" links={legal} />
        </div>
      </section>

      {/* ── CASE STUDIES ──────────────────────────────── */}
      <section className="px-6 pb-8">
        <div className="max-w-5xl mx-auto border border-[var(--site-border)] p-7">
          <p className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest mb-4">
            Case Studies
          </p>
          <LinkList links={caseStudies} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8" />
        </div>
      </section>

      {/* ── BLOG POSTS ────────────────────────────────── */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto border border-[var(--site-border)] p-7">
          <p className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest mb-4">
            From the Journal
          </p>
          <LinkList links={blogPosts} className="grid sm:grid-cols-2 gap-x-8" />
        </div>
      </section>
    </div>
  );
}
