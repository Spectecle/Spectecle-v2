"use client";

import { Paperclip, CheckCircle2, AlertCircle, Loader2, X } from "lucide-react";
import { ALLOWED_UPLOAD_EXTENSIONS } from "@/lib/uploads";
import type { UploadItem } from "@/hooks/useFileUploads";

export function FileUploadField({
  uploads,
  error,
  onFileSelect,
  onRemove,
  label = "Files",
}: {
  uploads: UploadItem[];
  error: string;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (id: string) => void;
  label?: string;
}) {
  return (
    <div>
      {label && (
        <label className="block text-xs font-medium text-[var(--portal-text-secondary)] mb-2 uppercase tracking-wider">
          {label}
        </label>
      )}
      <label className="flex items-center justify-center gap-2 w-full border border-dashed border-[var(--portal-border-strong)] hover:border-[#D25124]/40 rounded-xl px-4 py-6 text-sm text-[var(--portal-text-secondary)] hover:text-[var(--portal-text-primary)] cursor-pointer transition-colors">
        <Paperclip className="w-4 h-4" />
        <span>Click to attach files</span>
        <input
          type="file"
          multiple
          accept={ALLOWED_UPLOAD_EXTENSIONS.map((ext) => `.${ext}`).join(",")}
          onChange={onFileSelect}
          className="hidden"
        />
      </label>
      {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
      {uploads.length > 0 && (
        <div className="mt-3 space-y-2">
          {uploads.map((u) => (
            <div
              key={u.id}
              className="flex items-center gap-2 bg-[var(--portal-card)] border border-[var(--portal-border)] rounded-lg px-3 py-2 text-xs"
            >
              {u.status === "uploading" && (
                <Loader2 className="w-3.5 h-3.5 text-[var(--portal-text-muted)] animate-spin shrink-0" />
              )}
              {u.status === "done" && (
                <CheckCircle2 className="w-3.5 h-3.5 text-[#F07A3A] shrink-0" />
              )}
              {u.status === "error" && (
                <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              )}
              <span className="text-[var(--portal-text-secondary)] truncate flex-1">{u.file.name}</span>
              {u.status === "error" && <span className="text-rose-400">{u.error}</span>}
              <button
                type="button"
                onClick={() => onRemove(u.id)}
                className="text-[var(--portal-text-muted)] hover:text-[var(--portal-text-primary)] cursor-pointer shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
