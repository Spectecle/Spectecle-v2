"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/track";

/** GA4's automatic page_view (send_page_view, disabled in layout.tsx) only
 * fires once per hard load, which undercounts client-side route changes in
 * this app. Firing it manually on every pathname change (including the
 * first) keeps GA4's page view counts accurate for a Next.js app. */
export default function GA4PageViewTracker() {
  const pathname = usePathname();

  useEffect(() => {
    trackEvent("page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  return null;
}
