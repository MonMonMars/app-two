"use client";

import { PageLoading } from "@/components/page-states";
import { SoftPaywallInterstitial } from "@/components/soft-paywall-interstitial";
import { SwipeDeck } from "@/components/swipe-deck";
import { useApp } from "@/context/app-provider";
import { t } from "@/i18n";
import { track } from "@/lib/analytics";
import { SOFT_PAYWALL_SWIPE_THRESHOLD } from "@/lib/constants";
import { useEffect, useRef } from "react";

export function DiscoverScreen() {
  const {
    hydrated,
    showSoftPaywallInterstitial,
    dismissSoftPaywall,
    totalSwipeCount,
  } = useApp();
  const paywallTracked = useRef(false);

  useEffect(() => {
    if (showSoftPaywallInterstitial && !paywallTracked.current) {
      track("paywall_view", { source: "soft_interstitial", totalSwipeCount });
      paywallTracked.current = true;
    }
    if (!showSoftPaywallInterstitial) {
      paywallTracked.current = false;
    }
  }, [showSoftPaywallInterstitial, totalSwipeCount]);

  if (!hydrated) {
    return <PageLoading message={t().loading.discover} />;
  }

  return (
    <>
      <SwipeDeck />
      {showSoftPaywallInterstitial ? (
        <SoftPaywallInterstitial
          swipeCount={totalSwipeCount}
          threshold={SOFT_PAYWALL_SWIPE_THRESHOLD}
          onDismiss={dismissSoftPaywall}
        />
      ) : null}
    </>
  );
}
