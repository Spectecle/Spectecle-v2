import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";

const VIEW_AS_COOKIE = "portal_view_as";
const VIEW_AS_TTL_MS = 60 * 60 * 1000; // 1 hour — short-lived on purpose

export type ImpersonatedUser = { id: string; email: string };

/** Marks which client an admin is currently viewing the portal as. Caller
 * must already have verified the requester is an admin. */
export async function startImpersonating(userId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(VIEW_AS_COOKIE, userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(Date.now() + VIEW_AS_TTL_MS),
  });
}

export async function stopImpersonating(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(VIEW_AS_COOKIE);
}

/** Resolves the client currently being viewed-as, if any and still active. */
export async function getImpersonatedUser(): Promise<ImpersonatedUser | null> {
  const cookieStore = await cookies();
  const userId = cookieStore.get(VIEW_AS_COOKIE)?.value;
  if (!userId) return null;

  const { data: user } = await supabase
    .from("portal_users")
    .select("id, email")
    .eq("id", userId)
    .eq("status", "active")
    .maybeSingle();

  return user ?? null;
}
