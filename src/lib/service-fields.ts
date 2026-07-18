export type FieldType = "text" | "textarea" | "select" | "checkboxes" | "date";

export type FieldDef = {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  /** For checkboxes fields: when "Other" is selected, reveal a text input stored at `${key}_other`. */
  allowOther?: boolean;
};

export const SERVICE_TYPES = [
  "New Website / Redesign",
  "Website Update or Bug Fix",
  "SEO & Digital Marketing",
  "Paid Advertising",
  "AI & Automation",
  "Something Else",
] as const;

export type ServiceType = (typeof SERVICE_TYPES)[number];

export const BUDGET_OPTIONS = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Not sure yet",
  "Other (enter amount)",
];

export const SERVICE_FIELDS: Record<ServiceType, FieldDef[]> = {
  "New Website / Redesign": [
    { key: "business_name", label: "Business / Project Name", type: "text", required: true },
    { key: "current_website", label: "Current Website URL", type: "text", placeholder: "https:// — leave blank if none" },
    {
      key: "page_count",
      label: "Approx. Number of Pages",
      type: "select",
      required: true,
      options: ["1–5", "6–10", "11–20", "20+"],
    },
    {
      key: "features",
      label: "Features Needed",
      type: "checkboxes",
      options: [
        "E-commerce / Online Store",
        "Online Booking / Scheduling",
        "Blog",
        "Client / Member Login",
        "Multi-language",
        "Other (describe below)",
      ],
    },
    {
      key: "has_branding",
      label: "Brand Assets",
      type: "select",
      required: true,
      options: [
        "I have a logo & brand guide ready",
        "I have a logo, no formal guide",
        "I need branding / a logo too",
      ],
    },
    { key: "inspiration", label: "Reference Sites / Inspiration", type: "textarea", placeholder: "Links to sites you like, or competitors" },
    { key: "target_launch", label: "Target Launch Date", type: "date" },
  ],
  "Website Update or Bug Fix": [
    { key: "website_url", label: "Website URL", type: "text", required: true },
    { key: "affected_pages", label: "Page(s) Affected", type: "text", placeholder: "e.g. /contact, homepage" },
    {
      key: "urgency",
      label: "Urgency",
      type: "select",
      required: true,
      options: ["Low — whenever", "Medium — this week", "High — urgent / site is broken"],
    },
  ],
  "SEO & Digital Marketing": [
    { key: "website_url", label: "Website URL", type: "text", required: true },
    { key: "target_keywords", label: "Target Keywords / Topics", type: "textarea" },
    { key: "target_location", label: "Target Location(s)", type: "text", placeholder: "e.g. Detroit, MI" },
    { key: "competitors", label: "Main Competitors", type: "textarea" },
    { key: "current_efforts", label: "Current Marketing Efforts", type: "textarea" },
  ],
  "Paid Advertising": [
    { key: "monthly_budget", label: "Monthly Ad Budget", type: "text", required: true, placeholder: "e.g. $1,500/mo" },
    { key: "campaign_start", label: "Campaign Start Date", type: "date" },
    { key: "campaign_end", label: "Campaign End Date", type: "date", placeholder: "Leave blank if ongoing" },
    {
      key: "card_on_file",
      label: "Card on File",
      type: "select",
      required: true,
      options: ["Yes, a card is already on file", "No, needs to be collected"],
    },
    {
      key: "ad_platforms",
      label: "Ad Platforms",
      type: "checkboxes",
      allowOther: true,
      options: ["Facebook", "Instagram", "Google", "Other"],
    },
  ],
  "AI & Automation": [
    { key: "current_tools", label: "Current Tools / Systems", type: "textarea", placeholder: "CRM, spreadsheets, email, etc." },
    { key: "automate_what", label: "What Should Be Automated?", type: "textarea", required: true },
    { key: "volume", label: "Approx. Volume / Scale", type: "text", placeholder: "e.g. 500 leads/month" },
  ],
  "Something Else": [],
};

export function getServiceFields(serviceType: string): FieldDef[] {
  return SERVICE_FIELDS[serviceType as ServiceType] ?? [];
}

export function isValidServiceType(serviceType: string): serviceType is ServiceType {
  return (SERVICE_TYPES as readonly string[]).includes(serviceType);
}

function isEmpty(value: unknown): boolean {
  if (value == null) return true;
  if (typeof value === "string") return value.trim() === "";
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

/**
 * Whitelists `details` down to the keys defined for this service type (drops
 * anything else) and reports which required fields are still missing.
 */
export function validateDetails(
  serviceType: string,
  details: Record<string, unknown>
): { clean: Record<string, unknown>; missing: string[] } {
  const fields = getServiceFields(serviceType);
  const clean: Record<string, unknown> = {};
  const missing: string[] = [];

  for (const field of fields) {
    const value = details[field.key];
    if (!isEmpty(value)) {
      clean[field.key] = value;
    } else if (field.required) {
      missing.push(field.label);
    }

    if (field.allowOther) {
      const otherKey = `${field.key}_other`;
      const otherValue = details[otherKey];
      const hasOther = Array.isArray(value) && value.includes("Other");
      if (hasOther && !isEmpty(otherValue)) {
        clean[otherKey] = otherValue;
      }
    }
  }

  return { clean, missing };
}

/**
 * Client-side field errors keyed by field key (and `${key}_other` for the
 * companion text input) — used by the create/edit forms for inline
 * validation messages. Mirrors the required/allowOther rules in
 * validateDetails() above, but returns per-field messages instead of a
 * whitelist.
 */
export function getFieldErrors(
  fields: FieldDef[],
  details: Record<string, unknown>
): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const field of fields) {
    const value = details[field.key];
    if (field.required && isEmpty(value)) {
      errors[field.key] = `${field.label} is required`;
      continue;
    }

    if (field.allowOther && Array.isArray(value) && value.includes("Other")) {
      const otherValue = details[`${field.key}_other`];
      if (isEmpty(otherValue)) {
        errors[`${field.key}_other`] = "Please specify";
      }
    }
  }

  return errors;
}
