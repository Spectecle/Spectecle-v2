import { Resend } from "resend";
import { NextResponse } from "next/server";
import { findUser, createMagicLink } from "@/lib/auth";
import { isTrustedOrigin } from "@/lib/origin-check";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = `Hello from Spectecle <${process.env.RESEND_FROM ?? "onboarding@resend.dev"}>`;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://spectecle.com";

// Rate limiting: max 3 sign-in requests per IP per hour
const rateLimit = new Map<string, { count: number; resetAt: number }>();

function genericResponse() {
  return NextResponse.json({
    success: true,
    message: "If that email is registered, a sign-in link is on its way.",
  });
}

export async function POST(req: Request) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  try {
    const body = (await req.json()) as Record<string, string>;
    const { email, _honey, _ts } = body;

    // Honeypot — bots fill hidden fields, humans don't
    if (_honey) return genericResponse();

    // Time check — bots submit instantly (< 3 s)
    const elapsed = Date.now() - Number(_ts || 0);
    if (elapsed < 3000) return genericResponse();

    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Rate limiting by IP — max 3 per hour
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const now = Date.now();
    const bucket = rateLimit.get(ip);
    if (bucket) {
      if (now < bucket.resetAt) {
        if (bucket.count >= 3) {
          return NextResponse.json(
            { error: "Too many requests. Please try again later." },
            { status: 429 }
          );
        }
        bucket.count++;
      } else {
        rateLimit.set(ip, { count: 1, resetAt: now + 3_600_000 });
      }
    } else {
      rateLimit.set(ip, { count: 1, resetAt: now + 3_600_000 });
    }

    const user = await findUser(email);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          notRegistered: true,
          message: "This email doesn't have access to the client portal. Contact hello@spectecle.com if you think this is a mistake.",
        },
        { status: 403 }
      );
    }

    const token = await createMagicLink(user.id);
    const link = `${SITE_URL}/portal/verify?token=${encodeURIComponent(token)}`;

    const { error: sendError } = await resend.emails.send({
      from: FROM,
      to: [user.email],
      subject: "Sign in to your Spectecle client portal",
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;background:#fff;">
          <div style="border-left:4px solid #D25124;padding-left:16px;margin-bottom:28px;">
            <h2 style="margin:0 0 4px;color:#111;font-size:20px;">Sign in to Spectecle</h2>
            <p style="margin:0;color:#888;font-size:14px;">Client portal</p>
          </div>
          <p style="color:#333;font-size:15px;line-height:1.6;">Click the button below to sign in. This link expires in 15 minutes and can only be used once.</p>
          <p style="margin:28px 0;">
            <a href="${link}" style="display:inline-block;background:#D25124;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;font-size:15px;">Sign in</a>
          </p>
          <p style="color:#bbb;font-size:12px;">If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
    });

    // The Resend SDK doesn't throw on API errors — it returns { data, error }.
    // Log server-side for debugging; the client still gets the same generic
    // response either way (don't leak send failures to the caller).
    if (sendError) {
      console.error("[portal/auth/request-link] Resend error:", sendError);
    }

    return genericResponse();
  } catch (err) {
    console.error("[portal/auth/request-link] error:", err);
    // Still return the generic response — don't leak internal state via errors.
    return genericResponse();
  }
}
