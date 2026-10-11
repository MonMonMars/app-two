export type AnalyticsEvent =
  | "signup"
  | "swipe_pass"
  | "swipe_like"
  | "match"
  | "paywall_view"
  | "purchase_mock"
  | "waitlist_join"
  | "rate_app_mock";

export type AnalyticsProps = Record<
  string,
  string | number | boolean | null | undefined
>;

export function track(event: AnalyticsEvent, props: AnalyticsProps = {}): void {
  const payload = {
    event,
    props,
    ts: new Date().toISOString(),
    app: "App Two",
  };
  if (process.env.NODE_ENV !== "production") {
    console.info("[App Two analytics]", payload);
  }
}
