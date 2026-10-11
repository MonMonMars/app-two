import { MESSAGE_REACTION_EMOJIS } from "@/lib/constants";

export function isAllowedReaction(emoji: string): boolean {
  return (MESSAGE_REACTION_EMOJIS as readonly string[]).includes(emoji);
}

export function applyMessageReaction(
  current: string | null | undefined,
  emoji: string,
): string | null {
  if (!isAllowedReaction(emoji)) {
    return current ?? null;
  }
  if (current === emoji) {
    return null;
  }
  return emoji;
}
