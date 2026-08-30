// Google Ads "Phone call lead" click conversion (AW-18414328207/AR_vCI614-kcEI-z0cxE).
// Fires on every real "tel:" link across the marketing site so Ads can measure
// actual click-to-call leads, not just page views.
//
// If gtag hasn't loaded (blocked by an ad blocker, script failed, etc.) we
// deliberately do nothing and let the native tel: link fire immediately —
// a missed conversion beacon is fine, a blocked phone call is not.
// (window.gtag is already declared globally in src/lib/track.ts.)

export function reportPhoneConversion(
  e: React.MouseEvent<HTMLAnchorElement>,
  url: string
) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return; // let the native tel: link proceed untouched
  }

  e.preventDefault();

  let navigated = false;
  const go = () => {
    if (navigated) return;
    navigated = true;
    window.location.href = url;
  };

  window.gtag("event", "conversion", {
    send_to: "AW-18414328207/AR_vCI614-kcEI-z0cxE",
    event_callback: go,
  });

  // gtag's own event_callback has an internal ~2s cap, but this is a second,
  // independent safety net in case that ever fails to fire.
  setTimeout(go, 2000);
}
