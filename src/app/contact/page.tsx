"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ProofGallery } from "@/components/ui/ProofGallery";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

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
  { icon: MapPin, label: "Coverage", value: "United States, Remote", href: "/work" },
];

const budgetOptions = ["Under $5,000", "$5,000 – $15,000", "$15,000 – $50,000", "$50,000+", "Not sure yet"];

const serviceOptions = ["Web Design & Development", "SEO & Digital Marketing", "AI & Automation", "All Three", "Something Else"];

const socials = [
  { Icon: IconX, label: "Twitter / X", handle: "@spectecle", href: "https://x.com/spectecle" },
  { Icon: IconInstagram, label: "Instagram", handle: "@spectecle", href: "https://www.instagram.com/spectecle/" },
  { Icon: IconGithub, label: "GitHub", handle: "Spectecle", href: "https://github.com/Spectecle" },
];

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
    } text-[var(--site-text-primary)] placeholder-[var(--site-text-muted)] px-0 py-3 text-sm transition-all duration-200 focus:border-[#c69947] outline-none`;

  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="pt-40 pb-20 px-6">
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
            Let&apos;s build something <span className="italic text-[#c69947]">that actually works.</span>
          </motion.h1>
          <p className="mt-6 text-[var(--site-text-secondary)] text-lg max-w-xl mx-auto leading-relaxed">
            Tell us about your goals. We&apos;ll get back to you with honest advice
            and a clear plan, wherever you&apos;re located.
          </p>
        </div>
      </section>

      {/* ── FORM + INFO ──────────────────────────────── */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-16 items-start">
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center"
                >
                  <CheckCircle2 className="w-10 h-10 text-[#c69947] mx-auto mb-6" />
                  <h2 className="text-3xl font-light text-[var(--site-text-primary)] mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                    Message Received!
                  </h2>
                  <p className="text-[var(--site-text-secondary)] mb-2">
                    Thank you for reaching out. We&apos;ll review your message and get back to you shortly.
                  </p>
                  <p className="text-[var(--site-text-muted)] text-sm mb-10">
                    Check your inbox. A confirmation is on its way to{" "}
                    <span className="text-[#c69947]">{formData.email}</span>.
                  </p>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setFormData({ name: "", email: "", company: "", service: "", budget: "", message: "" });
                    }}
                    className="text-[#c69947] text-sm font-medium border-b border-[#c69947] pb-0.5 cursor-pointer"
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
                  <div style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }} aria-hidden="true">
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} />
                  </div>
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
          <div className="lg:col-span-2 space-y-12">
            <Reveal delay={0.1}>
              <h3 className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest mb-5">Contact Details</h3>
              <div className="space-y-4">
                {contactInfo.map((c) => (
                  <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined} className="flex items-center gap-3 group cursor-pointer">
                    <c.icon className="w-4 h-4 text-[#c69947] shrink-0" />
                    <div>
                      <span className="text-xs text-[var(--site-text-muted)] uppercase tracking-wider mr-2">{c.label}</span>
                      <span className="text-sm text-[var(--site-text-secondary)] group-hover:text-[var(--site-text-primary)] transition-colors">{c.value}</span>
                    </div>
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <h3 className="text-xs font-semibold text-[var(--site-text-muted)] uppercase tracking-widest mb-5">Follow Us</h3>
              <div className="space-y-3">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)] transition-colors cursor-pointer group">
                    <s.Icon />
                    <span className="text-sm">{s.label}</span>
                    <span className="text-xs text-[var(--site-text-muted)] ml-auto">{s.handle}</span>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── WHY SPECTECLE ────────────────────────────── */}
      <section className="py-24 px-6 border-t border-[var(--site-border)]">
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
      <section className="py-24 px-6 border-t border-[var(--site-border)]">
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
