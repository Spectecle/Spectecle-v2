"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await fetch("/api/portal/auth/sign-out", { method: "POST" });
    router.push("/portal/sign-in");
    router.refresh();
  };

  return (
    <button
      onClick={handleSignOut}
      className="flex items-center gap-1.5 text-sm text-[var(--portal-text-secondary)] hover:text-[var(--portal-text-primary)] transition-colors cursor-pointer"
    >
      <LogOut className="w-3.5 h-3.5" />
      Sign Out
    </button>
  );
}
