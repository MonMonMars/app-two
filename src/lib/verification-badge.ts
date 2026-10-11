import type { Profile, UserDatingProfile } from "@/types";

export function showPhotoVerifiedOnProfile(profile: Profile): boolean {
  return profile.verified === true;
}

export function showPhotoVerifiedOnSelf(
  datingProfile: UserDatingProfile | null,
): boolean {
  return Boolean(datingProfile?.photoUrls?.length);
}

export function verificationBadgeLabel(): string {
  return "Photo verified";
}
