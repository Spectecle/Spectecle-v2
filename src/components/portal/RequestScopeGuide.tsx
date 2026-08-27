"use client";

import { useState } from "react";
import { ChevronDown, Check, Receipt } from "lucide-react";

const INCLUDED = [
  "Business hours updates",
  "Contact info changes (phone, email, address)",
  "Logo swap or refresh",
  "Business name update",
  "Text or copy edits on existing pages",
  "Photo or image swaps",
  "Price or menu updates",
  "Social link updates",
  "Fixing typos or broken links",
];

const BILLED_SEPARATELY = [
  "Adding a new page",
  "Writing new page content from scratch",
  "New features (booking, e-commerce, forms, integrations)",
  "A full redesign",
  "New photography or custom graphics",
  "SEO content or blog writing",
  "Ongoing ad campaign management",
];

export function RequestScopeGuide({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="glass border border-[var(--portal-border)] overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left cursor-pointer"
      >
        <span className="text-sm font-semibold text-[var(--portal-text-primary)]">
          What counts as a service request?
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[var(--portal-text-faint)] shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="px-5 pb-5 grid sm:grid-cols-2 gap-5 border-t border-[var(--portal-border)] pt-5">
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#cb7c46] mb-3">
              <Check className="w-3.5 h-3.5" />
              Included — small, quick changes
            </p>
            <ul className="space-y-1.5">
              {INCLUDED.map((item) => (
                <li key={item} className="text-sm text-[var(--portal-text-secondary)]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--portal-text-muted)] mb-3">
              <Receipt className="w-3.5 h-3.5" />
              Quoted separately — new scope
            </p>
            <ul className="space-y-1.5">
              {BILLED_SEPARATELY.map((item) => (
                <li key={item} className="text-sm text-[var(--portal-text-faint)]">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
