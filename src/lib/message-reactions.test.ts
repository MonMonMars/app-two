import { describe, expect, it } from "vitest";
import {
  applyMessageReaction,
  isAllowedReaction,
} from "@/lib/message-reactions";

describe("message reactions", () => {
  it("allows known emoji", () => {
    expect(isAllowedReaction("❤️")).toBe(true);
    expect(isAllowedReaction("👍")).toBe(false);
  });

  it("toggles reaction on same emoji", () => {
    expect(applyMessageReaction("❤️", "❤️")).toBeNull();
    expect(applyMessageReaction(null, "🔥")).toBe("🔥");
    expect(applyMessageReaction("❤️", "🔥")).toBe("🔥");
  });
});
