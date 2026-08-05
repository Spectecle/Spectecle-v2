"use client";

import { motion } from "framer-motion";
import { MailCheck } from "lucide-react";

export default function CheckEmailPage() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(198,153,71,0.12) 0%, transparent 70%)" }}
      />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md text-center glass border border-[var(--portal-border)] p-10"
      >
        <div className="w-16 h-16 mx-auto bg-[#c69947]/10 flex items-center justify-center mb-6">
          <MailCheck className="w-7 h-7 text-[#c69947]" />
        </div>
        <h1
          className="text-2xl font-bold text-[var(--portal-text-primary)] mb-3"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Check your email
        </h1>
        <p className="text-[var(--portal-text-secondary)] text-sm leading-relaxed">
          If that email is registered, a sign-in link is on its way. It expires in 15
          minutes and can only be used once.
        </p>
      </motion.div>
    </section>
  );
}
