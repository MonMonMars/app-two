import { WAITLIST_STORAGE_KEY } from "@/lib/constants";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeWaitlistEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

export function isValidWaitlistEmail(email: string): boolean {
  const normalized = normalizeWaitlistEmail(email);
  return normalized.length > 0 && EMAIL_PATTERN.test(normalized);
}

function hasWaitlistStorage(): boolean {
  return typeof localStorage !== "undefined";
}

export function loadWaitlistEmails(): string[] {
  if (!hasWaitlistStorage()) {
    return [];
  }
  try {
    const raw = localStorage.getItem(WAITLIST_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.filter((e): e is string => typeof e === "string");
  } catch {
    return [];
  }
}

export function saveWaitlistEmails(emails: string[]): void {
  if (!hasWaitlistStorage()) {
    return;
  }
  localStorage.setItem(WAITLIST_STORAGE_KEY, JSON.stringify(emails));
}

export function addWaitlistEmail(raw: string): {
  ok: boolean;
  reason?: "invalid" | "duplicate";
  emails: string[];
} {
  const email = normalizeWaitlistEmail(raw);
  if (!isValidWaitlistEmail(email)) {
    return { ok: false, reason: "invalid", emails: loadWaitlistEmails() };
  }
  const existing = loadWaitlistEmails();
  if (existing.includes(email)) {
    return { ok: false, reason: "duplicate", emails: existing };
  }
  const next = [...existing, email];
  saveWaitlistEmails(next);
  return { ok: true, emails: next };
}
