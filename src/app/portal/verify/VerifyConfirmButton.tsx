"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowUpRight } from "lucide-react";

export function VerifyConfirmButton({ token, next }: { token: string; next: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");

  const handleConfirm = async () => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/portal/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      const data = await res.json().catch(() => null);
      router.push(data?.redirectTo ?? next);
      router.refresh();
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <div className="w-16 h-16 mx-auto bg-[#c69947]/10 flex items-center justify-center mb-6">
        <ShieldCheck className="w-7 h-7 text-[#c69947]" />
      </div>
      <h1
        className="text-2xl font-bold text-[var(--portal-text-primary)] mb-3"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        Confirm sign-in
      </h1>
      <p className="text-[var(--portal-text-secondary)] text-sm leading-relaxed mb-8">
        Click below to finish signing in to your Spectecle client portal.
      </p>

      {status === "error" && (
        <p className="text-rose-400 text-sm mb-4">
          Something went wrong — this link may have expired. Please request a new one.
        </p>
      )}

      <button
        onClick={handleConfirm}
        disabled={status === "submitting"}
        className="btn-primary w-full flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? (
          <>
            <span className="relative z-10">Signing in...</span>
            <motion.div
              className="relative z-10 w-4 h-4 border-2 border-white/30 border-t-white"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
          </>
        ) : (
          <>
            <span>Confirm Sign-In</span>
            <ArrowUpRight className="w-4 h-4 relative z-10" />
          </>
        )}
      </button>
    </>
  );
}
