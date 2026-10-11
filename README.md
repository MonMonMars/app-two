# App Two

A **public-safe** Tinder-style dating web MVP built with **Next.js 16**, **TypeScript**, and **Tailwind CSS**. Swipe profiles, match, chat (mock), sign in with a **mock magic link**, and explore **Premium / Premium+ / Boost** monetization with **Stripe test-mode stubs**.

## Quick start

```bash
npm install
cp .env.example .env.local   # optional — mock mode works without real keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You’ll land on **Sign in** first.

### Mock sign-in flow

1. Enter any email → **Send magic link** (calls `POST /api/auth/magic-link`).
2. Tap **Open magic link** (calls `POST /api/auth/verify`).
3. Session is stored in `localStorage` — no real email is sent.

## Scripts

| Script                            | Description            |
| --------------------------------- | ---------------------- |
| `npm run dev`                     | Dev server (Turbopack) |
| `npm run build`                   | Production build       |
| `npm run start`                   | Production server      |
| `npm run lint`                    | ESLint                 |
| `npm run typecheck`               | `tsc --noEmit`         |
| `npm run format` / `format:check` | Prettier               |

## Features (this repo)

| Area               | What you get                                                               |
| ------------------ | -------------------------------------------------------------------------- |
| **Discover**       | Drag or tap to like/pass; Super Like; optional rewind (paid tiers)         |
| **Matches**        | List with previews; seed match with Sam                                    |
| **Chat**           | Thread UI; messages persist in browser; **mock auto-replies**              |
| **Premium**        | Free vs **Premium** ($14.99/mo) vs **Premium+** ($119.99/yr) comparison UI |
| **Boosts & packs** | One-off boost and Super Like pack buttons                                  |
| **Profile**        | Display name, usage stats, sign out                                        |
| **Auth**           | Magic-link **shell** (mock); ready to swap for Supabase/Clerk/etc.         |
| **Stripe**         | `POST /api/stripe/checkout` + webhook stub; mock when env is placeholders  |

## Mock vs real

| Feature             | Status                                                                        |
| ------------------- | ----------------------------------------------------------------------------- |
| Profiles & photos   | **Mock** — curated list + [picsum.photos](https://picsum.photos) placeholders |
| Match algorithm     | **Mock** — likes on **Jordan, Riley, Casey, Taylor** always match             |
| Chat delivery       | **Mock** — local state + simulated replies                                    |
| Auth email          | **Mock** — no SMTP; API routes return success JSON                            |
| Purchases           | **Mock** unless real Stripe **test** keys are configured                      |
| Database / realtime | **Not included** — future backend                                             |

**Demo match rule:** profile IDs `p1`, `p3`, `p5`, `p7` match on like.

## Environment variables

See [`.env.example`](.env.example). Placeholder values keep **mock monetization** (checkout grants entitlements in the UI instantly).

When wiring Stripe **test mode**:

1. Set `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` and `STRIPE_SECRET_KEY`.
2. Create test products/prices; map IDs to `STRIPE_PRICE_*`.
3. Implement Checkout Session creation in `src/app/api/stripe/checkout/route.ts`.
4. Verify webhooks in `src/app/api/stripe/webhook/route.ts` with `STRIPE_WEBHOOK_SECRET`.

Never commit live/production keys to this public repo.

## Project layout

```
src/
  app/
    (main)/          # Authenticated app shell (discover, matches, chat, premium, profile)
    login/           # Magic-link sign-in
    api/auth/        # Magic-link stubs
    api/stripe/      # Checkout + webhook stubs
  components/
  context/           # Auth + app state (localStorage)
  lib/               # Mock data, Stripe helpers, plans
  types/
```

## Deployment

**Recommended: [Vercel](https://vercel.com)** — App Router, API routes, env vars in the dashboard.

**GitHub Pages:** needs static export and **cannot** host API routes without a separate backend. Prefer Vercel for this MVP.

## CI

GitHub Actions runs `lint`, `typecheck`, `format:check`, and `build` on push/PR (see `.github/workflows/ci.yml`).

## Inspiration

Product shape (swipe deck, matches, chat, paywall) is informed by a private sibling codebase; this repository is a **clean, public** implementation with **no copied secrets** or credentials.
