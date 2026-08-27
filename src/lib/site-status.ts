import tls from "tls";
import { URL } from "url";

function normalizeUrl(url: string): string {
  return url.startsWith("http") ? url : `https://${url}`;
}

// Uptime is deliberately NOT checked server-side. Confirmed live against a
// real client site (dearborncleaners.com): its host's WAF/security plugin
// blocks Vercel's serverless IP range specifically — a plain request with no
// custom headers gets 200 from a normal network, 403 from Vercel — while
// real visitors are never affected. There's no reliable server-side fix for
// that (Vercel's IPs are a large, shared, unpublished, rotating pool that
// can't be allowlisted), so uptime is checked from the viewer's own browser
// instead (see UptimeCard.tsx) — the same network path a real visitor uses,
// which sidesteps datacenter-IP blocking entirely rather than just
// relabeling it.

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
