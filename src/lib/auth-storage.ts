import type { AuthUser } from "@/types";

export const AUTH_STORAGE_KEY = "app-two-auth-v1";
export const PENDING_MAGIC_EMAIL_KEY = "app-two-pending-magic-email";

export function loadAuthUser(): AuthUser | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function saveAuthUser(user: AuthUser | null): void {
  if (typeof window === "undefined") {
    return;
  }
  if (!user) {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

export function displayNameFromEmail(email: string): string {
  const local = email.split("@")[0] ?? "You";
  return local.charAt(0).toUpperCase() + local.slice(1);
}
