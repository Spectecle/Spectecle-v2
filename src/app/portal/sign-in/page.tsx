"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";

export default function PortalSignInPage() {
  return (
    <Suspense fallback={null}>
      <SignInForm />
    </Suspense>
  );
}

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/portal/dashboard";

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const loadedAt = useRef<number | null>(null);
  useEffect(() => {
    loadedAt.current = Date.now();
  }, []);
  const [honey, setHoney] = useState("");

  const inputClass = (hasError: boolean) =>
    `w-full bg-[var(--portal-card)] border ${
      hasError ? "border-rose-500/60" : "border-[var(--portal-border)]"
    } text-[var(--portal-text-primary)] placeholder-[var(--portal-text-faint)] rounded-xl px-4 py-3.5 text-sm transition-all duration-200 focus:border-[#cb7c46]/50 focus:bg-[var(--portal-card-alt)] outline-none`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email");
      return;
    }
    setError("");
    setStatus("submitting");
    try {
      const res = await fetch("/api/portal/auth/request-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, _honey: honey, _ts: loadedAt.current ?? Date.now() }),
      });
      if (res.status === 403) {
        const data = await res.json().catch(() => null);
        if (data?.notRegistered) {
          setStatus("idle");
          setError(data.message ?? "This email doesn't have access to the client portal.");
          return;
        }
      }
      router.push(`/portal/check-email?next=${encodeURIComponent(next)}`);
    } catch {
      setStatus("idle");
      setError("Something went wrong — please try again.");
    }
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(198,153,71,0.12) 0%, transparent 70%)" }}
      />
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="glass border border-[var(--portal-border)] p-8 md:p-10">
          <div className="w-12 h-12 bg-[#cb7c46]/10 flex items-center justify-center mb-6">
            <Mail className="w-5 h-5 text-[#cb7c46]" />
          </div>
          <h1
            className="text-2xl font-bold text-[var(--portal-text-primary)] mb-1"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            The Loop
          </h1>
          <p className="text-[var(--portal-text-muted)] text-sm mb-8">
            Enter your email and we&apos;ll send you a sign-in link — no password needed.
          </p>

          {/* Honeypot lives outside the <form> so form-level autofill can't
              associate it with this form's fillable fields. */}
          <div style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }} aria-hidden="true">
            <input
              type="text"
              name="hp_confirm_field"
              tabIndex={-1}
              autoComplete="off"
              value={honey}
              onChange={(e) => setHoney(e.target.value)}
            />
          </div>
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--portal-text-secondary)] mb-2 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
                placeholder="you@company.com"
                className={inputClass(!!error)}
                autoFocus
              />
              {error && <p className="mt-1.5 text-sm text-rose-400">{error}</p>}
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn-primary w-full flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? (
                <>
                  <span className="relative z-10">Sending link...</span>
                  <motion.div
                    className="relative z-10 w-4 h-4 border-2 border-white/30 border-t-white"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  />
                </>
              ) : (
                <>
                  <span>Send Sign-In Link</span>
                  <ArrowUpRight className="w-4 h-4 relative z-10" />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
