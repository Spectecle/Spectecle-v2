import { OAuth2Client } from "google-auth-library";

function getOAuthClient(): OAuth2Client {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GMAIL_OAUTH_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      "Missing GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, or GMAIL_OAUTH_REFRESH_TOKEN"
    );
  }
  const client = new OAuth2Client({ clientId, clientSecret });
  client.setCredentials({ refresh_token: refreshToken });
  return client;
}

/** Counts messages under a label matching a date query, paginating fully
 * rather than trusting Gmail's `resultSizeEstimate`, which Google documents
 * as approximate. Only reads message IDs — no bodies, no full metadata. */
async function countMessages(label: "SENT" | "INBOX", afterDate: string): Promise<number> {
  const client = getOAuthClient();
  const { token } = await client.getAccessToken();
  if (!token) throw new Error("Failed to get Gmail access token");

  let total = 0;
  let pageToken: string | undefined;
  do {
    const url = new URL("https://gmail.googleapis.com/gmail/v1/users/me/messages");
    url.searchParams.set("labelIds", label);
    url.searchParams.set("q", `after:${afterDate}`);
    url.searchParams.set("maxResults", "500");
    if (pageToken) url.searchParams.set("pageToken", pageToken);

    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) throw new Error(`Gmail API error: ${res.status}`);
    const data = (await res.json()) as { messages?: unknown[]; nextPageToken?: string };
    total += (data.messages ?? []).length;
    pageToken = data.nextPageToken;
  } while (pageToken);

  return total;
}

export type EmailCounts = { sent: number; received: number };

/** Sent + received message counts for the current calendar month, via
 * Gmail's SENT/INBOX labels. "Received" reflects mail landing in the
 * inbox, not a true unique-sender count. */
export async function fetchEmailCountsThisMonth(): Promise<EmailCounts> {
  const now = new Date();
  const afterDate = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, "0")}/01`;

  const [sent, received] = await Promise.all([
    countMessages("SENT", afterDate),
    countMessages("INBOX", afterDate),
  ]);

  return { sent, received };
}
