import { describe, expect, it, beforeEach, afterEach } from "vitest";
import { POST } from "@/app/api/voice/session/route";

describe("POST /api/voice/session", () => {
  const prev = process.env.XAI_API_KEY;

  beforeEach(() => {
    delete process.env.XAI_API_KEY;
  });

  afterEach(() => {
    if (prev === undefined) {
      delete process.env.XAI_API_KEY;
    } else {
      process.env.XAI_API_KEY = prev;
    }
  });

  it("returns 503 when XAI_API_KEY is missing", async () => {
    const res = await POST();
    expect(res.status).toBe(503);
    const body = (await res.json()) as { error: string };
    expect(body.error).toBe("voice_unconfigured");
  });
});
