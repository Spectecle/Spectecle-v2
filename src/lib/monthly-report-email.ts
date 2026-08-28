import type { MonthlyReportData } from "@/lib/monthly-report";

// Email clients don't support CSS variables or most modern layout CSS, so
// every color here is the literal site token value, hardcoded, and layout
// uses tables rather than flex/grid -- the only reliable approach across
// Outlook, Gmail, and everything in between.
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

function monthLabel(periodMonth: string): string {
  const [year, month] = periodMonth.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, 1)).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function statCell(value: string, label: string): string {
  return `
    <td style="padding:0 24px 0 0;" valign="top">
      <div style="font-family:Georgia,'Times New Roman',serif;font-size:34px;line-height:1.1;color:${COLOR.accentStrong};font-weight:400;">${value}</div>
      <div style="font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:12px;letter-spacing:0.04em;text-transform:uppercase;color:${COLOR.textMuted};margin-top:6px;">${label}</div>
    </td>`;
}

function sectionLabel(text: string): string {
  return `<div style="font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${COLOR.accent};font-weight:600;margin-bottom:16px;">${text}</div>`;
}

function divider(): string {
  return `<tr><td style="padding:32px 0;"><div style="border-top:1px solid ${COLOR.border};line-height:0;font-size:0;">&nbsp;</div></td></tr>`;
}

export function buildMonthlyReportEmailHtml(data: MonthlyReportData): string {
  const { orgName, periodMonth, visitors, pageViews, topQueries, requestCount } = data;
  const label = monthLabel(periodMonth);

  const trafficBlock =
    visitors === null && pageViews === null
      ? `<p style="font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:14px;color:${COLOR.textMuted};margin:0;">Analytics isn&rsquo;t connected for this account yet.</p>`
      : `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
          ${statCell(visitors === null ? "—" : visitors.toLocaleString(), "Visitors")}
          ${statCell(pageViews === null ? "—" : pageViews.toLocaleString(), "Page Views")}
        </tr></table>`;

  const queriesBlock =
    !topQueries || topQueries.length === 0
      ? `<p style="font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:14px;color:${COLOR.textMuted};margin:0;">No search query data available for this period.</p>`
      : `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
          ${topQueries
            .slice(0, 8)
            .map(
              (q, i) => `
            <tr>
              <td style="padding:10px 0;border-top:${i === 0 ? "none" : `1px solid ${COLOR.border}`};font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:14px;color:${COLOR.textSecondary};">${esc(q.query)}</td>
              <td style="padding:10px 0;border-top:${i === 0 ? "none" : `1px solid ${COLOR.border}`};font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:13px;color:${COLOR.textPrimary};font-weight:600;text-align:right;white-space:nowrap;">${q.clicks} clicks &middot; #${q.position.toFixed(1)}</td>
            </tr>`
            )
            .join("")}
        </table>`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<title>Your ${label} Report</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@400;500&family=Hanken+Grotesk:wght@400;500;600&display=swap');
  body { margin:0; padding:0; background:${COLOR.bg}; }
  a { color:${COLOR.accentStrong}; }
</style>
</head>
<body style="margin:0;padding:0;background:${COLOR.bg};">
  <div style="display:none;max-height:0;overflow:hidden;font-size:1px;line-height:1px;color:${COLOR.bg};">
    ${visitors ?? "—"} visitors, ${requestCount} request${requestCount === 1 ? "" : "s"} this month for ${esc(orgName)}.
  </div>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:${COLOR.bg};">
    <tr>
      <td align="center" style="padding:48px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;background:${COLOR.card};border:1px solid ${COLOR.border};">
          <tr>
            <td style="padding:44px 44px 8px;">
              <div style="font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:${COLOR.accent};margin-bottom:14px;">Monthly Report &middot; ${label}</div>
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.2;color:${COLOR.textPrimary};font-weight:400;">${esc(orgName)}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 44px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                ${divider()}
                <tr><td>
                  ${sectionLabel("Website Traffic")}
                  ${trafficBlock}
                </td></tr>
                ${divider()}
                <tr><td>
                  ${sectionLabel("Top Search Queries")}
                  ${queriesBlock}
                </td></tr>
                ${divider()}
                <tr><td>
                  ${sectionLabel("Service Requests")}
                  <div style="font-family:Georgia,'Times New Roman',serif;font-size:34px;line-height:1.1;color:${COLOR.accentStrong};font-weight:400;">${requestCount}</div>
                  <div style="font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:12px;letter-spacing:0.04em;text-transform:uppercase;color:${COLOR.textMuted};margin-top:6px;">Submitted this period</div>
                </td></tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 44px 44px;" align="center">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="background:${COLOR.accent};" align="center">
                    <a href="https://spectecle.com/portal/dashboard?section=analytics" style="display:inline-block;padding:14px 28px;font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;color:#f7f2e9;text-decoration:none;">View Your Full Dashboard &rarr;</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;width:100%;">
          <tr>
            <td style="padding:24px 44px 0;font-family:'Hanken Grotesk',Helvetica,Arial,sans-serif;font-size:12px;color:${COLOR.textMuted};text-align:center;">
              Prepared by Spectecle &middot; spectecle.com<br>
              You&rsquo;re receiving this because your plan includes Monthly Reports.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
