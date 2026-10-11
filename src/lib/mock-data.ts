import type { ChatMessage, Match, Profile } from "@/types";

export const MOCK_PROFILES: Profile[] = [
  {
    id: "p1",
    name: "Jordan",
    age: 28,
    bio: "Coffee, trail runs, and trying every ramen spot in the city.",
    location: "2 mi away",
    interests: ["Hiking", "Photography", "Cooking"],
    photoUrl: "https://picsum.photos/seed/apptwo-jordan/600/800",
    verified: true,
    gender: "nonbinary",
    distanceMiles: 2,
    photoUrls: [
      "https://picsum.photos/seed/apptwo-jordan/600/800",
      "https://picsum.photos/seed/apptwo-jordan-2/600/800",
      "https://picsum.photos/seed/apptwo-jordan-3/600/800",
    ],
  },
  {
    id: "p2",
    name: "Sam",
    age: 31,
    bio: "Product designer by day. Vinyl collector by night.",
    location: "5 mi away",
    interests: ["Design", "Music", "Travel"],
    photoUrl: "https://picsum.photos/seed/apptwo-sam/600/800",
    verified: true,
    gender: "man",
    distanceMiles: 5,
    photoUrls: [
      "https://picsum.photos/seed/apptwo-sam/600/800",
      "https://picsum.photos/seed/apptwo-sam-2/600/800",
    ],
  },
  {
    id: "p3",
    name: "Riley",
    age: 26,
    bio: "Dog parent. Will share fries.",
    location: "1 mi away",
    interests: ["Dogs", "Comedy", "Yoga"],
    photoUrl: "https://picsum.photos/seed/apptwo-riley/600/800",
    gender: "woman",
    distanceMiles: 1,
    photoUrls: [
      "https://picsum.photos/seed/apptwo-riley/600/800",
      "https://picsum.photos/seed/apptwo-riley-2/600/800",
      "https://picsum.photos/seed/apptwo-riley-3/600/800",
    ],
  },
  {
    id: "p4",
    name: "Alex",
    age: 29,
    bio: "Building side projects and booking weekend flights.",
    location: "8 mi away",
    interests: ["Startups", "Surf", "Film"],
    photoUrl: "https://picsum.photos/seed/apptwo-alex/600/800",
    verified: true,
    gender: "man",
    distanceMiles: 8,
    photoUrls: [
      "https://picsum.photos/seed/apptwo-alex/600/800",
      "https://picsum.photos/seed/apptwo-alex-2/600/800",
    ],
  },
  {
    id: "p5",
    name: "Casey",
    age: 27,
    bio: "Museum dates > bar dates.",
    location: "3 mi away",
    interests: ["Art", "Books", "Wine"],
    photoUrl: "https://picsum.photos/seed/apptwo-casey/600/800",
    gender: "woman",
    distanceMiles: 3,
    photoUrls: [
      "https://picsum.photos/seed/apptwo-casey/600/800",
      "https://picsum.photos/seed/apptwo-casey-2/600/800",
    ],
  },
  {
    id: "p6",
    name: "Morgan",
    age: 30,
    bio: "Training for a half marathon. Cheer me on?",
    location: "4 mi away",
    interests: ["Running", "Podcasts", "Brunch"],
    photoUrl: "https://picsum.photos/seed/apptwo-morgan/600/800",
    gender: "nonbinary",
    distanceMiles: 4,
    photoUrls: [
      "https://picsum.photos/seed/apptwo-morgan/600/800",
      "https://picsum.photos/seed/apptwo-morgan-2/600/800",
    ],
  },
  {
    id: "p7",
    name: "Taylor",
    age: 25,
    bio: "Film photographer. Golden hour is my love language.",
    location: "6 mi away",
    interests: ["Film", "Cycling", "Thai food"],
    photoUrl: "https://picsum.photos/seed/apptwo-taylor/600/800",
    gender: "woman",
    distanceMiles: 6,
    photoUrls: [
      "https://picsum.photos/seed/apptwo-taylor/600/800",
      "https://picsum.photos/seed/apptwo-taylor-2/600/800",
    ],
  },
  {
    id: "p8",
    name: "Quinn",
    age: 32,
    bio: "Sommelier-ish. I'll pick the wine if you pick the playlist.",
    location: "7 mi away",
    interests: ["Wine", "Jazz", "Cheese"],
    photoUrl: "https://picsum.photos/seed/apptwo-quinn/600/800",
    verified: true,
    gender: "man",
    distanceMiles: 7,
    photoUrls: [
      "https://picsum.photos/seed/apptwo-quinn/600/800",
      "https://picsum.photos/seed/apptwo-quinn-2/600/800",
    ],
  },
  {
    id: "p9",
    name: "Avery",
    age: 24,
    bio: "Indie games, rooftop sunsets, and aggressively medium spice takeout.",
    location: "9 mi away",
    interests: ["Gaming", "Film", "Coffee"],
    photoUrl: "https://picsum.photos/seed/apptwo-avery/600/800",
    gender: "woman",
    distanceMiles: 9,
    photoUrls: [
      "https://picsum.photos/seed/apptwo-avery/600/800",
      "https://picsum.photos/seed/apptwo-avery-2/600/800",
    ],
  },
  {
    id: "p10",
    name: "Drew",
    age: 33,
    bio: "Weekend cyclist. Weekday spreadsheet survivor.",
    location: "11 mi away",
    interests: ["Fitness", "Brunch", "Podcasts"],
    photoUrl: "https://picsum.photos/seed/apptwo-drew/600/800",
    verified: true,
    gender: "man",
    distanceMiles: 11,
  },
  {
    id: "p11",
    name: "Skyler",
    age: 29,
    bio: "Ceramics studio regular. Will trade mug for playlist recs.",
    location: "12 mi away",
    interests: ["Art", "Music", "Coffee"],
    photoUrl: "https://picsum.photos/seed/apptwo-skyler/600/800",
    gender: "nonbinary",
    distanceMiles: 12,
    photoUrls: [
      "https://picsum.photos/seed/apptwo-skyler/600/800",
      "https://picsum.photos/seed/apptwo-skyler-2/600/800",
    ],
  },
  {
    id: "p12",
    name: "Jamie",
    age: 27,
    bio: "Board game host. Competitive about Catan, chill about everything else.",
    location: "14 mi away",
    interests: ["Gaming", "Wine", "Comedy"],
    photoUrl: "https://picsum.photos/seed/apptwo-jamie/600/800",
    gender: "man",
    distanceMiles: 14,
  },
  {
    id: "p13",
    name: "Ren",
    age: 22,
    bio: "Art school energy. Thrift stores and late-night diners.",
    location: "15 mi away",
    interests: ["Art", "Photography", "Film"],
    photoUrl: "https://picsum.photos/seed/apptwo-ren/600/800",
    gender: "woman",
    distanceMiles: 15,
    photoUrls: [
      "https://picsum.photos/seed/apptwo-ren/600/800",
      "https://picsum.photos/seed/apptwo-ren-3/600/800",
    ],
  },
  {
    id: "p14",
    name: "Blake",
    age: 34,
    bio: "Open-water swimmer. Looking for someone who tolerates 6 a.m. alarms.",
    location: "18 mi away",
    interests: ["Fitness", "Running", "Travel"],
    photoUrl: "https://picsum.photos/seed/apptwo-blake/600/800",
    verified: true,
    gender: "man",
    distanceMiles: 18,
  },
  {
    id: "p15",
    name: "Noah",
    age: 26,
    bio: "Plant parent ×3. Farmers market Saturdays are non-negotiable.",
    location: "20 mi away",
    interests: ["Cooking", "Coffee", "Yoga"],
    photoUrl: "https://picsum.photos/seed/apptwo-noah/600/800",
    gender: "nonbinary",
    distanceMiles: 20,
  },
  {
    id: "p16",
    name: "Elise",
    age: 31,
    bio: "True crime podcasts on walks. Bonus points if you read the same book.",
    location: "22 mi away",
    interests: ["Books", "Running", "Brunch"],
    photoUrl: "https://picsum.photos/seed/apptwo-elise/600/800",
    gender: "woman",
    distanceMiles: 22,
    photoUrls: [
      "https://picsum.photos/seed/apptwo-elise/600/800",
      "https://picsum.photos/seed/apptwo-elise-2/600/800",
    ],
  },
];

