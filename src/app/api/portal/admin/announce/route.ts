import { Resend } from "resend";
import { NextResponse } from "next/server";
import { getSession, isAdmin, createMagicLink } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { isTrustedOrigin } from "@/lib/origin-check";
import { esc, wrapEmailDocument } from "@/lib/email-html";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = `Hello from Spectecle <${process.env.RESEND_FROM ?? "onboarding@resend.dev"}>`;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://spectecle.com";

function announcementHtml(email: string, link: string) {
  const preheader =
    "Request services, track progress, and message us directly — all from one new portal.";

  const body = `
<div style="background-color:#f4f1e9;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;color:#f4f1e9;font-size:1px;line-height:1px;">${esc(preheader)}</div>
  <table role="presentation" width="100%" style="max-width:600px;margin:0 auto;border-collapse:collapse;">
    <tr>
      <td style="padding:0 0 28px;text-align:center;">
        <table role="presentation" style="margin:0 auto;border-collapse:collapse;">
          <tr>
            <td style="padding-right:10px;vertical-align:middle;">
              <img src="${SITE_URL}/logo-email.png" width="40" height="40" alt="" style="display:block;border:0;" />
            </td>
            <td style="vertical-align:middle;">
              <span style="color:#1e1e1e;font-size:21px;font-weight:800;letter-spacing:0.3px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">Spectecle</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="background-color:#fdfbf5;border-radius:16px;">
        <table role="presentation" width="100%" style="border-collapse:collapse;">
          <tr>
            <td style="background-color:#f87444;background-image:linear-gradient(135deg,#d9b568,#f87444);padding:40px 40px 32px;border-radius:16px 16px 0 0;text-align:center;">
              <p style="margin:0 0 10px;color:rgba(255,255,255,0.85);font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Now Live</p>
              <h1 style="margin:0;color:#1e1e1e;font-size:26px;font-weight:800;line-height:1.3;">Your New Client Portal Is Here</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 40px 8px;">
              <p style="margin:0 0 24px;color:#cbd5e1;font-size:15px;line-height:1.7;">
                We've built a dedicated home for everything you need from us — request new work, track progress in real time, and message our team directly, all in one place.
              </p>

              <table role="presentation" width="100%" style="border-collapse:collapse;background-color:#1a0d08;border:1px solid rgba(198,153,71,0.3);border-radius:10px;margin:0 0 28px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0 0 4px;color:#38190c;font-size:11px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;">Your Sign-In Email</p>
                    <p style="margin:0;color:#1e1e1e;font-size:16px;font-weight:600;">${esc(email)}</p>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" style="border-collapse:collapse;margin:0 0 20px;">
                <tr>
                  <td align="center">
                    <a href="${link}" style="display:inline-block;background-color:#f87444;background-image:linear-gradient(135deg,#d9b568,#f87444);color:#1e1e1e;text-decoration:none;padding:16px 44px;border-radius:10px;font-weight:700;font-size:16px;">
                      Sign In to Your Portal &rarr;
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 32px;color:#64748b;font-size:12.5px;line-height:1.6;text-align:center;">
                No password needed — this link signs you in instantly. It expires in 15 minutes; after that, just visit spectecle.com/portal and enter your email above to get a new one anytime.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 40px;">
              <div style="border-top:1px solid rgba(255,255,255,0.08);"></div>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 40px 36px;">
              <p style="margin:0 0 20px;color:#1e1e1e;font-size:12.5px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;">What you can do</p>
              <table role="presentation" width="100%" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:0 12px 18px 0;vertical-align:top;width:32px;">
                    <div style="width:26px;height:26px;background-color:rgba(198,153,71,0.15);border-radius:8px;text-align:center;line-height:26px;color:#38190c;font-size:13px;font-weight:700;">&#10003;</div>
                  </td>
                  <td style="padding:0 0 18px;vertical-align:top;">
                    <p style="margin:0;color:#e2e8f0;font-size:14.5px;font-weight:600;">Submit a new request</p>
                    <p style="margin:3px 0 0;color:#94a3b8;font-size:13.5px;line-height:1.5;">Website changes, SEO, paid ads — whatever you need, logged in seconds.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 12px 18px 0;vertical-align:top;">
                    <div style="width:26px;height:26px;background-color:rgba(198,153,71,0.15);border-radius:8px;text-align:center;line-height:26px;color:#38190c;font-size:13px;font-weight:700;">&#10003;</div>
                  </td>
                  <td style="padding:0 0 18px;vertical-align:top;">
                    <p style="margin:0;color:#e2e8f0;font-size:14.5px;font-weight:600;">Track real-time status</p>
                    <p style="margin:3px 0 0;color:#94a3b8;font-size:13.5px;line-height:1.5;">See exactly where each request stands — New, In Progress, or Done.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 12px 0 0;vertical-align:top;">
                    <div style="width:26px;height:26px;background-color:rgba(198,153,71,0.15);border-radius:8px;text-align:center;line-height:26px;color:#38190c;font-size:13px;font-weight:700;">&#10003;</div>
                  </td>
                  <td style="padding:0;vertical-align:top;">
                    <p style="margin:0;color:#e2e8f0;font-size:14.5px;font-weight:600;">Message us directly</p>
                    <p style="margin:3px 0 0;color:#94a3b8;font-size:13.5px;line-height:1.5;">Reply on any request and attach files or screenshots — no more digging through email threads.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:28px 12px 0;text-align:center;">
        <p style="margin:0 0 4px;color:#475569;font-size:12px;">Spectecle</p>
        <p style="margin:0;color:#475569;font-size:12px;">Questions? Reply to this email — we read every one.</p>
      </td>
    </tr>
  </table>
</div>
`;
  return wrapEmailDocument(body, "Introducing Your New Spectecle Client Portal");
}

export async function POST(req: Request) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const admin = await getSession();
  if (!admin || !isAdmin(admin.email)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = (await req.json().catch(() => null)) as { targetEmail?: string } | null;
  const targetEmail = body?.targetEmail?.trim().toLowerCase();

  const recipientsQuery = supabase
    .from("portal_users")
    .select("id, email")
    .eq("status", "active");

  const { data: recipients } = targetEmail
    ? await recipientsQuery.eq("email", targetEmail)
    : await recipientsQuery.neq("email", admin.email);

  if (targetEmail && (!recipients || recipients.length === 0)) {
    return NextResponse.json(
      { error: "That email isn't a registered active client" },
      { status: 400 }
    );
  }

  if (!recipients || recipients.length === 0) {
    return NextResponse.json({ sent: 0, failed: [] });
  }

  const failed: string[] = [];
  let sent = 0;

  // Sequential, not Promise.all — keeps well under Resend's rate limit and
  // this list is small enough that latency doesn't matter here.
  for (const recipient of recipients) {
    try {
      const token = await createMagicLink(recipient.id);
      const link = `${SITE_URL}/portal/verify?token=${encodeURIComponent(token)}`;

      const { error: sendError } = await resend.emails.send({
        from: FROM,
        to: [recipient.email],
        subject: "Introducing Your New Spectecle Client Portal",
        html: announcementHtml(recipient.email, link),
      });

      if (sendError) {
        console.error("[portal/admin/announce] Resend error:", recipient.email, sendError);
        failed.push(recipient.email);
      } else {
        sent++;
      }
    } catch (err) {
      console.error("[portal/admin/announce] error:", recipient.email, err);
      failed.push(recipient.email);
    }
  }

  return NextResponse.json({ sent, failed });
}
