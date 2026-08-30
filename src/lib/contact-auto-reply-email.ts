// Same email-safe approach as the monthly report template: hardcoded hex
// values (no CSS variables), table-based layout, inlined styles — the only
// reliable approach across Outlook, Gmail, and everything in between.
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

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function linkCell(label: string, href: string): string {
  return `
    <td style="padding:0 8px;" align="center">
      <a href="${href}" style="display:block;padding:14px 10px;border:1px solid ${COLOR.border};background:${COLOR.card};font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;color:${COLOR.textPrimary};text-decoration:none;">${label}</a>
    </td>`;
}

export function buildContactAutoReplyEmailHtml(name: string): string {
  const firstName = esc(name.trim().split(/\s+/)[0] || "there");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>Thanks for reaching out</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@400;500&family=Hanken+Grotesk:wght@400;500;600&display=swap');
  body { margin:0; padding:0; background:${COLOR.bg}; }
  a { color:${COLOR.accentStrong}; }
</style>
</head>
<body style="margin:0;padding:0;background:${COLOR.bg};">
  <div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:${COLOR.bg};">
    We received your message and will get back to you within 24 hours.
  </div>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${COLOR.bg};">
    <tr>
      <td align="center" style="padding:48px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="560" style="max-width:560px;width:100%;background:${COLOR.card};border:1px solid ${COLOR.border};">
          <tr>
            <td style="padding:44px 44px 8px;">
              <div style="font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:${COLOR.accent};margin-bottom:14px;">Message Received</div>
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.25;color:${COLOR.textPrimary};font-weight:400;">Thanks for reaching out, ${firstName}.</div>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 44px 8px;">
              <p style="font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:${COLOR.textSecondary};margin:0;">
                We&rsquo;ve got your message and will get back to you within 24 hours.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 44px 0;">
              <div style="border-top:1px solid ${COLOR.border};line-height:0;font-size:0;">&nbsp;</div>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 34px 44px;">
              <div style="font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:${COLOR.textMuted};text-align:center;margin-bottom:14px;">While you wait</div>
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  ${linkCell("Our Work", "https://spectecle.com/work")}
                  ${linkCell("Services", "https://spectecle.com/services")}
                  ${linkCell("About Us", "https://spectecle.com/about")}
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="560" style="max-width:560px;width:100%;">
          <tr>
            <td style="padding:24px 10px 0;font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:12px;color:${COLOR.textMuted};text-align:center;">
              Spectecle &middot; spectecle.com &middot; (313) 353-4105
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
