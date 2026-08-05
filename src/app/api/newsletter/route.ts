import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = `Spectecle <${process.env.RESEND_FROM ?? "onboarding@resend.dev"}>`;
const TO = process.env.CONTACT_EMAIL ?? "hello@spectecle.com";

export async function POST(req: Request) {
  try {
    const { email } = (await req.json()) as { email?: string };

    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    await resend.emails.send({
      from: FROM,
      to: [TO],
      subject: `New newsletter signup: ${email}`,
      html: `<p style="font-family:system-ui,sans-serif;font-size:15px;color:#1e1e1e;">New newsletter signup from <strong>${email}</strong> via spectecle.com footer.</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[newsletter] send error:", err);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
