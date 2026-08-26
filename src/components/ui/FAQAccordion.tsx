"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

export type FAQItem = { q: string; a: string };

export function FAQAccordion({ faqs }: { faqs: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-[var(--site-border)]">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={faq.q}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-6 py-6 text-left cursor-pointer group"
              aria-expanded={isOpen}
            >
              <h3 className="text-[var(--site-text-primary)] font-semibold group-hover:text-[#9a5423] transition-colors">
                {faq.q}
              </h3>
              <Plus
                className={`w-4 h-4 shrink-0 text-[#9a5423] transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                strokeWidth={2.5}
              />
            </button>
            <motion.div
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="text-[var(--site-text-secondary)] text-sm leading-relaxed pb-6 max-w-2xl">
                {faq.a}
              </p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
