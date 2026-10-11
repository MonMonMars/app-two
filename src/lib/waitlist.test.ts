import { describe, expect, it, beforeEach, vi } from "vitest";
import {
  addWaitlistEmail,
  isValidWaitlistEmail,
  loadWaitlistEmails,
  normalizeWaitlistEmail,
} from "@/lib/waitlist";
import { WAITLIST_STORAGE_KEY } from "@/lib/constants";

describe("waitlist stub", () => {
  const store = new Map<string, string>();

  beforeEach(() => {
    store.clear();
    vi.stubGlobal("localStorage", {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => {
        store.set(key, value);
      },
      removeItem: (key: string) => {
        store.delete(key);
      },
      clear: () => {
        store.clear();
      },
    });
  });

  it("normalizes emails", () => {
    expect(normalizeWaitlistEmail("  Foo@Bar.com ")).toBe("foo@bar.com");
  });

  it("validates email shape", () => {
    expect(isValidWaitlistEmail("a@b.co")).toBe(true);
    expect(isValidWaitlistEmail("not-an-email")).toBe(false);
  });

  it("persists unique emails", () => {
    expect(addWaitlistEmail("one@example.com").ok).toBe(true);
    expect(loadWaitlistEmails()).toEqual(["one@example.com"]);
    const dup = addWaitlistEmail("one@example.com");
    expect(dup.ok).toBe(false);
    expect(dup.reason).toBe("duplicate");
  });

  it("uses dedicated storage key", () => {
    addWaitlistEmail("wait@example.com");
    expect(localStorage.getItem(WAITLIST_STORAGE_KEY)).toContain(
      "wait@example.com",
    );
  });
});
