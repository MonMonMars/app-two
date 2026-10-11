import type { ThemePreference } from "@/types";

export const THEME_STORAGE_ATTRIBUTE = "data-theme";

export function isThemePreference(value: unknown): value is ThemePreference {
  return value === "dark" || value === "light";
}

export function normalizeThemePreference(
  value: unknown,
  fallback: ThemePreference = "dark",
): ThemePreference {
  return isThemePreference(value) ? value : fallback;
}

export function applyThemePreference(theme: ThemePreference): void {
  if (typeof document === "undefined") {
    return;
  }
  document.documentElement.setAttribute(THEME_STORAGE_ATTRIBUTE, theme);
}

export function readAppliedTheme(): ThemePreference | null {
  if (typeof document === "undefined") {
    return null;
  }
  const attr = document.documentElement.getAttribute(THEME_STORAGE_ATTRIBUTE);
  return isThemePreference(attr) ? attr : null;
}
