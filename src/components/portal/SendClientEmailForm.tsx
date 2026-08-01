"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Eye, Loader2 } from "lucide-react";
import { inputClass } from "@/components/portal/DynamicField";
import { ConfirmDialog } from "@/components/portal/ConfirmDialog";
import type { OrgGroup } from "@/lib/organizations";

type LetterTemplate = "onboarding" | "complete";

function defaultSubject(template: LetterTemplate, businessName: string): string {
  return template === "onboarding"
    ? `Welcome to Spectecle${businessName ? `, ${businessName}` : ""}`
    : `Your Project Is Complete — Thank You From Spectecle`;
}

function defaultNote(template: LetterTemplate): string {
  return template === "onboarding"
    ? "Welcome to Spectecle! We're excited to get started — here's your portal so you always know where things stand."
    : "We just wrapped up work on your project — thank you for choosing Spectecle, it's been a pleasure working with you.";
}

export function SendClientEmailForm({ groups }: { groups: OrgGroup[] }) {
  const router = useRouter();
  const [domain, setDomain] = useState("");
  const [userId, setUserId] = useState("");
  const [template, setTemplate] = useState<LetterTemplate>("complete");
  const [businessName, setBusinessName] = useState("");
  const [businessNameTouched, setBusinessNameTouched] = useState(false);
  const [subject, setSubject] = useState(defaultSubject("complete", ""));
  const [subjectTouched, setSubjectTouched] = useState(false);
  const [note, setNote] = useState(defaultNote("complete"));
  const [noteTouched, setNoteTouched] = useState(false);
  const [invoiceBalance, setInvoiceBalance] = useState("");
  const [invoiceLink, setInvoiceLink] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState("");

  const clients = groups.find((g) => g.domain === domain)?.users ?? [];
  const selectedClient = clients.find((c) => c.id === userId);

  const handleDomainChange = (value: string) => {
    setDomain(value);
    setUserId("");
    if (errors.client) setErrors((prev) => ({ ...prev, client: "" }));
    if (!businessNameTouched) {
      const orgName = groups.find((g) => g.domain === value)?.name ?? "";
      setBusinessName(orgName);
      if (!subjectTouched) setSubject(defaultSubject(template, orgName));
    }
  };

  const handleTemplateChange = (value: LetterTemplate) => {
    setTemplate(value);
    if (!subjectTouched) setSubject(defaultSubject(value, businessName));
    if (!noteTouched) setNote(defaultNote(value));
  };

  const buildPayload = (preview: boolean) => ({
    userId,
    template,
    businessName,
    subject,
    note,
    invoiceBalance: template === "complete" ? invoiceBalance : undefined,
    invoiceLink: template === "complete" ? invoiceLink : undefined,
    preview,
  });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!userId) e.client = "Select a client";
    if (!businessName.trim()) e.businessName = "Enter a business name";
    if (!subject.trim()) e.subject = "Enter a subject";
    return e;
  };

  const handlePreview = async () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setPreviewError("");
    setPreviewLoading(true);
    try {
      const res = await fetch("/api/portal/admin/send-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload(true)),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.html) {
        setPreviewError(data?.error ?? "Failed to build preview");
        return;
      }
      const blob = new Blob([data.html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch {
      setPreviewError("Failed to build preview");
    } finally {
      setPreviewLoading(false);
    }
  };

  const handleSendClick = () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setConfirmOpen(true);
  };

  const handleSend = async () => {
    setStatus("submitting");
    try {
      const res = await fetch("/api/portal/admin/send-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildPayload(false)),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    } finally {
      setConfirmOpen(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl border border-[#D25124]/20 p-14 text-center"
        >
          <div className="w-16 h-16 mx-auto rounded-full bg-[#D25124]/10 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-8 h-8 text-[#F07A3A]" />
          </div>
          <h2
            className="text-2xl font-bold text-[var(--portal-text-primary)] mb-3"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Email Sent
          </h2>
          <p className="text-[var(--portal-text-secondary)] mb-8 text-sm">
            {selectedClient?.email} has been emailed.
          </p>
          <button
            onClick={() => router.push("/portal/admin")}
            className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold cursor-pointer"
          >
            Back to Admin
          </button>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass rounded-2xl border border-[var(--portal-border)] p-8 md:p-10 space-y-5"
        >
          <div>
            <h1
              className="text-2xl font-bold text-[var(--portal-text-primary)] mb-1"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Send Client Email
            </h1>
            <p className="text-[var(--portal-text-muted)] text-sm">
              Push a branded onboarding or project-complete email to one client.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[var(--portal-text-secondary)] mb-2 uppercase tracking-wider">
                Business <span className="text-rose-400">*</span>
              </label>
              <select
                value={domain}
                onChange={(e) => handleDomainChange(e.target.value)}
                className={`${inputClass(false)} cursor-pointer`}
              >
                <option value="" disabled>Select a business</option>
                {groups.map((g) => (
                  <option key={g.domain} value={g.domain}>{g.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--portal-text-secondary)] mb-2 uppercase tracking-wider">
                Client <span className="text-rose-400">*</span>
              </label>
              <select
                value={userId}
                onChange={(e) => {
                  setUserId(e.target.value);
                  if (errors.client) setErrors((prev) => ({ ...prev, client: "" }));
                }}
                disabled={!domain}
                className={`${inputClass(!!errors.client)} cursor-pointer disabled:opacity-50`}
              >
                <option value="" disabled>
                  {domain ? "Select a client" : "Pick a business first"}
                </option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>{c.email}</option>
                ))}
              </select>
              {errors.client && <p className="mt-1.5 text-xs text-rose-400">{errors.client}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--portal-text-secondary)] mb-2 uppercase tracking-wider">
              Template <span className="text-rose-400">*</span>
            </label>
            <div className="flex gap-2">
              {(["complete", "onboarding"] as LetterTemplate[]).map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => handleTemplateChange(t)}
                  className={`flex-1 px-4 py-3 rounded-xl text-sm font-medium border transition-colors cursor-pointer ${
                    template === t
                      ? "bg-[#D25124]/15 border-[#D25124]/40 text-[#F07A3A]"
                      : "bg-[var(--portal-card)] border-[var(--portal-border)] text-[var(--portal-text-secondary)] hover:text-[var(--portal-text-primary)]"
                  }`}
                >
                  {t === "complete" ? "Project Complete" : "Onboarding"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--portal-text-secondary)] mb-2 uppercase tracking-wider">
              Business Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => {
                setBusinessName(e.target.value);
                setBusinessNameTouched(true);
                if (errors.businessName) setErrors((prev) => ({ ...prev, businessName: "" }));
              }}
              placeholder="e.g. Dearborn Cleaners"
              className={inputClass(!!errors.businessName)}
            />
            {errors.businessName && (
              <p className="mt-1.5 text-xs text-rose-400">{errors.businessName}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--portal-text-secondary)] mb-2 uppercase tracking-wider">
              Subject <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                setSubjectTouched(true);
                if (errors.subject) setErrors((prev) => ({ ...prev, subject: "" }));
              }}
              className={inputClass(!!errors.subject)}
            />
            {errors.subject && <p className="mt-1.5 text-xs text-rose-400">{errors.subject}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--portal-text-secondary)] mb-2 uppercase tracking-wider">
              Personal Note
            </label>
            <textarea
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
                setNoteTouched(true);
              }}
              rows={4}
              className={`${inputClass(false)} resize-none`}
            />
          </div>

          <AnimatePresence mode="wait">
            {template === "complete" && (
              <motion.div
                key="invoice"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="grid sm:grid-cols-2 gap-4"
              >
                <div>
                  <label className="block text-xs font-medium text-[var(--portal-text-secondary)] mb-2 uppercase tracking-wider">
                    Invoice Balance{" "}
                    <span className="text-[var(--portal-text-faint)] normal-case tracking-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={invoiceBalance}
                    onChange={(e) => setInvoiceBalance(e.target.value)}
                    placeholder="e.g. $450.00"
                    className={inputClass(false)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--portal-text-secondary)] mb-2 uppercase tracking-wider">
                    Invoice Link{" "}
                    <span className="text-[var(--portal-text-faint)] normal-case tracking-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={invoiceLink}
                    onChange={(e) => setInvoiceLink(e.target.value)}
                    placeholder="https://…"
                    className={inputClass(false)}
                  />
                </div>
                <p className="sm:col-span-2 text-[11px] text-[var(--portal-text-faint)] -mt-1">
                  Leave the balance blank to omit the invoice section entirely (e.g. paid in full).
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {status === "error" && (
            <p className="text-rose-400 text-sm text-center py-2">
              Something went wrong — please try again.
            </p>
          )}
          {previewError && (
            <p className="text-rose-400 text-sm text-center py-2">{previewError}</p>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handlePreview}
              disabled={previewLoading}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold cursor-pointer border border-[var(--portal-border)] text-[var(--portal-text-secondary)] hover:text-[var(--portal-text-primary)] hover:border-[var(--portal-border-strong)] transition-colors disabled:opacity-60"
            >
              {previewLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
              Preview
            </button>
            <button
              type="button"
              onClick={handleSendClick}
              disabled={status === "submitting"}
              className="btn-primary flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="relative z-10">Send Email</span>
              <Send className="w-4 h-4 relative z-10" />
            </button>
          </div>
        </motion.div>
      )}

      <ConfirmDialog
        open={confirmOpen}
        title="Send this email?"
        message={`This sends the ${template === "complete" ? "Project Complete" : "Onboarding"} email to ${
          selectedClient?.email ?? "the selected client"
        } right now. Make sure you've previewed it first.`}
        confirmLabel="Send"
        destructive={false}
        loading={status === "submitting"}
        onConfirm={handleSend}
        onCancel={() => setConfirmOpen(false)}
      />
    </AnimatePresence>
  );
}
