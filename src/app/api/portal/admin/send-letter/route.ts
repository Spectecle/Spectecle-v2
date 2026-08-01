import { Resend } from "resend";
import { NextResponse } from "next/server";
import { getSession, isAdmin, createMagicLink } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { isTrustedOrigin } from "@/lib/origin-check";
import { esc } from "@/lib/email-html";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = `Hello from Spectecle <${process.env.RESEND_FROM ?? "onboarding@resend.dev"}>`;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://spectecle.com";
const GOOGLE_REVIEW_URL =
  process.env.GOOGLE_REVIEW_URL ?? "https://g.page/r/CbSs-g26jjLnEBM/review";

// First-draft wording — confirm with Walid before relying on this for real
// clients, it was drafted from a description of the verbal/prior agreement,
// not the original terms document.
const TERMS_TEXT =
  "This project is now complete. This delivery does not include ongoing " +
  "website maintenance, content management, or any other add-on services. " +
  "Any future edits, updates, or troubleshooting will be billed at an " +
  "hourly rate of $100.00.";

type LetterTemplate = "onboarding" | "complete";

type LetterBody = {
  userId?: string;
  template?: LetterTemplate;
  businessName?: string;
  subject?: string;
  note?: string;
  invoiceBalance?: string;
  invoiceLink?: string;
  preview?: boolean;
};

function emailShell(preheader: string, heroEyebrow: string, heroTitle: string, bodyHtml: string) {
  return `
<div style="background-color:#040408;padding:40px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;color:#040408;font-size:1px;line-height:1px;">${esc(preheader)}</div>
  <table role="presentation" width="100%" style="max-width:600px;margin:0 auto;border-collapse:collapse;">
    <tr>
      <td style="padding:0 0 28px;text-align:center;">
        <table role="presentation" style="margin:0 auto;border-collapse:collapse;">
          <tr>
            <td style="padding-right:10px;vertical-align:middle;">
              <img src="${SITE_URL}/logo-email.png" width="17" height="48" alt="" style="display:block;border:0;" />
            </td>
            <td style="vertical-align:middle;">
              <span style="color:#ffffff;font-size:21px;font-weight:800;letter-spacing:0.3px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">Spectecle</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="background-color:#0e0e1a;border-radius:16px;">
        <table role="presentation" width="100%" style="border-collapse:collapse;">
          <tr>
            <td style="background-color:#D25124;background-image:linear-gradient(135deg,#FF9A3A,#D25124);padding:40px 40px 32px;border-radius:16px 16px 0 0;text-align:center;">
              <p style="margin:0 0 10px;color:rgba(255,255,255,0.85);font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">${esc(heroEyebrow)}</p>
              <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:800;line-height:1.3;">${esc(heroTitle)}</h1>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 40px 36px;">
              ${bodyHtml}
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:28px 12px 0;text-align:center;">
        <p style="margin:0 0 4px;color:#475569;font-size:12px;">Spectecle · Detroit, MI</p>
        <p style="margin:0;color:#475569;font-size:12px;">Questions? Reply to this email — we read every one.</p>
      </td>
    </tr>
  </table>
</div>
`;
}

function noteBlock(note: string) {
  if (!note.trim()) return "";
  return `<p style="margin:0 0 24px;color:#cbd5e1;font-size:15px;line-height:1.7;white-space:pre-wrap;">${esc(note)}</p>`;
}

function sectionHeading(text: string) {
  return `<p style="margin:0 0 14px;color:#ffffff;font-size:12.5px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;">${esc(text)}</p>`;
}

function divider() {
  return `<div style="border-top:1px solid rgba(255,255,255,0.08);margin:28px 0;"></div>`;
}

function portalIntroBlock(email: string, link: string) {
  return `
    ${sectionHeading("Your Client Portal")}
    <p style="margin:0 0 20px;color:#cbd5e1;font-size:14.5px;line-height:1.7;">
      Use the Spectecle portal to request website changes or edits, ask for new services, track the status of every request, and message us directly — all in one place.
    </p>
    <table role="presentation" width="100%" style="border-collapse:collapse;background-color:#1a0d08;border:1px solid rgba(210,81,36,0.3);border-radius:10px;margin:0 0 24px;">
      <tr>
        <td style="padding:16px 20px;">
          <p style="margin:0 0 4px;color:#F07A3A;font-size:11px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;">Your Sign-In Email</p>
          <p style="margin:0;color:#ffffff;font-size:16px;font-weight:600;">${esc(email)}</p>
        </td>
      </tr>
    </table>
    <table role="presentation" width="100%" style="border-collapse:collapse;margin:0 0 16px;">
      <tr>
        <td align="center">
          <a href="${link}" style="display:inline-block;background-color:#D25124;background-image:linear-gradient(135deg,#FF9A3A,#D25124);color:#ffffff;text-decoration:none;padding:16px 44px;border-radius:10px;font-weight:700;font-size:16px;">
            Sign In to Your Portal &rarr;
          </a>
        </td>
      </tr>
    </table>
    <p style="margin:0;color:#64748b;font-size:12.5px;line-height:1.6;text-align:center;">
      No password needed — this link signs you in instantly. It expires in 15 minutes; after that, just visit spectecle.com/portal and enter your email above to get a new one anytime.
    </p>
  `;
}

