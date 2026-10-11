import { describe, expect, it } from "vitest";
import {
  serializeUserDataExport,
  userDataExportFilename,
  type UserDataExportPayload,
} from "@/lib/export-user-data";

describe("export user data stub", () => {
  it("builds deterministic filenames", () => {
    expect(userDataExportFilename("2026-10-11T12:00:00.000Z")).toBe(
      "app-two-export-2026-10-11.json",
    );
  });

  it("serializes export payload", () => {
    const payload: UserDataExportPayload = {
      exportedAt: "2026-01-01T00:00:00.000Z",
      app: "App Two",
      version: 1,
      auth: null,
      datingProfile: null,
      discoverFilters: null,
      settings: {
        notifications: { matches: true, messages: true, marketing: false },
        theme: "dark",
        soundEffectsEnabled: true,
      },
      persistedState: {
        passedIds: [],
        likedIds: [],
        matchIds: [],
        tier: "free",
        boostsRemaining: 0,
        superLikesRemaining: 0,
        likesUsedToday: 0,
        likesDayKey: "2026-01-01",
        boostActiveUntil: null,
        blockedProfileIds: [],
        streakCount: 0,
        streakDayKey: "2026-01-01",
        subscriptionStatus: "none",
        subscriptionRenewalAt: null,
        discoverCoachDismissed: false,
        pushSoftPrompt: "idle",
        matchLastReadAt: {},
        referralShareCount: 0,
        softPaywallDismissedDayKey: null,
        rateAppPromptDismissed: false,
      },
    };
    const json = serializeUserDataExport(payload);
    expect(json).toContain('"app": "App Two"');
    expect(json).toContain('"theme": "dark"');
  });
});
