import { esc } from "@/lib/email-html";

const ZELLE_PHONE = process.env.ZELLE_PHONE ?? "(313) 316-1106";

// Same email-safe color/type system as the other transactional emails
// (monthly report, contact auto-reply) — literal site token values (no CSS
// variables, tables instead of flex/grid) so this actually matches the
// site's theme and stays legible across every mail client.
export const COLOR = {
  bg: "#efe6d3",
  card: "#f7f2e9",
  border: "#e4d8bd",
  textPrimary: "#211a13",
  textSecondary: "#5b4e3f",
  textMuted: "#8b7e6a",
  accent: "#9a5423",
  accentStrong: "#7a4119",
};

// Due date comes in as an ISO "YYYY-MM-DD" string (from the admin's date
// picker, or directly from Zoho Books' own due_date field); render it
// human-readable in the email itself.
export function formatDueDate(value: string): string {
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return value;
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function emailShell(preheader: string, eyebrow: string, headline: string, bodyHtml: string) {
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

export function noteBlock(note: string) {
  if (!note.trim()) return "";
  return `<p style="margin:0 0 24px;font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:${COLOR.textSecondary};white-space:pre-wrap;">${esc(note)}</p>`;
}

export function sectionHeading(text: string) {
  return `<div style="font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${COLOR.accent};font-weight:600;margin-bottom:14px;">${esc(text)}</div>`;
}

export function divider() {
  return `<div style="border-top:1px solid ${COLOR.border};margin:28px 0;line-height:0;font-size:0;">&nbsp;</div>`;
}

export function portalIntroBlock(email: string, link: string) {
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

/** Shared by the admin's manual "Send Client Email" reminder template and
 * the automated Zoho Books payment-reminder cron -- the only difference is
 * whether a portal sign-in link is available. Zoho-driven automated
 * reminders may target a contact with no portal account at all, so `portal`
 * is optional; when omitted, the sign-in section is left out entirely
 * rather than rendering a broken/nonsensical magic link. */
export function invoiceReminderLetterHtml({
  businessName,
  note,
  invoiceBalance,
  invoiceNumber,
  dueDate,
  invoiceLink,
  pastDue,
  portal,
}: {
  businessName: string;
  note: string;
  invoiceBalance: string;
  invoiceNumber?: string;
  dueDate?: string;
  invoiceLink?: string;
  pastDue: boolean;
  portal?: { email: string; link: string };
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
           <div style="font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;color:${COLOR.textPrimary};">${esc(formatDueDate(dueDate))}</div>`
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
    <p style="margin:0 0 8px;font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:12.5px;line-height:1.6;color:${COLOR.textMuted};">
      This is the total needed to keep ${esc(businessName)}&rsquo;s website online and in good standing.
    </p>
    <p style="margin:0 0 8px;font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:12.5px;line-height:1.6;color:${COLOR.textMuted};">
      Prefer to pay by Zelle? Send to <strong style="color:${COLOR.textSecondary};">${ZELLE_PHONE}</strong>.
    </p>
    <p style="margin:0 0 24px;font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:${COLOR.textMuted};font-style:italic;">
      If you've already taken care of this, please disregard this email.
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

    ${portal ? portalIntroBlock(portal.email, portal.link) : ""}
  `;

  return emailShell(
    pastDue ? "Your Spectecle invoice is past due — action needed." : "Your Spectecle invoice is due soon.",
    pastDue ? "Past Due" : "Payment Reminder",
    pastDue ? `Action Needed, ${businessName}` : `Invoice Reminder, ${businessName}`,
    body
  );
}
