"use client";

import { AuthProvider } from "@/context/auth-provider";
import { ProfileProvider } from "@/context/profile-provider";
import { ThemeSync } from "@/components/theme-sync";

export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ProfileProvider>
        <ThemeSync />
        {children}
      </ProfileProvider>
    </AuthProvider>
  );
}
