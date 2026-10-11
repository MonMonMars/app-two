import type { AuthUser } from "@/types";

export function isValidAuthUser(value: unknown): value is AuthUser {
  if (!value || typeof value !== "object") {
    return false;
  }
  const u = value as Record<string, unknown>;
  return (
    typeof u.id === "string" &&
    u.id.length > 0 &&
    typeof u.email === "string" &&
    u.email.includes("@") &&
    typeof u.displayName === "string" &&
    typeof u.createdAt === "string"
  );
}

export function isAuthSessionActive(
  user: AuthUser | null | undefined,
): boolean {
  return user !== null && user !== undefined && isValidAuthUser(user);
}

export function parseAuthUserJson(raw: string): AuthUser | null {
  try {
    const parsed: unknown = JSON.parse(raw);
    return isValidAuthUser(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
