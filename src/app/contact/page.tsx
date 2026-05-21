"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Zap,
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
  {
    icon: Mail,
    label: "Email",
    value: "hello@spectecle.com",
    href: "mailto:hello@spectecle.com",
    color: "text-[#F07A3A]",
    bg: "bg-[#D25124]/10",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (313) 353-4105",
    href: "tel:+13133534105",
    color: "text-[#F07A3A]",
    bg: "bg-[#D25124]/10",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Detroit, MI — Remote Worldwide",
    href: "https://maps.google.com/?q=Detroit,MI",
    color: "text-[#F07A3A]",
    bg: "bg-[#D25124]/10",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "Within 24 hours",
    href: "#",
    color: "text-[#F07A3A]",
    bg: "bg-[#D25124]/10",
  },
];

const budgetOptions = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Not sure yet",
];

const serviceOptions = [
  "Web Design & Development",
  "SEO & Digital Marketing",
  "AI & Automation",
  "All Three",
  "Something Else",
];

const guarantees = [
  "Free 30-min strategy call — no commitment",
  "Response within 24 hours, guaranteed",
  "NDA available on request",
  "Honest advice, even if we're not the right fit",
];

const socials = [
  { Icon: IconX, label: "Twitter / X", handle: "@spectecle", href: "https://x.com/spectecle" },
  { Icon: IconInstagram, label: "Instagram", handle: "@spectecle", href: "https://www.instagram.com/spectecle/" },
  { Icon: IconGithub, label: "GitHub", handle: "Spectecle", href: "https://github.com/Spectecle" },
];

