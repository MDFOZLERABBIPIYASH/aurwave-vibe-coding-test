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
- **Phase 04 — Icon set:** `src/components/ui/Icon.tsx` ships four inline SVG icons (`MenuIcon`, `CloseIcon`, `ArrowRightIcon`, `ArrowUpRightIcon`) that inherit `currentColor` and need no external dependency.
- **Phase 04 — Header (`src/components/layout/Header.tsx`):** sticky site header with a backdrop-blur background, brand wordmark, full primary nav (Home, Services, Work, About, Contact), and the primary "Start a Project" CTA at `lg`+. Below `lg`, the desktop nav collapses to a hamburger button that opens a full-screen animated menu with body scroll lock, ESC-to-close, focus return, and `inert`-based focus scoping.
- **Phase 04 — Mobile menu hook (`src/hooks/use-mobile-menu.ts`):** encapsulates the open/close state, body scroll lock, ESC key, focus management (focus first link on open, return to toggle on close), and `inert` scoping of sibling content.
- **Phase 04 — Footer (`src/components/layout/Footer.tsx`):** server-rendered footer with the wordmark, short description, three-column nav (Sitemap, Services, Contact with mailto), placeholder social links, copyright (auto year), and legal links to /privacy and /terms.
- **Phase 04 — Routes:** added `/services`, `/work`, `/about`, `/contact`, `/privacy`, `/terms` pages with route-level `metadata` (title + description). Each page is a thin placeholder that ships the IA, brand voice, and structural primitives needed for the real content in Phase 06.
- **Phase 04 — Contact form (`src/components/sections/ContactForm.tsx`):** client component with name, email, company, project type, budget, and message fields. Phase 04 ships a local success state; full validation and `/api/contact` server route land in Phase 06.
- **Phase 04 — Error and not-found pages:** `src/app/not-found.tsx` (404 with home and contact CTAs) and `src/app/error.tsx` (global error boundary with `reset` and `error.digest` display).
- **Phase 04 — Skip-to-content link:** added in the root layout, visible only on focus, jumps to `#main` so keyboard users bypass the nav.
- **Phase 04 — Root layout wiring:** Header and Footer are mounted in `src/app/layout.tsx`, wrapping a `<main id="main">` element. The Header sets the `<body>` overflow lock and the Footer renders inside the document flow.
- **Phase 05 — Homepage sections (`src/components/sections/`):** nine purpose-built sections wired into `src/app/page.tsx` in the order required by `docs/03-information-architecture.md`:
  1. `HeroSection` — eyebrow "Digital Design & Development Agency", display-XL headline, supporting body, primary "Start a Project" CTA + secondary "View our work" CTA. Staggered `Reveal` entrance, calm decorative gradient.
  2. `IntroductionSection` — two-column trust block: who Aurwave is, what problems we solve, the work we ship.
  3. `ServicesPreviewSection` — 4 highlighted services (Web Design, Web Development, UI/UX, Performance) in a 2×2 grid with per-service anchor links into `/services`.
  4. `SelectedWorkSection` — 3 placeholder projects (Northwind Commerce, Lumen Marketing, Harbor Financial) with industry tag, description, services pills, and a calm gradient preview surface (real visuals land in Phase 08).
  5. `WhyAurwaveSection` — 4 numbered differentiation points: Strategy before execution, Design+Dev together, Performance is a feature, Clear communication.
  6. `ProcessSection` — 5-step process (Discover, Define, Design, Develop, Launch) with index numbers and short descriptions.
  7. `CapabilitiesSection` — Frontend (React, Next.js, TypeScript), Styling (Tailwind CSS), Animation (Motion), Deployment (Vercel) — only technologies Aurwave actually uses.
  8. `TestimonialSection` — single placeholder social-proof block; real quotes land in Phase 08.
  9. `FinalCTASection` — "Have a project in mind?" + "Start a Conversation" CTA → `/contact`.
