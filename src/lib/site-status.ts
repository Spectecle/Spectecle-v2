import tls from "tls";
import { URL } from "url";

function normalizeUrl(url: string): string {
  return url.startsWith("http") ? url : `https://${url}`;
}

export type UptimeState = "up" | "blocked" | "down";
export type UptimeStatus = { state: UptimeState; statusCode: number | null; responseTimeMs: number | null };

const BLOCKED_STATUS_CODES = new Set([401, 403, 429]);

/** A single timed HTTP check — not historical uptime tracking, just "is it
 * up right now," fetched live on dashboard load the same way GA4's
 * realtime active-users check is. Deliberately sends no custom User-Agent —
 * tested against a real client site protected by a WAF/security plugin, a
 * plain unheadered request came back 200, while adding a realistic-looking
 * browser User-Agent (with no other browser-typical headers to back it up)
 * got 403'd as an impersonation attempt. Don't "fix" this by adding one.
 *
 * Confirmed against dearborncleaners.com (a real client site) that this can
 * still happen with no custom headers at all: a plain request from a normal
 * network gets 200, the identical request from Vercel's serverless IPs gets
 * 403 — the site's WAF/security plugin is blocking known datacenter IP
 * ranges, which Vercel's shared, unpublished, rotating IP pool falls under
 * and can't be allowlisted. That's a real signal (the check IS being
 * blocked) but not proof the site is actually down for real visitors, so a
 * 401/403/429 is reported as "blocked" rather than folded into "down" —
 * conflating the two would tell a client their live site is offline when
 * it's only this automated check that got refused. */
export async function checkUptime(url: string): Promise<UptimeStatus> {
  const target = normalizeUrl(url);
  const started = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const res = await fetch(target, { method: "GET", redirect: "follow", signal: controller.signal });
    const responseTimeMs = Date.now() - started;
    if (res.ok) {
      return { state: "up", statusCode: res.status, responseTimeMs };
    }
    if (BLOCKED_STATUS_CODES.has(res.status)) {
      console.warn(`[site-status] uptime check for ${target} was blocked: ${res.status} ${res.statusText}`);
      return { state: "blocked", statusCode: res.status, responseTimeMs };
    }
    console.warn(`[site-status] uptime check for ${target} got ${res.status} ${res.statusText}`);
    return { state: "down", statusCode: res.status, responseTimeMs };
  } catch (error) {
    console.error(`[site-status] uptime check for ${target} failed:`, error);
    return { state: "down", statusCode: null, responseTimeMs: null };
  } finally {
    clearTimeout(timeout);
  }
}

export type SslStatus = { valid: boolean; expiresAt: string | null; daysRemaining: number | null };

/** Opens a raw TLS handshake to read the certificate's expiry — a real
 * check of the cert actually served, not a third-party lookup service. */
export async function checkSslCertificate(url: string): Promise<SslStatus> {
  const hostname = new URL(normalizeUrl(url)).hostname;

  return new Promise((resolve) => {
    const socket = tls.connect(
      { host: hostname, port: 443, servername: hostname, timeout: 10_000 },
      () => {
        const cert = socket.getPeerCertificate();
        socket.end();
        if (!cert || !cert.valid_to) {
          resolve({ valid: false, expiresAt: null, daysRemaining: null });
          return;
        }
        const expiresAt = new Date(cert.valid_to);
        const daysRemaining = Math.floor((expiresAt.getTime() - Date.now()) / (24 * 60 * 60 * 1000));
        resolve({
          valid: socket.authorized && daysRemaining > 0,
          expiresAt: expiresAt.toISOString(),
          daysRemaining,
        });
      }
    );
    socket.on("error", () => resolve({ valid: false, expiresAt: null, daysRemaining: null }));
    socket.on("timeout", () => {
      socket.destroy();
      resolve({ valid: false, expiresAt: null, daysRemaining: null });
    });
  });
}

/** A PageSpeed Insights run takes 5-15+ seconds — too slow to fetch inline
 * on the server-rendered dashboard page, so this is only ever called from
 * the dedicated, client-triggered /api/portal/dashboard/pagespeed route. */
export async function fetchPageSpeedScore(url: string): Promise<number | null> {
  const target = normalizeUrl(url);
  const apiUrl = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  apiUrl.searchParams.set("url", target);
  apiUrl.searchParams.set("category", "performance");
  apiUrl.searchParams.set("strategy", "mobile");
  const apiKey = process.env.PAGESPEED_API_KEY;
  if (apiKey) apiUrl.searchParams.set("key", apiKey);

  const res = await fetch(apiUrl.toString());
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`PageSpeed API error: ${res.status} — ${body}`);
  }

  const data = (await res.json()) as {
    lighthouseResult?: { categories?: { performance?: { score?: number } } };
  };
  const score = data.lighthouseResult?.categories?.performance?.score;
  return typeof score === "number" ? Math.round(score * 100) : null;
}
