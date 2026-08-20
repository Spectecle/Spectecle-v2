import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import { getSession } from "@/lib/auth";
import { LogoMark } from "@/components/LogoMark";
import { ThemeToggle } from "@/components/portal/ThemeToggle";
import { SignOutButton } from "@/components/portal/SignOutButton";

export async function PortalHeader() {
  const user = await getSession();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--portal-border)] bg-[var(--portal-surface)]/90 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Link href="/portal" className="flex items-center gap-2 cursor-pointer">
            <LogoMark className="w-7 h-7" />
            <span
              className="text-base font-bold text-[var(--portal-text-primary)]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Spectecle
            </span>
          </Link>
          {user && (
            <Link
              href="/portal"
              className="hidden sm:flex items-center gap-1.5 text-sm text-[var(--portal-text-secondary)] hover:text-[var(--portal-text-primary)] cursor-pointer transition-colors"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Dashboard
            </Link>
          )}
        </div>
        <div className="flex items-center gap-3">
          {user && (
            <span className="text-sm text-[var(--portal-text-muted)] hidden sm:inline">
              {user.email}
            </span>
          )}
          <ThemeToggle />
          {user && <SignOutButton />}
        </div>
      </div>
    </header>
  );
}
