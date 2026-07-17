// CSRF defense for cookie-authenticated mutating routes. Browsers always send
// Origin on fetch() POST/PATCH requests (including same-origin), so a missing
// or mismatched Origin is treated as untrusted.
export function isTrustedOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (!origin || !host) return false;

  const allowed = new Set(
    [process.env.NEXT_PUBLIC_SITE_URL, `http://${host}`, `https://${host}`].filter(
      Boolean
    )
  );
  return allowed.has(origin);
}
