import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { isTrustedOrigin } from "@/lib/origin-check";
import {
  UPLOAD_BUCKET,
  isAllowedUploadFilename,
  sanitizeFilename,
} from "@/lib/uploads";

export async function POST(req: Request) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as { filename?: string } | null;
  const filename = body?.filename?.trim();

  if (!filename || !isAllowedUploadFilename(filename)) {
    return NextResponse.json({ error: "File type not allowed" }, { status: 400 });
  }

  const path = `${user.id}/${randomUUID()}-${sanitizeFilename(filename)}`;

  const { data, error } = await supabase.storage
    .from(UPLOAD_BUCKET)
    .createSignedUploadUrl(path);

  if (error || !data) {
    console.error("[portal/requests/upload-url] error:", error);
    return NextResponse.json({ error: "Failed to create upload URL" }, { status: 500 });
  }

  return NextResponse.json({
    path: data.path,
    token: data.token,
    signedUrl: data.signedUrl,
  });
}
