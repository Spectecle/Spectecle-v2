import { Resend } from "resend";
import { NextResponse } from "next/server";
import { getSession, isAdmin } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { isTrustedOrigin } from "@/lib/origin-check";
import { MAX_FILES_PER_REQUEST } from "@/lib/uploads";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = `Hello from Spectecle <${process.env.RESEND_FROM ?? "onboarding@resend.dev"}>`;
const ADMIN_EMAIL = process.env.CONTACT_EMAIL ?? "hello@spectecle.com";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://spectecle.com";

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

type TicketRow = {
  id: string;
  user_id: string;
  service_type: string;
  portal_users: { email: string } | { email: string }[] | null;
};

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const { id: requestId } = await params;

  const { data: ticket } = await supabase
    .from("service_requests")
    .select("id, user_id, service_type, portal_users(email)")
    .eq("id", requestId)
    .maybeSingle<TicketRow>();

  if (!ticket) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const admin = isAdmin(user.email);
  if (!admin && ticket.user_id !== user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = (await req.json().catch(() => null)) as {
    body?: string;
    files?: UploadedFile[];
  } | null;

  const messageBody = body?.body?.trim() ?? "";
  const files = Array.isArray(body?.files) ? body.files.slice(0, MAX_FILES_PER_REQUEST) : [];

  if (!messageBody && files.length === 0) {
    return NextResponse.json({ error: "Message or files required" }, { status: 400 });
  }

  const { data: message, error } = await supabase
    .from("service_request_messages")
    .insert({
      request_id: requestId,
      sender_role: admin ? "admin" : "client",
      sender_email: user.email,
      body: messageBody,
    })
    .select("id")
    .single();

  if (error || !message) {
    console.error("[portal/requests/messages] insert error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }

  if (files.length > 0) {
    const { error: filesError } = await supabase.from("service_request_files").insert(
      files.map((f) => ({
        request_id: requestId,
        message_id: message.id,
        file_name: f.name,
        storage_path: f.path,
        content_type: f.contentType,
        size_bytes: f.size,
      }))
    );
    if (filesError) {
      console.error("[portal/requests/messages] file record insert error:", filesError);
    }
  }

  const ownerEmailRel = ticket.portal_users;
  const ownerEmail = Array.isArray(ownerEmailRel) ? ownerEmailRel[0]?.email : ownerEmailRel?.email;

  const attachmentNote =
    files.length > 0 ? `<p style="margin-top:16px;color:#888;font-size:13px;">${files.length} file(s) attached.</p>` : "";

  if (admin && ownerEmail) {
    const { error: sendError } = await resend.emails.send({
      from: FROM,
      to: [ownerEmail],
      subject: `New reply on your ${ticket.service_type} request`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;background:#fff;">
          <div style="border-left:4px solid #cb7c46;padding-left:16px;margin-bottom:28px;">
            <h2 style="margin:0 0 4px;color:#111;font-size:20px;">New Reply</h2>
            <p style="margin:0;color:#888;font-size:14px;">on your ${esc(ticket.service_type)} request</p>
          </div>
          ${messageBody ? `<div style="background:#f7f7f7;border-radius:8px;padding:16px;font-size:15px;line-height:1.6;white-space:pre-wrap;color:#333;">${esc(messageBody)}</div>` : ""}
          ${attachmentNote}
          <p style="margin-top:24px;"><a href="${SITE_URL}/portal/dashboard" style="color:#cb7c46;">View in your portal</a></p>
        </div>
      `,
    });
    if (sendError) console.error("[portal/requests/messages] Resend error:", sendError);
  } else if (!admin) {
    const { error: sendError } = await resend.emails.send({
      from: FROM,
      to: [ADMIN_EMAIL],
      replyTo: user.email,
      subject: `New reply from ${user.email} on a ${ticket.service_type} request`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:32px 24px;background:#fff;">
          <div style="border-left:4px solid #cb7c46;padding-left:16px;margin-bottom:28px;">
            <h2 style="margin:0 0 4px;color:#111;font-size:20px;">New Client Reply</h2>
            <p style="margin:0;color:#888;font-size:14px;">${esc(ticket.service_type)}</p>
          </div>
          ${messageBody ? `<div style="background:#f7f7f7;border-radius:8px;padding:16px;font-size:15px;line-height:1.6;white-space:pre-wrap;color:#333;">${esc(messageBody)}</div>` : ""}
          ${attachmentNote}
          <p style="margin-top:24px;"><a href="${SITE_URL}/portal/admin" style="color:#cb7c46;">View in admin</a></p>
        </div>
      `,
    });
    if (sendError) console.error("[portal/requests/messages] Resend error:", sendError);
  }

  return NextResponse.json({ success: true, id: message.id });
}
