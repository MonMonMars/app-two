"use client";

import {
  defaultAppSettings,
  defaultUserDatingProfile,
  loadAppSettings,
  loadDiscoverFilters,
  loadUserProfile,
  saveAppSettings,
  saveDiscoverFilters,
  saveUserProfile,
} from "@/lib/profile-storage";
import type { AppSettings, DiscoverFilters, UserDatingProfile } from "@/types";
import { useAuth } from "@/context/auth-provider";
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

type ProfileContextValue = {
  hydrated: boolean;
  datingProfile: UserDatingProfile | null;
  discoverFilters: DiscoverFilters | null;
  settings: AppSettings;
  updateDatingProfile: (
    patch: Partial<UserDatingProfile> | UserDatingProfile,
  ) => void;
  completeOnboarding: (profile: UserDatingProfile) => void;
  updateDiscoverFilters: (patch: Partial<DiscoverFilters>) => void;
  updateSettings: (patch: Partial<AppSettings>) => void;
  resetProfileForUser: () => void;
};

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { user, updateDisplayName } = useAuth();
  const [hydrated, setHydrated] = useState(false);
  const [datingProfile, setDatingProfile] = useState<UserDatingProfile | null>(
    null,
  );
  const [discoverFilters, setDiscoverFilters] =
    useState<DiscoverFilters | null>(null);
  const [settings, setSettings] = useState<AppSettings>(defaultAppSettings());

  useEffect(() => {
    if (!user) {
      startTransition(() => {
        setDatingProfile(null);
        setDiscoverFilters(null);
        setHydrated(true);
      });
      return;
    }

    startTransition(() => {
      const loaded =
        loadUserProfile(user.id) ?? defaultUserDatingProfile(user.displayName);
      setDatingProfile(loaded);
      setDiscoverFilters(loadDiscoverFilters(user.id, loaded));
      setSettings(loadAppSettings());
      setHydrated(true);
    });
  }, [user]);

  useEffect(() => {
    if (!user || !datingProfile || !hydrated) {
      return;
    }
    saveUserProfile(user.id, datingProfile);
  }, [user, datingProfile, hydrated]);

  useEffect(() => {
    if (!user || !discoverFilters || !hydrated) {
      return;
    }
    saveDiscoverFilters(user.id, discoverFilters);
  }, [user, discoverFilters, hydrated]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    saveAppSettings(settings);
  }, [settings, hydrated]);

  const updateDatingProfile = useCallback(
    (patch: Partial<UserDatingProfile> | UserDatingProfile) => {
      setDatingProfile((prev) => {
        if (!prev) {
          return prev;
        }
        const next = { ...prev, ...patch };
        if (patch.name && patch.name !== prev.name) {
          updateDisplayName(patch.name);
        }
        return next;
      });
    },
    [updateDisplayName],
  );

  const completeOnboarding = useCallback(
    (profile: UserDatingProfile) => {
      const complete = { ...profile, onboardingComplete: true };
      setDatingProfile(complete);
      updateDisplayName(complete.name);
      if (user) {
        setDiscoverFilters(loadDiscoverFilters(user.id, complete));
      }
    },
    [updateDisplayName, user],
  );

  const updateDiscoverFilters = useCallback(
    (patch: Partial<DiscoverFilters>) => {
      setDiscoverFilters((prev) => (prev ? { ...prev, ...patch } : prev));
    },
    [],
  );

  const updateSettings = useCallback((patch: Partial<AppSettings>) => {
    setSettings((prev) => ({
      ...prev,
      ...patch,
      notifications: {
        ...prev.notifications,
        ...(patch.notifications ?? {}),
      },
    }));
  }, []);

  const resetProfileForUser = useCallback(() => {
    if (!user) {
      return;
    }
    const fresh = defaultUserDatingProfile(user.displayName);
    setDatingProfile(fresh);
    setDiscoverFilters(loadDiscoverFilters(user.id, fresh));
  }, [user]);

  const value = useMemo(
    () => ({
      hydrated,
      datingProfile,
      discoverFilters,
      settings,
      updateDatingProfile,
      completeOnboarding,
      updateDiscoverFilters,
      updateSettings,
      resetProfileForUser,
    }),
    [
      hydrated,
      datingProfile,
      discoverFilters,
      settings,
      updateDatingProfile,
      completeOnboarding,
      updateDiscoverFilters,
      updateSettings,
      resetProfileForUser,
    ],
  );

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export function useProfile(): ProfileContextValue {
  const ctx = useContext(ProfileContext);
  if (!ctx) {
    throw new Error("useProfile must be used within ProfileProvider");
  }
  return ctx;
}
