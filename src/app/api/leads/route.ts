import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Rate limiting: max 30 submissions per key per hour — generous for a
// single client's real contact-form volume, tight enough to blunt abuse of
// a leaked key. Same in-memory pattern as /api/contact (resets on redeploy).
const rateLimit = new Map<string, { count: number; resetAt: number }>();

const MAX_FIELD_LEN = 2000;

function clamp(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, MAX_FIELD_LEN);
}

// Called server-to-server from a client's own website (their WordPress
// install, not a browser on spectecle.com) — no session, no Origin check.
// The lead_capture_key plays the role a session normally would.
export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
    const key = typeof body?.key === "string" ? body.key.trim() : "";
    if (!key) {
      return NextResponse.json({ error: "Missing key" }, { status: 401 });
    }

    const { data: org } = await supabase
      .from("organizations")
      .select("id")
      .eq("lead_capture_key", key)
      .maybeSingle();
    if (!org) {
      console.warn("[leads] rejected: unknown key");
      return NextResponse.json({ error: "Invalid key" }, { status: 401 });
    }

    const now = Date.now();
    const bucket = rateLimit.get(key);
    if (bucket) {
      if (now < bucket.resetAt) {
        if (bucket.count >= 30) {
          console.warn("[leads] rejected: rate limited", { organizationId: org.id });
          return NextResponse.json({ error: "Too many submissions" }, { status: 429 });
        }
        bucket.count++;
      } else {
        rateLimit.set(key, { count: 1, resetAt: now + 3_600_000 });
      }
    } else {
      rateLimit.set(key, { count: 1, resetAt: now + 3_600_000 });
    }

    const name = clamp(body?.name);
    const email = clamp(body?.email);
    const phone = clamp(body?.phone);
    const message = clamp(body?.message);
    const source = clamp(body?.source) ?? "contact_form";

    if (!message && !name && !email) {
      return NextResponse.json({ error: "Empty submission" }, { status: 400 });
    }

    const { error } = await supabase.from("leads").insert({
      organization_id: org.id,
      name,
      email,
      phone,
      message,
      source,
    });
    if (error) {
      console.error("[leads] insert error:", error);
      return NextResponse.json({ error: "Failed to store lead" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[leads] error:", err);
    return NextResponse.json({ error: "Failed to store lead" }, { status: 500 });
  }
}
