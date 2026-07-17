import { Resend } from "resend";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { isTrustedOrigin } from "@/lib/origin-check";
import { isValidServiceType, validateDetails, getServiceFields } from "@/lib/service-fields";
import { MAX_FILES_PER_REQUEST } from "@/lib/uploads";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM ?? "onboarding@resend.dev";
const TO = process.env.CONTACT_EMAIL ?? "hello@spectecle.com";

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type UploadedFile = {
  path: string;
  name: string;
  size: number;
  contentType: string;
};

export async function POST(req: Request) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as {
    service_type?: string;
    budget?: string;
    message?: string;
    details?: Record<string, unknown>;
    files?: UploadedFile[];
  } | null;

  const serviceType = body?.service_type?.trim();
  const message = body?.message?.trim();
  const budget = body?.budget?.trim() || null;
  const files = Array.isArray(body?.files) ? body.files.slice(0, MAX_FILES_PER_REQUEST) : [];

  if (!serviceType || !isValidServiceType(serviceType) || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { clean: details, missing } = validateDetails(serviceType, body?.details ?? {});
  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  const { data: created, error } = await supabase
    .from("service_requests")
    .insert({
      user_id: user.id,
      service_type: serviceType,
      budget,
      message,
      details,
    })
    .select("id")
    .single();

  if (error || !created) {
    console.error("[portal/requests] insert error:", error);
    return NextResponse.json({ error: "Failed to submit request" }, { status: 500 });
  }

  if (files.length > 0) {
    const { error: filesError } = await supabase.from("service_request_files").insert(
      files.map((f) => ({
        request_id: created.id,
        file_name: f.name,
        storage_path: f.path,
        content_type: f.contentType,
        size_bytes: f.size,
      }))
    );
    if (filesError) {
      console.error("[portal/requests] file record insert error:", filesError);
    }
  }

  const fieldDefs = getServiceFields(serviceType);
  const detailRows = fieldDefs
    .filter((f) => details[f.key] !== undefined)
    .map((f) => {
      const value = details[f.key];
      const display = Array.isArray(value) ? value.join(", ") : String(value);
      return `<tr><td style="padding:8px 12px 8px 0;color:#888;white-space:nowrap;vertical-align:top;"><strong>${esc(f.label)}</strong></td><td style="padding:8px 0;">${esc(display)}</td></tr>`;
    })
    .join("");

  const { error: sendError } = await resend.emails.send({
    from: FROM,
    to: [TO],
    replyTo: user.email,
    subject: `New portal service request from ${user.email}`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;background:#fff;">
        <div style="border-left:4px solid #D25124;padding-left:16px;margin-bottom:28px;">
          <h2 style="margin:0 0 4px;color:#111;font-size:20px;">New Service Request</h2>
          <p style="margin:0;color:#888;font-size:14px;">via client portal</p>
        </div>
        <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
          <tr><td style="padding:8px 12px 8px 0;color:#888;white-space:nowrap;vertical-align:top;"><strong>Client</strong></td><td style="padding:8px 0;"><a href="mailto:${esc(user.email)}" style="color:#D25124;">${esc(user.email)}</a></td></tr>
          <tr><td style="padding:8px 12px 8px 0;color:#888;white-space:nowrap;vertical-align:top;"><strong>Service</strong></td><td style="padding:8px 0;">${esc(serviceType)}</td></tr>
          ${budget ? `<tr><td style="padding:8px 12px 8px 0;color:#888;white-space:nowrap;vertical-align:top;"><strong>Budget</strong></td><td style="padding:8px 0;">${esc(budget)}</td></tr>` : ""}
          ${detailRows}
        </table>
        <h3 style="margin:0 0 10px;color:#111;font-size:16px;">Message</h3>
        <div style="background:#f7f7f7;border-radius:8px;padding:16px;font-size:15px;line-height:1.6;white-space:pre-wrap;color:#333;">${esc(message)}</div>
        ${files.length > 0 ? `<p style="margin-top:20px;color:#888;font-size:13px;">${files.length} file(s) attached — view in the admin dashboard.</p>` : ""}
      </div>
    `,
  });

  if (sendError) {
    console.error("[portal/requests] Resend error:", sendError);
  }

  return NextResponse.json({ success: true, id: created.id });
}
