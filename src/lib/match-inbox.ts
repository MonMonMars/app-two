import type { ChatMessage, Match } from "@/types";

export function lastMessageForMatch(
  matchId: string,
  messages: ChatMessage[],
): ChatMessage | null {
  const thread = messages.filter((m) => m.matchId === matchId);
  if (thread.length === 0) {
    return null;
  }
  return thread.reduce((latest, msg) =>
    new Date(msg.sentAt).getTime() > new Date(latest.sentAt).getTime()
      ? msg
      : latest,
  );
}

export function inboxActivityTimestamp(
  match: Match,
  messages: ChatMessage[],
): number {
  const last = lastMessageForMatch(match.id, messages);
  const msgTime = last ? new Date(last.sentAt).getTime() : 0;
  const matchedTime = new Date(match.matchedAt).getTime();
  return Math.max(msgTime, matchedTime);
}

export function sortMatchesByRecentActivity(
  matches: Match[],
  messages: ChatMessage[],
): Match[] {
  return [...matches].sort(
    (a, b) =>
      inboxActivityTimestamp(b, messages) - inboxActivityTimestamp(a, messages),
  );
}

export function countUnreadForMatch(
  matchId: string,
  messages: ChatMessage[],
  lastReadAt: string | undefined,
): number {
  const readMs = lastReadAt ? new Date(lastReadAt).getTime() : 0;
  return messages.filter(
    (m) =>
      m.matchId === matchId &&
      m.sender === "them" &&
      new Date(m.sentAt).getTime() > readMs,
  ).length;
}

export function totalUnreadCount(
  matches: Match[],
  messages: ChatMessage[],
  matchLastReadAt: Record<string, string>,
): number {
  return matches.reduce(
    (sum, m) =>
      sum + countUnreadForMatch(m.id, messages, matchLastReadAt[m.id]),
    0,
  );
}

export function readWatermarkNow(): string {
  return new Date().toISOString();
}
