declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Fires a GA4 custom event. Google's Consent Mode (wired in layout.tsx +
 * CookieConsent) governs whether this actually gets collected — no need to
 * check consent here. */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
}
