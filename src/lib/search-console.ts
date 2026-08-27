import { OAuth2Client } from "google-auth-library";

function getOAuthClient(): OAuth2Client {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.SEARCH_CONSOLE_OAUTH_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      "Missing GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, or SEARCH_CONSOLE_OAUTH_REFRESH_TOKEN"
    );
  }
  const client = new OAuth2Client({ clientId, clientSecret });
  client.setCredentials({ refresh_token: refreshToken });
  return client;
}

export type SearchConsoleQueryRow = {
  query: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
};

/** Top search queries for a Search Console property over the trailing N
 * days, highest clicks first. `siteUrl` is the property identifier exactly
 * as registered in Search Console — URL-prefix form
 * ("https://example.com/") or domain-property form ("sc-domain:example.com") —
 * not a plain domain string. */
export async function fetchSearchConsoleTopQueries(
  siteUrl: string,
  days = 28,
  limit = 10
): Promise<SearchConsoleQueryRow[]> {
  const client = getOAuthClient();
  const { token } = await client.getAccessToken();
  if (!token) throw new Error("Failed to get Search Console access token");

  // Search Console's data lags a few days behind real-time, so a fixed
  // 3-day offset from today keeps the requested window inside the range
  // Google actually has data for, rather than trailing off with zeros.
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 3);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - days);
  const iso = (d: Date) => d.toISOString().slice(0, 10);

  const res = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate: iso(start),
        endDate: iso(end),
        dimensions: ["query"],
        rowLimit: limit,
      }),
    }
  );

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Search Console API error: ${res.status} — ${body}`);
  }

  const data = (await res.json()) as {
    rows?: { keys?: string[]; clicks?: number; impressions?: number; ctr?: number; position?: number }[];
  };

  return (data.rows ?? []).map((row) => ({
    query: row.keys?.[0] ?? "",
    clicks: row.clicks ?? 0,
    impressions: row.impressions ?? 0,
    ctr: row.ctr ?? 0,
    position: row.position ?? 0,
  }));
}
