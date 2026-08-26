import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PricingSection } from "@/components/PricingSection";

export default function PricingPage() {
  return (
    <div className="relative min-h-screen">
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="pt-40 pb-10 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1
            className="text-6xl md:text-7xl font-light text-[var(--site-text-primary)] leading-[1.05]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Plans built to <span className="italic text-[#9a5423]">grow with your business.</span>
          </h1>
          <p className="mt-6 text-[var(--site-text-secondary)] leading-relaxed max-w-xl mx-auto text-lg">
            Choose a one-time design investment to get your website built, tailored to the
            level of customization your business needs.
          </p>
        </div>
      </section>

      <PricingSection />

      {/* ── CTA ─────────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-4xl md:text-5xl font-light text-[var(--site-text-primary)]"
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
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--site-text-primary)] border-b border-[var(--site-text-primary)] pb-0.5 cursor-pointer"
            >
              <span>Contact Us</span>
              <ArrowUpRight className="w-4 h-4" />
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
