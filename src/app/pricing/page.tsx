import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PricingSection } from "@/components/PricingSection";

export default function PricingPage() {
  return (
    <div className="relative min-h-screen">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(210,81,36,0.1) 0%, transparent 70%)" }}
      />

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative pt-40 pb-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#D25124]/20 text-sm text-[#F07A3A] font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-[#F07A3A]" />
            Simple, Predictable Pricing
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Plans built to grow with your business
          </h1>
          <p className="mt-6 text-slate-400 leading-relaxed max-w-xl mx-auto text-base">
            Two simple steps: choose a one-time design investment to get your website built,
            then choose an ongoing care plan to keep it growing — hosting, content, SEO, and
            support, priced separately from the build.
          </p>
        </div>
      </section>

      <PricingSection />

      {/* ── CTA ─────────────────────────────────────── */}
      <section className="py-20 px-6 border-t border-white/6 bg-[#09090f]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-slate-500 text-sm uppercase tracking-widest mb-4">
            Not Sure Which Plan Fits?
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold text-white"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Let&apos;s talk it through.
          </h2>
          <p className="mt-4 text-slate-400 text-base max-w-lg mx-auto">
            Tell us about your business and we&apos;ll recommend the right plan — no pressure,
            no obligation.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="btn-primary flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold cursor-pointer"
            >
              <span>Contact Us</span>
              <ArrowUpRight className="w-4 h-4 relative z-10" />
            </Link>
            <Link
              href="/"
              className="text-slate-400 hover:text-white text-sm transition-colors cursor-pointer"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
