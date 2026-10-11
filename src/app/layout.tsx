import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { RootProviders } from "@/components/root-providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      "https://app-two.example.com",
  ),
  title: {
    default: "App Two — Dating",
    template: "%s · App Two",
  },
  description:
    "App Two is a public dating app MVP with swipes, matches, chat, mock auth, and Stripe test-mode monetization stubs.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "App Two",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [{ url: "/icons/icon-192.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icons/icon-192.svg" }],
  },
};

export const viewport = {
  themeColor: "#f43f5e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--background)] font-sans text-[var(--foreground)]">
        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
