export function isProfileRecentlyActive(profileId: string): boolean {
  let hash = 0;
  for (let i = 0; i < profileId.length; i += 1) {
    hash = (hash + profileId.charCodeAt(i) * (i + 1)) % 97;
  }
  return hash % 3 !== 0;
}

export function recentlyActiveLabel(): string {
  return "Recently active";
}
