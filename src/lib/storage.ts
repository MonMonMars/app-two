import type { AppPersistedState } from "@/types";

export const STORAGE_KEY = "app-two-state-v1";

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export const DEFAULT_PERSISTED_STATE: AppPersistedState = {
  passedIds: [],
  likedIds: [],
  matchIds: ["m-seed-1"],
  tier: "free",
  boostsRemaining: 0,
  superLikesRemaining: 1,
  likesUsedToday: 0,
  likesDayKey: todayKey(),
};

export function normalizePersistedState(
  partial: Partial<AppPersistedState>,
): AppPersistedState {
  const merged = { ...DEFAULT_PERSISTED_STATE, ...partial };
  const key = todayKey();
  if (merged.likesDayKey !== key) {
    return {
      ...merged,
      likesDayKey: key,
      likesUsedToday: 0,
    };
  }
  return merged;
}

export function loadPersistedState(): AppPersistedState {
  if (typeof window === "undefined") {
    return DEFAULT_PERSISTED_STATE;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return DEFAULT_PERSISTED_STATE;
    }
    const parsed = JSON.parse(raw) as Partial<AppPersistedState>;
    return normalizePersistedState(parsed);
  } catch {
    return DEFAULT_PERSISTED_STATE;
  }
}

export function savePersistedState(state: AppPersistedState): void {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}
