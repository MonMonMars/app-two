"use client";

import { useEffect, useState } from "react";

export function useBoostCountdown(boostActiveUntil: string | null): number {
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    const tick = () => {
      if (!boostActiveUntil) {
        setSecondsLeft(0);
        return;
      }
      const end = new Date(boostActiveUntil).getTime();
      const diff = Math.max(0, Math.ceil((end - Date.now()) / 1000));
      setSecondsLeft(diff);
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [boostActiveUntil]);

  return secondsLeft;
}

export function formatCountdown(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
