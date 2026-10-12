import { describe, expect, it } from "vitest";
import {
  buildDatingVoiceInstructions,
  buildGrokVoiceSessionUpdate,
} from "@/lib/voice/session-config";

describe("buildDatingVoiceInstructions", () => {
  it("includes match name and Cantonese guidance", () => {
    const text = buildDatingVoiceInstructions("Jordan");
    expect(text).toContain("Jordan");
    expect(text).toContain("Cantonese");
    expect(text).toContain("粵語");
  });

  it("falls back when name is empty", () => {
    expect(buildDatingVoiceInstructions("  ")).toContain("對方");
  });
});

describe("buildGrokVoiceSessionUpdate", () => {
  it("uses server VAD and yue transcription hint", () => {
    const payload = buildGrokVoiceSessionUpdate({ matchName: "Sam" });
    expect(payload.type).toBe("session.update");
    expect(payload.session.turn_detection.type).toBe("server_vad");
    expect(payload.session.audio.input.transcription?.language_hint).toBe(
      "yue",
    );
    expect(payload.session.voice).toBe("eve");
    expect(payload.session.instructions).toContain("Sam");
  });

  it("allows custom voice id", () => {
    const payload = buildGrokVoiceSessionUpdate({
      matchName: "Alex",
      voiceId: "ara",
    });
    expect(payload.session.voice).toBe("ara");
  });
});
