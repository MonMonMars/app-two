import { describe, expect, it } from "vitest";
import {
  base64Pcm16ToFloat32,
  float32ToBase64Pcm16,
  resampleFloat32,
} from "@/lib/voice/audio-pcm";

describe("audio pcm helpers", () => {
  it("round-trips float32 through base64 pcm16", () => {
    const original = new Float32Array([0, 0.5, -0.5, 1, -1]);
    const encoded = float32ToBase64Pcm16(original);
    const decoded = base64Pcm16ToFloat32(encoded);
    expect(decoded.length).toBe(original.length);
    expect(decoded[1]).toBeCloseTo(0.5, 2);
    expect(decoded[2]).toBeCloseTo(-0.5, 2);
  });

  it("resamples to target rate", () => {
    const input = new Float32Array([0, 1, 0, -1]);
    const out = resampleFloat32(input, 48_000, 24_000);
    expect(out.length).toBe(2);
  });
});
