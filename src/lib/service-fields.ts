export type FieldType = "text" | "textarea" | "select" | "checkboxes" | "date";

export type FieldDef = {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
};

export const SERVICE_TYPES = [
  "New Website / Redesign",
  "Website Update or Bug Fix",
  "SEO & Digital Marketing",
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
  }

  return { clean, missing };
}