function onboardingLetterHtml({
  businessName,
  email,
  note,
  link,
}: {
  businessName: string;
  email: string;
  note: string;
  link: string;
}) {
  const body = `
    <p style="margin:0 0 4px;color:#94a3b8;font-size:13px;">Hi ${esc(businessName)},</p>
    ${noteBlock(
      note ||
        "Welcome to Spectecle! We're excited to get started — here's your portal so you always know where things stand."
    )}
    ${portalIntroBlock(email, link)}
  `;
  return emailShell(
    "Welcome to Spectecle — your client portal is ready.",
    "Welcome",
    `Welcome to Spectecle, ${businessName}`,
    body
  );
}

function projectCompleteLetterHtml({
  businessName,
  email,
  note,
  link,
  invoiceBalance,
  invoiceLink,
}: {
  businessName: string;
  email: string;
  note: string;
  link: string;
  invoiceBalance?: string;
  invoiceLink?: string;
}) {
  const invoiceSection =
    invoiceBalance?.trim()
      ? `
    ${sectionHeading("Remaining Balance")}
    <table role="presentation" width="100%" style="border-collapse:collapse;background-color:#1a0d08;border:1px solid rgba(210,81,36,0.3);border-radius:10px;margin:0 0 24px;">
      <tr>
        <td style="padding:16px 20px;">
          <p style="margin:0 0 4px;color:#F07A3A;font-size:11px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;">Amount Due</p>
          <p style="margin:0 0 ${invoiceLink?.trim() ? "12" : "0"}px;color:#ffffff;font-size:20px;font-weight:700;">${esc(invoiceBalance)}</p>
          ${
            invoiceLink?.trim()
              ? `<a href="${esc(invoiceLink)}" style="display:inline-block;background-color:#D25124;color:#ffffff;text-decoration:none;padding:10px 20px;border-radius:8px;font-weight:600;font-size:13.5px;">Pay Invoice &rarr;</a>`
              : ""
          }
        </td>
      </tr>
    </table>
    ${divider()}
  `
      : "";

  const body = `
    <p style="margin:0 0 4px;color:#94a3b8;font-size:13px;">Hi ${esc(businessName)},</p>
    ${noteBlock(
      note ||
        `We just wrapped up work on your project — thank you for choosing Spectecle, it's been a pleasure working with you.`
    )}

    ${sectionHeading("Terms & Conditions")}
    <p style="margin:0 0 24px;color:#cbd5e1;font-size:13.5px;line-height:1.7;">${esc(TERMS_TEXT)}</p>
    ${divider()}

    ${invoiceSection}

    <table role="presentation" width="100%" style="border-collapse:collapse;margin:0 0 28px;">
      <tr>
        <td style="text-align:center;">
          <p style="margin:0 0 12px;color:#e2e8f0;font-size:14.5px;font-weight:600;">Enjoying working with us?</p>
          <a href="${esc(GOOGLE_REVIEW_URL)}" style="display:inline-block;background-color:transparent;border:1px solid rgba(210,81,36,0.4);color:#F07A3A;text-decoration:none;padding:12px 28px;border-radius:10px;font-weight:600;font-size:14px;">
            &#9733; Leave Us a Review
          </a>
        </td>
      </tr>
    </table>
    ${divider()}

    ${portalIntroBlock(email, link)}
  `;
  return emailShell(
    "Your project is complete — thank you from Spectecle.",
    "Project Complete",
    `Thank You, ${businessName}`,
    body
  );
}

export async function POST(req: Request) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const admin = await getSession();
  if (!admin || !isAdmin(admin.email)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = (await req.json().catch(() => null)) as LetterBody | null;
  const userId = body?.userId?.trim();
  const template = body?.template;
  const businessName = body?.businessName?.trim();
  const subject = body?.subject?.trim();
  const note = body?.note?.trim() ?? "";
  const invoiceBalance = body?.invoiceBalance?.trim();
  const invoiceLink = body?.invoiceLink?.trim();
  const preview = body?.preview === true;

  if (!userId || (template !== "onboarding" && template !== "complete") || !businessName || !subject) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { data: recipient } = await supabase
    .from("portal_users")
    .select("id, email")
    .eq("id", userId)
    .eq("status", "active")
    .maybeSingle();

  if (!recipient) {
    return NextResponse.json({ error: "Client not found" }, { status: 400 });
  }

  const link = preview
    ? "#"
    : `${SITE_URL}/portal/verify?token=${encodeURIComponent(await createMagicLink(recipient.id))}`;

  const html =
    template === "onboarding"
      ? onboardingLetterHtml({ businessName, email: recipient.email, note, link })
      : projectCompleteLetterHtml({
          businessName,
          email: recipient.email,
          note,
          link,
          invoiceBalance,
          invoiceLink,
        });

  if (preview) {
    return NextResponse.json({ html });
  }

  const { error: sendError } = await resend.emails.send({
    from: FROM,
    to: [recipient.email],
    subject,
    html,
  });

  if (sendError) {
    console.error("[portal/admin/send-letter] Resend error:", recipient.email, sendError);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
