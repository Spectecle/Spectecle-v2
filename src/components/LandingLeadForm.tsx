"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { trackEvent } from "@/lib/track";

const budgetOptions = ["$1,000 – $5,000", "$5,000 – $10,000", "$10,000 – $15,000", "Enterprise", "Not Sure"];

const inputClass = (hasError: boolean) =>
  `w-full bg-[var(--site-bg)] border ${
    hasError ? "border-rose-400" : "border-[var(--site-border)]"
  } text-[var(--site-text-primary)] placeholder-[var(--site-text-muted)] px-4 py-3 text-sm transition-all duration-200 focus:border-[#9a5423] outline-none`;

/**
 * A compact, self-contained lead form for a paid-traffic landing page —
 * lives directly in the hero (and can be repeated further down the page)
 * instead of sending visitors to /contact. Posts to the same /api/contact
 * endpoint as the main contact form (same spam/rate-limit protection, same
 * internal notification + auto-reply), tagged with `source` and `pagePath`
 * so landing-page leads are distinguishable from generic site inquiries.
 */
export function LandingLeadForm({
  id,
  pagePath,
  source,
  heading = "Get Your Free Quote",
  subheading = "Tell us a bit about your business. We reply within one business day.",
}: {
  id?: string;
  pagePath: string;
  source: string;
  heading?: string;
  subheading?: string;
}) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", businessType: "", budget: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  // Captured in an effect (after render) rather than during render itself,
  // so this stays a pure component — Date.now() is impure and React flags
  // calling it directly in the render body.
  const loadedAt = useRef<number | null>(null);
  useEffect(() => {
    loadedAt.current = Date.now();
  }, []);
  const [honey, setHoney] = useState("");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Enter a valid email";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      const message = `New lead from the ${source} landing page.\nBusiness type: ${
        formData.businessType.trim() || "Not specified"
      }\nPhone: ${formData.phone.trim() || "Not provided"}\nRequesting a free quote / strategy call.`;

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          businessType: formData.businessType || undefined,
          budget: formData.budget || undefined,
          message,
          source,
          _honey: honey,
          // Fail closed: if this fires before the mount effect ran (should
          // never happen for a real visitor), default to "now" so the
          // timing check flags it as too-fast rather than skipping it.
          _ts: loadedAt.current ?? Date.now(),
        }),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) trackEvent("contact_submit", { page_path: pagePath, source });
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  return (
    <div id={id} className="border border-[var(--site-border)] bg-[var(--site-surface)] p-7 md:p-8 scroll-mt-28">
      {/* Honeypot lives outside the <form> — see /contact for why. */}
      <div style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }} aria-hidden="true">
        <input type="text" name="hp_confirm_field" tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} />
      </div>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
            <CheckCircle2 className="w-9 h-9 text-[#9a5423] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[var(--site-text-primary)] mb-2">Request received.</h3>
            <p className="text-[var(--site-text-secondary)] text-sm">
              We&apos;ll reply within one business day with honest advice, no hard sell. Check{" "}
              <span className="text-[#9a5423]">{formData.email}</span> for a confirmation.
            </p>
          </motion.div>
        ) : (
          <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSubmit} noValidate className="space-y-3.5">
            <div>
              <h3 className="text-xl font-semibold text-[var(--site-text-primary)]">{heading}</h3>
              <p className="text-[var(--site-text-muted)] text-sm mt-1">{subheading}</p>
            </div>

            <div>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full name *"
                className={inputClass(!!errors.name)}
              />
              {errors.name && <p className="mt-1 text-xs text-rose-400">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email *"
                  className={inputClass(!!errors.email)}
                />
                {errors.email && <p className="mt-1 text-xs text-rose-400">{errors.email}</p>}
              </div>
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone (optional)"
                className={inputClass(false)}
              />
            </div>

            <input
              name="businessType"
              type="text"
              value={formData.businessType}
              onChange={handleChange}
              placeholder="Business type (e.g. Law Firm, Dental Practice)"
              className={inputClass(false)}
            />

            <select name="budget" value={formData.budget} onChange={handleChange} className={`${inputClass(false)} cursor-pointer`}>
              <option value="">Budget range (optional)</option>
              {budgetOptions.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>

            {status === "error" && (
              <p className="text-rose-400 text-sm text-center py-1">
                Something went wrong. Email us directly at{" "}
                <a href="mailto:hello@spectecle.com" className="underline">hello@spectecle.com</a>.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn-primary w-full flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center gap-2">
                {status === "submitting" ? "Sending…" : "Get My Free Quote"}
                {status !== "submitting" && <ArrowUpRight className="w-4 h-4" />}
              </span>
            </button>

            <p className="text-center text-[11px] text-[var(--site-text-muted)]">
              No hard sell, ever. By submitting you agree to our{" "}
              <Link href="/privacy" className="underline underline-offset-2">Privacy Policy</Link>.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
