import { describe, expect, it } from "vitest";
import {
  isAuthSessionActive,
  isValidAuthUser,
  parseAuthUserJson,
} from "@/lib/auth-session";

describe("auth session helpers", () => {
  it("validates auth user shape", () => {
    expect(
      isValidAuthUser({
        id: "u1",
        email: "a@example.com",
        displayName: "A",
        createdAt: "2026-01-01T00:00:00.000Z",
      }),
    ).toBe(true);
    expect(isValidAuthUser({ id: "", email: "bad" })).toBe(false);
  });

  it("parses JSON safely", () => {
    const user = parseAuthUserJson(
      JSON.stringify({
        id: "u1",
        email: "a@example.com",
        displayName: "A",
        createdAt: "2026-01-01T00:00:00.000Z",
      }),
    );
    expect(user?.email).toBe("a@example.com");
    expect(parseAuthUserJson("{not-json")).toBeNull();
  });

  it("detects active session", () => {
    expect(isAuthSessionActive(null)).toBe(false);
    expect(
      isAuthSessionActive({
        id: "u1",
        email: "a@example.com",
        displayName: "A",
        createdAt: "2026-01-01T00:00:00.000Z",
      }),
    ).toBe(true);
  });
});
