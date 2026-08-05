import { ImageIcon } from "lucide-react";

export function ImagePlaceholder({ className = "", label }: { className?: string; label?: string }) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-2 bg-[var(--site-surface)] border border-dashed border-[var(--site-border)] ${className}`}
    >
      <ImageIcon className="w-6 h-6 text-[var(--site-text-muted)]" strokeWidth={1.5} />
      <span className="text-[10px] text-[var(--site-text-muted)] uppercase tracking-widest text-center px-4">
        {label ?? "Image placeholder"}
      </span>
    </div>
  );
}
