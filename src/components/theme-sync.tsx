"use client";

import { useProfile } from "@/context/profile-provider";
import { applyThemePreference } from "@/lib/theme-preference";
import { useEffect } from "react";

/** Applies theme from persisted settings to the document root. */
export function ThemeSync() {
  const { settings, hydrated } = useProfile();

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    applyThemePreference(settings.theme);
  }, [settings.theme, hydrated]);

  return null;
}
