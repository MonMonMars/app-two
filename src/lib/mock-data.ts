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
  },
];

export const MATCH_ON_LIKE_IDS = new Set(["p1", "p3", "p5", "p7"]);

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
