// Plain fetch, no SDK -- same style as src/lib/places.ts and
// fetchPageSpeedScore in site-status.ts, rather than adding a Zoho npm
// dependency for what's a handful of REST calls.
//
// Field names below (invoice_id, invoice_number, customer_name, status,
// due_date, balance, total, email, invoice_url) are Zoho Books' own
// long-documented, stable field names, but have NOT been verified against a
// real authenticated response from this project (Zoho's interactive API
// docs didn't yield reliable field-level detail during research). Before
// relying on this in production: make one real call to each endpoint below,
// confirm the actual response shape, and adjust the parsing if anything
// doesn't match -- the parsing here is deliberately defensive (optional
// fields, no throws on a missing field) so a surprise schema difference
// degrades gracefully instead of crashing the whole cron run.

const ACCOUNTS_BASE_URL = process.env.ZOHO_ACCOUNTS_BASE_URL ?? "https://accounts.zoho.com";
const API_BASE_URL = process.env.ZOHO_API_BASE_URL ?? "https://www.zohoapis.com";

export type ZohoInvoice = {
  invoiceId: string;
  invoiceNumber: string | null;
  customerName: string | null;
  email: string | null;
  status: string | null;
  dueDate: string | null; // ISO "YYYY-MM-DD", matches formatDueDate's expected input
  balance: number | null;
  invoiceUrl: string | null;
};

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getZohoAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) return cachedToken.value;

  const clientId = process.env.ZOHO_CLIENT_ID;
  const clientSecret = process.env.ZOHO_CLIENT_SECRET;
  const refreshToken = process.env.ZOHO_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Zoho OAuth env vars are not set (ZOHO_CLIENT_ID/ZOHO_CLIENT_SECRET/ZOHO_REFRESH_TOKEN)");
  }

  const params = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
  });

  const res = await fetch(`${ACCOUNTS_BASE_URL}/oauth/v2/token?${params.toString()}`, { method: "POST" });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Zoho token refresh error: ${res.status} — ${body}`);
  }

  const data = (await res.json()) as { access_token?: string; expires_in?: number };
  if (!data.access_token) throw new Error("Zoho token refresh response had no access_token");

  // Refresh a little early (60s buffer) rather than right at expiry.
  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000 - 60_000,
  };
  return cachedToken.value;
}

async function zohoFetch(path: string): Promise<unknown> {
  const organizationId = process.env.ZOHO_ORGANIZATION_ID;
  if (!organizationId) throw new Error("ZOHO_ORGANIZATION_ID is not set");

  const accessToken = await getZohoAccessToken();
  const url = new URL(`${API_BASE_URL}/books/v3${path}`);
  url.searchParams.set("organization_id", organizationId);

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Zoho-oauthtoken ${accessToken}` },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Zoho Books API error: ${res.status} — ${body}`);
  }
  return res.json();
}

function parseInvoiceSummary(raw: Record<string, unknown>): ZohoInvoice {
  return {
    invoiceId: String(raw.invoice_id ?? ""),
    invoiceNumber: typeof raw.invoice_number === "string" ? raw.invoice_number : null,
    customerName: typeof raw.customer_name === "string" ? raw.customer_name : null,
    email: typeof raw.email === "string" && raw.email ? raw.email : null,
    status: typeof raw.status === "string" ? raw.status : null,
    dueDate: typeof raw.due_date === "string" ? raw.due_date : null,
    balance: typeof raw.balance === "number" ? raw.balance : null,
    // Confirmed against a real response: Zoho pads invoice_url with a
    // trailing space, which would otherwise ship a broken link in the
    // "Pay Now" button.
    invoiceUrl: typeof raw.invoice_url === "string" ? raw.invoice_url.trim() || null : null,
  };
}

/** GET /invoices?status=overdue -- the list endpoint's summary objects may
 * not include every field (e.g. customer email is sometimes only on the
 * detail endpoint); fetchInvoiceDetail fills in whatever this leaves null. */
export async function fetchOverdueInvoices(): Promise<ZohoInvoice[]> {
  const data = (await zohoFetch("/invoices?status=overdue")) as { invoices?: Record<string, unknown>[] };
  return (data.invoices ?? []).filter((raw) => raw.invoice_id).map(parseInvoiceSummary);
}

/** GET /invoices/{id} -- full detail, used to fill in whatever the list
 * summary didn't have (customer email, the online invoice/payment link). */
export async function fetchInvoiceDetail(invoiceId: string): Promise<ZohoInvoice | null> {
  const data = (await zohoFetch(`/invoices/${encodeURIComponent(invoiceId)}`)) as {
    invoice?: Record<string, unknown>;
  };
  if (!data.invoice) return null;
  return parseInvoiceSummary(data.invoice);
}

export type ZohoRecurringInvoice = {
  recurringInvoiceId: string;
  name: string | null;
  customerName: string | null;
  status: string | null;
  total: number | null;
  frequency: string | null; // human-readable, e.g. "Every month", "Every year"
  startDate: string | null;
  endDate: string | null;
  lastSentDate: string | null;
  nextInvoiceDate: string | null;
};

function describeFrequency(frequency: unknown, repeatEvery: unknown): string | null {
  if (typeof frequency !== "string" || !frequency) return null;
  const unit = frequency.replace(/s$/, ""); // "months" -> "month"
  const every = typeof repeatEvery === "number" && repeatEvery > 0 ? repeatEvery : 1;
  return every === 1 ? `Every ${unit}` : `Every ${every} ${unit}s`;
}

/** GET /recurringinvoices -- the active recurring billing agreements behind
 * each client's "reoccuring payment" (confirmed field names against a real
 * response: recurring_invoice_id, recurrence_name, customer_name, status,
 * total, recurrence_frequency + repeat_every, start_date, end_date,
 * last_sent_date, next_invoice_date). Fetched live on every page view --
 * deliberately not persisted anywhere, since Zoho is already the single
 * source of truth here and there's no reminder-style cadence state to track
 * on top of it (unlike payment_reminders). */
export async function fetchRecurringInvoices(): Promise<ZohoRecurringInvoice[]> {
  const data = (await zohoFetch("/recurringinvoices")) as {
    recurring_invoices?: Record<string, unknown>[];
  };
  return (data.recurring_invoices ?? [])
    .filter((raw) => raw.recurring_invoice_id)
    .map((raw) => ({
      recurringInvoiceId: String(raw.recurring_invoice_id),
      name: typeof raw.recurrence_name === "string" ? raw.recurrence_name.trim() || null : null,
      customerName: typeof raw.customer_name === "string" ? raw.customer_name : null,
      status: typeof raw.status === "string" ? raw.status : null,
      total: typeof raw.total === "number" ? raw.total : null,
      frequency: describeFrequency(raw.recurrence_frequency, raw.repeat_every),
      startDate: typeof raw.start_date === "string" && raw.start_date ? raw.start_date : null,
      endDate: typeof raw.end_date === "string" && raw.end_date ? raw.end_date : null,
      lastSentDate: typeof raw.last_sent_date === "string" && raw.last_sent_date ? raw.last_sent_date : null,
      nextInvoiceDate:
        typeof raw.next_invoice_date === "string" && raw.next_invoice_date ? raw.next_invoice_date : null,
    }));
}
