import { EPHEMERAL_TOKEN_TTL_SECONDS } from "@/lib/voice/constants";

export type XaiClientSecretResponse = {
  value: string;
  expires_at: number;
};

export type VoiceSessionApiResponse = {
  token: string;
  expiresAt: number;
  model: string;
  wsUrl: string;
};

export function getXaiApiKeyFromEnv(): string | undefined {
  const key = process.env.XAI_API_KEY?.trim();
  return key || undefined;
}

export function buildClientSecretRequestBody(): {
  expires_after: { seconds: number };
} {
  return { expires_after: { seconds: EPHEMERAL_TOKEN_TTL_SECONDS } };
}

/** Normalize xAI client_secrets JSON for the browser voice module. */
export function shapeVoiceSessionResponse(
  raw: XaiClientSecretResponse,
  model: string,
  wsUrl: string,
): VoiceSessionApiResponse {
  if (!raw.value?.trim()) {
    throw new Error("xAI client_secrets response missing token value");
  }
  return {
    token: raw.value.trim(),
    expiresAt: raw.expires_at,
    model,
    wsUrl,
  };
}

export function buildWebSocketSubprotocol(token: string): string {
  return `xai-client-secret.${token}`;
}
