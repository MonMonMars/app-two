"use client";

import { useEffect, useState } from "react";

export function OfflineBanner() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const sync = () => setOnline(navigator.onLine);
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);

  if (online) {
    return null;
  }

  return (
    <div
      className="fixed left-0 right-0 top-0 z-[100] bg-amber-600 px-4 py-2 text-center text-sm font-semibold text-zinc-950"
      role="status"
      aria-live="assertive"
    >
      You&apos;re offline — App Two will sync when you reconnect (mock).
    </div>
  );
}
