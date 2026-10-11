# App Two

Public-safe Tinder-style dating MVP on **Next.js 16**, **TypeScript**, and **Tailwind CSS** — swipes, matches, chat, onboarding, filters, and monetization stubs.

## Quick start

```bash
npm install
cp .env.example .env.local   # optional
npm run dev
```

1. Open [http://localhost:3000/](http://localhost:3000/) — marketing landing (logged out)
2. **Get started** → mock magic link sign-in at `/login`
3. Complete **onboarding** → **Discover** at `/discover` → Matches → chat → Premium / Likes You

## Scripts

| Script                            | Description       |
| --------------------------------- | ----------------- |
| `npm run dev`                     | Dev server        |
| `npm run build`                   | Production build  |
| `npm run start`                   | Production server |
| `npm run lint`                    | ESLint            |
| `npm run typecheck`               | TypeScript        |
| `npm run format` / `format:check` | Prettier          |
| `npm run test`                    | Vitest unit tests |

## Changelog

### Wave 4

- **Landing** at `/` for logged-out users (hero, features, CTAs) with SEO + Open Graph placeholders
- **Shareable profiles** stub at `/u/[id]` (mock public card + sign-in CTA)
- **QA debug panel** — visible in `development` or with `?debug=1` (grant Premium, refill boosts/Super Likes, reset localStorage)
- **PWA basics** — `manifest.webmanifest`, SVG icon placeholders, `theme-color`
- **i18n scaffolding** — English string map (`src/i18n/en.ts`) for brand, nav, CTAs, loading copy
- **State polish** — shared loading/error shells on Discover, Matches, Likes You, Chat
- **Tests** — auth session helpers, boost countdown, likes-you gating, debug flag
- Discover app route moved to **`/discover`** (signed-in experience)

### Wave 3

- Multi-photo Discover cards, Premium rewind, chat safety, Likes You funnel, streak banner, Vitest for deck/match/filter

### Wave 2

- Onboarding wizard, Discover filters, profile edit, settings, match toasts, boost countdown, Super Like inventory

## Demo script (investors / QA)

| Step | Action                          | What to highlight                                       |
| ---- | ------------------------------- | ------------------------------------------------------- |
| 1    | Visit `/` logged out            | Landing hero, monetization-aware bullets, OG-ready meta |
| 2    | Open `/u/p1`                    | Shareable profile stub (Jordan)                         |
| 3    | Sign in via `/login`            | Mock magic link, no real email                          |
| 4    | Finish onboarding               | Preferences feed Discover filters                       |
| 5    | `/discover?debug=1`             | Debug panel → **Grant Premium**                         |
| 6    | Swipe Jordan (multi-photo taps) | Match toast → `/matches`                                |
| 7    | Chat with Sam (seed match)      | Typing, read receipt, 📷 stub, ⋮ safety menu            |
| 8    | `/likes-you`                    | Blurred grid on Free; Premium shows names               |
| 9    | Free tier: tap **Rewind**       | Shake + Premium upsell                                  |
| 10   | `/premium`                      | Tier cards + Stripe stub checkout                       |
| 11   | `/settings`                     | Block list, notification toggles, mock delete           |

## User flows

| Flow               | Route                    | Persistence                                       |
| ------------------ | ------------------------ | ------------------------------------------------- |
| Landing            | `/`                      | Logged-out marketing; signed-in → `/discover`     |
| Public profile     | `/u/[id]`                | Mock read-only card                               |
| Sign in            | `/login`                 | `localStorage` auth + API stubs                   |
| Onboarding         | `/onboarding`            | Dating profile per user id                        |
| Discover + filters | `/discover`              | Filters + swipe state in `localStorage`           |
| Profile edit       | `/profile/edit`          | Updates Discover self-preview card                |
| Settings           | `/settings`              | Notifications, block list, legal, mock delete     |
| Likes You          | `/likes-you`             | Free blur vs Premium reveal (demo likes)          |
| Matches / chat     | `/matches`, `/chat/[id]` | Typing, read receipts, image stub, safety actions |
| Premium            | `/premium`               | Stripe checkout stub                              |

### Onboarding collects

Name, age, bio, photo URLs (or mock presets), interests, gender, “show me”, and preferred age range.

### Discover filters (mock location)

Distance radius slider (miles), age min/max, optional “must share interest” tags. Profiles carry demo `distanceMiles` and `gender` for filtering.

### Monetization UX

- **Free / Premium / Premium+** tier cards
- **Boost**: inventory decrements on activate; **30:00 countdown** banner while active
- **Super Like**: count on button + footer; decrements on use

Match **toasts** appear when notification toggle for matches is on (Settings).

## Mock vs real

| Feature             | Status                                                   |
| ------------------- | -------------------------------------------------------- |
| Profiles in deck    | Mock static list + picsum photos                         |
| Location / distance | Mock miles on each card                                  |
| Match algorithm     | Demo: likes on Jordan, Riley, Casey, Taylor always match |
| Chat                | Local + simulated replies                                |
| Auth email          | Mock magic link (no SMTP)                                |
| Stripe              | Stub checkout unless test keys configured                |
| Delete account      | Clears local data only                                   |

## Environment

See [`.env.example`](.env.example). Set `NEXT_PUBLIC_APP_URL` for canonical/OG URLs in production.

## Layout

```
src/app/
  page.tsx         Marketing landing (logged out)
  u/[id]/          Shareable public profile stub
  login/           Sign in
  onboarding/      First-run wizard (outside main shell)
  (main)/discover/ Signed-in swipe deck
  (main)/          matches, premium, profile, settings, chat, likes-you
  api/auth/        Magic-link stubs
  api/stripe/      Checkout + webhook stubs
src/i18n/          English string map (scaffolding)
public/            PWA manifest + icon/OG placeholders
```

## Deploy

**Vercel** recommended (API routes + env vars). GitHub Pages needs static export and loses API routes.

## CI

`.github/workflows/ci.yml` — lint, typecheck, test, format, build.
