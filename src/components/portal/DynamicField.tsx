"use client";

import type { FieldDef } from "@/lib/service-fields";
import { DatePickerField } from "@/components/portal/DatePickerField";

export type DetailValue = string | string[];

export const inputClass = (hasError: boolean) =>
  `w-full bg-[var(--portal-card)] border ${
    hasError ? "border-rose-500/60" : "border-[var(--portal-border)]"
  } text-[var(--portal-text-primary)] placeholder-[var(--portal-text-faint)] rounded-xl px-4 py-3.5 text-sm transition-all duration-200 focus:border-[#D25124]/50 focus:bg-[var(--portal-card-alt)] outline-none`;

export function DynamicField({
  field,
  value,
  otherValue,
  error,
  otherError,
  onChange,
}: {
  field: FieldDef;
  value: DetailValue | undefined;
  otherValue?: string;
  error?: string;
  otherError?: string;
  onChange: (key: string, value: DetailValue) => void;
}) {
  const label = (
    <label className="block text-xs font-medium text-[var(--portal-text-secondary)] mb-2 uppercase tracking-wider">
      {field.label} {field.required && <span className="text-rose-400">*</span>}
    </label>
  );

  if (field.type === "select") {
    return (
      <div>
        {label}
        <select
          value={(value as string) ?? ""}
          onChange={(e) => onChange(field.key, e.target.value)}
          className={`${inputClass(!!error)} cursor-pointer`}
        >
          <option value="" disabled>
            {field.placeholder ?? "Select an option"}
          </option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
      </div>
    );
  }

  if (field.type === "checkboxes") {
    const selected = Array.isArray(value) ? value : [];
    const toggle = (opt: string) => {
      const next = selected.includes(opt)
        ? selected.filter((v) => v !== opt)
        : [...selected, opt];
      onChange(field.key, next);
    };
    const showOther = field.allowOther && selected.includes("Other");
    return (
      <div>
        {label}
        <div className="flex flex-wrap gap-2">
          {field.options?.map((opt) => (
            <button
              type="button"
              key={opt}
              onClick={() => toggle(opt)}
              className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                selected.includes(opt)
                  ? "bg-[#D25124]/15 border-[#D25124]/40 text-[#F07A3A]"
                  : "bg-[var(--portal-card)] border-[var(--portal-border)] text-[var(--portal-text-secondary)] hover:text-[var(--portal-text-primary)] hover:border-[var(--portal-border-strong)]"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        {showOther && (
          <div className="mt-2">
            <input
              type="text"
              value={otherValue ?? ""}
              onChange={(e) => onChange(`${field.key}_other`, e.target.value)}
              placeholder="Please specify"
              className={inputClass(!!otherError)}
            />
            {otherError && <p className="mt-1.5 text-xs text-rose-400">{otherError}</p>}
          </div>
        )}
      </div>
    );
  }

  if (field.type === "textarea") {
    return (
      <div>
        {label}
        <textarea
          value={(value as string) ?? ""}
          onChange={(e) => onChange(field.key, e.target.value)}
          rows={3}
          placeholder={field.placeholder}
          className={`${inputClass(!!error)} resize-none`}
        />
        {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
      </div>
    );
  }

  if (field.type === "date") {
    return (
      <div>
        {label}
        <DatePickerField
          value={(value as string) ?? ""}
          onChange={(v) => onChange(field.key, v)}
          error={!!error}
          placeholder={field.placeholder}
        />
        {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
      </div>
    );
  }

  return (
    <div>
      {label}
      <input
        type="text"
        value={(value as string) ?? ""}
        onChange={(e) => onChange(field.key, e.target.value)}
        placeholder={field.placeholder}
        className={inputClass(!!error)}
      />
      {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
    </div>
  );
}
