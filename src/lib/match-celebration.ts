import type { Match } from "@/types";

export function shouldShowMatchCelebration(
  match: Match | null,
): match is Match {
  return match !== null;
}

export function celebrationHeadline(name: string): string {
  return `It's a Match with ${name}!`;
}
