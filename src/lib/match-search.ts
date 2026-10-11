import type { Match } from "@/types";

export function filterMatchesByName(matches: Match[], query: string): Match[] {
  const q = query.trim().toLowerCase();
  if (!q) {
    return matches;
  }
  return matches.filter((m) => m.profile.name.toLowerCase().includes(q));
}
