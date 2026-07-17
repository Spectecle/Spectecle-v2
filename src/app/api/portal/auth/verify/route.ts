import { NextResponse } from "next/server";
import { consumeTokenAndCreateSession, isAdmin } from "@/lib/auth";
import { isTrustedOrigin } from "@/lib/origin-check";

export async function POST(req: Request) {
  if (!isTrustedOrigin(req)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const body = (await req.json().catch(() => null)) as { token?: string } | null;
  const token = body?.token;

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }

  const user = await consumeTokenAndCreateSession(token);

  if (!user) {
    return NextResponse.json(
      { error: "This link is invalid, expired, or already used." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    redirectTo: isAdmin(user.email) ? "/portal/admin" : "/portal/dashboard",
  });
}
