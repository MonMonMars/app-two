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
  boostActiveUntil: null,
  blockedProfileIds: [],
  streakCount: 0,
  streakDayKey: todayKey(),
  subscriptionStatus: "none",
  subscriptionRenewalAt: null,
  discoverCoachDismissed: false,
  pushSoftPrompt: "idle",
  matchLastReadAt: { "m-seed-1": new Date(Date.now() - 7200000).toISOString() },
  referralShareCount: 0,
  softPaywallDismissedDayKey: null,
};

export function normalizePersistedState(
  partial: Partial<AppPersistedState>,
): AppPersistedState {
  const merged = {
    ...DEFAULT_PERSISTED_STATE,
    ...partial,
    blockedProfileIds:
      partial.blockedProfileIds ?? DEFAULT_PERSISTED_STATE.blockedProfileIds,
    streakCount: partial.streakCount ?? DEFAULT_PERSISTED_STATE.streakCount,
    streakDayKey: partial.streakDayKey ?? DEFAULT_PERSISTED_STATE.streakDayKey,
    subscriptionStatus:
      partial.subscriptionStatus ?? DEFAULT_PERSISTED_STATE.subscriptionStatus,
    subscriptionRenewalAt:
      partial.subscriptionRenewalAt !== undefined
        ? partial.subscriptionRenewalAt
        : DEFAULT_PERSISTED_STATE.subscriptionRenewalAt,
    discoverCoachDismissed:
      partial.discoverCoachDismissed ??
      DEFAULT_PERSISTED_STATE.discoverCoachDismissed,
    pushSoftPrompt:
      partial.pushSoftPrompt ?? DEFAULT_PERSISTED_STATE.pushSoftPrompt,
    matchLastReadAt:
      partial.matchLastReadAt ?? DEFAULT_PERSISTED_STATE.matchLastReadAt,
    referralShareCount:
      partial.referralShareCount ?? DEFAULT_PERSISTED_STATE.referralShareCount,
    softPaywallDismissedDayKey:
      partial.softPaywallDismissedDayKey !== undefined
        ? partial.softPaywallDismissedDayKey
        : DEFAULT_PERSISTED_STATE.softPaywallDismissedDayKey,
    boostActiveUntil:
      partial.boostActiveUntil !== undefined
        ? partial.boostActiveUntil
        : DEFAULT_PERSISTED_STATE.boostActiveUntil,
  };
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
