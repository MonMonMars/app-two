import { profileMatchesDiscoverFilters } from "@/lib/discover-filter";
import type { DiscoverFilters, Profile, UserDatingProfile } from "@/types";

export type DeckEmptyReason = "filters" | "caught_up" | "blocked" | null;

export function buildDiscoverDeck(
  profiles: Profile[],
  passedIds: string[],
  likedIds: string[],
  blockedIds: string[],
  datingProfile: UserDatingProfile | null,
  discoverFilters: DiscoverFilters | null,
): { deck: Profile[]; emptyReason: DeckEmptyReason } {
  const swiped = new Set([...passedIds, ...likedIds]);
  const blockedSet = new Set(blockedIds);
  const candidates = profiles.filter((p) => !swiped.has(p.id));

  const withoutBlocked = candidates.filter((p) => !blockedSet.has(p.id));

  if (!datingProfile || !discoverFilters) {
    if (withoutBlocked.length > 0) {
      return { deck: withoutBlocked, emptyReason: null };
    }
    if (
      candidates.length > 0 &&
      candidates.every((p) => blockedSet.has(p.id))
    ) {
      return { deck: [], emptyReason: "blocked" };
    }
    return { deck: [], emptyReason: "caught_up" };
  }

  const filterEligible = candidates.filter((p) =>
    profileMatchesDiscoverFilters(p, discoverFilters, datingProfile),
  );
  const deck = filterEligible.filter((p) => !blockedSet.has(p.id));

  if (deck.length > 0) {
    return { deck, emptyReason: null };
  }

  if (
    filterEligible.length > 0 &&
    filterEligible.every((p) => blockedSet.has(p.id))
  ) {
    return { deck: [], emptyReason: "blocked" };
  }

  if (candidates.length > 0 && filterEligible.length === 0) {
    return { deck: [], emptyReason: "filters" };
  }

  return { deck: [], emptyReason: "caught_up" };
}
