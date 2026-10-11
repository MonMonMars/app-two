import { afterEach, describe, expect, it, vi } from "vitest";
import { track } from "@/lib/analytics";

describe("analytics track", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("logs payload in non-production", () => {
    const spy = vi.spyOn(console, "info").mockImplementation(() => {});
    track("signup", { userId: "u1" });
    expect(spy).toHaveBeenCalled();
    const arg = spy.mock.calls[0]?.[1] as { event: string };
    expect(arg.event).toBe("signup");
  });

  it("accepts purchase_mock events", () => {
    const spy = vi.spyOn(console, "info").mockImplementation(() => {});
    track("purchase_mock", { product: "boost" });
    expect(spy).toHaveBeenCalled();
  });
});
