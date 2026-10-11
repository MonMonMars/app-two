import type { Match, ReportReason } from "@/types";

export function addBlockedProfileId(
  blockedIds: string[],
  profileId: string,
): string[] {
  if (blockedIds.includes(profileId)) {
    return blockedIds;
  }
  return [...blockedIds, profileId];
}

export function removeBlockedProfileId(
  blockedIds: string[],
  profileId: string,
): string[] {
  return blockedIds.filter((id) => id !== profileId);
}

export function filterMatchesAfterBlock(
  matches: Match[],
  blockedProfileIds: string[],
): Match[] {
  const blocked = new Set(blockedProfileIds);
  return matches.filter((m) => !blocked.has(m.profile.id));
}

export function filterMatchIdsAfterUnmatch(
  matchIds: string[],
  matchId: string,
): string[] {
  return matchIds.filter((id) => id !== matchId);
}

export type MockReportResult = {
  ok: true;
  reason: ReportReason;
  recordedLocally: true;
};

export function recordMockReport(reason: ReportReason): MockReportResult {
  return { ok: true, reason, recordedLocally: true };
}
