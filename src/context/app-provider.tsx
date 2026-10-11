"use client";

import { useProfile } from "@/context/profile-provider";
import { BOOST_DURATION_MS } from "@/lib/constants";
import { profileMatchesDiscoverFilters } from "@/lib/discover-filter";
import {
  INITIAL_MATCHES,
  INITIAL_MESSAGES,
  MATCH_ON_LIKE_IDS,
  MOCK_PROFILES,
  profileById,
  randomAutoReply,
} from "@/lib/mock-data";
import {
  DEFAULT_PERSISTED_STATE,
  loadPersistedState,
  savePersistedState,
} from "@/lib/storage";
import type {
  AppPersistedState,
  ChatMessage,
  Match,
  MonetizationProduct,
  Profile,
  SubscriptionTier,
} from "@/types";
import {
  createContext,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type AppContextValue = {
  hydrated: boolean;
  tier: SubscriptionTier;
  boostsRemaining: number;
  superLikesRemaining: number;
  boostActiveUntil: string | null;
  deck: Profile[];
  deckEmptyReason: "filters" | "caught_up" | null;
  matches: Match[];
  messages: ChatMessage[];
  dailyLikeLimit: number;
  likesUsedToday: number;
  canLike: boolean;
  passProfile: (profileId: string) => void;
  likeProfile: (
    profileId: string,
    options?: { super?: boolean },
  ) => Match | null;
  rewindLastSwipe: () => void;
  sendMessage: (matchId: string, body: string) => void;
  activateBoost: () => boolean;
  setPremiumTier: (tier: SubscriptionTier) => void;
  applyProductPurchase: (product: MonetizationProduct) => void;
  resetAppState: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

const FREE_DAILY_LIKE_LIMIT = 25;

function hasPaidTier(tier: SubscriptionTier): boolean {
  return tier === "premium" || tier === "premium_plus";
}

function buildMatchesFromIds(matchIds: string[], existing: Match[]): Match[] {
  const byId = new Map(existing.map((m) => [m.id, m]));
  return matchIds
    .map((id) => byId.get(id))
    .filter((m): m is Match => Boolean(m));
}

function bumpLikes(state: AppPersistedState): AppPersistedState {
  return {
    ...state,
    likesUsedToday: state.likesUsedToday + 1,
  };
}

function clearExpiredBoost(state: AppPersistedState): AppPersistedState {
  if (!state.boostActiveUntil) {
    return state;
  }
  if (new Date(state.boostActiveUntil).getTime() <= Date.now()) {
    return { ...state, boostActiveUntil: null };
  }
  return state;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const { datingProfile, discoverFilters } = useProfile();
  const [hydrated, setHydrated] = useState(false);
  const [persisted, setPersisted] = useState<AppPersistedState>(
    DEFAULT_PERSISTED_STATE,
  );
  const [matches, setMatches] = useState<Match[]>(INITIAL_MATCHES);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [lastSwipe, setLastSwipe] = useState<{
    profileId: string;
    action: "like" | "pass";
    createdMatchId?: string;
  } | null>(null);

  useEffect(() => {
    const loaded = clearExpiredBoost(loadPersistedState());
    startTransition(() => {
      setPersisted(loaded);
      setMatches((prev) => {
        const merged = new Map<string, Match>();
        for (const m of INITIAL_MATCHES) {
          merged.set(m.id, m);
        }
        for (const m of prev) {
          merged.set(m.id, m);
        }
        return buildMatchesFromIds(loaded.matchIds, [...merged.values()]);
      });
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    savePersistedState(clearExpiredBoost(persisted));
  }, [persisted, hydrated]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setPersisted((s) => clearExpiredBoost(s));
    }, 5000);
    return () => window.clearInterval(id);
  }, []);

  const { deck, deckEmptyReason } = useMemo((): {
    deck: Profile[];
    deckEmptyReason: "filters" | "caught_up" | null;
  } => {
    const seen = new Set([...persisted.passedIds, ...persisted.likedIds]);
    const unseen = MOCK_PROFILES.filter((p) => !seen.has(p.id));

    if (!datingProfile || !discoverFilters) {
      return { deck: unseen, deckEmptyReason: null };
    }

    const filtered = unseen.filter((p) =>
      profileMatchesDiscoverFilters(p, discoverFilters, datingProfile),
    );

    if (filtered.length === 0 && unseen.length > 0) {
      return { deck: filtered, deckEmptyReason: "filters" };
    }
    if (filtered.length === 0) {
      return { deck: filtered, deckEmptyReason: "caught_up" };
    }
    return { deck: filtered, deckEmptyReason: null };
  }, [persisted.passedIds, persisted.likedIds, datingProfile, discoverFilters]);

  const canLike = useMemo(() => {
    if (hasPaidTier(persisted.tier)) {
      return true;
    }
    return persisted.likesUsedToday < FREE_DAILY_LIKE_LIMIT;
  }, [persisted.tier, persisted.likesUsedToday]);

  const passProfile = useCallback((profileId: string) => {
    setLastSwipe({ profileId, action: "pass" });
    setPersisted((s) => ({
      ...s,
      passedIds: s.passedIds.includes(profileId)
        ? s.passedIds
        : [...s.passedIds, profileId],
    }));
  }, []);

  const likeProfile = useCallback(
    (profileId: string, options?: { super?: boolean }) => {
      if (!canLike && !options?.super) {
        return null;
      }
      if (options?.super && persisted.superLikesRemaining <= 0) {
        return null;
      }

      setLastSwipe({ profileId, action: "like" });
      setPersisted((s) => {
        let next = {
          ...s,
          likedIds: s.likedIds.includes(profileId)
            ? s.likedIds
            : [...s.likedIds, profileId],
          superLikesRemaining: options?.super
            ? Math.max(0, s.superLikesRemaining - 1)
            : s.superLikesRemaining,
        };
        if (!options?.super) {
          next = bumpLikes(next);
        }
        return next;
      });

      if (!MATCH_ON_LIKE_IDS.has(profileId)) {
        return null;
      }

      const profile = profileById(profileId);
      if (!profile) {
        return null;
      }

      const matchId = `m-${profileId}-${Date.now()}`;
      const newMatch: Match = {
        id: matchId,
        profile,
        matchedAt: new Date().toISOString(),
        lastMessagePreview: "You matched! Say hi 👋",
      };

      setMatches((prev) => {
        if (prev.some((m) => m.profile.id === profileId)) {
          return prev;
        }
        return [newMatch, ...prev];
      });

      setPersisted((s) => ({
        ...s,
        matchIds: s.matchIds.includes(matchId)
          ? s.matchIds
          : [matchId, ...s.matchIds],
      }));

      setLastSwipe({ profileId, action: "like", createdMatchId: matchId });
      return newMatch;
    },
    [canLike, persisted.superLikesRemaining],
  );

  const rewindLastSwipe = useCallback(() => {
    if (!hasPaidTier(persisted.tier) || !lastSwipe) {
      return;
    }
    const { profileId, action, createdMatchId } = lastSwipe;
    setPersisted((s) => {
      let next: AppPersistedState = {
        ...s,
        passedIds: s.passedIds.filter((id) => id !== profileId),
        likedIds: s.likedIds.filter((id) => id !== profileId),
        matchIds: createdMatchId
          ? s.matchIds.filter((id) => id !== createdMatchId)
          : s.matchIds,
      };
      if (action === "like") {
        next = {
          ...next,
          likesUsedToday: Math.max(0, next.likesUsedToday - 1),
        };
      }
      return next;
    });
    if (createdMatchId) {
      setMatches((prev) => prev.filter((m) => m.id !== createdMatchId));
    }
    setLastSwipe(null);
  }, [lastSwipe, persisted.tier]);

  const sendMessage = useCallback((matchId: string, body: string) => {
    const trimmed = body.trim();
    if (!trimmed) {
      return;
    }
    const msg: ChatMessage = {
      id: `msg-${Date.now()}`,
      matchId,
      sender: "me",
      body: trimmed,
      sentAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, msg]);
    setMatches((prev) =>
      prev.map((m) =>
        m.id === matchId ? { ...m, lastMessagePreview: trimmed } : m,
      ),
    );

    window.setTimeout(
      () => {
        const reply = randomAutoReply();
        const replyMsg: ChatMessage = {
          id: `msg-${Date.now()}-auto`,
          matchId,
          sender: "them",
          body: reply,
          sentAt: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, replyMsg]);
        setMatches((prev) =>
          prev.map((m) =>
            m.id === matchId ? { ...m, lastMessagePreview: reply } : m,
          ),
        );
      },
      1200 + Math.random() * 800,
    );
  }, []);

  const activateBoost = useCallback(() => {
    if (persisted.boostsRemaining <= 0) {
      return false;
    }
    const until = new Date(Date.now() + BOOST_DURATION_MS).toISOString();
    setPersisted((s) => ({
      ...s,
      boostsRemaining: s.boostsRemaining - 1,
      boostActiveUntil: until,
    }));
    return true;
  }, [persisted.boostsRemaining]);

  const setPremiumTier = useCallback((tier: SubscriptionTier) => {
    setPersisted((s) => ({ ...s, tier }));
  }, []);

  const applyProductPurchase = useCallback((product: MonetizationProduct) => {
    setPersisted((s) => {
      switch (product) {
        case "premium_monthly":
          return {
            ...s,
            tier: "premium",
            boostsRemaining: s.boostsRemaining + 1,
          };
        case "premium_annual":
          return {
            ...s,
            tier: "premium_plus",
            boostsRemaining: s.boostsRemaining + 2,
          };
        case "boost":
          return { ...s, boostsRemaining: s.boostsRemaining + 1 };
        case "super_like_pack":
          return { ...s, superLikesRemaining: s.superLikesRemaining + 5 };
        default: {
          const _exhaustive: never = product;
          return _exhaustive;
        }
      }
    });
  }, []);

  const resetAppState = useCallback(() => {
    setPersisted(DEFAULT_PERSISTED_STATE);
    setMatches(INITIAL_MATCHES);
    setMessages(INITIAL_MESSAGES);
    setLastSwipe(null);
  }, []);

  const value: AppContextValue = {
    hydrated,
    tier: persisted.tier,
    boostsRemaining: persisted.boostsRemaining,
    superLikesRemaining: persisted.superLikesRemaining,
    boostActiveUntil: persisted.boostActiveUntil,
    deck,
    deckEmptyReason,
    matches,
    messages,
    dailyLikeLimit: FREE_DAILY_LIKE_LIMIT,
    likesUsedToday: persisted.likesUsedToday,
    canLike,
    passProfile,
    likeProfile,
    rewindLastSwipe,
    sendMessage,
    activateBoost,
    setPremiumTier,
    applyProductPurchase,
    resetAppState,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used within AppProvider");
  }
  return ctx;
}
