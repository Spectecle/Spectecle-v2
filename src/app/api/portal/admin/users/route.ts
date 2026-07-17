import { Resend } from "resend";
import { NextResponse } from "next/server";
import { getSession, isAdmin, createMagicLink } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { isTrustedOrigin } from "@/lib/origin-check";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM ?? "onboarding@resend.dev";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://spectecle.com";

export async function POST(req: Request) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const user = await getSession();
  if (!user || !isAdmin(user.email)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = (await req.json().catch(() => null)) as { email?: string } | null;
  const email = body?.email?.trim().toLowerCase();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const { data: inserted, error: insertError } = await supabase
    .from("portal_users")
    .insert({ email })
    .select("id")
    .single();

  let userId = inserted?.id as string | undefined;

  if (insertError) {
    if (insertError.code !== "23505") {
      console.error("[portal/admin/users] insert error:", insertError);
      return NextResponse.json({ error: "Failed to add user" }, { status: 500 });
    }
    // Already registered — re-activate in case they were previously revoked,
    // and still send the welcome email below (acts as a "resend invite" too).
    const { data: existing, error: reactivateError } = await supabase
      .from("portal_users")
      .update({ status: "active" })
      .eq("email", email)
      .select("id")
      .single();
    if (reactivateError || !existing) {
      console.error("[portal/admin/users] reactivate error:", reactivateError);
      return NextResponse.json({ error: "Failed to add user" }, { status: 500 });
    }
    userId = existing.id;
  }

  if (!userId) {
    return NextResponse.json({ error: "Failed to add user" }, { status: 500 });
  }

  const token = await createMagicLink(userId);
  const link = `${SITE_URL}/portal/verify?token=${encodeURIComponent(token)}`;

  const { error: sendError } = await resend.emails.send({
    from: FROM,
    to: [email],
    subject: "You've been added to the Spectecle client portal",
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;background:#fff;">
        <div style="border-left:4px solid #D25124;padding-left:16px;margin-bottom:28px;">
          <h2 style="margin:0 0 4px;color:#111;font-size:20px;">Welcome to the Spectecle client portal</h2>
          <p style="margin:0;color:#888;font-size:14px;">You now have access</p>
        </div>
        <p style="color:#333;font-size:15px;line-height:1.6;">You can use the portal to request services, track progress on your requests, and message us directly. Click below to sign in — no password needed.</p>
        <p style="margin:28px 0;">
          <a href="${link}" style="display:inline-block;background:#D25124;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600;font-size:15px;">Sign in to the portal</a>
        </p>
        <p style="color:#bbb;font-size:12px;">This link expires in 15 minutes. If it's expired by the time you click it, just go to ${SITE_URL}/portal/sign-in and enter your email to get a new one.</p>
      </div>
    `,
  });

  if (sendError) {
    console.error("[portal/admin/users] Resend error:", sendError);
    return NextResponse.json(
      { success: true, emailWarning: "User added, but the welcome email failed to send." },
      { status: 200 }
    );
  }

  return NextResponse.json({ success: true });
}
