"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = true,
  loading = false,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onCancel}
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.15 }}
            role="alertdialog"
            aria-modal="true"
            className="relative w-full max-w-sm bg-[var(--portal-card)] border border-[var(--portal-border-strong)] p-6 shadow-2xl"
          >
            <div className="flex items-start gap-3 mb-5">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  destructive ? "bg-rose-500/10" : "bg-[#c69947]/10"
                }`}
              >
                <AlertTriangle
                  className={`w-4.5 h-4.5 ${destructive ? "text-rose-400" : "text-[#c69947]"}`}
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[var(--portal-text-primary)]">{title}</h3>
                <p className="text-xs text-[var(--portal-text-secondary)] mt-1.5 leading-relaxed">
                  {message}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onCancel}
                className="text-xs font-medium text-[var(--portal-text-secondary)] hover:text-[var(--portal-text-primary)] px-3 py-2 cursor-pointer transition-colors"
              >
                {cancelLabel}
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={loading}
                className={`text-xs font-medium rounded-lg px-3 py-2 cursor-pointer disabled:opacity-60 transition-colors ${
                  destructive
                    ? "bg-rose-500/15 text-rose-400 hover:bg-rose-500/25"
                    : "bg-[#c69947]/15 text-[#c69947] hover:bg-[#c69947]/25"
                }`}
              >
                {loading ? "Working…" : confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
