"use client";

import { AuthProvider } from "@/context/auth-provider";
import { ProfileProvider } from "@/context/profile-provider";

export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ProfileProvider>{children}</ProfileProvider>
    </AuthProvider>
  );
}
