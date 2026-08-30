# Maintenance and Monitoring

## Live monitoring (Phase 14)

The site ships with three monitoring tools wired in:

- **Vercel Analytics** (`@vercel/analytics`) — page-view analytics
  (paths, referrers, devices, geographies). Auto-registered; no env
  vars needed. Visible in the Vercel dashboard under the
  **Analytics** tab on the deployed project.
- **Vercel Speed Insights** (`@vercel/speed-insights`) — Core Web
  Vitals (LCP, FID / INP, CLS) sampled per page view. Auto-registered
  alongside Analytics. Visible in the Vercel dashboard under the
  **Speed Insights** tab.
- **Sentry** (`@sentry/nextjs`) — runtime error and unhandled
  promise-rejection capture. **Inactive by default** — turn on by
  setting `SENTRY_DSN` in the Vercel project env vars, then
  redeploy. See `.env.example` and `docs/13-vercel-deployment.md`
  for the setup steps.

All three are wired in via `src/app/layout.tsx` (Analytics +
Speed Insights) and `src/instrumentation.ts` (Sentry server init).
None of them require a separate build step or API key rotation.

---

## Regular AI maintenance

Claude (and any future maintainer) should periodically review:

- **Dependency health** — `npm outdated` for the package list.
  Patch and minor updates are safe to take; major updates need a
  brief plan because they may require code changes (e.g. Next.js
  15 → 16).
- **Build status** — `npm run build` should always succeed on
  `main`. If it doesn't, the site can't deploy.
- **Test status** — `npm run validate` (lint + type-check + 31 unit
  tests, ~1.2s) and `npm run test:e2e` (422 E2E across 4 browser
  projects, ~3.6 min) on every change. CI on `main` is the
  upstream gate.
- **Broken links** — audit internal `/...` links and external
  URLs from `src/components/layout/Header.tsx`, `Footer.tsx`, and
  the project catalog. Re-run `tests/e2e/seo.spec.ts` after
  significant link changes.
- **Performance** — `npm run build` exposes per-route First Load
  JS. The shared chunk is **103 kB**; routes should stay under
  155 kB First Load. Any route creeping past 200 kB warrants
  investigation.
- **Accessibility** — `npm run test:e2e -- tests/e2e/a11y.spec.ts`
  re-runs the axe-core audit. Currently zero critical / serious
  WCAG 2.2 AA violations across all 6 public routes.
- **Unused assets** — `public/images/{projects,services,general}/`
  placeholders vs. real assets. The README in each folder tracks
  the expected file conventions.
- **Unused dependencies** — `npx depcheck` is the easiest signal
  (not currently installed; add as a dev dep if you want this
  automated).

Recommended cadence: a single Claude session that runs the above
checks once a month takes ~15 minutes and catches most drift
early.

---

## Performance review

Monitor:

- **Page load speed** — Speed Insights surfaces real-user LCP
  per page. The dev build is static, so the production CDN cache
  is what matters.
- **Core Web Vitals** — Vercel Speed Insights; target the
  "Good" tier for LCP (< 2.5s p75), INP (< 200ms p75), and
  CLS (< 0.1 p75).
- **JavaScript size** — the First Load JS in the build output
  is the source of truth. The shared chunk is 103 kB; per-route
  pages weigh 0.1–3 kB. Any change that pushes a route past
  200 kB First Load warrants a look.
- **Image size** — the project uses `next/image` and serves
  AVIF/WebP via `next.config.ts`. Real project images land in
  Phase 08; until then, gradient placeholders are used and the
  image-size budget is effectively zero.

---

## Error management

When an error is detected (via Sentry, a user report, or a CI
failure):

1. **Reproduce the problem.** For a Sentry issue, find the
   affected URL, the error stack, and the user's browser /
   device. Try to reproduce locally with `npm run dev`.
2. **Identify the cause.** Read the stack. Check recent commits
   on `main` — `git log --since="2 weeks ago"` is a useful
   first filter.
3. **Create the smallest safe fix.** Per `docs/12-version-control.md`,
   each commit is one logical change. Avoid bundling unrelated
   cleanup into the fix commit.
4. **Add or update tests.** If the bug slipped past an
   existing test, that test needs strengthening. If the bug
   was a class of failure, add a new test that fails on the
   unfixed code and passes on the fixed code.
5. **Validate the build.** `npm run validate` for the fast
   path, `npm run ci` (validate + build + E2E) for the full
   check.
6. **Deploy through preview.** Push the fix to a branch
   rather than `main`; Vercel will create a preview URL.
   Manually verify the fix on the preview URL before promoting.
7. **Promote to production.** Merge the branch to `main`; the
   auto-deploy handles the rest. Watch the Vercel dashboard
   and Speed Insights for the next 24h to confirm the fix
   didn't regress anything else.

For Sentry-specific issues: the Sentry dashboard groups
events by stack trace, so a regression in the same code path
will cluster naturally. The release health view (deploys
section in Sentry) correlates errors with releases.

---

## Documentation maintenance

When architecture changes, update:

- `docs/07-technical-architecture.md` — stack, folder layout,
  component rules
- `docs/09-library-and-dependency-management.md` — new
  dependencies, version pins
- `docs/11-testing-strategy.md` — new test layers
- `docs/13-vercel-deployment.md` — env vars, deploy flow
- `docs/15-maintenance-and-monitoring.md` (this file) —
  monitoring tools, runbooks
- `README.md` — quickstart and scripts table
- `CHANGELOG.md` — every meaningful change, per `CLAUDE.md`

Documentation should reflect the actual project state. A
doc that's out of date is worse than no doc, because it
misleads the next person.

---

## Maintenance principle

Avoid large unnecessary rewrites. Prefer:

- **Small improvements** — single-line or single-file changes
  that improve clarity or correctness.
- **Incremental refactoring** — when a piece of code needs
  to change shape, do it in a few small commits that keep the
  build green at every step.
- **Controlled dependency upgrades** — pin and review. Major
  version bumps (Next.js 15 → 16, React 19 → 20) deserve a
  branch and a deploy through preview, not a direct push to
  `main`.

The CI pipeline, the test suite, and the visual-regression
baselines exist to catch problems early. Lean on them.
