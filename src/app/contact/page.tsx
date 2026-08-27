"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ProofGallery } from "@/components/ui/ProofGallery";
import { trackEvent } from "@/lib/track";
import {
  Mail,
  Phone,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@spectecle.com", href: "mailto:hello@spectecle.com" },
  { icon: Phone, label: "Phone", value: "+1 (313) 353-4105", href: "tel:+13133534105" },
];

const budgetOptions = ["Under $5,000", "$5,000 – $15,000", "$15,000 – $50,000", "$50,000+", "Not sure yet"];

const serviceOptions = ["Web Design & Development", "SEO & Digital Marketing", "AI & Automation", "All Three", "Something Else"];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "", email: "", company: "", service: "", budget: "", message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const loadedAt = useRef(Date.now());
  const [honey, setHoney] = useState("");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Enter a valid email";
    if (!formData.message.trim()) e.message = "Tell us about your project";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, _honey: honey, _ts: loadedAt.current }),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) trackEvent("contact_submit", { page_path: "/contact" });
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const inputClass = (field: string) =>
    `w-full bg-transparent border-b ${
      errors[field] ? "border-rose-400" : "border-[var(--site-border)]"
    } text-[var(--site-text-primary)] placeholder-[var(--site-text-muted)] px-0 py-3 text-sm transition-all duration-200 focus:border-[#9a5423] outline-none`;

  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="pt-[176px] pb-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-[0.25em]">
            Serving Businesses Nationwide
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-6xl md:text-7xl font-light text-[var(--site-text-primary)] leading-[1.05]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Let&apos;s build something <span className="italic text-[#9a5423]">that actually works.</span>
          </motion.h1>
          <p className="mt-6 text-[var(--site-text-secondary)] text-lg max-w-xl mx-auto leading-relaxed">
            Tell us about your goals. We&apos;ll get back to you with honest advice
            and a clear plan, wherever you&apos;re located.
          </p>
        </div>
      </section>

      {/* ── FORM + INFO ──────────────────────────────── */}
      <section className="pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-16 items-start">
          <div className="lg:col-span-3">
            {/* Honeypot lives outside the <form> so browser/password-manager
                autofill — which can populate hidden fields inside a form
                regardless of visibility or name — has no form to associate
                it with. Value is still wired into handleSubmit via state. */}
            <div style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }} aria-hidden="true">
              <input type="text" name="hp_confirm_field" tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} />
            </div>
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center"
                >
                  <CheckCircle2 className="w-10 h-10 text-[#9a5423] mx-auto mb-6" />
                  <h2 className="text-3xl font-light text-[var(--site-text-primary)] mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                    Message Received!
                  </h2>
                  <p className="text-[var(--site-text-secondary)] mb-2">
                    Thank you for reaching out. We&apos;ll review your message and get back to you shortly.
                  </p>
                  <p className="text-[var(--site-text-muted)] text-sm mb-10">
                    Check your inbox. A confirmation is on its way to{" "}
                    <span className="text-[#9a5423]">{formData.email}</span>.
                  </p>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setFormData({ name: "", email: "", company: "", service: "", budget: "", message: "" });
                    }}
                    className="text-[#9a5423] text-sm font-medium border-b border-[#9a5423] pb-0.5 cursor-pointer"
                  >
                    ← Send another message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-7"
                  noValidate
                >
                  <div>
                    <h2 className="text-3xl font-light text-[var(--site-text-primary)] mb-1" style={{ fontFamily: "var(--font-serif)" }}>
                      Start a conversation
                    </h2>
                    <p className="text-[var(--site-text-muted)] text-sm">
                      A quick question or a full project brief, both are welcome.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-medium text-[var(--site-text-secondary)] mb-2 uppercase tracking-wider">
                        Full Name <span className="text-rose-400">*</span>
                      </label>
                      <input name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Jane Smith" className={inputClass("name")} />
                      {errors.name && <p className="mt-1.5 text-xs text-rose-400">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--site-text-secondary)] mb-2 uppercase tracking-wider">
                        Email <span className="text-rose-400">*</span>
                      </label>
                      <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="jane@company.com" className={inputClass("email")} />
                      {errors.email && <p className="mt-1.5 text-xs text-rose-400">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[var(--site-text-secondary)] mb-2 uppercase tracking-wider">
                      Company Name <span className="text-[var(--site-text-muted)] normal-case tracking-normal">(optional)</span>
                    </label>
                    <input name="company" type="text" value={formData.company} onChange={handleChange} placeholder="Your Business Name" className={inputClass("company")} />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[var(--site-text-secondary)] mb-2 uppercase tracking-wider">
                      Service Interest
                    </label>
                    <select name="service" value={formData.service} onChange={handleChange} className={`${inputClass("service")} cursor-pointer`}>
                      <option value="" disabled>Select a service</option>
                      {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[var(--site-text-secondary)] mb-2 uppercase tracking-wider">
                      What&apos;s on Your Mind? <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Tell us about your goals, questions, or challenges."
                      className={`${inputClass("message")} resize-none`}
                    />
                    {errors.message && <p className="mt-1.5 text-xs text-rose-400">{errors.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[var(--site-text-secondary)] mb-2 uppercase tracking-wider">
                      Budget Range <span className="text-[var(--site-text-muted)] normal-case tracking-normal">(optional)</span>
                    </label>
                    <select name="budget" value={formData.budget} onChange={handleChange} className={`${inputClass("budget")} cursor-pointer`}>
                      <option value="" disabled>Select a range, or skip if unsure</option>
                      {budgetOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>

                  {status === "error" && (
                    <p className="text-rose-400 text-sm text-center py-2">
                      Something went wrong. Please try again or email us directly at{" "}
                      <a href="mailto:hello@spectecle.com" className="underline">hello@spectecle.com</a>.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-primary w-full flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? (
                      <>
                        <span className="relative z-10">Sending...</span>
                        <motion.div
                          className="relative z-10 w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        />
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowUpRight className="w-4 h-4 relative z-10" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-[var(--site-text-muted)]">
                    By submitting this form you agree to our{" "}
                    <Link href="/privacy" className="underline underline-offset-2">Privacy Policy</Link>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Info */}
          <div className="lg:col-span-2 space-y-8">
            <Reveal delay={0.1}>
              <h3 className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest mb-5">Contact Details</h3>
              <div className="space-y-4">
                {contactInfo.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    onClick={() => { if (c.label === "Phone") trackEvent("phone_click", { page_path: "/contact" }); }}
                    className="flex items-center gap-3 group cursor-pointer"
                  >
                    <c.icon className="w-4 h-4 text-[#9a5423] shrink-0" />
                    <div>
                      <span className="text-xs text-[var(--site-text-muted)] uppercase tracking-wider mr-2">{c.label}</span>
                      <span className="text-sm text-[var(--site-text-secondary)] group-hover:text-[var(--site-text-primary)] transition-colors">{c.value}</span>
                    </div>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── WHY SPECTECLE ────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <span className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest">Why Reach Out</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-light text-[var(--site-text-primary)]" style={{ fontFamily: "var(--font-serif)" }}>
              No pressure. Just honest advice.
            </h2>
            <p className="mt-4 text-[var(--site-text-secondary)] text-base max-w-xl mx-auto leading-relaxed">
              Our strategy calls aren&apos;t sales pitches. We listen, we assess your
              situation honestly, and we tell you exactly what we&apos;d do and what it would
              cost. If we&apos;re not the right fit, we&apos;ll say so.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── PROOF GALLERY ────────────────────────────── */}
      <section className="py-14 px-6 border-t border-[var(--site-border)]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <ProofGallery
              slugs={["dearborn-cleaners", "vue-optometry", "indoor-garden"]}
              heading="Businesses like yours, already growing"
              subheading="A few recent projects: real sites, real clients, real results."
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
