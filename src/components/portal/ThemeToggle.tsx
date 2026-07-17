"use client";

import { Sun, Moon } from "lucide-react";
import { usePortalTheme } from "@/components/portal/PortalThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = usePortalTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      className="p-2 rounded-lg text-[var(--portal-text-secondary)] hover:text-[var(--portal-text-primary)] hover:bg-[var(--portal-border)] cursor-pointer transition-colors"
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
