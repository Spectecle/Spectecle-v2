"use client";

import { Phone } from "lucide-react";
import { trackEvent } from "@/lib/track";
import { reportPhoneConversion } from "@/lib/report-phone-conversion";

/**
 * Landing-page-specific: most local searches for this happen on a phone,
 * and a lot of that traffic would rather tap-to-call than fill a form.
 * Fixed to the bottom on mobile only — desktop already has the phone number
 * in the navbar.
 */
export function StickyMobileCallBar({ pagePath }: { pagePath: string }) {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-[var(--site-border)] bg-[var(--site-bg)]/95 backdrop-blur-sm px-4 py-3">
      <a
        href="tel:+13133534105"
        onClick={(e) => {
          trackEvent("phone_click", { page_path: pagePath });
          reportPhoneConversion(e, "tel:+13133534105");
        }}
        className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 text-sm font-semibold cursor-pointer"
      >
        <span className="relative z-10 flex items-center gap-2">
          <Phone className="w-4 h-4" />
          Call (313) 353-4105
        </span>
      </a>
    </div>
  );
}
