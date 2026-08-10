"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Paperclip, Send, Loader2 } from "lucide-react";
import { useFileUploads } from "@/hooks/useFileUploads";
import { FileUploadField } from "@/components/portal/FileUploadField";
import type { TicketMessage } from "@/lib/request-messages";

export function TicketThread({
  requestId,
  messages,
  viewerRole,
}: {
  requestId: string;
  messages: TicketMessage[];
  viewerRole: "admin" | "client";
}) {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [showUpload, setShowUpload] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const fileUpload = useFileUploads();
  const [, startTransition] = useTransition();

  const handleSend = async () => {
    if (!body.trim() && fileUpload.getUploadedFiles().length === 0) {
      setError("Write a message or attach a file");
      return;
    }
    if (fileUpload.hasPendingUploads) {
      setError("Please wait for uploads to finish");
      return;
    }
    setError("");
    setSending(true);
    try {
      const res = await fetch(`/api/portal/requests/${requestId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body, files: fileUpload.getUploadedFiles() }),
      });
      if (!res.ok) {
        setError("Failed to send — please try again");
        return;
      }
      setBody("");
      fileUpload.reset();
      setShowUpload(false);
      startTransition(() => router.refresh());
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mt-3 pt-3 border-t border-[var(--portal-border)]">
      {messages.length > 0 && (
        <div className="space-y-2 mb-3">
          {messages.map((m) => {
            const isViewer = m.sender_role === viewerRole;
            return (
              <div
                key={m.id}
                className={`text-xs rounded-lg px-3 py-2 ${
                  isViewer
                    ? "bg-[#f87444]/10 border border-[#f87444]/15 ml-6"
                    : "bg-[var(--portal-border)] border border-[var(--portal-border)] mr-6"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-[var(--portal-text-secondary)]">
                    {m.sender_role === "admin" ? "Spectecle" : m.sender_email}
                  </span>
                  <span className="text-[var(--portal-text-faint)]">
                    {new Date(m.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                {m.body && <p className="text-[var(--portal-text-secondary)] whitespace-pre-wrap">{m.body}</p>}
                {m.files.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {m.files.map((f) =>
                      f.signedUrl ? (
                        <a
                          key={f.id}
                          href={f.signedUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[#f87444] hover:text-[#f87444] bg-[#f87444]/10 px-2 py-1 cursor-pointer"
                        >
                          <Paperclip className="w-3 h-3" />
                          {f.fileName}
                        </a>
                      ) : null
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="space-y-2">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={2}
          placeholder={viewerRole === "admin" ? "Reply to this client…" : "Reply or add more info…"}
          className="w-full bg-[var(--portal-card)] border border-[var(--portal-border)] text-[var(--portal-text-primary)] placeholder-[var(--portal-text-faint)] px-3 py-2 text-xs resize-none focus:border-[#f87444]/50 outline-none"
        />
        {showUpload && (
          <FileUploadField
            label=""
            uploads={fileUpload.uploads}
            error={fileUpload.error}
            onFileSelect={fileUpload.handleFileSelect}
            onRemove={fileUpload.removeUpload}
          />
        )}
        {error && <p className="text-xs text-rose-400">{error}</p>}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowUpload((v) => !v)}
            className="flex items-center gap-1 text-xs text-[var(--portal-text-muted)] hover:text-[var(--portal-text-primary)] cursor-pointer"
          >
            <Paperclip className="w-3 h-3" />
            Attach
          </button>
          <button
            type="button"
            onClick={handleSend}
            disabled={sending}
            className="ml-auto flex items-center gap-1.5 bg-[#f87444]/15 hover:bg-[#f87444]/25 text-[#f87444] text-xs font-medium px-3 py-1.5 cursor-pointer disabled:opacity-60 transition-colors"
          >
            {sending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
