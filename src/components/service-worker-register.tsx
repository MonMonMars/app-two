"use client";

import { useEffect } from "react";

/** No-op SW for installability experiments; does not cache Next.js assets. */
export function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }
    if (!("serviceWorker" in navigator)) {
      return;
    }
    void navigator.serviceWorker.register("/sw.js").catch(() => {
      /* fail open */
    });
  }, []);

  return null;
}
