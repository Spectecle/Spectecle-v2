import { Resend } from "resend";
import { NextResponse } from "next/server";
import { getSession, isAdmin, createMagicLink } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { isTrustedOrigin } from "@/lib/origin-check";
import { esc } from "@/lib/email-html";
import { UPLOAD_BUCKET } from "@/lib/uploads";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = `Hello from Spectecle <${process.env.RESEND_FROM ?? "onboarding@resend.dev"}>`;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://spectecle.com";
const PRIVACY_URL = `${SITE_URL}/privacy`;
const TERMS_URL = `${SITE_URL}/terms`;
const GOOGLE_REVIEW_URL =
  process.env.GOOGLE_REVIEW_URL ?? "https://g.page/r/CbSs-g26jjLnEBM/review";
const CONTRACT_URL_EXPIRY_SECONDS = 60 * 60 * 24 * 30; // 30 days — a client may open this well after send

type LetterTemplate = "onboarding" | "complete" | "reminder";

type ContractFile = { path: string; name: string };

type LetterBody = {
  userId?: string;
  template?: LetterTemplate;
  businessName?: string;
  subject?: string;
  note?: string;
  invoiceBalance?: string;
  invoiceNumber?: string;
  dueDate?: string;
  invoiceLink?: string;
  pastDue?: boolean;
  contracts?: ContractFile[];
  preview?: boolean;
};

// Same email-safe color/type system as the other transactional emails
// (monthly report, contact auto-reply) — literal site token values (no CSS
// variables, tables instead of flex/grid) so this actually matches the
// site's theme and stays legible across every mail client.
const COLOR = {
  bg: "#efe6d3",
  card: "#f7f2e9",
  border: "#e4d8bd",
  textPrimary: "#211a13",
  textSecondary: "#5b4e3f",
  textMuted: "#8b7e6a",
  accent: "#9a5423",
  accentStrong: "#7a4119",
};

function emailShell(preheader: string, eyebrow: string, headline: string, bodyHtml: string) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>${esc(headline)}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@400;500&family=Hanken+Grotesk:wght@400;500;600&display=swap');
  body { margin:0; padding:0; background:${COLOR.bg}; }
  a { color:${COLOR.accentStrong}; }
</style>
</head>
<body style="margin:0;padding:0;background:${COLOR.bg};">
  <div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:${COLOR.bg};">${esc(preheader)}</div>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${COLOR.bg};">
    <tr>
      <td align="center" style="padding:48px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;background:${COLOR.card};border:1px solid ${COLOR.border};">
          <tr>
            <td style="padding:44px 44px 8px;">
              <div style="font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:${COLOR.accent};margin-bottom:14px;">${esc(eyebrow)}</div>
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.25;color:${COLOR.textPrimary};font-weight:400;">${esc(headline)}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 44px 44px;">
              ${bodyHtml}
            </td>
          </tr>
        </table>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;">
          <tr>
            <td style="padding:24px 10px 0;font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:12px;color:${COLOR.textMuted};text-align:center;">
              Spectecle &middot; spectecle.com<br>
              Questions? Reply to this email &mdash; we read every one.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function noteBlock(note: string) {
  if (!note.trim()) return "";
  return `<p style="margin:0 0 24px;font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:${COLOR.textSecondary};white-space:pre-wrap;">${esc(note)}</p>`;
}

function sectionHeading(text: string) {
  return `<div style="font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${COLOR.accent};font-weight:600;margin-bottom:14px;">${esc(text)}</div>`;
}

function divider() {
  return `<div style="border-top:1px solid ${COLOR.border};margin:28px 0;line-height:0;font-size:0;">&nbsp;</div>`;
}

