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

async function fetchJson(url: string, token: string): Promise<unknown> {
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Gmail API error: ${res.status} — ${body}`);
  }
  return res.json();
}

const MAX_PAGES = 10; // safety cap: up to ~1000 messages scanned per label

/** Counts messages under a label with internalDate on/after `cutoffMs`.
 * The `gmail.metadata` OAuth scope this project uses forbids the `q`
 * search parameter on messages.list (confirmed via the API's own error:
 * "Metadata scope does not support 'q' parameter"), so date filtering is
 * done by paginating messages.list (newest-first in practice, though not
 * contractually guaranteed) and fetching each message's internalDate via
 * a metadata-only messages.get, in parallel per page. Stops once a page
 * contains a message older than the cutoff, on the assumption everything
 * after it is older still — a reasonable approximation for a monthly
 * dashboard stat, not an exact audit count. */
async function countMessages(label: "SENT" | "INBOX", cutoffMs: number): Promise<number> {
  const client = getOAuthClient();
  const { token } = await client.getAccessToken();
  if (!token) throw new Error("Failed to get Gmail access token");

  let total = 0;
  let pageToken: string | undefined;
  let pagesScanned = 0;

  do {
    const listUrl = new URL("https://gmail.googleapis.com/gmail/v1/users/me/messages");
    listUrl.searchParams.set("labelIds", label);
    listUrl.searchParams.set("maxResults", "100");
    if (pageToken) listUrl.searchParams.set("pageToken", pageToken);

    const listData = (await fetchJson(listUrl.toString(), token)) as {
      messages?: { id: string }[];
      nextPageToken?: string;
    };
    const messages = listData.messages ?? [];
    if (messages.length === 0) break;

    const dates = await Promise.all(
      messages.map(async (m) => {
        const metaUrl = `https://gmail.googleapis.com/gmail/v1/users/me/messages/${m.id}?format=metadata&fields=internalDate`;
        try {
          const meta = (await fetchJson(metaUrl, token)) as { internalDate?: string };
          return Number(meta.internalDate ?? 0);
        } catch {
          return null; // skip messages we fail to read metadata for
        }
      })
    );

    let sawOlder = false;
    for (const ts of dates) {
      if (ts === null) continue;
      if (ts >= cutoffMs) {
        total++;
      } else {
        sawOlder = true;
      }
    }

    pagesScanned++;
    pageToken = sawOlder || pagesScanned >= MAX_PAGES ? undefined : listData.nextPageToken;
  } while (pageToken);

  return total;
}

/** The email address of the Gmail account this integration is authenticated
 * as — fetched live rather than hardcoded, so it stays accurate if the
 * connected inbox is ever swapped without a code change. */
async function fetchAccountEmail(): Promise<string> {
  const client = getOAuthClient();
  const { token } = await client.getAccessToken();
  if (!token) throw new Error("Failed to get Gmail access token");

  const profile = (await fetchJson(
    "https://gmail.googleapis.com/gmail/v1/users/me/profile",
    token
  )) as { emailAddress?: string };
  return profile.emailAddress ?? "unknown";
}

export type EmailCounts = { sent: number; received: number; account: string };

/** Sent + received message counts for the current calendar month, via
 * Gmail's SENT/INBOX labels. "Received" reflects mail landing in the
 * inbox, not a true unique-sender count. */
export async function fetchEmailCountsThisMonth(): Promise<EmailCounts> {
  const now = new Date();
  const cutoff = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

  const [sent, received, account] = await Promise.all([
    countMessages("SENT", cutoff),
    countMessages("INBOX", cutoff),
    fetchAccountEmail(),
  ]);

  return { sent, received, account };
}
