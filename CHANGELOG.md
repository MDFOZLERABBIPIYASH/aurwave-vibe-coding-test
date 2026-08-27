# Changelog

All meaningful changes to Aurwave are recorded here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project follows [Semantic Versioning](https://semver.org/).

Categories used: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`, `Testing`, `Docs`, `Chore`.

---

## [Unreleased]

### Added

- Added `plan.md` containing the full phased implementation plan for the Aurwave website.
- Added this `CHANGELOG.md` to track every meaningful project change per `CLAUDE.md` rules.
- **Phase 00 — Project Initialization:** bootstrapped the Next.js 15.5.24 + TypeScript + Tailwind CSS + Motion + Vitest + Playwright project, created the canonical `src/` and `public/` folder structure from `docs/07-technical-architecture.md`, added a brand-neutral placeholder design-token system, and shipped an initial placeholder homepage with a working layout, root metadata, and viewport config.
- **Phase 02 — Architecture and Foundation:** configured `next.config.ts` (strict mode, AVIF/WebP, package-import optimization for `motion`), `tsconfig.json` (strict + `noUncheckedIndexedAccess`), `tailwind.config.ts` (full typography and spacing scale from `docs/02-brand-and-design.md`), and `src/styles/globals.css` (CSS custom properties for tokens, focus-visible ring, reduced-motion guard, dark-mode via `prefers-color-scheme`).
- **Phase 02 — Design tokens:** `src/lib/site.ts` centralizes site name, description, URL, contact email, primary CTA, and primary navigation. `src/lib/cn.ts` exposes the `clsx` + `tailwind-merge` helper used by every primitive.
- **Phase 03 — Design system primitives (`src/components/ui/`):** `Button` (primary / secondary / ghost × sm / md / lg, renders as `<a>` via `next/link` or external `<a>`, with `disabled` and `focus-visible` states), `Container` (max-width wrapper with optional bleed), `Section` (semantic landmark with `tone: default | muted` and `density: default | tight`), `Heading` (polymorphic with `as`, variants `display-xl | display-lg | display-md | h1..h4` and default tag per variant), `Text` (body / body-lg / small, `as` polymorphic), `Eyebrow` (uppercase label, tracking), `Link` (inline link with underline-on-hover, internal or external), and `Reveal` (`motion`-based viewport entrance that respects `prefers-reduced-motion`).
- **Phase 03 — Reduced-motion primitive:** `src/lib/prefers-reduced-motion.ts` exposes the `usePrefersReducedMotion` hook. The `Reveal` component uses `motion/react`'s `useReducedMotion` to short-circuit entrance animations.
- **Phase 03 — Variant helper:** `src/lib/variants.ts` provides a tiny `variants()` helper (base + variant map + default variants) that resolves classes through `cn`, avoiding the `class-variance-authority` dependency.
- **Phase 03 — Custom tailwind-merge config:** `src/lib/tailwind-merge.ts` extends `tailwind-merge` so the brand's `text-X-foreground` color tokens and the custom `text-body`, `text-display-xl`, etc. font-size scale don't collapse against each other. `cn` now uses this configured instance.
- **Phase 03 — Dev showcase page:** `src/app/dev/components/page.tsx` (guarded to non-production builds, with `NEXT_PUBLIC_SHOW_DEV=true` opt-in for staging) renders every primitive in real layout for visual review.

### Changed

- Pinned `next` at `15.5.24` (patched within the 15.x line per `docs/09-library-and-dependency-management.md` "no major-version auto-upgrades" rule) to pick up the security fix for CVE-2025-66478 without crossing to Next 16.
- Pinned `eslint` at `^8.57.1` to match the version supported by `eslint-config-next@15.5.x`; ESLint 9 is dropped out of support and `eslint-config-next` 15.x is built for ESLint 8.
- `src/components/ui/Button.tsx` adopts the new `variants()` helper from `@/lib/variants` for intent + size, and the `cn` re-export from `@/lib/variants` (same identity as `@/lib/cn`) is used inside the UI layer.
- `src/lib/cn.ts` now uses the configured `twMerge` instance from `@/lib/tailwind-merge` so brand foreground and typographic scale classes merge cleanly.
- `src/app/page.tsx` placeholder text now references Phase 05 explicitly (homepage sections coming next).

### Fixed

- Resolved a latent bug in `tailwind-merge` where the brand's `text-primary-foreground` / `text-accent-foreground` would be dropped when listed alongside `bg-primary` (the `text-X` group wasn't registered for the custom palette).
- Resolved a latent bug where custom `text-body` / `text-display-xl` font-size tokens were being merged into the `text-*` color group; they are now in the `font-size` group and coexist with color classes.

### Testing

- `npm run lint` — passes with no warnings or errors.
- `npm run type-check` — passes (strict mode, `noUncheckedIndexedAccess`).
- `npm test` — 18/18 unit tests pass:
  - `cn` (3) — class merging, falsy filtering, last-wins conflict resolution.
  - `cn` re-export + `variants` helper (10) — defaults, selected variants, additional className conflict resolution, missing defaultVariants, unknown values; includes a regression test that `text-primary-foreground` survives alongside `bg-primary` and `text-body`.
  - `usePrefersReducedMotion` (5) — initial state, sync read on mount, listener change, unsubscribe on unmount, legacy `addListener` fallback.
- `npm run build` — production build succeeds; static-rendered home route weighs 103 kB First Load JS; `/dev/components` is 3.46 kB and dev-only.
- E2E (Playwright) — config wired and one smoke test added (`tests/e2e/home.spec.ts`); not run yet because the local web server is not exercised in this phase. Will run after the navigation header lands in Phase 04.

### Security

- Documented the `.env.example` contract (site URL, contact email, optional analytics and Sentry keys) so production secrets are never committed. Real secrets are configured via Vercel project settings per `docs/13-vercel-deployment.md`.

---

## [0.0.0] — 2026-08-26

### Added

- Initialized Git repository for the Aurwave project on the `master` branch (no commits yet).
- Added `CLAUDE.md` with the AI development rules, change-tracking requirements, and workflow.
- Added `docs/01-project-overview.md` through `docs/16-claude-instructions.md` covering project overview, brand and design, information architecture, content strategy, UI/UX guidelines, animation guidelines, technical architecture, development workflow, library and dependency management, asset management, testing strategy, version control, Vercel deployment, AI management system, maintenance and monitoring, and Claude project instructions.
- Added `docs/roadmap.md` defining all 16 development phases with tasks and acceptance criteria.
- Added `.gitignore` to exclude `.aider*` tooling artifacts.