function termsAndDocumentsSection(contractLinks: { name: string; url: string }[]) {
  const contractRows = contractLinks
    .map(
      (c, i) => `
      <tr>
        <td style="padding:${i > 0 ? "8px 0 0" : "0"};">
          <table role="presentation" width="100%" style="border-collapse:collapse;">
            <tr>
              <td style="padding:12px 16px;background-color:${COLOR.bg};border:1px solid ${COLOR.border};">
                <a href="${esc(c.url)}" style="font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;color:${COLOR.accentStrong};text-decoration:none;font-weight:600;font-size:14px;">&#128206; ${esc(c.name)}</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
    )
    .join("");

  return `
    ${sectionHeading("Terms & Documents")}
    <p style="margin:0 0 ${contractLinks.length > 0 ? "16" : "24"}px;font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:13.5px;line-height:1.7;color:${COLOR.textSecondary};">
      Please review our <a href="${TERMS_URL}" style="color:${COLOR.accentStrong};">Terms &amp; Conditions</a> and <a href="${PRIVACY_URL}" style="color:${COLOR.accentStrong};">Privacy Policy</a> for details on how we handle your information.
    </p>
    ${
      contractLinks.length > 0
        ? `<table role="presentation" width="100%" style="border-collapse:collapse;margin:0 0 24px;">${contractRows}</table>`
        : ""
    }
    ${divider()}
  `;
}

function portalIntroBlock(email: string, link: string) {
  return `
    ${sectionHeading("Your Client Portal")}
    <p style="margin:0 0 20px;font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:14.5px;line-height:1.7;color:${COLOR.textSecondary};">
      Use the Spectecle portal to request website changes or edits, ask for new services, track the status of every request, and message us directly &mdash; all in one place.
    </p>
    <table role="presentation" width="100%" style="border-collapse:collapse;background-color:${COLOR.bg};border:1px solid ${COLOR.border};margin:0 0 24px;">
      <tr>
        <td style="padding:16px 20px;text-align:center;">
          <div style="font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;color:${COLOR.accent};margin-bottom:4px;">Your Sign-In Email</div>
          <div style="font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:16px;font-weight:600;color:${COLOR.textPrimary};">${esc(email)}</div>
        </td>
      </tr>
    </table>
    <table role="presentation" width="100%" style="border-collapse:collapse;margin:0 0 16px;">
      <tr>
        <td align="center">
          <a href="${link}" style="display:inline-block;background-color:${COLOR.accent};color:${COLOR.card};text-decoration:none;padding:16px 44px;font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-weight:700;font-size:16px;">
            Sign In to Your Portal &rarr;
          </a>
        </td>
      </tr>
    </table>
    <p style="margin:0;font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:12.5px;line-height:1.6;color:${COLOR.textMuted};text-align:center;">
      No password needed &mdash; this link signs you in instantly. It expires in 15 minutes; after that, just visit spectecle.com/portal and enter your email above to get a new one anytime.
    </p>
  `;
}

function onboardingLetterHtml({
  businessName,
  email,
  note,
  link,
  contractLinks,
}: {
  businessName: string;
  email: string;
  note: string;
  link: string;
  contractLinks: { name: string; url: string }[];
}) {
  const body = `
    <p style="margin:0 0 4px;font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:13px;color:${COLOR.textMuted};">Hi ${esc(businessName)},</p>
    ${noteBlock(
      note ||
        "Welcome to Spectecle! We're excited to get started — here's your portal so you always know where things stand."
    )}
    ${contractLinks.length > 0 ? termsAndDocumentsSection(contractLinks) : ""}
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
  invoiceNumber,
  dueDate,
  invoiceLink,
  contractLinks,
}: {
  businessName: string;
  email: string;
  note: string;
  link: string;
  invoiceBalance?: string;
  invoiceNumber?: string;
  dueDate?: string;
  invoiceLink?: string;
  contractLinks: { name: string; url: string }[];
}) {
  const hasMeta = !!(invoiceNumber?.trim() || dueDate?.trim());

  const amountCell = `
    <div style="font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;color:${COLOR.accent};margin-bottom:4px;">Amount Due</div>
    <div style="font-family:Georgia,'Times New Roman',serif;font-size:24px;color:${COLOR.textPrimary};margin-bottom:${invoiceLink?.trim() ? "12" : "0"}px;">${esc(invoiceBalance ?? "")}</div>
    ${
      invoiceLink?.trim()
        ? `<a href="${esc(invoiceLink)}" style="display:inline-block;background-color:${COLOR.accent};color:${COLOR.card};text-decoration:none;padding:10px 20px;font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-weight:600;font-size:13.5px;">Pay Invoice &rarr;</a>`
        : ""
    }
  `;

  const metaCell = `
    ${
      invoiceNumber?.trim()
        ? `<div style="font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;color:${COLOR.accent};margin-bottom:4px;">Invoice #</div>
           <div style="font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;color:${COLOR.textPrimary};margin-bottom:12px;">${esc(invoiceNumber)}</div>`
        : ""
    }
    ${
      dueDate?.trim()
        ? `<div style="font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;color:${COLOR.accent};margin-bottom:4px;">Due Date</div>
           <div style="font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;color:${COLOR.textPrimary};">${esc(dueDate)}</div>`
        : ""
    }
  `;

  const invoiceSection = invoiceBalance?.trim()
    ? `
    ${sectionHeading("Remaining Balance")}
    <table role="presentation" width="100%" style="border-collapse:collapse;background-color:${COLOR.bg};border:1px solid ${COLOR.border};margin:0 0 24px;">
      <tr>
        <td style="padding:18px 20px;vertical-align:top;${hasMeta ? "width:55%;" : ""}">
          ${amountCell}
        </td>
        ${
          hasMeta
            ? `<td style="padding:18px 20px;vertical-align:top;border-left:1px solid ${COLOR.border};">${metaCell}</td>`
            : ""
        }
      </tr>
    </table>
    ${divider()}
  `
    : "";

  const body = `
    <p style="margin:0 0 4px;font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:13px;color:${COLOR.textMuted};">Hi ${esc(businessName)},</p>
    ${noteBlock(
      note ||
        `We just wrapped up work on your project — thank you for choosing Spectecle, it's been a pleasure working with you.`
    )}

    ${termsAndDocumentsSection(contractLinks)}

    ${invoiceSection}

    <table role="presentation" width="100%" style="border-collapse:collapse;margin:0 0 28px;">
      <tr>
        <td style="text-align:center;">
          <p style="margin:0 0 12px;font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:14.5px;font-weight:600;color:${COLOR.textPrimary};">Enjoying working with us?</p>
          <a href="${esc(GOOGLE_REVIEW_URL)}" style="display:inline-block;background-color:transparent;border:1px solid ${COLOR.accent};color:${COLOR.accentStrong};text-decoration:none;padding:12px 28px;font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-weight:600;font-size:14px;">
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

