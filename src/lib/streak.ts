import type { AppPersistedState } from "@/types";

function dayKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

function yesterdayKey(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return dayKey(d);
}

export function touchDailyStreak(state: AppPersistedState): AppPersistedState {
  const today = dayKey();
  if (state.streakDayKey === today) {
    return state;
  }
  const continued = state.streakDayKey === yesterdayKey();
  return {
    ...state,
    streakDayKey: today,
    streakCount: continued ? state.streakCount + 1 : 1,
  };
}
