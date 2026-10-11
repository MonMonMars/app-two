import { describe, expect, it } from "vitest";
import {
  countUnreadForMatch,
  inboxActivityTimestamp,
  sortMatchesByRecentActivity,
  totalUnreadCount,
} from "@/lib/match-inbox";
import type { ChatMessage, Match } from "@/types";

const baseMatch = (id: string, at: string): Match => ({
  id,
  matchedAt: at,
  profile: {
    id: "p1",
    name: "A",
    age: 25,
    bio: "",
    location: "",
    interests: [],
    photoUrl: "https://example.com/p.jpg",
  },
});

const msg = (
  id: string,
  matchId: string,
  sender: "me" | "them",
  sentAt: string,
): ChatMessage => ({
  id,
  matchId,
  sender,
  body: "hi",
  sentAt,
});

describe("match inbox", () => {
  it("sorts by latest message activity", () => {
    const m1 = baseMatch("m1", "2026-01-01T00:00:00.000Z");
    const m2 = baseMatch("m2", "2026-01-02T00:00:00.000Z");
    const messages = [
      msg("a", "m1", "them", "2026-01-05T00:00:00.000Z"),
      msg("b", "m2", "them", "2026-01-03T00:00:00.000Z"),
    ];
    const sorted = sortMatchesByRecentActivity([m2, m1], messages);
    expect(sorted[0]?.id).toBe("m1");
  });

  it("counts unread them messages after watermark", () => {
    const messages = [
      msg("1", "m1", "them", "2026-01-10T00:00:00.000Z"),
      msg("2", "m1", "them", "2026-01-12T00:00:00.000Z"),
      msg("3", "m1", "me", "2026-01-13T00:00:00.000Z"),
    ];
    expect(
      countUnreadForMatch("m1", messages, "2026-01-11T00:00:00.000Z"),
    ).toBe(1);
  });

  it("aggregates unread across matches", () => {
    const matches = [baseMatch("m1", ""), baseMatch("m2", "")];
    const messages = [
      msg("1", "m1", "them", "2026-01-12T00:00:00.000Z"),
      msg("2", "m2", "them", "2026-01-12T00:00:00.000Z"),
    ];
    expect(totalUnreadCount(matches, messages, {})).toBe(2);
  });

  it("uses matchedAt when no messages", () => {
    const m = baseMatch("m1", "2026-01-01T00:00:00.000Z");
    expect(inboxActivityTimestamp(m, [])).toBe(
      new Date("2026-01-01T00:00:00.000Z").getTime(),
    );
  });
});
