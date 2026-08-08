"use client";

import { Contrast } from "lucide-react";
import { useSiteTheme } from "@/components/SiteThemeProvider";

export function SiteThemeToggle() {
  const { theme, toggle } = useSiteTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      className="p-2 text-[var(--site-text-secondary)] hover:text-[var(--site-text-primary)] cursor-pointer transition-colors"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Contrast className="w-5 h-5" />
    </button>
  );
}
