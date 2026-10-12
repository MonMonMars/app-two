import { describe, expect, it } from "vitest";
import {
  buildClientSecretRequestBody,
  buildWebSocketSubprotocol,
  shapeVoiceSessionResponse,
} from "@/lib/voice/ephemeral-token";

describe("ephemeral token helpers", () => {
  it("builds client secret request body", () => {
    expect(buildClientSecretRequestBody()).toEqual({
      expires_after: { seconds: 300 },
    });
  });

  it("shapes xAI response for the client", () => {
    const shaped = shapeVoiceSessionResponse(
      { value: "xai-realtime-client-secret-abc", expires_at: 1_700_000_000 },
      "grok-voice-latest",
      "wss://api.x.ai/v1/realtime?model=grok-voice-latest",
    );
    expect(shaped.token).toBe("xai-realtime-client-secret-abc");
    expect(shaped.model).toBe("grok-voice-latest");
    expect(shaped.wsUrl).toContain("realtime");
  });

  it("builds websocket subprotocol", () => {
    expect(buildWebSocketSubprotocol("tok")).toBe("xai-client-secret.tok");
  });

  it("rejects empty token value", () => {
    expect(() =>
      shapeVoiceSessionResponse(
        { value: "", expires_at: 0 },
        "grok-voice-latest",
        "wss://example",
      ),
    ).toThrow();
  });
});
