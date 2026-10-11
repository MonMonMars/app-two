import type { DiscoverFilters, Profile, UserDatingProfile } from "@/types";

export function profileMatchesDiscoverFilters(
  profile: Profile,
  filters: DiscoverFilters,
  userProfile: UserDatingProfile,
): boolean {
  const miles = profile.distanceMiles ?? 99;
  if (miles > filters.maxDistanceMiles) {
    return false;
  }

  if (profile.age < filters.ageMin || profile.age > filters.ageMax) {
    return false;
  }

  if (userProfile.showMe !== "everyone" && profile.gender) {
    if (!userProfile.showMe.includes(profile.gender)) {
      return false;
    }
  }

  if (filters.interestTags.length > 0) {
    const hasOverlap = filters.interestTags.some((tag) =>
      profile.interests.includes(tag),
    );
    if (!hasOverlap) {
      return false;
    }
  }

  return true;
}

export function defaultDiscoverFilters(
  userProfile: UserDatingProfile,
): DiscoverFilters {
  return {
    maxDistanceMiles: 50,
    ageMin: userProfile.ageRangeMin,
    ageMax: userProfile.ageRangeMax,
    interestTags: [],
  };
}
