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
  voice: {
    entry: "語音",
    title: "語音通話 · Voice",
    subtitle: "同 {name} 傾計 · Grok 粵語 realtime",
    hint: "用粵語自然傾偈。需要麥克風權限；音訊經 xAI Grok Voice（server-side XAI_API_KEY）。",
    startCall: "開始通話",
    endCall: "結束",
    mute: "靜音",
    unmute: "開麥",
    close: "Close voice panel",
    connection: "連線狀態",
    unconfiguredTitle: "未設定 XAI_API_KEY",
    unconfiguredBody:
      "喺 .env.local 加入 XAI_API_KEY（只放 server），然後重啟 dev server。",
    status: {
      idle: "待命",
      connecting: "連接中…",
      connected: "通話中",
      disconnecting: "斷線中…",
      error: "錯誤",
    },
  },
} as const;

export type AppStrings = typeof strings;