function invoiceReminderLetterHtml({
  businessName,
  email,
  note,
  link,
  invoiceBalance,
  invoiceNumber,
  dueDate,
  invoiceLink,
  pastDue,
}: {
  businessName: string;
  email: string;
  note: string;
  link: string;
  invoiceBalance: string;
  invoiceNumber?: string;
  dueDate?: string;
  invoiceLink?: string;
  pastDue: boolean;
}) {
  const hasMeta = !!(invoiceNumber?.trim() || dueDate?.trim());

  const amountCell = `
    <div style="font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;color:${COLOR.accent};margin-bottom:4px;">${pastDue ? "Past Due Amount" : "Amount Due"}</div>
    <div style="font-family:Georgia,'Times New Roman',serif;font-size:26px;color:${COLOR.textPrimary};margin-bottom:${invoiceLink?.trim() ? "12" : "0"}px;">${esc(invoiceBalance)}</div>
    ${
      invoiceLink?.trim()
        ? `<a href="${esc(invoiceLink)}" style="display:inline-block;background-color:${COLOR.accent};color:${COLOR.card};text-decoration:none;padding:10px 20px;font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-weight:600;font-size:13.5px;">Pay Now &rarr;</a>`
        : ""
    }
  `;

  const metaCell = `
    ${
      invoiceNumber?.trim()
        ? `<div style="font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;color:${COLOR.accent};margin-bottom:4px;">Invoice #</div>
           <div style="font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;color:${COLOR.textPrimary};margin-bottom:12px;">${esc(invoiceNumber)}</div>`
        : ""
    }
    ${
      dueDate?.trim()
        ? `<div style="font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;color:${COLOR.accent};margin-bottom:4px;">${pastDue ? "Was Due" : "Due Date"}</div>
           <div style="font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;color:${COLOR.textPrimary};">${esc(dueDate)}</div>`
        : ""
    }
  `;

  const invoiceSection = `
    ${sectionHeading(pastDue ? "Past Due Balance" : "Balance Due")}
    <table role="presentation" width="100%" style="border-collapse:collapse;background-color:${COLOR.bg};border:1px solid ${COLOR.border};margin:0 0 16px;">
      <tr>
        <td style="padding:18px 20px;vertical-align:top;${hasMeta ? "width:55%;" : ""}">
          ${amountCell}
        </td>
        ${
          hasMeta
            ? `<td style="padding:18px 20px;vertical-align:top;border-left:1px solid ${COLOR.border};">${metaCell}</td>`
            : ""
        }
      </tr>
    </table>
    <p style="margin:0 0 24px;font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:12.5px;line-height:1.6;color:${COLOR.textMuted};">
      This is the total needed to keep ${esc(businessName)}&rsquo;s website online and in good standing.
    </p>
    ${divider()}
  `;

  const body = `
    <p style="margin:0 0 4px;font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:13px;color:${COLOR.textMuted};">Hi ${esc(businessName)},</p>
    ${noteBlock(
      note ||
        (pastDue
          ? "This is a friendly reminder that your invoice is now past due. To keep your website online and avoid any interruption, please take care of the balance below at your earliest convenience."
          : "This is a friendly reminder that your invoice is coming due. To keep your website up and running without interruption, please take care of the balance below by the date noted.")
    )}

    ${invoiceSection}

    ${portalIntroBlock(email, link)}
  `;

  return emailShell(
    pastDue ? "Your Spectecle invoice is past due — action needed." : "Your Spectecle invoice is due soon.",
    pastDue ? "Past Due" : "Payment Reminder",
    pastDue ? `Action Needed, ${businessName}` : `Invoice Reminder, ${businessName}`,
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
  const invoiceNumber = body?.invoiceNumber?.trim();
  const dueDate = body?.dueDate?.trim();
  const invoiceLink = body?.invoiceLink?.trim();
  const pastDue = body?.pastDue === true;
  const contracts = Array.isArray(body?.contracts) ? body.contracts : [];
  const preview = body?.preview === true;

  if (
    !userId ||
    (template !== "onboarding" && template !== "complete" && template !== "reminder") ||
    !businessName ||
    !subject
  ) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  if (template === "reminder" && !invoiceBalance) {
    return NextResponse.json({ error: "Invoice balance is required for a reminder email" }, { status: 400 });
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

  const contractLinks = preview
    ? contracts.map((c) => ({ name: c.name, url: "#" }))
    : await Promise.all(
        contracts.map(async (c) => {
          const { data } = await supabase.storage
            .from(UPLOAD_BUCKET)
            .createSignedUrl(c.path, CONTRACT_URL_EXPIRY_SECONDS);
          return { name: c.name, url: data?.signedUrl ?? "#" };
        })
      );

  const html =
    template === "onboarding"
      ? onboardingLetterHtml({ businessName, email: recipient.email, note, link, contractLinks })
      : template === "reminder"
      ? invoiceReminderLetterHtml({
          businessName,
          email: recipient.email,
          note,
          link,
          invoiceBalance: invoiceBalance!,
          invoiceNumber,
          dueDate,
          invoiceLink,
          pastDue,
        })
      : projectCompleteLetterHtml({
          businessName,
          email: recipient.email,
          note,
          link,
          invoiceBalance,
          invoiceNumber,
          dueDate,
          invoiceLink,
          contractLinks,
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
