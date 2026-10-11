# App Two

Public-safe Tinder-style dating MVP on **Next.js 16**, **TypeScript**, and **Tailwind CSS** — swipes, matches, chat, onboarding, filters, and monetization stubs.

## Quick start

```bash
npm install
cp .env.example .env.local   # optional
npm run dev
```

1. Open [http://localhost:3000/login](http://localhost:3000/login) → mock magic link sign-in
2. Complete **onboarding** (name, photos, bio, interests, preferences)
3. **Discover** → swipe, filter, boost → **Matches** → chat → **Premium** / **Profile**

## Scripts

| Script                            | Description       |
| --------------------------------- | ----------------- |
| `npm run dev`                     | Dev server        |
| `npm run build`                   | Production build  |
| `npm run start`                   | Production server |
| `npm run lint`                    | ESLint            |
| `npm run typecheck`               | TypeScript        |
| `npm run format` / `format:check` | Prettier          |

## User flows (wave 2)

| Flow               | Route                    | Persistence                                           |
| ------------------ | ------------------------ | ----------------------------------------------------- |
| Sign in            | `/login`                 | `localStorage` auth + API stubs                       |
| Onboarding         | `/onboarding`            | Dating profile per user id                            |
| Discover + filters | `/`                      | Filters + swipe state in `localStorage`               |
| Profile edit       | `/profile/edit`          | Updates Discover self-preview card                    |
| Settings           | `/settings`              | Notification toggles, legal placeholders, mock delete |
| Matches / chat     | `/matches`, `/chat/[id]` | Mock threads + auto-replies                           |
| Premium            | `/premium`               | Stripe checkout stub                                  |

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

See [`.env.example`](.env.example). Placeholders = mock purchases and mock auth.

## Layout

```
src/app/
  login/           Sign in
  onboarding/      First-run wizard (outside main shell)
  (main)/          Discover, matches, premium, profile, settings, chat
  api/auth/        Magic-link stubs
  api/stripe/      Checkout + webhook stubs
src/context/       Auth, profile, app state, toasts
src/components/    Swipe deck, filters, onboarding, settings, …
```

## Deploy

**Vercel** recommended (API routes + env vars). GitHub Pages needs static export and loses API routes.

## CI

`.github/workflows/ci.yml` — lint, typecheck, format, build.
