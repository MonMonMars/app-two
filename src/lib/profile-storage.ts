import { defaultDiscoverFilters } from "@/lib/discover-filter";
import type { AppSettings, DiscoverFilters, UserDatingProfile } from "@/types";

const PROFILE_KEY_PREFIX = "app-two-dating-profile-v1";
const FILTERS_KEY_PREFIX = "app-two-discover-filters-v1";
const SETTINGS_KEY = "app-two-settings-v1";

export function defaultUserDatingProfile(
  displayName: string,
): UserDatingProfile {
  return {
    name: displayName,
    age: 27,
    bio: "",
    photoUrls: ["https://picsum.photos/seed/apptwo-me-default/600/800"],
    interests: [],
    gender: "other",
    showMe: "everyone",
    ageRangeMin: 21,
    ageRangeMax: 45,
    onboardingComplete: false,
  };
}

export function defaultAppSettings(): AppSettings {
  return {
    notifications: {
      matches: true,
      messages: true,
      marketing: false,
    },
    theme: "dark",
    soundEffectsEnabled: true,
  };
}

function profileKey(userId: string): string {
  return `${PROFILE_KEY_PREFIX}:${userId}`;
}

function filtersKey(userId: string): string {
  return `${FILTERS_KEY_PREFIX}:${userId}`;
}

export function loadUserProfile(userId: string): UserDatingProfile | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = localStorage.getItem(profileKey(userId));
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as UserDatingProfile;
  } catch {
    return null;
  }
}

export function saveUserProfile(
  userId: string,
  profile: UserDatingProfile,
): void {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(profileKey(userId), JSON.stringify(profile));
}

export function loadDiscoverFilters(
  userId: string,
  profile: UserDatingProfile,
): DiscoverFilters {
  if (typeof window === "undefined") {
    return defaultDiscoverFilters(profile);
  }
  try {
    const raw = localStorage.getItem(filtersKey(userId));
    if (!raw) {
      return defaultDiscoverFilters(profile);
    }
    return { ...defaultDiscoverFilters(profile), ...JSON.parse(raw) };
  } catch {
    return defaultDiscoverFilters(profile);
  }
}

export function saveDiscoverFilters(
  userId: string,
  filters: DiscoverFilters,
): void {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(filtersKey(userId), JSON.stringify(filters));
}

export function loadAppSettings(): AppSettings {
  if (typeof window === "undefined") {
    return defaultAppSettings();
  }
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) {
      return defaultAppSettings();
    }
    const defaults = defaultAppSettings();
    const parsed = JSON.parse(raw) as Partial<AppSettings>;
    return {
      ...defaults,
      ...parsed,
      notifications: {
        ...defaults.notifications,
        ...parsed.notifications,
      },
    };
  } catch {
    return defaultAppSettings();
  }
}

export function saveAppSettings(settings: AppSettings): void {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function clearAllUserData(userId: string): void {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.removeItem(profileKey(userId));
  localStorage.removeItem(filtersKey(userId));
  localStorage.removeItem("app-two-state-v1");
  localStorage.removeItem("app-two-auth-v1");
  sessionStorage.removeItem("app-two-pending-magic-email");
}
