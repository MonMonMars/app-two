"use client";

import {
  computeBoostSecondsLeft,
  formatCountdown,
} from "@/lib/boost-countdown";
import { useEffect, useState } from "react";

export function useBoostCountdown(boostActiveUntil: string | null): number {
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    const tick = () => {
      setSecondsLeft(computeBoostSecondsLeft(boostActiveUntil));
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [boostActiveUntil]);

  return secondsLeft;
}

export { formatCountdown };
