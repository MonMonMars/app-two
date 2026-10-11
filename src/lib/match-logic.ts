import { MATCH_ON_LIKE_IDS } from "@/lib/mock-data";

export function createsMutualMatch(profileId: string): boolean {
  return MATCH_ON_LIKE_IDS.has(profileId);
}

export function deckProfileIdsAfterSwipe(
  allIds: string[],
  passedIds: string[],
  likedIds: string[],
  blockedIds: string[],
): string[] {
  const seen = new Set([...passedIds, ...likedIds, ...blockedIds]);
  return allIds.filter((id) => !seen.has(id));
}
