import { Resend } from "resend";
import { NextResponse } from "next/server";
import { getSession, isAdmin, createMagicLink } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { isTrustedOrigin } from "@/lib/origin-check";
import { esc, wrapEmailDocument } from "@/lib/email-html";
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

function emailShell(preheader: string, heroEyebrow: string, heroTitle: string, bodyHtml: string) {
  const doc = `
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
            <td style="background-color:#cb7c46;background-image:linear-gradient(135deg,#d9b568,#cb7c46);padding:40px 40px 32px;border-radius:16px 16px 0 0;text-align:center;">
              <p style="margin:0 0 10px;color:rgba(255,255,255,0.85);font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">${esc(heroEyebrow)}</p>
              <h1 style="margin:0;color:#1e1e1e;font-size:26px;font-weight:800;line-height:1.3;">${esc(heroTitle)}</h1>
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
        <p style="margin:0 0 4px;color:#475569;font-size:12px;">Spectecle</p>
        <p style="margin:0;color:#475569;font-size:12px;">Questions? Reply to this email &mdash; we read every one.</p>
      </td>
    </tr>
  </table>
</div>
`;
  return wrapEmailDocument(doc, heroTitle);
}

function noteBlock(note: string) {
  if (!note.trim()) return "";
  return `<p style="margin:0 0 24px;color:#cbd5e1;font-size:15px;line-height:1.7;white-space:pre-wrap;">${esc(note)}</p>`;
}

function sectionHeading(text: string) {
  return `<p style="margin:0 0 14px;color:#1e1e1e;font-size:12.5px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;">${esc(text)}</p>`;
}

function divider() {
  return `<div style="border-top:1px solid rgba(255,255,255,0.08);margin:28px 0;"></div>`;
}

