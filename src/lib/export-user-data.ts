import { loadAuthUser } from "@/lib/auth-storage";
import {
  loadAppSettings,
  loadDiscoverFilters,
  loadUserProfile,
} from "@/lib/profile-storage";
import { loadPersistedState } from "@/lib/storage";

export type UserDataExportPayload = {
  exportedAt: string;
  app: "App Two";
  version: 1;
  auth: ReturnType<typeof loadAuthUser>;
  datingProfile: ReturnType<typeof loadUserProfile>;
  discoverFilters: ReturnType<typeof loadDiscoverFilters> | null;
  settings: ReturnType<typeof loadAppSettings>;
  persistedState: ReturnType<typeof loadPersistedState>;
};

export function buildUserDataExport(userId: string): UserDataExportPayload {
  const datingProfile = loadUserProfile(userId);
  const discoverFilters = datingProfile
    ? loadDiscoverFilters(userId, datingProfile)
    : null;
  return {
    exportedAt: new Date().toISOString(),
    app: "App Two",
    version: 1,
    auth: loadAuthUser(),
    datingProfile,
    discoverFilters,
    settings: loadAppSettings(),
    persistedState: loadPersistedState(),
  };
}

export function serializeUserDataExport(
  payload: UserDataExportPayload,
): string {
  return JSON.stringify(payload, null, 2);
}

export function userDataExportFilename(exportedAt: string): string {
  const day = exportedAt.slice(0, 10);
  return `app-two-export-${day}.json`;
}

export function downloadUserDataJson(userId: string): void {
  if (typeof document === "undefined") {
    return;
  }
  const payload = buildUserDataExport(userId);
  const blob = new Blob([serializeUserDataExport(payload)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = userDataExportFilename(payload.exportedAt);
  anchor.rel = "noopener";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
