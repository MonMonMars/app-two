export function computeBoostSecondsLeft(
  boostActiveUntil: string | null,
  nowMs: number = Date.now(),
): number {
  if (!boostActiveUntil) {
    return 0;
  }
  const end = new Date(boostActiveUntil).getTime();
  if (Number.isNaN(end)) {
    return 0;
  }
  return Math.max(0, Math.ceil((end - nowMs) / 1000));
}

export function formatCountdown(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
