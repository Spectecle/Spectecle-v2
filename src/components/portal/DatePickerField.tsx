"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function parseISODate(value: string): Date | null {
  if (!value) return null;
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function DatePickerField({
  value,
  onChange,
  error,
  placeholder = "Select a date",
}: {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const selected = parseISODate(value);
  const [viewDate, setViewDate] = useState(() => selected ?? new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const isSelected = (day: number) =>
    !!selected &&
    selected.getFullYear() === year &&
    selected.getMonth() === month &&
    selected.getDate() === day;

  const isToday = (day: number) => {
    const t = new Date();
    return t.getFullYear() === year && t.getMonth() === month && t.getDate() === day;
  };

  const handleSelectDay = (day: number) => {
    onChange(toISODate(new Date(year, month, day)));
    setOpen(false);
  };

  const displayValue = selected
    ? selected.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "";

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between bg-[var(--portal-card)] border ${
          error ? "border-rose-500/60" : "border-[var(--portal-border)]"
        } text-[var(--portal-text-primary)] rounded-xl px-4 py-3.5 text-sm transition-all duration-200 focus:border-[#cb7c46]/50 outline-none cursor-pointer`}
      >
        <span className={displayValue ? "text-[var(--portal-text-primary)]" : "text-[var(--portal-text-faint)]"}>
          {displayValue || placeholder}
        </span>
        <Calendar className="w-4 h-4 text-[var(--portal-text-muted)] shrink-0" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute z-20 mt-2 w-72 bg-[var(--portal-card)] border border-[var(--portal-border-strong)] shadow-2xl p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={() => setViewDate(new Date(year, month - 1, 1))}
                className="p-1.5 text-[var(--portal-text-secondary)] hover:text-[var(--portal-text-primary)] hover:bg-[var(--portal-border)] cursor-pointer"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm font-medium text-[var(--portal-text-primary)]">
                {MONTH_NAMES[month]} {year}
              </span>
              <button
                type="button"
                onClick={() => setViewDate(new Date(year, month + 1, 1))}
                className="p-1.5 text-[var(--portal-text-secondary)] hover:text-[var(--portal-text-primary)] hover:bg-[var(--portal-border)] cursor-pointer"
                aria-label="Next month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-1">
              {WEEKDAYS.map((d, i) => (
                <div key={i} className="text-center text-xs text-[var(--portal-text-muted)] font-medium py-1">
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {cells.map((day, i) =>
                day === null ? (
                  <div key={i} />
                ) : (
                  <button
                    type="button"
                    key={i}
                    onClick={() => handleSelectDay(day)}
                    className={`aspect-square rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      isSelected(day)
                        ? "bg-[#cb7c46] text-[#1e1e1e]"
                        : isToday(day)
                        ? "bg-[#cb7c46]/15 text-[#cb7c46]"
                        : "text-[var(--portal-text-secondary)] hover:bg-[var(--portal-border-strong)]"
                    }`}
                  >
                    {day}
                  </button>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
