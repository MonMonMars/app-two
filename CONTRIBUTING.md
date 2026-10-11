# Contributing to App Two

Thanks for helping improve this **public-safe demo** dating MVP.

## Ground rules

- Keep **App Two** branding; do not import secrets or private env files from sibling or internal repos.
- Prefer small, focused changes with tests when behavior is non-trivial.
- Run before opening or updating a PR:

```bash
npm run lint && npm run typecheck && npm run test && npm run build
```

## Stack

Next.js App Router, TypeScript, Tailwind, Vitest, localStorage-backed mock state.

## Pull requests

- Target `main` via a feature branch.
- Describe user-visible changes and note what remains mock vs production-ready.
- Ensure CI is green.

## Visual QA

Use `/dev/kitchen?debug=1` (or development mode) for component states without Storybook.
