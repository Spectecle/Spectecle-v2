import { NextRequest, NextResponse } from "next/server";

// Kept as a local literal (not imported from src/lib/auth.ts) — Next.js
// recommends Proxy not rely on shared modules/globals, and it runs on every
// matched request, so this stays a cheap cookie-presence check only. The
// authoritative, DB-backed session check happens in each protected
// Server Component/Route Handler via getSession().
const SESSION_COOKIE = "portal_session";

export function proxy(req: NextRequest) {
  const hasSession = req.cookies.has(SESSION_COOKIE);

  if (!hasSession) {
    const signInUrl = new URL("/portal/sign-in", req.url);
    signInUrl.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/portal/dashboard", "/portal/request", "/portal/admin"],
};
