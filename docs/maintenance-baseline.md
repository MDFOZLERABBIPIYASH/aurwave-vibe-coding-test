# Maintenance Baseline — 2026-08-30

This is the first maintenance snapshot for the Aurwave project,
captured at the end of the Phase 15 audit. Future maintenance
runs should diff against this baseline to catch drift.

## Quality gates

- `npm run validate` — passes in ~1.5s. 33/33 unit tests.
- `npm run build` — passes. 11 base routes static, 6 SSG, 4 dynamic.
- `npm run test:e2e` — 440/440 E2E tests, ~3.6 min. 4 mobile/desktop
  conditional skips.
- CI on `main` (`.github/workflows/ci.yml`):
  - **validate** (lint + type-check + 33 unit) — green
  - **build** (production build) — green
  - **e2e** (chromium, webkit, firefox, mobile-chrome) — green

## Bundle (production build)

```
+ First Load JS shared by all             103 kB
  ├ chunks/255-...js                      46.9 kB
  ├ chunks/4bd1b696-...js                 54.4 kB
  └ other shared chunks (total)           2.24 kB

Heaviest routes by First Load JS:
  /contact        — 117 kB
  /services       — 150 kB
  /about          — 150 kB
  /work           — 152 kB
  /work/[slug]    — 152 kB
  /               — 154 kB (home; inlines motion + Reveal)
```

All routes under the 155 kB "good" budget. No route above
200 kB.

## Accessibility

- `npm run test:e2e -- tests/e2e/a11y.spec.ts` — passes
- axe-core audit on every public route: **0 critical / serious
  WCAG 2.2 AA violations** across all 6 routes × 4 browser
  projects.
- Heading hierarchy: every page has exactly one `<h1>` and a
  valid hierarchy (no level skips).
- Skip-to-content link reachable on first Tab; activates
  `<main>` (with `tabIndex={-1}`).
- Primary button contrast: 4.5:1+ (token was darkened from
  `oklch(0.55)` to `oklch(0.4)` to clear AA).

## Dependency health (`npm outdated`)

Patches and minors only (no major-version drift). All
"Latest" column bumps are deferred until a planned upgrade
window.

| Package | Current | Latest | Note |
|---|---|---|---|
| @testing-library/jest-dom | 6.9.1 | 7.0.1 | minor |
| @testing-library/react | 16.3.2 | 16.3.3 | patch |
| @types/node | 22.20.1 | 26.4.0 | major (TypeScript Node 24+ release) |
| @vitejs/plugin-react | 4.7.0 | 6.1.1 | major (Vitest 4 alignment) |
| @vitest/ui | 2.1.9 | 4.1.11 | major |
| eslint | 8.57.1 | 10.9.1 | major (eslint-config-next 10 alignment) |
| eslint-config-next | 15.5.24 | 16.3.3 | major |
| jsdom | 26.1.0 | 30.0.1 | major |
| motion | 11.18.2 | 13.1.1 | major |
| next | 15.5.24 | 16.3.3 | major (deferred per `docs/12`) |
| prettier-plugin-tailwindcss | 0.6.14 | 0.8.1 | minor |
| react | 19.0.0 | 19.2.8 | minor |
| tailwind-merge | 2.6.1 | 3.6.0 | major |
| tailwindcss | 3.4.19 | 4.3.3 | major |
| typescript | 5.9.3 | 7.0.2 | major |
| vitest | 2.1.9 | 4.1.11 | major |

The "intentionally stable" matrix is:
- Next 15.5.24 (pinned; do not auto-upgrade to 16)
- React 19.0.0
- Tailwind 3.4.x (Tailwind 4 changes the config format)
- Vitest 2.1.x
- ESLint 8.57 (eslint-config-next 15.x is built for 8)

## Unused dependencies

`npx depcheck` (after the audit):
- `autoprefixer` — reported unused; **false positive**, used by
  `postcss.config.mjs` for Tailwind. Cannot be removed.
- `postcss` — reported unused; **false positive**, used by
  `postcss.config.mjs`. Cannot be removed.
- `prettier-plugin-tailwindcss` — reported unused; **false
  positive**, configured in `.prettierrc.json`. Cannot be
  removed.
- `npm-run-all2` — was unused, **removed** during this audit.

`depcheck` is not installed by default. Install with
`npm i -D depcheck --legacy-peer-deps` for future audits.

## Live site

- **URL:** https://aurwave-vibe-coding-test.vercel.app/
- **Tag:** `v1.0.1` points at the first production-deploy commit
  (`5d0b7ba`).
- **Env vars in production:** `NEXT_PUBLIC_SITE_URL` and
  `CONTACT_EMAIL`. `SENTRY_DSN` is unset (Sentry SDK is loaded
  but `init()` is skipped — no runtime cost).

## Known follow-ups (carried over from `docs/13` and earlier)

- Contact form delivery: real provider (Resend / Formspree / a
  CRM). Currently logs to the server console.
- Privacy and Terms pages: placeholder copy. Real legal copy
  before public launch.
- Testimonial: editorial sample, clearly marked. Replace with
  a real, approved client quote.
- Project images: gradient placeholders. Real assets tracked
  in `public/images/projects/README.md`.
- Custom domain: optional. Default is the Vercel subdomain.

## Cadence

Re-run this audit monthly. A single Claude session that runs
the above checks plus `npm run validate` + `npm run build` +
`npm run test:e2e` takes ~15 minutes and catches most drift
before it ships.
