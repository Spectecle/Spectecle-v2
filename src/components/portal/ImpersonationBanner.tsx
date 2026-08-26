"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Eye, X } from "lucide-react";

export function ImpersonationBanner({ email }: { email: string }) {
  const router = useRouter();
  const [stopping, setStopping] = useState(false);
  const [, startTransition] = useTransition();

  const handleStop = async () => {
    setStopping(true);
    await fetch("/api/portal/admin/impersonate", { method: "DELETE" });
    startTransition(() => {
      router.push("/portal/admin");
      router.refresh();
    });
  };

  return (
    <div className="bg-[#cb7c46] text-white -mx-6 lg:-mx-10 -mt-10 mb-8 px-6 lg:px-10 py-2.5">
      <div className="flex items-start justify-between gap-4 text-sm flex-wrap">
        <span className="flex items-start gap-2 py-0.5">
          <Eye className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <span>
            Viewing as <strong>{email}</strong> — replies or new requests submitted here are still attributed to your admin account.
          </span>
        </span>
        <button
          type="button"
          onClick={handleStop}
          disabled={stopping}
          className="flex items-center gap-1.5 bg-black/15 hover:bg-black/25 px-3 py-1.5 font-semibold cursor-pointer disabled:opacity-60 transition-colors shrink-0"
        >
          <X className="w-3.5 h-3.5" />
          {stopping ? "Exiting…" : "Exit"}
        </button>
      </div>
    </div>
  );
}
