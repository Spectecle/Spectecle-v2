import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PricingSection } from "@/components/PricingSection";

export default function PricingPage() {
  return (
    <div className="relative min-h-screen">
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="pt-40 pb-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-[0.25em]">
            Simple, Predictable Pricing
          </span>
          <h1
            className="mt-6 text-6xl md:text-7xl font-light text-[var(--site-text-primary)] leading-[1.05]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Plans built to <span className="italic text-[#c69947]">grow with your business.</span>
          </h1>
          <p className="mt-6 text-[var(--site-text-secondary)] leading-relaxed max-w-xl mx-auto text-lg">
            Two simple steps: choose a one-time design investment to get your website built,
            then choose an ongoing care plan to keep it growing: hosting, content, SEO, and
            support, priced separately from the build.
          </p>
        </div>
      </section>

      <PricingSection />

      {/* ── CTA ─────────────────────────────────────── */}
      <section className="py-32 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">
            Not Sure Which Plan Fits?
          </span>
          <h2
            className="mt-4 text-4xl md:text-5xl font-light text-[var(--site-text-primary)]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Let&apos;s talk it through.
          </h2>
          <p className="mt-4 text-[var(--site-text-secondary)] text-lg max-w-lg mx-auto">
            Tell us about your business and we&apos;ll recommend the right plan. No pressure,
            no obligation.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/contact"
              className="btn-primary flex items-center gap-2 px-7 py-3.5 text-sm font-semibold cursor-pointer"
            >
              <span>Contact Us</span>
              <ArrowUpRight className="w-4 h-4 relative z-10" />
            </Link>
            <Link
              href="/"
              className="text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)] text-sm transition-colors cursor-pointer"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
