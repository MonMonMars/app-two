import { RATE_APP_MATCH_THRESHOLD } from "@/lib/constants";

export function shouldShowRateAppPrompt(
  matchCount: number,
  dismissed: boolean,
): boolean {
  if (dismissed) {
    return false;
  }
  return matchCount >= RATE_APP_MATCH_THRESHOLD;
}
