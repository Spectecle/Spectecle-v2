import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";
import { isTrustedOrigin } from "@/lib/origin-check";

export async function POST(req: Request) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  await destroySession();
  return NextResponse.json({ success: true });
}
