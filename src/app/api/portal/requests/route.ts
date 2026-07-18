import { Resend } from "resend";
import { NextResponse } from "next/server";
import { getSession, isAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { isTrustedOrigin } from "@/lib/origin-check";
import { isValidServiceType, validateDetails, getServiceFields } from "@/lib/service-fields";
import { MAX_FILES_PER_REQUEST } from "@/lib/uploads";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = `Hello from Spectecle <${process.env.RESEND_FROM ?? "onboarding@resend.dev"}>`;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "hello@spectecle.com";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://spectecle.com";

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function displayValue(value: unknown, details: Record<string, unknown>, key: string): string {
  if (!Array.isArray(value)) return String(value);
  const otherValue = details[`${key}_other`];
  return value
    .map((v) => (v === "Other" && otherValue ? `Other (${String(otherValue)})` : v))
    .join(", ");
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
    onBehalfOfUserId?: string;
  } | null;

  const serviceType = body?.service_type?.trim();
  const message = body?.message?.trim();
  const budget = body?.budget?.trim() || null;
  const files = Array.isArray(body?.files) ? body.files.slice(0, MAX_FILES_PER_REQUEST) : [];

  if (!serviceType || !isValidServiceType(serviceType) || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Admin can create a request on behalf of another (active) client. Never
  // trust the target id blindly — confirm it's a real, active user first.
  let ticketOwner = user;
  let createdByAdmin = false;
  if (body?.onBehalfOfUserId && isAdmin(user.email)) {
    const { data: target } = await supabase
      .from("portal_users")
      .select("id, email, name")
      .eq("id", body.onBehalfOfUserId)
      .eq("status", "active")
      .maybeSingle();
    if (!target) {
      return NextResponse.json({ error: "Client not found" }, { status: 400 });
    }
    ticketOwner = target;
    createdByAdmin = true;
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
      user_id: ticketOwner.id,
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
      const display = displayValue(details[f.key], details, f.key);
      return `<tr><td style="padding:8px 12px 8px 0;color:#888;white-space:nowrap;vertical-align:top;"><strong>${esc(f.label)}</strong></td><td style="padding:8px 0;">${esc(display)}</td></tr>`;
    })
    .join("");

  const detailsTable = `
    <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
      <tr><td style="padding:8px 12px 8px 0;color:#888;white-space:nowrap;vertical-align:top;"><strong>Service</strong></td><td style="padding:8px 0;">${esc(serviceType)}</td></tr>
      ${budget ? `<tr><td style="padding:8px 12px 8px 0;color:#888;white-space:nowrap;vertical-align:top;"><strong>Budget</strong></td><td style="padding:8px 0;">${esc(budget)}</td></tr>` : ""}
      ${detailRows}
    </table>
    <h3 style="margin:0 0 10px;color:#111;font-size:16px;">Message</h3>
    <div style="background:#f7f7f7;border-radius:8px;padding:16px;font-size:15px;line-height:1.6;white-space:pre-wrap;color:#333;">${esc(message)}</div>
    ${files.length > 0 ? `<p style="margin-top:20px;color:#888;font-size:13px;">${files.length} file(s) attached.</p>` : ""}
  `;

  // Client-created tickets notify admin (today's behavior). Admin-created
  // (on behalf of a client) tickets instead notify that client directly.
  const { error: sendError } = createdByAdmin
    ? await resend.emails.send({
        from: FROM,
        to: [ticketOwner.email],
        subject: `A new service request was created for you: ${serviceType}`,
        html: `
          <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;background:#fff;">
            <div style="border-left:4px solid #D25124;padding-left:16px;margin-bottom:28px;">
              <h2 style="margin:0 0 4px;color:#111;font-size:20px;">New Service Request</h2>
              <p style="margin:0;color:#888;font-size:14px;">Spectecle logged this on your behalf</p>
            </div>
            ${detailsTable}
            <p style="margin-top:24px;"><a href="${SITE_URL}/portal/dashboard" style="color:#D25124;">View in your portal</a></p>
          </div>
        `,
      })
    : await resend.emails.send({
        from: FROM,
        to: [CONTACT_EMAIL],
        replyTo: ticketOwner.email,
        subject: `New portal service request from ${ticketOwner.email}`,
        html: `
          <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;background:#fff;">
            <div style="border-left:4px solid #D25124;padding-left:16px;margin-bottom:28px;">
              <h2 style="margin:0 0 4px;color:#111;font-size:20px;">New Service Request</h2>
              <p style="margin:0;color:#888;font-size:14px;">via client portal</p>
            </div>
            <p style="margin:0 0 20px;font-size:14px;"><strong>Client:</strong> <a href="mailto:${esc(ticketOwner.email)}" style="color:#D25124;">${esc(ticketOwner.email)}</a></p>
            ${detailsTable}
          </div>
        `,
      });

  if (sendError) {
    console.error("[portal/requests] Resend error:", sendError);
  }

  return NextResponse.json({ success: true, id: created.id });
}
