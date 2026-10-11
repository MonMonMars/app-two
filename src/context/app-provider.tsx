"use client";

import { useProfile } from "@/context/profile-provider";
import { BOOST_DURATION_MS } from "@/lib/constants";
import { buildDiscoverDeck } from "@/lib/deck-logic";
import { createsMutualMatch } from "@/lib/match-logic";
import {
  INITIAL_MATCHES,
  INITIAL_MESSAGES,
  MOCK_PROFILES,
  profileById,
  randomAutoReply,
  CHAT_IMAGE_STUB_URL,
} from "@/lib/mock-data";
import {
  DEFAULT_PERSISTED_STATE,
  loadPersistedState,
  savePersistedState,
} from "@/lib/storage";
import { touchDailyStreak } from "@/lib/streak";
import type {
  AppPersistedState,
  ChatMessage,
  Match,
  MonetizationProduct,
  Profile,
  ReportReason,
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
  streakCount: number;
  deck: Profile[];
  deckEmptyReason: "filters" | "caught_up" | "blocked" | null;
  matches: Match[];
  messages: ChatMessage[];
  blockedProfileIds: string[];
  typingMatchId: string | null;
  dailyLikeLimit: number;
  likesUsedToday: number;
  canLike: boolean;
  hasLastSwipe: boolean;
  passProfile: (profileId: string) => void;
  likeProfile: (
    profileId: string,
    options?: { super?: boolean },
  ) => Match | null;
  rewindLastSwipe: () => boolean;
  sendMessage: (matchId: string, body: string) => void;
  sendImageMessage: (matchId: string) => void;
  activateBoost: () => boolean;
  setPremiumTier: (tier: SubscriptionTier) => void;
  applyProductPurchase: (product: MonetizationProduct) => void;
  blockProfile: (profileId: string) => void;
  unblockProfile: (profileId: string) => void;
  unmatch: (matchId: string) => void;
  reportProfile: (profileId: string, reason: ReportReason) => void;
  resetAppState: () => void;
  debugResetLocalData: () => void;
  debugGrantPremium: () => void;
  debugRefillConsumables: () => void;
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
  const [typingMatchId, setTypingMatchId] = useState<string | null>(null);
  const [lastSwipe, setLastSwipe] = useState<{
    profileId: string;
    action: "like" | "pass";
    createdMatchId?: string;
  } | null>(null);

  useEffect(() => {
    const loaded = touchDailyStreak(clearExpiredBoost(loadPersistedState()));
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

  const blockedSet = useMemo(
    () => new Set(persisted.blockedProfileIds),
    [persisted.blockedProfileIds],
  );

  const { deck, deckEmptyReason } = useMemo(() => {
    const result = buildDiscoverDeck(
      MOCK_PROFILES,
      persisted.passedIds,
      persisted.likedIds,
      persisted.blockedProfileIds,
      datingProfile,
      discoverFilters,
    );
    return { deck: result.deck, deckEmptyReason: result.emptyReason };
  }, [
    persisted.passedIds,
    persisted.likedIds,
    persisted.blockedProfileIds,
    datingProfile,
    discoverFilters,
  ]);

  const visibleMatches = useMemo(
    () => matches.filter((m) => !blockedSet.has(m.profile.id)),
    [matches, blockedSet],
  );

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
      if (blockedSet.has(profileId)) {
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

      if (!createsMutualMatch(profileId)) {
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
    [canLike, persisted.superLikesRemaining, blockedSet],
  );

  const rewindLastSwipe = useCallback(() => {
    if (!hasPaidTier(persisted.tier) || !lastSwipe) {
      return false;
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
    return true;
  }, [lastSwipe, persisted.tier]);

  const markRead = useCallback((messageId: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId ? { ...m, readAt: new Date().toISOString() } : m,
      ),
    );
  }, []);

  const sendMessage = useCallback(
    (matchId: string, body: string) => {
      const trimmed = body.trim();
      if (!trimmed) {
        return;
      }
      const msg: ChatMessage = {
        id: `msg-${Date.now()}`,
        matchId,
        sender: "me",
        body: trimmed,
        kind: "text",
        sentAt: new Date().toISOString(),
        readAt: null,
      };
      setMessages((prev) => [...prev, msg]);
      setMatches((prev) =>
        prev.map((m) =>
          m.id === matchId ? { ...m, lastMessagePreview: trimmed } : m,
        ),
      );

      setTypingMatchId(matchId);
      window.setTimeout(() => {
        markRead(msg.id);
      }, 1800);

      window.setTimeout(
        () => {
          setTypingMatchId(null);
          const reply = randomAutoReply();
          const replyMsg: ChatMessage = {
            id: `msg-${Date.now()}-auto`,
            matchId,
            sender: "them",
            body: reply,
            kind: "text",
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
    },
    [markRead],
  );

  const sendImageMessage = useCallback(
    (matchId: string) => {
      const msg: ChatMessage = {
        id: `msg-${Date.now()}-img`,
        matchId,
        sender: "me",
        body: "Photo",
        kind: "image",
        imageUrl: CHAT_IMAGE_STUB_URL,
        sentAt: new Date().toISOString(),
        readAt: null,
      };
      setMessages((prev) => [...prev, msg]);
      setMatches((prev) =>
        prev.map((m) =>
          m.id === matchId ? { ...m, lastMessagePreview: "📷 Photo" } : m,
        ),
      );
      setTypingMatchId(matchId);
      window.setTimeout(() => markRead(msg.id), 2000);
      window.setTimeout(() => {
        setTypingMatchId(null);
        const replyMsg: ChatMessage = {
          id: `msg-${Date.now()}-img-reply`,
          matchId,
          sender: "them",
          body: "Love that shot!",
          kind: "text",
          sentAt: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, replyMsg]);
      }, 1500);
    },
    [markRead],
  );

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

  const blockProfile = useCallback((profileId: string) => {
    setPersisted((s) => ({
      ...s,
      blockedProfileIds: s.blockedProfileIds.includes(profileId)
        ? s.blockedProfileIds
        : [...s.blockedProfileIds, profileId],
    }));
  }, []);

  const unblockProfile = useCallback((profileId: string) => {
    setPersisted((s) => ({
      ...s,
      blockedProfileIds: s.blockedProfileIds.filter((id) => id !== profileId),
    }));
  }, []);

  const unmatch = useCallback((matchId: string) => {
    setMatches((prev) => prev.filter((m) => m.id !== matchId));
    setMessages((prev) => prev.filter((m) => m.matchId !== matchId));
    setPersisted((s) => ({
      ...s,
      matchIds: s.matchIds.filter((id) => id !== matchId),
    }));
  }, []);

  const reportProfile = useCallback(
    (_profileId: string, _reason: ReportReason) => {
      /* mock — no backend */
    },
    [],
  );

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
    setTypingMatchId(null);
  }, []);

  const debugResetLocalData = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("app-two-state-v1");
    }
    resetAppState();
  }, [resetAppState]);

  const debugGrantPremium = useCallback(() => {
    setPersisted((s) => ({
      ...s,
      tier: "premium",
      boostsRemaining: Math.max(s.boostsRemaining, 3),
      superLikesRemaining: Math.max(s.superLikesRemaining, 5),
    }));
  }, []);

  const debugRefillConsumables = useCallback(() => {
    setPersisted((s) => ({
      ...s,
      boostsRemaining: s.boostsRemaining + 3,
      superLikesRemaining: s.superLikesRemaining + 5,
    }));
  }, []);

  const value: AppContextValue = {
    hydrated,
    tier: persisted.tier,
    boostsRemaining: persisted.boostsRemaining,
    superLikesRemaining: persisted.superLikesRemaining,
    boostActiveUntil: persisted.boostActiveUntil,
    streakCount: persisted.streakCount,
    deck,
    deckEmptyReason,
    matches: visibleMatches,
    messages,
    blockedProfileIds: persisted.blockedProfileIds,
    typingMatchId,
    dailyLikeLimit: FREE_DAILY_LIKE_LIMIT,
    likesUsedToday: persisted.likesUsedToday,
    canLike,
    hasLastSwipe: lastSwipe !== null,
    passProfile,
    likeProfile,
    rewindLastSwipe,
    sendMessage,
    sendImageMessage,
    activateBoost,
    setPremiumTier,
    applyProductPurchase,
    blockProfile,
    unblockProfile,
    unmatch,
    reportProfile,
    resetAppState,
    debugResetLocalData,
    debugGrantPremium,
    debugRefillConsumables,
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
