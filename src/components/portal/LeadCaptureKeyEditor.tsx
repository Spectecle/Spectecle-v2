"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Copy, Check, Loader2 } from "lucide-react";

function buildSnippet(key: string): string {
  return `<?php
/**
 * Spectecle Leads Capture
 * Sends Contact Form 7 submissions to the Spectecle client portal.
 * Adjust the field names below if this site's form doesn't use CF7's
 * default field names (your-name, your-email, your-phone, your-message).
 */
add_action('wpcf7_before_send_mail', function ($contact_form) {
    $submission = WPCF7_Submission::get_instance();
    if (!$submission) return;
    $data = $submission->get_posted_data();

    $payload = [
        'key'     => '${key}',
        'name'    => $data['your-name'] ?? '',
        'email'   => $data['your-email'] ?? '',
        'phone'   => $data['your-phone'] ?? '',
        'message' => $data['your-message'] ?? '',
        'source'  => 'contact_form',
    ];

    wp_remote_post('https://spectecle.com/api/leads', [
        'body'     => json_encode($payload),
        'headers'  => ['Content-Type' => 'application/json'],
        'timeout'  => 5,
        'blocking' => false, // fire-and-forget -- never delays or blocks the real form
    ]);
});
`;
}

export function LeadCaptureKeyEditor({
  organizationId,
  currentKey,
}: {
  organizationId: string;
  currentKey: string | null;
}) {
  const router = useRouter();
  const [generating, setGenerating] = useState(false);
  const [key, setKey] = useState(currentKey);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const res = await fetch(`/api/portal/admin/organizations/${organizationId}/lead-capture-key`, {
        method: "POST",
      });
      const body = await res.json().catch(() => null);
      if (res.ok && body?.key) {
        setKey(body.key);
        router.refresh();
      }
    } finally {
      setGenerating(false);
    }
  };

  const snippet = key ? buildSnippet(key) : null;

  const handleCopy = () => {
    if (!snippet) return;
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span className="text-sm text-[var(--portal-text-muted)]">
          Lead Capture Key:{" "}
          <span className="text-[var(--portal-text-secondary)] font-mono text-xs">{key ?? "Not connected"}</span>
        </span>
        <button
          type="button"
          onClick={handleGenerate}
          disabled={generating}
          className="text-xs text-[#cb7c46] hover:underline cursor-pointer disabled:opacity-60"
        >
          {generating ? <Loader2 className="w-3 h-3 animate-spin inline" /> : key ? "Rotate" : "Generate"}
        </button>
      </div>
      {snippet && (
        <div className="relative">
          <pre className="text-[11px] leading-relaxed bg-[var(--portal-input-bg)] border border-[var(--portal-border)] p-3 overflow-x-auto whitespace-pre-wrap">
            {snippet}
          </pre>
          <button
            type="button"
            onClick={handleCopy}
            className="absolute top-2 right-2 p-1.5 text-[var(--portal-text-muted)] hover:text-[var(--portal-text-primary)] cursor-pointer bg-[var(--portal-input-bg)]"
            aria-label="Copy snippet"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <p className="text-xs text-[var(--portal-text-faint)] mt-2">
            Deploy as <code className="bg-[var(--portal-border)] px-1 py-0.5 rounded">wp-content/mu-plugins/spectecle-leads.php</code> on the client&apos;s site.
          </p>
        </div>
      )}
    </div>
  );
}
