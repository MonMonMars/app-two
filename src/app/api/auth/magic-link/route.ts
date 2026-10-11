import { NextResponse } from "next/server";

type Body = { email?: string };

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  return NextResponse.json({
    mode: "mock",
    email,
    message:
      "Magic link simulated. No email sent — use Open magic link in the UI.",
    expiresInSeconds: 600,
  });
}