- **Phase 05 — Sections barrel:** `src/components/sections/index.ts` re-exports every section component plus the contact form for tidy imports from `app/` routes.
- **Phase 06 — Project catalog (`src/lib/projects.ts`):** single source of truth for project data. Six placeholder projects with slug, name, industry, summary, description, category (`web | ecommerce | brand`), services, accent gradient, full detail content (problem, approach, results), optional metrics, and year. Helpers: `getProject`, `allProjectSlugs`, `filterProjects`, `sortProjects`, plus a `projectCategories` list for the filter UI.
- **Phase 06 — Work index (`/work`):** expanded to a real filterable grid. The hero mirrors the IA and the grid is mounted as a `<ProjectFilter>` client component inside a Suspense boundary (Next 15 requirement for `useSearchParams`). The filter is URL-driven via `?category=web|ecommerce|brand`, with an `aria-live` count, shareable links, and back/forward support.
- **Phase 06 — Work detail (`/work/[slug]`):** static-rendered via `generateStaticParams`. Each page renders hero, problem / approach / results blocks, a "By the numbers" metrics aside, the next-project link, and a final CTA. Unknown slugs route to the global 404.
- **Phase 06 — Services (`/services`):** expanded with an overview hero, six detailed service sections (Web Design, Web Development, UI/UX, E-commerce, Redesign, Performance) each with tagline + description + capability list, a methodology recap that links to `/#process`, and a closing CTA.
- **Phase 06 — About (`/about`):** expanded with hero, three stat cards (years, projects, team size), mission block, six values in a 2×3 grid, and a closing CTA.
- **Phase 06 — Contact form (`src/components/sections/ContactForm.tsx`):** upgraded to a real client. Validation is shared with the server via `src/lib/contact.ts`. The form tracks idle / submitting / success / error states, shows field-level error messages tied to inputs via `aria-describedby`, posts to `/api/contact`, and replaces itself with a thank-you panel on success.
- **Phase 06 — Contact validation (`src/lib/contact.ts`):** shared `ContactPayload`, `ContactError`, `ContactResponse` types and a `validateContact` helper covering required fields, email format, and minimum message length. Used by both the client form and the API route.
- **Phase 06 — Contact API (`/api/contact`):** Next.js route handler that parses JSON, validates with `validateContact`, returns `{ ok: true }` on success, or a `422` with field-level errors on validation failure. Stub delivery: the inquiry is logged to the server console. A real provider (Resend / Formspree / a CRM) is wired in a later phase.
- **Phase 07 — Motion library (`src/components/motion/`):** new folder for shared animation primitives.
  - `Stagger` — viewport-triggered container that orchestrates child reveals with `staggerChildren` + `delayChildren`.
  - `TextReveal` — splits text on whitespace and reveals each word with a small upward translate + opacity. Reserved for hero headlines and major section H2s.
  - `MagneticHover` — subtle pull-toward-cursor effect for the primary CTA. Uses CSS custom properties so the actual transform stays GPU-composited.
  - `PageTransition` — short (~220ms) fade-up on every route mount, so navigation feels intentional without being slow.
  - All helpers respect `prefers-reduced-motion` via `useReducedMotion` from `motion/react` and short-circuit to a static render.
- **Phase 07 — Text-reveal on hero + key H2s:** the hero `<h1>`, plus the H2s of the six homepage sections (Services Preview, Selected Work, Why Aurwave, Process, Capabilities, Final CTA) now use `TextReveal` so the headline enters with a per-word stagger.
- **Phase 07 — Magnetic primary CTA:** the homepage hero's "Start a Project" button is wrapped in `MagneticHover` so it earns a small amount of extra attention.
- **Phase 07 — Hover micro-interactions:**
  - Desktop nav links now draw an underline on hover via a `::after`-style scale-x transform.
  - Project cards (homepage Selected Work + `/work` index) lift slightly on hover (`-translate-y-0.5`); the preview gradient scales inside.
  - The Button primitive gets a `hover:-translate-y-px active:translate-y-0` micro-lift.
- **Phase 07 — Route transitions:** `src/components/motion/PageTransition.tsx` wraps `{children}` in the root layout. The `<main>` keeps its semantic ID; the wrapper carries the min-height so layout doesn't reflow.
- **Phase 07 — Mobile menu focus fix:** the `use-mobile-menu` hook now defers the return-focus call to `requestAnimationFrame` so WebKit (and any browser mid-unmount) settles before the focus moves.
- **Phase 07 — Performance pass:**
  - All animations animate `transform` and `opacity` only — no `width`/`height`/`top`/`left` transitions anywhere in the codebase.
  - `motion` is already in `experimental.optimizePackageImports` in `next.config.ts` so Next.js tree-shakes the import.
  - `will-change` is used sparingly — reserved for cases where a brief composite-layer is justified. Not added to the page-transition wrapper.
  - Build: home page is 1.22 kB page-specific + 154 kB First Load JS (motion is bundled into the shared chunks). The 6 `/work/[slug]` pages stay SSG.

### Changed

- `src/components/ui/Button.tsx` now applies a subtle 1px lift on hover and returns to baseline on active. Animation is GPU-composited (`transform` only).

### Changed

