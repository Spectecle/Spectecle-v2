import { randomBytes, createHash } from "crypto";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

export const SESSION_COOKIE = "portal_session";
const MAGIC_LINK_TTL_MS = 15 * 60 * 1000;
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

export type PortalUser = {
  id: string;
  email: string;
  name: string | null;
};

function generateToken(): string {
  return randomBytes(32).toString("base64url");
}

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

/** Closed allow-list — only pre-registered, active emails (seeded/invited by an admin) can sign in. No auto-provisioning. */
export async function findUser(email: string): Promise<PortalUser | null> {
  const normalizedEmail = email.trim().toLowerCase();

  const { data } = await supabase
    .from("portal_users")
    .select("id, email, name")
    .eq("email", normalizedEmail)
    .eq("status", "active")
    .maybeSingle();

  return data ?? null;
}

export async function createMagicLink(userId: string): Promise<string> {
  const token = generateToken();
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + MAGIC_LINK_TTL_MS).toISOString();

  await supabase.from("magic_link_tokens").insert({
    user_id: userId,
    token_hash: tokenHash,
    expires_at: expiresAt,
  });

  // Best-effort cleanup of stale tokens — no cron in this project.
  await supabase
    .from("magic_link_tokens")
    .delete()
    .lt("expires_at", new Date().toISOString());

  return token;
}

/** Read-only validity check for the verify page's initial GET — does not consume the token. */
export async function peekToken(token: string): Promise<boolean> {
  const tokenHash = hashToken(token);
  const { data } = await supabase
    .from("magic_link_tokens")
    .select("expires_at, used_at")
    .eq("token_hash", tokenHash)
    .maybeSingle();

  if (!data || data.used_at) return false;
  return new Date(data.expires_at) > new Date();
}

/** Consumes a magic-link token, creates a session, and returns the signed-in user. Must only be called from a POST (real user gesture). */
export async function consumeTokenAndCreateSession(
  token: string
): Promise<PortalUser | null> {
  const tokenHash = hashToken(token);
  const { data: linkRow } = await supabase
    .from("magic_link_tokens")
    .select("id, user_id, expires_at, used_at")
    .eq("token_hash", tokenHash)
    .maybeSingle();

  if (!linkRow || linkRow.used_at || new Date(linkRow.expires_at) <= new Date()) {
    return null;
  }

  const { data: user } = await supabase
    .from("portal_users")
    .select("id, email, name")
    .eq("id", linkRow.user_id)
    .eq("status", "active")
    .maybeSingle();

  if (!user) return null;

  await supabase
    .from("magic_link_tokens")
    .update({ used_at: new Date().toISOString() })
    .eq("id", linkRow.id);

  await createSession(user.id);
  return user;
}

export async function createSession(userId: string): Promise<string> {
  const token = generateToken();
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();

  await supabase.from("sessions").insert({
    user_id: userId,
    token_hash: tokenHash,
    expires_at: expiresAt,
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(expiresAt),
  });

  return token;
}

export async function getSession(): Promise<PortalUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const tokenHash = hashToken(token);
  const { data: sessionRow } = await supabase
    .from("sessions")
    .select("user_id, expires_at")
    .eq("token_hash", tokenHash)
    .maybeSingle();

  if (!sessionRow) return null;

  if (new Date(sessionRow.expires_at) <= new Date()) {
    await supabase.from("sessions").delete().eq("token_hash", tokenHash);
    return null;
  }

  const { data: user } = await supabase
    .from("portal_users")
    .select("id, email, name")
    .eq("id", sessionRow.user_id)
    .eq("status", "active")
    .maybeSingle();

  return user ?? null;
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (token) {
    await supabase.from("sessions").delete().eq("token_hash", hashToken(token));
  }

  cookieStore.delete(SESSION_COOKIE);
}

export function isAdmin(email: string): boolean {
  const adminEmails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return adminEmails.includes(email.trim().toLowerCase());
}
