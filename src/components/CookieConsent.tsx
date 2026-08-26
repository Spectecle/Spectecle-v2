"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "spectecle-cookie-consent";

type Consent = "granted" | "denied";

function updateGtagConsent(consent: Consent) {
  const w = window as typeof window & { gtag?: (...args: unknown[]) => void };
  w.gtag?.("consent", "update", {
    analytics_storage: consent,
    ad_storage: consent,
  });
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Consent | null;
    if (stored === "granted") {
      updateGtagConsent("granted");
    } else if (stored !== "denied") {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const choose = (consent: Consent) => {
    localStorage.setItem(STORAGE_KEY, consent);
    if (consent === "granted") updateGtagConsent("granted");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6">
      <div className="max-w-3xl mx-auto bg-[var(--site-bg)] border border-[var(--site-border)] shadow-lg rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <p className="text-sm text-[var(--site-text-secondary)] leading-relaxed flex-1">
          We use cookies to run this site and understand how it&apos;s used, including
          messages sent through our contact form and analytics on how visitors interact
          with our pages. See our{" "}
          <Link href="/privacy" className="underline text-[var(--site-text-primary)]">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => choose("denied")}
            className="text-xs font-semibold uppercase tracking-wider text-[var(--site-text-muted)] hover:text-[var(--site-text-primary)] transition-colors cursor-pointer px-2 py-2"
          >
            Decline
          </button>
          <button
            onClick={() => choose("granted")}
            className="btn-primary text-xs font-semibold uppercase tracking-wider px-5 py-2.5 cursor-pointer"
          >
            <span>Accept</span>
          </button>
        </div>
      </div>
    </div>
  );
}
