import { Paperclip } from "lucide-react";
import { getServiceFields } from "@/lib/service-fields";

export type RequestFile = {
  id: string;
  fileName: string;
  signedUrl: string | null;
};

export function RequestDetails({
  serviceType,
  details,
  files,
}: {
  serviceType: string;
  details: Record<string, unknown>;
  files: RequestFile[];
}) {
  const fields = getServiceFields(serviceType);
  const rows = fields
    .filter((f) => details[f.key] !== undefined && details[f.key] !== null && details[f.key] !== "")
    .map((f) => {
      const value = details[f.key];
      const otherValue = details[`${f.key}_other`];
      const display = Array.isArray(value)
        ? value
            .map((v) => (v === "Other" && otherValue ? `Other (${String(otherValue)})` : v))
            .join(", ")
        : String(value);
      return { label: f.label, display };
    });

  if (rows.length === 0 && files.length === 0) return null;

  return (
    <div className="mt-3 pt-3 border-t border-[var(--portal-border)] space-y-2">
      {rows.length > 0 && (
        <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
          {rows.map((r) => (
            <div key={r.label} className="text-xs">
              <dt className="text-[var(--portal-text-muted)] inline">{r.label}: </dt>
              <dd className="text-[var(--portal-text-secondary)] inline">{r.display}</dd>
            </div>
          ))}
        </dl>
      )}
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {files.map((f) =>
            f.signedUrl ? (
              <a
                key={f.id}
                href={f.signedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#F07A3A] hover:text-[#D25124] bg-[#D25124]/10 rounded-lg px-2.5 py-1.5 transition-colors cursor-pointer"
              >
                <Paperclip className="w-3 h-3" />
                {f.fileName}
              </a>
            ) : (
              <span
                key={f.id}
                className="flex items-center gap-1.5 text-xs text-[var(--portal-text-muted)] bg-[var(--portal-border)] rounded-lg px-2.5 py-1.5"
              >
                <Paperclip className="w-3 h-3" />
                {f.fileName}
              </span>
            )
          )}
        </div>
      )}
    </div>
  );
}
