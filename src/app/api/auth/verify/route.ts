import { NextResponse } from "next/server";

type Body = { email?: string; token?: string };

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  return NextResponse.json({
    mode: "mock",
    ok: true,
    user: {
      email,
      message: "Client stores session in localStorage after verify.",
    },
  });
}
