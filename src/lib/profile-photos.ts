import type { Profile } from "@/types";

export function getProfilePhotos(profile: Profile): string[] {
  if (profile.photoUrls && profile.photoUrls.length > 0) {
    return profile.photoUrls;
  }
  return [profile.photoUrl];
}