export const MATCH_ON_LIKE_IDS = new Set(["p1", "p3", "p5", "p7"]);

/** Demo profiles that already liked you (Likes You screen). */
export const LIKED_YOU_PROFILE_IDS = [
  "p4",
  "p6",
  "p8",
  "p2",
  "p9",
  "p11",
] as const;

export const CHAT_IMAGE_STUB_URL =
  "https://picsum.photos/seed/apptwo-chat-image/400/300";

export const AUTO_REPLY_SNIPPETS = [
  "That sounds amazing — tell me more!",
  "Ha, same. What neighborhood are you in?",
  "I'm free this week if you want to grab a drink.",
  "Just saw this — love your vibe.",
  "Ok but that's actually the best answer.",
] as const;

export const INITIAL_MATCHES: Match[] = [
  {
    id: "m-seed-1",
    profile: MOCK_PROFILES[1]!,
    matchedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    lastMessagePreview: "That design meetup sounds fun!",
  },
];

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "msg-1",
    matchId: "m-seed-1",
    sender: "them",
    body: "Hey! Saw you're into travel too.",
    sentAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "msg-2",
    matchId: "m-seed-1",
    sender: "me",
    body: "Hi Sam! Yeah — any trips on your calendar?",
    sentAt: new Date(Date.now() - 86400000 * 2 + 60000).toISOString(),
  },
  {
    id: "msg-3",
    matchId: "m-seed-1",
    sender: "them",
    body: "That design meetup sounds fun!",
    sentAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

export function profileById(id: string): Profile | undefined {
  return MOCK_PROFILES.find((p) => p.id === id);
}

export function randomAutoReply(): string {
  const i = Math.floor(Math.random() * AUTO_REPLY_SNIPPETS.length);
  return AUTO_REPLY_SNIPPETS[i] ?? AUTO_REPLY_SNIPPETS[0];
}
