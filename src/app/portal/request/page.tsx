"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { SERVICE_TYPES, BUDGET_OPTIONS, getServiceFields, getFieldErrors } from "@/lib/service-fields";
import { useFileUploads } from "@/hooks/useFileUploads";
import { FileUploadField } from "@/components/portal/FileUploadField";
import { DynamicField, inputClass, type DetailValue } from "@/components/portal/DynamicField";

export default function PortalRequestPage() {
  const router = useRouter();
  const [serviceType, setServiceType] = useState("");
  const [details, setDetails] = useState<Record<string, DetailValue>>({});
  const [budget, setBudget] = useState("");
  const [customBudget, setCustomBudget] = useState("");
  const [message, setMessage] = useState("");
  const fileUpload = useFileUploads();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fields = getServiceFields(serviceType);

  const handleServiceChange = (value: string) => {
    setServiceType(value);
    setDetails({});
    setErrors({});
  };

  const handleDetailChange = (key: string, value: DetailValue) => {
    setDetails((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!serviceType) e.service_type = "Select a service";
    if (!message.trim()) e.message = "Tell us what you need";
    return { ...e, ...getFieldErrors(fields, details) };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    if (fileUpload.hasPendingUploads) {
      setErrors((prev) => ({ ...prev, files: "Please wait for uploads to finish" }));
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      const res = await fetch("/api/portal/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_type: serviceType,
          budget: budget === "Other (enter amount)" ? customBudget : budget,
          message,
          details,
          files: fileUpload.getUploadedFiles(),
        }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="relative min-h-[80vh] pt-32 pb-20 px-6 overflow-hidden">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(198,153,71,0.12) 0%, transparent 70%)" }}
      />
      <div className="relative max-w-xl mx-auto">
        <Link
          href="/portal/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--portal-text-muted)] hover:text-[var(--portal-text-primary)] cursor-pointer transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Dashboard
        </Link>
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass border border-[#f87444]/20 p-14 text-center"
            >
              <div className="w-16 h-16 mx-auto bg-[#f87444]/10 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-8 h-8 text-[#f87444]" />
              </div>
              <h2
                className="text-2xl font-bold text-[var(--portal-text-primary)] mb-3"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Request Sent!
              </h2>
              <p className="text-[var(--portal-text-secondary)] mb-8 text-sm">
                We&apos;ll review your request and follow up shortly.
              </p>
              <button
                onClick={() => router.push("/portal/dashboard")}
                className="btn-primary inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold cursor-pointer"
              >
                Back to Dashboard
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="glass border border-[var(--portal-border)] p-8 md:p-10 space-y-5"
              noValidate
            >
              <div>
                <h1
                  className="text-2xl font-bold text-[var(--portal-text-primary)] mb-1"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  Request a Service
                </h1>
                <p className="text-[var(--portal-text-muted)] text-sm">
                  Tell us what you need and we&apos;ll get back to you within 24 hours.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--portal-text-secondary)] mb-2 uppercase tracking-wider">
                  Service <span className="text-rose-400">*</span>
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => handleServiceChange(e.target.value)}
                  className={`${inputClass(!!errors.service_type)} cursor-pointer`}
                >
                  <option value="" disabled>Select a service</option>
                  {SERVICE_TYPES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.service_type && (
                  <p className="mt-1.5 text-sm text-rose-400">{errors.service_type}</p>
                )}
              </div>

              <AnimatePresence mode="wait">
                {fields.length > 0 && (
                  <motion.div
                    key={serviceType}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-5"
                  >
                    {fields.map((field) => (
                      <DynamicField
                        key={field.key}
                        field={field}
                        value={details[field.key]}
                        otherValue={details[`${field.key}_other`] as string | undefined}
                        error={errors[field.key]}
                        otherError={errors[`${field.key}_other`]}
                        onChange={handleDetailChange}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="block text-sm font-medium text-[var(--portal-text-secondary)] mb-2 uppercase tracking-wider">
                  Budget Range{" "}
                  <span className="text-[var(--portal-text-faint)] normal-case tracking-normal">(optional)</span>
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className={`${inputClass(false)} cursor-pointer`}
                >
                  <option value="" disabled>Select a range — or skip if unsure</option>
                  {BUDGET_OPTIONS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                {budget === "Other (enter amount)" && (
                  <input
                    type="text"
                    value={customBudget}
                    onChange={(e) => setCustomBudget(e.target.value)}
                    placeholder="e.g. $8,500"
                    className={`${inputClass(false)} mt-3`}
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--portal-text-secondary)] mb-2 uppercase tracking-wider">
                  Details <span className="text-rose-400">*</span>
                </label>
                <textarea
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors((prev) => ({ ...prev, message: "" }));
                  }}
                  rows={5}
                  placeholder="Anything else we should know?"
                  className={`${inputClass(!!errors.message)} resize-none`}
                />
                {errors.message && <p className="mt-1.5 text-sm text-rose-400">{errors.message}</p>}
              </div>

              <FileUploadField
                label="Files (optional — logos, brand assets, screenshots)"
                uploads={fileUpload.uploads}
                error={fileUpload.error || errors.files || ""}
                onFileSelect={fileUpload.handleFileSelect}
                onRemove={fileUpload.removeUpload}
              />

              {status === "error" && (
                <p className="text-rose-400 text-sm text-center py-2">
                  Something went wrong — please try again or email us directly at{" "}
                  <a href="mailto:hello@spectecle.com" className="underline">hello@spectecle.com</a>.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="btn-primary w-full flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === "submitting" ? (
                  <>
                    <span className="relative z-10">Sending...</span>
                    <motion.div
                      className="relative z-10 w-4 h-4 border-2 border-white/30 border-t-white"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    />
                  </>
                ) : (
                  <>
                    <span>Submit Request</span>
                    <ArrowUpRight className="w-4 h-4 relative z-10" />
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
