import { LandingPage } from "@/components/landing-page";
import type { Metadata } from "next";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL ??
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://app-two.example.com";

export const metadata: Metadata = {
  title: "App Two — Swipe, match, and chat (public demo)",
  description:
    "App Two is a conversion-ready dating demo: Discover swipes, Likes You monetization, Premium rewind, and mock-safe chat — built for investors and QA.",
  openGraph: {
    title: "App Two — Dating demo with monetization built in",
    description:
      "Mobile-first swipes, matches, chat, and Premium upsells — public-safe mock data only.",
    url: siteUrl,
    siteName: "App Two",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}/og-placeholder.svg`,
        width: 1200,
        height: 630,
        alt: "App Two — dating demo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "App Two — Dating demo",
    description: "Public-safe Tinder-style MVP with monetization stubs.",
    images: [`${siteUrl}/og-placeholder.svg`],
  },
  alternates: { canonical: siteUrl },
};

export default function HomePage() {
  return <LandingPage />;
}
