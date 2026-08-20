"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Check, X } from "lucide-react";
import { BUDGET_OPTIONS, getServiceFields, getFieldErrors } from "@/lib/service-fields";
import { DynamicField, inputClass, type DetailValue } from "@/components/portal/DynamicField";

export function EditRequestForm({
  requestId,
  serviceType,
  initialBudget,
  initialMessage,
  initialDetails,
  onDone,
}: {
  requestId: string;
  serviceType: string;
  initialBudget: string | null;
  initialMessage: string;
  initialDetails: Record<string, unknown>;
  onDone: () => void;
}) {
  const router = useRouter();
  const fields = getServiceFields(serviceType);
  const isPresetBudget = initialBudget ? BUDGET_OPTIONS.includes(initialBudget) : true;

  const [budget, setBudget] = useState(isPresetBudget ? initialBudget ?? "" : "Other (enter amount)");
  const [customBudget, setCustomBudget] = useState(isPresetBudget ? "" : initialBudget ?? "");
  const [message, setMessage] = useState(initialMessage);
  const [details, setDetails] = useState<Record<string, DetailValue>>(
    initialDetails as Record<string, DetailValue>
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");

  const handleDetailChange = (key: string, value: DetailValue) => {
    setDetails((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!message.trim()) e.message = "Tell us what you need";
    return { ...e, ...getFieldErrors(fields, details) };
  };

  const handleSave = async () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("saving");
    try {
      const res = await fetch(`/api/portal/requests/${requestId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          budget: budget === "Other (enter amount)" ? customBudget : budget,
          message,
          details,
        }),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      router.refresh();
      onDone();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="space-y-4 border-t border-[var(--portal-border)] pt-4">
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
          <option value="">No budget set</option>
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
          rows={4}
          className={`${inputClass(!!errors.message)} resize-none`}
        />
        {errors.message && <p className="mt-1.5 text-sm text-rose-400">{errors.message}</p>}
      </div>

      {status === "error" && (
        <p className="text-rose-400 text-sm">Failed to save — please try again.</p>
      )}

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={status === "saving"}
          className="flex items-center gap-1.5 bg-[#f87444]/15 hover:bg-[#f87444]/25 text-[#f87444] text-sm font-medium px-3 py-2 cursor-pointer disabled:opacity-60 transition-colors"
        >
          {status === "saving" ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Check className="w-3.5 h-3.5" />
          )}
          Save Changes
        </button>
        <button
          type="button"
          onClick={onDone}
          className="flex items-center gap-1.5 text-[var(--portal-text-secondary)] hover:text-[var(--portal-text-primary)] text-sm font-medium px-3 py-2 cursor-pointer transition-colors"
        >
          <X className="w-3.5 h-3.5" />
          Cancel
        </button>
      </div>
    </div>
  );
}