- Pinned `next` at `15.5.24` (patched within the 15.x line per `docs/09-library-and-dependency-management.md` "no major-version auto-upgrades" rule) to pick up the security fix for CVE-2025-66478 without crossing to Next 16.
- Pinned `eslint` at `^8.57.1` to match the version supported by `eslint-config-next@15.5.x`; ESLint 9 is dropped out of support and `eslint-config-next` 15.x is built for ESLint 8.
- `src/components/ui/Button.tsx` adopts the new `variants()` helper from `@/lib/variants` for intent + size, and the `cn` re-export from `@/lib/variants` (same identity as `@/lib/cn`) is used inside the UI layer.
- `src/lib/cn.ts` now uses the configured `twMerge` instance from `@/lib/tailwind-merge` so brand foreground and typographic scale classes merge cleanly.
- `src/app/page.tsx` placeholder text now references Phase 05 explicitly (homepage sections coming next).
- `playwright.config.ts` runs the production server on port `3030` (configurable via `PORT` env var) to avoid colliding with other dev servers on the default Next.js port. WebKit, Firefox, and Pixel-7 mobile projects remain configured.
- `src/components/ui/index.ts` now also exports the icon set so consumers can `import { MenuIcon } from "@/components/ui"`.

### Fixed

- Resolved a latent bug in `tailwind-merge` where the brand's `text-primary-foreground` / `text-accent-foreground` would be dropped when listed alongside `bg-primary` (the `text-X` group wasn't registered for the custom palette).
- Resolved a latent bug where custom `text-body` / `text-display-xl` font-size tokens were being merged into the `text-*` color group; they are now in the `font-size` group and coexist with color classes.
- Resolved a stale-state bug in the previous `usePrefersReducedMotion` test where the mocked `matchMedia` object captured `matches` by value rather than reading it as a live getter, so subsequent test mutations never reached the hook. The mock now uses a `get matches()` accessor and the test also covers mount-time read, listener updates, and unsubscribe on unmount.

### Testing

- `npm run lint` — passes with no warnings or errors.
- `npm run type-check` — passes (strict mode, `noUncheckedIndexedAccess`).
- `npm test` — 24/24 unit tests pass:
  - `cn` (3) — class merging, falsy filtering, last-wins conflict resolution.
  - `cn` re-export + `variants` helper (10) — defaults, selected variants, additional className conflict resolution, missing defaultVariants, unknown values; includes a regression test that `text-primary-foreground` survives alongside `bg-primary` and `text-body`.
  - `usePrefersReducedMotion` (5) — initial state, sync read on mount, listener change, unsubscribe on unmount, legacy `addListener` fallback.
  - `validateContact` (6) — accepts valid payload, flags missing required fields, rejects invalid email, enforces 10-character minimum message, treats whitespace as empty, doesn't flag optional fields when missing.
- `npm run build` — production build succeeds. 11 base routes are static-rendered; the 6 project pages at `/work/[slug]` are pre-rendered as SSG via `generateStaticParams`. First Load JS: shared 103 kB; `/` and `/work` 152 kB (inlines `motion`); `/services` and `/work/[slug]` 150 kB.
- `npm run test:e2e` — 140/140 Playwright tests pass across 4 browser projects (Chromium, WebKit, Firefox, mobile-chrome), with 4 mobile/desktop conditional skips. Coverage:
  - Home: title, wordmark, primary nav, mobile nav, primary CTA → /contact.
  - Homepage sections (Phase 05): every section is present in the IA order, the hero shows the eyebrow + headline + both CTAs, services preview lists 4 services, selected work lists 3 projects, process lists all 5 phases, capabilities list every technology, final CTA navigates to /contact.
  - Navigation: every route loads with the expected title and H1; unknown path returns 404; footer renders Sitemap, Services, Contact columns.
  - Mobile menu: hamburger visible, opens menu, aria-expanded flips, ESC closes and returns focus to the toggle, tapping a link navigates and closes the menu.
  - Work (Phase 06): all 6 projects render initially; clicking a card navigates to `/work/[slug]`; the Web filter narrows the grid (asserted both via URL query and visible count); the detail page renders problem/approach/results blocks and a "Continue reading" link; unknown slugs return 404.
  - Contact form (Phase 06): empty submit surfaces summary + per-field errors (verified via `[id$="-name-error"]` selectors); invalid email surfaces a clear error; valid submit posts to `/api/contact` (intercepted) and shows the success panel; 5xx from the API shows the error alert.
  - Motion (Phase 07): the hero headline settles to opacity 1 after the text-reveal animation; with `prefers-reduced-motion: reduce` the heading renders at its final opacity immediately, and section H2s do the same; the `<main>` element always has at least one child (the `PageTransition` wrapper).

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
