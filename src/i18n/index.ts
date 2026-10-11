import { strings, type AppStrings } from "@/i18n/en";

export type Locale = "en";

const catalogs: Record<Locale, AppStrings> = { en: strings };

let activeLocale: Locale = "en";

export function setLocale(locale: Locale): void {
  activeLocale = locale;
}

export function getLocale(): Locale {
  return activeLocale;
}

/** English-only scaffolding — swap catalogs when adding locales. */
export function t(): AppStrings {
  return catalogs[activeLocale];
}

export { strings };
