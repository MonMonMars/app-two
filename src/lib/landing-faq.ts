export type LandingFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const LANDING_FAQ_ITEMS: LandingFaqItem[] = [
  {
    id: "premium-worth",
    question: "What do Premium and Premium+ include in App Two?",
    answer:
      "This demo unlocks unlimited likes, rewind, Likes You, and consumable boosts locally. Production would map tiers to real entitlements from Stripe or your billing provider.",
  },
  {
    id: "payments-real",
    question: "Are payments real in this repo?",
    answer:
      "No. Checkout and webhooks are stubs with test-mode placeholders only. Purchases update tier and inventory in localStorage for QA — never ship API secrets in a public repo.",
  },
  {
    id: "report-block",
    question: "How do report, block, and unmatch work?",
    answer:
      "Report opens a mock reason picker (logged to the console). Block hides someone from Discover and Matches on this device. Unmatch removes the thread locally — production needs moderation queues and server-side enforcement.",
  },
  {
    id: "data-privacy",
    question: "Is my data private?",
    answer:
      "App Two stores mock profiles and chat on your browser only. There is no real backend, email delivery, or user graph. Use Settings → Export my data to download a JSON snapshot for demos.",
  },
  {
    id: "safety-tips",
    question: "Any safety tips for real launches?",
    answer:
      "Ship verified policies, age gates, photo moderation, block/report SLAs, and in-chat safety nudges. This MVP shows UI patterns only — legal pages here are placeholders, not counsel-reviewed copy.",
  },
];
