export const strings = {
  brand: "App Two",
  nav: {
    discover: "Discover",
    likes: "Likes",
    matches: "Matches",
    premium: "Premium",
    profile: "Profile",
  },
  cta: {
    signIn: "Sign in",
    getStarted: "Get started free",
    upgradePremium: "Upgrade to Premium",
    openDiscover: "Open Discover",
  },
  landing: {
    heroTitle: "Real connections. App Two energy.",
    heroSubtitle:
      "Swipe thoughtfully, match instantly, and chat in a dark, mobile-first experience built for demos and QA — public-safe, monetization-ready.",
    features: [
      {
        title: "Discover that converts",
        body: "Filters, multi-photo cards, boosts, and Super Likes — with a clear path to Premium.",
      },
      {
        title: "Matches & chat",
        body: "Typing indicators, read receipts, and safety tools (report, block, unmatch) out of the box.",
      },
      {
        title: "Monetization stubs",
        body: "Likes You blur funnel, rewind upsell, and Stripe test-mode checkout — no secrets in repo.",
      },
    ],
    footerNote: "Mock data only · No real users · App Two branding",
  },
  loading: {
    app: "Loading App Two…",
    discover: "Loading Discover…",
    matches: "Loading matches…",
    likesYou: "Loading likes…",
    chat: "Loading chat…",
  },
} as const;

export type AppStrings = typeof strings;
