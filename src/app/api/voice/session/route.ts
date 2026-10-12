import {
  GROK_REALTIME_WS_URL,
  GROK_VOICE_MODEL,
  XAI_CLIENT_SECRETS_URL,
} from "@/lib/voice/constants";
import {
  buildClientSecretRequestBody,
  getXaiApiKeyFromEnv,
  shapeVoiceSessionResponse,
  type XaiClientSecretResponse,
} from "@/lib/voice/ephemeral-token";
import { NextResponse } from "next/server";

export async function POST() {
  const apiKey = getXaiApiKeyFromEnv();
  if (!apiKey) {
    return NextResponse.json(
      {
        error: "voice_unconfigured",
        message:
          "Voice chat is unavailable. Set XAI_API_KEY in .env.local (server-side only).",
      },
      { status: 503 },
    );
  }

  let upstream: Response;
  try {
    upstream = await fetch(XAI_CLIENT_SECRETS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buildClientSecretRequestBody()),
    });
  } catch {
    return NextResponse.json(
      { error: "voice_upstream_unreachable", message: "Could not reach xAI." },
      { status: 502 },
    );
  }

  if (!upstream.ok) {
    const detail = await upstream.text().catch(() => "");
    return NextResponse.json(
      {
        error: "voice_token_failed",
        message: "xAI could not issue an ephemeral voice token.",
        status: upstream.status,
        detail: detail.slice(0, 500),
      },
      { status: 502 },
    );
  }

  let raw: XaiClientSecretResponse;
  try {
    raw = (await upstream.json()) as XaiClientSecretResponse;
  } catch {
    return NextResponse.json(
      { error: "voice_token_invalid", message: "Invalid xAI token response." },
      { status: 502 },
    );
  }

  try {
    const body = shapeVoiceSessionResponse(
      raw,
      GROK_VOICE_MODEL,
      GROK_REALTIME_WS_URL,
    );
    return NextResponse.json(body);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Invalid xAI token response.";
    return NextResponse.json(
      { error: "voice_token_invalid", message },
      { status: 502 },
    );
  }
}