const whoWeHelp = [
  "Local service businesses in Metro Detroit",
  "Law firms, clinics & professional services",
  "E-commerce brands scaling online",
  "Startups & established companies nationwide",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
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
    `w-full bg-[#0e0e1a] border ${
      errors[field] ? "border-rose-500/60" : "border-white/8"
    } text-white placeholder-slate-600 rounded-xl px-4 py-3.5 text-sm transition-all duration-200 focus:border-[#D25124]/50 focus:bg-[#1a0d08] outline-none`;

  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse, rgba(210,81,36,0.12) 0%, transparent 70%)" }}
        />
        <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#D25124]/20 text-sm text-[#F07A3A] font-medium mb-8"
          >
            <Zap className="w-3.5 h-3.5" />
            Detroit, MI — Remote Worldwide
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-6xl xl:text-7xl font-bold text-white leading-tight"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Let&apos;s Build Something
            <br />
            <span className="gradient-text">That Actually Works</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-6 text-slate-400 text-lg max-w-xl mx-auto leading-relaxed"
          >
            Tell us about your goals. We&apos;ll respond within 24 hours with honest advice
            and a clear plan — whether you&apos;re in Detroit or anywhere in the world.
          </motion.p>
        </div>
      </section>

      {/* ── FORM + INFO ──────────────────────────────── */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-12 items-start">

          {/* ─ Left: Form ─ */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass rounded-2xl border border-[#D25124]/20 p-16 text-center"
                >
                  <div className="w-20 h-20 mx-auto rounded-full bg-[#D25124]/10 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-[#F07A3A]" />
                  </div>
                  <h2
                    className="text-3xl font-bold text-white mb-4"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    Message Received!
                  </h2>
                  <p className="text-slate-400 mb-2">
                    Thank you for reaching out. We&apos;ll review your message and respond
                    within 24 hours.
                  </p>
                  <p className="text-slate-500 text-sm mb-10">
                    Check your inbox — a confirmation is on its way to{" "}
                    <span className="text-[#F07A3A]">{formData.email}</span>.
                  </p>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setFormData({ name: "", email: "", company: "", service: "", budget: "", message: "" });
                    }}
                    className="text-[#F07A3A] hover:text-[#D25124] text-sm font-medium transition-colors cursor-pointer"
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
                  className="glass rounded-2xl border border-white/8 p-8 md:p-10 space-y-5"
                  noValidate
                >
                  {/* Honeypot — hidden from real users, bots fill it in */}
                  <div style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }} aria-hidden="true">
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honey}
                      onChange={(e) => setHoney(e.target.value)}
                    />
                  </div>
                  <div>
                    <h2
                      className="text-2xl font-bold text-white mb-1"
                      style={{ fontFamily: "var(--font-inter)" }}
                    >
                      Tell us about your project
                    </h2>
                    <p className="text-slate-500 text-sm">
                      Based in Detroit — working with businesses everywhere. Fill in the details
                      and we&apos;ll be in touch.
                    </p>
                  </div>

                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                        Full Name <span className="text-rose-400">*</span>
                      </label>
                      <input
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jane Smith"
                        className={inputClass("name")}
                      />
                      {errors.name && <p className="mt-1.5 text-xs text-rose-400">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                        Email <span className="text-rose-400">*</span>
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jane@company.com"
                        className={inputClass("email")}
                      />
                      {errors.email && <p className="mt-1.5 text-xs text-rose-400">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                      Company Name{" "}
                      <span className="text-slate-600 normal-case tracking-normal">(optional)</span>
                    </label>
                    <input
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Business Name"
                      className={inputClass("company")}
                    />
                  </div>

                  {/* Service + Budget */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                        Service Interest
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className={`${inputClass("service")} cursor-pointer`}
                      >
                        <option value="" disabled>Select a service</option>
                        {serviceOptions.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                        Budget Range
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className={`${inputClass("budget")} cursor-pointer`}
                      >
                        <option value="" disabled>Select a range</option>
                        {budgetOptions.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                      Project Brief <span className="text-rose-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Tell us about your project goals, current challenges, and what success looks like for you..."
                      className={`${inputClass("message")} resize-none`}
                    />
                    {errors.message && <p className="mt-1.5 text-xs text-rose-400">{errors.message}</p>}
                  </div>

                  {/* Submit */}
                  {status === "error" && (
                    <p className="text-rose-400 text-sm text-center py-2">
                      Something went wrong — please try again or email us directly at{" "}
                      <a href="mailto:hello@spectecle.com" className="underline">hello@spectecle.com</a>.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-primary w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
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

                  <p className="text-center text-xs text-slate-600">
                    By submitting this form you agree to our{" "}
                    <Link
                      href="/privacy"
                      className="text-slate-500 hover:text-white transition-colors cursor-pointer underline underline-offset-2"
                    >
                      Privacy Policy
                    </Link>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* ─ Right: Info ─ */}
          <div className="lg:col-span-2 space-y-5">

            {/* Contact Details */}
            <Reveal delay={0.1}>
              <div className="glass rounded-2xl border border-white/8 p-7 space-y-5">
                <h3
                  className="text-lg font-bold text-white"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Contact Details
                </h3>
                {contactInfo.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 group cursor-pointer"
                  >
                    <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center shrink-0`}>
                      <c.icon className={`w-4 h-4 ${c.color}`} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-0.5">{c.label}</p>
                      <p className="text-sm text-slate-300 group-hover:text-white transition-colors">{c.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </Reveal>

            {/* Who We Help */}
            <Reveal delay={0.14}>
              <div className="glass rounded-2xl border border-white/8 p-7">
                <h3
                  className="text-lg font-bold text-white mb-5"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Who We Work With
                </h3>
                <div className="space-y-3">
                  {whoWeHelp.map((g) => (
                    <div key={g} className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-[#F07A3A] shrink-0" />
                      {g}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* What to Expect */}
            <Reveal delay={0.18}>
              <div className="glass rounded-2xl border border-white/8 p-7">
                <h3
                  className="text-lg font-bold text-white mb-5"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  What to Expect
                </h3>
                <div className="space-y-3">
                  {guarantees.map((g) => (
                    <div key={g} className="flex items-center gap-3 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-[#F07A3A] shrink-0" />
                      {g}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Follow Us */}
            <Reveal delay={0.22}>
              <div className="glass rounded-2xl border border-white/8 p-7">
                <h3
                  className="text-lg font-bold text-white mb-5"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Follow Us
                </h3>
                <div className="space-y-3">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors cursor-pointer group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-[#D25124]/15 transition-colors">
                        <s.Icon />
                      </div>
                      <span className="text-sm">{s.label}</span>
                      <span className="text-xs text-slate-600 ml-auto">{s.handle}</span>
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── WHY SPECTECLE ────────────────────────────── */}
      <section className="py-20 px-6 border-t border-white/6 bg-[#09090f]">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <span className="text-xs font-semibold text-[#F07A3A] uppercase tracking-widest">
              Why Reach Out
            </span>
            <h2
              className="mt-3 text-3xl md:text-4xl font-bold text-white"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              No pressure. Just honest advice.
            </h2>
            <p className="mt-4 text-slate-400 text-base max-w-xl mx-auto leading-relaxed">
              Our free strategy calls aren&apos;t sales pitches. We listen, we assess your
              situation honestly, and we tell you exactly what we&apos;d do — and what it would
              cost. If we&apos;re not the right fit, we&apos;ll say so.
            </p>
          </Reveal>

          <div className="mt-12 grid sm:grid-cols-3 gap-5">
            {[
              { value: "24 hrs", label: "Guaranteed response time" },
              { value: "Free", label: "Strategy call, no strings attached" },
              { value: "100%", label: "Transparent pricing, no surprises" },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div className="glass rounded-2xl p-6 border border-white/6 hover:border-[#D25124]/20 transition-colors duration-300">
                  <div
                    className="text-2xl font-bold gradient-text mb-2"
                    style={{ fontFamily: "var(--font-inter)" }}
                  >
                    {stat.value}
                  </div>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
