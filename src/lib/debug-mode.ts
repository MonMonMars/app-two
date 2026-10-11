/** QA panel: enabled in development or when `?debug=1` is present. */
export function isDebugMode(
  debugQueryValue: string | null | undefined,
): boolean {
  if (debugQueryValue === "1") {
    return true;
  }
  return process.env.NODE_ENV === "development";
}