function termsAndDocumentsSection(contractLinks: { name: string; url: string }[]) {
  const contractRows = contractLinks
    .map(
      (c, i) => `
      <tr>
        <td style="padding:${i > 0 ? "8px 0 0" : "0"};">
          <table role="presentation" width="100%" style="border-collapse:collapse;">
            <tr>
              <td style="padding:12px 16px;background-color:#1a0d08;border:1px solid rgba(198,153,71,0.3);border-radius:10px;">
                <a href="${esc(c.url)}" style="color:#38190c;text-decoration:none;font-weight:600;font-size:14px;">&#128206; ${esc(c.name)}</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
    )
    .join("");

  return `
    ${sectionHeading("Terms & Documents")}
    <p style="margin:0 0 ${contractLinks.length > 0 ? "16" : "24"}px;color:#cbd5e1;font-size:13.5px;line-height:1.7;">
      Please review our <a href="${TERMS_URL}" style="color:#38190c;">Terms & Conditions</a> and <a href="${PRIVACY_URL}" style="color:#38190c;">Privacy Policy</a> for details on how we handle your information.
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
    <p style="margin:0 0 20px;color:#cbd5e1;font-size:14.5px;line-height:1.7;">
      Use the Spectecle portal to request website changes or edits, ask for new services, track the status of every request, and message us directly &mdash; all in one place.
    </p>
    <table role="presentation" width="100%" style="border-collapse:collapse;background-color:#1a0d08;border:1px solid rgba(198,153,71,0.3);border-radius:10px;margin:0 0 24px;">
      <tr>
        <td style="padding:16px 20px;text-align:center;">
          <p style="margin:0 0 4px;color:#38190c;font-size:11px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;">Your Sign-In Email</p>
          <p style="margin:0;color:#1e1e1e;font-size:16px;font-weight:600;">${esc(email)}</p>
        </td>
      </tr>
    </table>
    <table role="presentation" width="100%" style="border-collapse:collapse;margin:0 0 16px;">
      <tr>
        <td align="center">
          <a href="${link}" style="display:inline-block;background-color:#cb7c46;background-image:linear-gradient(135deg,#d9b568,#cb7c46);color:#1e1e1e;text-decoration:none;padding:16px 44px;border-radius:10px;font-weight:700;font-size:16px;">
            Sign In to Your Portal &rarr;
          </a>
        </td>
      </tr>
    </table>
    <p style="margin:0;color:#64748b;font-size:12.5px;line-height:1.6;text-align:center;">
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
    <p style="margin:0 0 4px;color:#94a3b8;font-size:13px;">Hi ${esc(businessName)},</p>
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
    <p style="margin:0 0 4px;color:#38190c;font-size:11px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;">Amount Due</p>
    <p style="margin:0 0 ${invoiceLink?.trim() ? "12" : "0"}px;color:#1e1e1e;font-size:20px;font-weight:700;">${esc(invoiceBalance ?? "")}</p>
    ${
      invoiceLink?.trim()
        ? `<a href="${esc(invoiceLink)}" style="display:inline-block;background-color:#cb7c46;color:#1e1e1e;text-decoration:none;padding:10px 20px;border-radius:8px;font-weight:600;font-size:13.5px;">Pay Invoice &rarr;</a>`
        : ""
    }
  `;

  const metaCell = `
    ${
      invoiceNumber?.trim()
        ? `<p style="margin:0 0 4px;color:#38190c;font-size:11px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;">Invoice #</p>
           <p style="margin:0 0 12px;color:#1e1e1e;font-size:14px;font-weight:600;">${esc(invoiceNumber)}</p>`
        : ""
    }
    ${
      dueDate?.trim()
        ? `<p style="margin:0 0 4px;color:#38190c;font-size:11px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;">Due Date</p>
           <p style="margin:0;color:#1e1e1e;font-size:14px;font-weight:600;">${esc(dueDate)}</p>`
        : ""
    }
  `;

  const invoiceSection = invoiceBalance?.trim()
    ? `
    ${sectionHeading("Remaining Balance")}
    <table role="presentation" width="100%" style="border-collapse:collapse;background-color:#1a0d08;border:1px solid rgba(198,153,71,0.3);border-radius:10px;margin:0 0 24px;">
      <tr>
        <td style="padding:16px 20px;vertical-align:top;${hasMeta ? "width:55%;" : ""}">
          ${amountCell}
        </td>
        ${
          hasMeta
            ? `<td style="padding:16px 20px;vertical-align:top;border-left:1px solid rgba(198,153,71,0.3);">${metaCell}</td>`
            : ""
        }
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

    ${termsAndDocumentsSection(contractLinks)}

    ${invoiceSection}

    <table role="presentation" width="100%" style="border-collapse:collapse;margin:0 0 28px;">
      <tr>
        <td style="text-align:center;">
          <p style="margin:0 0 12px;color:#e2e8f0;font-size:14.5px;font-weight:600;">Enjoying working with us?</p>
          <a href="${esc(GOOGLE_REVIEW_URL)}" style="display:inline-block;background-color:transparent;border:1px solid rgba(198,153,71,0.4);color:#38190c;text-decoration:none;padding:12px 28px;border-radius:10px;font-weight:600;font-size:14px;">
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
  const boxBg = pastDue ? "#2a0e0a" : "#1a0d08";
  const boxBorder = pastDue ? "rgba(220,90,60,0.4)" : "rgba(198,153,71,0.3)";

  const amountCell = `
    <p style="margin:0 0 4px;color:#38190c;font-size:11px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;">${pastDue ? "Past Due Amount" : "Amount Due"}</p>
    <p style="margin:0 0 ${invoiceLink?.trim() ? "12" : "0"}px;color:#1e1e1e;font-size:24px;font-weight:800;">${esc(invoiceBalance)}</p>
    ${
      invoiceLink?.trim()
        ? `<a href="${esc(invoiceLink)}" style="display:inline-block;background-color:#cb7c46;color:#1e1e1e;text-decoration:none;padding:10px 20px;border-radius:8px;font-weight:600;font-size:13.5px;">Pay Now &rarr;</a>`
        : ""
    }
  `;

  const metaCell = `
    ${
      invoiceNumber?.trim()
        ? `<p style="margin:0 0 4px;color:#38190c;font-size:11px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;">Invoice #</p>
           <p style="margin:0 0 12px;color:#1e1e1e;font-size:14px;font-weight:600;">${esc(invoiceNumber)}</p>`
        : ""
    }
    ${
      dueDate?.trim()
        ? `<p style="margin:0 0 4px;color:#38190c;font-size:11px;font-weight:700;letter-spacing:0.5px;text-transform:uppercase;">${pastDue ? "Was Due" : "Due Date"}</p>
           <p style="margin:0;color:#1e1e1e;font-size:14px;font-weight:600;">${esc(dueDate)}</p>`
        : ""
    }
  `;

  const invoiceSection = `
    ${sectionHeading(pastDue ? "Past Due Balance" : "Balance Due")}
    <table role="presentation" width="100%" style="border-collapse:collapse;background-color:${boxBg};border:1px solid ${boxBorder};border-radius:10px;margin:0 0 16px;">
      <tr>
        <td style="padding:18px 20px;vertical-align:top;${hasMeta ? "width:55%;" : ""}">
          ${amountCell}
        </td>
        ${
          hasMeta
            ? `<td style="padding:18px 20px;vertical-align:top;border-left:1px solid ${boxBorder};">${metaCell}</td>`
            : ""
        }
      </tr>
    </table>
    <p style="margin:0 0 24px;color:#64748b;font-size:12.5px;line-height:1.6;">
      This is the total needed to keep ${esc(businessName)}&rsquo;s website online and in good standing.
    </p>
    ${divider()}
  `;

  const body = `
    <p style="margin:0 0 4px;color:#94a3b8;font-size:13px;">Hi ${esc(businessName)},</p>
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
