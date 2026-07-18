import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = `Hello from Spectecle <${process.env.RESEND_FROM ?? "onboarding@resend.dev"}>`;
const TO = process.env.CONTACT_EMAIL ?? "hello@spectecle.com";

// Rate limiting: max 3 submissions per IP per hour
const rateLimit = new Map<string, { count: number; resetAt: number }>();

const SPAM_KEYWORDS = [
  "backlink", "domain authority", "high da", "trust flow", "citation flow",
  "page authority", "semrush", "ahrefs rating", "i provide", "my pricing starts",
  "50k websites", "guest post", "link building service", "seo consultant",
  "show up at the top of search results within 24 hours",
  "let me know if you want to see", "looking forward to hearing from you\nregards",
  "high traffic", "i have in my collection", "jmailservice.com",
  "digitallinkbuilding", "paltuseoconsultant",
];

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isSpam(fields: Record<string, string>): boolean {
  const haystack = Object.values(fields).join(" ").toLowerCase();
  return SPAM_KEYWORDS.some((kw) => haystack.includes(kw));
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as Record<string, string>;
    const { name, email, company, service, budget, message, _honey, _ts } = body;

    // Honeypot — bots fill hidden fields, humans don't
    if (_honey) {
      return NextResponse.json({ success: true }); // silent reject
    }

    // Time check — bots submit instantly (< 3 s)
    const elapsed = Date.now() - Number(_ts || 0);
    if (elapsed < 3000) {
      return NextResponse.json({ success: true }); // silent reject
    }

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Keyword spam filter
    if (isSpam({ name, email, company: company ?? "", message })) {
      return NextResponse.json({ success: true }); // silent reject
    }

    // Rate limiting by IP — max 3 per hour
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    const now = Date.now();
    const bucket = rateLimit.get(ip);
    if (bucket) {
      if (now < bucket.resetAt) {
        if (bucket.count >= 3) {
          return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });
        }
        bucket.count++;
      } else {
        rateLimit.set(ip, { count: 1, resetAt: now + 3_600_000 });
      }
    } else {
      rateLimit.set(ip, { count: 1, resetAt: now + 3_600_000 });
    }

    const rows: [string, string][] = [
      ["Name", esc(name)],
      ["Email", `<a href="mailto:${esc(email)}" style="color:#D25124;">${esc(email)}</a>`],
      ...(company ? [["Company", esc(company)] as [string, string]] : []),
      ...(service ? [["Service", esc(service)] as [string, string]] : []),
      ...(budget ? [["Budget", esc(budget)] as [string, string]] : []),
    ];

    const tableRows = rows
      .map(
        ([label, val]) =>
          `<tr>
            <td style="padding:8px 12px 8px 0;color:#888;white-space:nowrap;vertical-align:top;"><strong>${esc(label)}</strong></td>
            <td style="padding:8px 0;">${val}</td>
          </tr>`
      )
      .join("");

    await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: email,
      subject: `New inquiry from ${name}${service ? ` — ${service}` : ""}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;background:#fff;">
          <div style="border-left:4px solid #D25124;padding-left:16px;margin-bottom:28px;">
            <h2 style="margin:0 0 4px;color:#111;font-size:20px;">New Project Inquiry</h2>
            <p style="margin:0;color:#888;font-size:14px;">via spectecle.com/contact</p>
          </div>
          <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
            ${tableRows}
          </table>
          <h3 style="margin:0 0 10px;color:#111;font-size:16px;">Message</h3>
          <div style="background:#f7f7f7;border-radius:8px;padding:16px;font-size:15px;line-height:1.6;white-space:pre-wrap;color:#333;">${esc(message)}</div>
          <p style="margin-top:28px;color:#bbb;font-size:12px;">Reply directly to this email to respond to ${esc(name)}.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] send error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
