"use client";

import { AuthProvider } from "@/context/auth-provider";

export function RootProviders({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
