export const DEMO_REFERRAL_CODE = "APP-TWO-DEMO";

export function buildInviteUrl(baseUrl: string, code: string): string {
  const trimmed = baseUrl.replace(/\/$/, "");
  return `${trimmed}/invite?ref=${encodeURIComponent(code)}`;
}

export function mockReferralCountFromStorage(
  stored: number | undefined,
): number {
  return typeof stored === "number" && stored >= 0 ? stored : 0;
}
