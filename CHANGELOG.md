# Changelog

All meaningful changes to Aurwave are recorded here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project follows [Semantic Versioning](https://semver.org/).

Categories used: `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`, `Testing`, `Docs`, `Chore`.

---

## [Unreleased]

### Added
- `CONTACT_EMAIL` is now wired through the codebase. `src/lib/site.ts` reads `process.env.CONTACT_EMAIL` at build time and exposes it as `siteConfig.email`, which feeds the footer mailto link and the contact-form success panel. `.env.example` documents the variable and sets a sensible local default. The contact-form delivery itself is still a stub (logs to the server console) and will be wired to a real provider in a follow-up.

### Fixed
- Empty `NEXT_PUBLIC_SITE_URL` no longer breaks the Vercel build. The previous `process.env.X ?? "http://localhost:3000"` guard only handled `null`/`undefined`, so an empty-string env var (which can happen when a Vercel env var is added without a value) caused `new URL("")` to throw during the `/_not-found` config collection step. The fix validates the value (treats empty / whitespace as missing) in `src/lib/site.ts` and uses the same `siteConfig.url` everywhere — `app/layout.tsx` no longer constructs its own URL.

### Testing
- Added `tests/unit/site.test.ts` with 7 cases: `NEXT_PUBLIC_SITE_URL` and `CONTACT_EMAIL` each tested against unset, empty-string, whitespace, and real-URL inputs. These guard against the same regression in the future. **31/31 unit tests pass** (was 24).

### Deployment
- **Live:** v1.0.0 is now live at `https://aurwave-vibe-coding-test.vercel.app/`. The first production deploy was triggered by pushing the fix commit (`e136c3a`) to `main`; Vercel's GitHub integration picked it up and built automatically.
- **First deploy attempt** at commit `6d2be48` failed on `/_not-found` with `TypeError: Invalid URL`. Root cause and fix in `e136c3a` (above). Subsequent deploys succeed.
- **Project env vars** (set in Vercel project settings — Production + Preview):
  - `NEXT_PUBLIC_SITE_URL` = `https://aurwave-vibe-coding-test.vercel.app`
  - `CONTACT_EMAIL` = `f.r.p.421l@gmail.com`
  - Both values are also the build-time defaults in `src/lib/site.ts` so the site still builds and works without env vars set; only the sitemap and metadata URLs change.
- **Docs updated:** `README.md` shows the live URL. `docs/13-vercel-deployment.md` is now a real, end-to-end deployment guide covering the GitHub → Vercel flow, env-var setup, custom-domain migration, and rollback procedure.

---

## [1.0.0] — 2026-08-29

The first production-ready release. Every phase of the implementation
plan (`plan.md`) is complete and verified:

- **00 — Project Initialization:** Next.js 15.5.24 + TypeScript + Tailwind +
  Motion + Vitest + Playwright scaffolded from `docs/07-technical-architecture.md`.
- **02 — Architecture and Foundation:** strict TS, full design tokens,
  brand-neutral palette with WCAG 2.2 AA contrast, dark-mode aware.
- **03 — Design System:** `Button`, `Container`, `Section`, `Heading`,
  `Text`, `Eyebrow`, `Link`, `Reveal`, `Icon`, and `Logo` primitives,
  each typed, accessible, and reduced-motion aware. A dev-only
  showcase at `/dev/components` reviews every primitive in real
  layout.
- **04 — Website Structure:** sticky Header with mobile menu (focus
  trap, ESC, body scroll lock, `inert` scoping), Footer, six public
  routes, contact form scaffold, 404 / error pages, skip-to-content
  link.
- **05 — Homepage:** nine IA-aligned sections (`HeroSection`,
  `IntroductionSection`, `ServicesPreviewSection`,
  `SelectedWorkSection`, `WhyAurwaveSection`, `ProcessSection`,
  `CapabilitiesSection`, `TestimonialSection`, `FinalCTASection`).
- **06 — Supporting Pages:** `/services` with 6 detail sections,
  `/work` with filterable grid + 6 SSG detail pages, `/about`
  with mission / values, real `/api/contact` server route with
  shared validation, fully-validated contact form.
- **07 — Animation and Interaction:** centralized motion library
  (`Stagger`, `TextReveal`, `MagneticHover`, `PageTransition`),
  text-reveal on hero + key H2s, hover micro-interactions,
  short route transitions, all `transform`/`opacity` only and
  reduced-motion aware.
- **08 — Content and Asset Integration:** SVG logo system
  (`public/icons/`), `Logo` React component wired into Header +
  Footer, dynamic favicon via `app/icon.tsx`, native
  `app/sitemap.ts` and `app/robots.ts`, asset folder READMEs
  documenting conventions and license tracking.
- **09 — Responsive Optimization:** data-driven test harness
  covering 7 viewports × 6 routes × 4 browser projects. No layout
  regressions found on first run.
- **10 — Accessibility and Performance:** axe-core audit on every
  public route. All critical / serious WCAG 2.2 AA violations
  fixed (primary contrast, `aria-prohibited-attr`, definition
  lists, heading hierarchy, skip-link). Bundle analyzer wired
  behind `ANALYZE=true`. 103 kB First Load shared JS.
- **11 — Testing and Quality Assurance:** GitHub Actions CI runs
  validate → build → E2E on every push/PR. `npm run validate`
  and `npm run ci` mirror the workflow. Console-error smoke,
  visual regression baselines at desktop + mobile, 440 E2E
  tests across 4 browser projects, 24 unit tests, all green.

**Quality gates**

- `npm run lint` — passes
- `npm run type-check` — passes (strict mode, `noUncheckedIndexedAccess`)
- `npm test` — 24/24 unit tests
- `npm run test:e2e` — 440/440 Playwright tests (4 mobile/desktop conditional skips)
- `npm run build` — succeeds; 11 base routes static-rendered, 6 `/work/[slug]` SSG, 4 dynamic (favicon, sitemap, robots, contact API)
- `npm run validate` — `lint` + `type-check` + 24/24 unit (~3s)

**Known limitations carried into v1.0.0**

- Project imagery on the homepage and `/work` index uses
  gradient placeholders. Real assets are tracked in
  `public/images/projects/README.md` and `public/images/services/README.md`.
- The Testimonial section uses a representative editorial
  sample quote clearly marked as such; a real, approved client
  quote should land before public launch.
- The contact form is wired to a stub `/api/contact` route that
  validates and logs. A real delivery provider (Resend /
  Formspree / a CRM) is deferred to a follow-up.
- Privacy and Terms pages are placeholders. Real legal copy
  should land before public launch.

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
- **Phase 08 — Logo system (`public/icons/`):** `aurwave-mark.svg` (icon-only) and `aurwave-logo.svg` (horizontal wordmark lockup). Both use `currentColor` so they render correctly in light and dark themes.
- **Phase 08 — Logo component (`src/components/ui/Logo.tsx`):** inline-SVG React component with `mark` and `wordmark` variants. Same geometry as the public files; both copies are documented in `public/icons/README.md` to keep them in sync.
- **Phase 08 — Logo in Header + Footer:** replaced the text wordmark with the `<Logo />` component. The link is still an `<a>` with the same `aria-label`, so existing E2E selectors continue to work.
- **Phase 08 — Dynamic favicon (`src/app/icon.tsx`):** uses Next.js's `ImageResponse` to render the mark as a 32×32 PNG at build time. Picked up automatically as `<link rel="icon">` — no root layout wiring needed.
- **Phase 08 — Sitemap (`src/app/sitemap.ts`):** App Router native metadata route. Lists every public route (5 static + 6 `/work/[slug]`) with `lastModified`, `changeFrequency`, and `priority`. Built from `siteConfig.url` + `allProjectSlugs()` so it stays in sync with the project catalog.
- **Phase 08 — robots.txt (`src/app/robots.ts`):** allows the entire site, disallows `/dev/` and `/api/`, and points at the sitemap.
- **Phase 08 — Testimonial cleanup:** removed the "Placeholder name, role at a placeholder company" attribution. The eyebrow now reads "From our clients" and the caption is clearly marked as an editorial sample to be replaced with a real, approved quote before launch.
- **Phase 08 — Asset folder structure:** created `public/images/{projects,services,general}/` and `public/icons/` READMEs documenting the file conventions, optimization targets (AVIF/WebP, ≤ 200 KB, 4:3 for project cards), and license tracking per `docs/10-asset-management.md`. Real images are still pending — the current site uses honest gradient placeholders in code, which is documented in the README.
- **Phase 09 — Responsive test harness (`tests/e2e/responsive.spec.ts`):** loads every public route at the seven target viewports from `plan.md` (360, 414, 768, 1024, 1280, 1536, 1920 px) and asserts:
  - the page returns 2xx;
  - the H1 is visible and within the viewport horizontally;
  - the body has no horizontal overflow (1px tolerance for sub-pixel rounding);
  - the primary nav is reachable (desktop nav at ≥ 1024, hamburger below).
  Six routes × seven viewports × four browser projects = 168 cases, all green on the first run. No layout regressions found.
- **Phase 09 — Interactive per-viewport tests (`tests/e2e/responsive-interactions.spec.ts`):** mobile menu open/close on 360 and 414 with 40px+ touch targets; project grid lays out as a 2-column grid at 768 with all filter chips tappable; contact form fields are full-width and the submit button meets the 44px WCAG 2.5.5 minimum target size on small viewports.
- **Phase 09 — Layout audit:** reviewed the breakpoint matrix in `tailwind.config.ts` (sm 640, md 768, lg 1024, xl 1280, 2xl 1536) and confirmed the site uses every breakpoint intentionally — no dead classes, no fixed widths that ignore the grid, no fixed font sizes that resist the responsive `clamp()` scale. The placeholder gradients and Tailwind `aspect-[4/3]` cards collapse cleanly down to 360.
- **Phase 10 — Accessibility tooling (`@axe-core/playwright`):** new dev dependency. `tests/e2e/helpers/axe.ts` runs `AxeBuilder` with the WCAG 2.0 / 2.1 / 2.2 Level A + AA tag set. `tests/e2e/a11y.spec.ts` runs the audit on every public route and fails on any `critical` or `serious` violation; `moderate` / `minor` violations are logged for follow-up.
- **Phase 10 — A11y fixes (from the first axe run):**
  - `aria-prohibited-attr`: `TextReveal` now uses `role="text"` on the outer span so the `aria-label` is valid. Inner word spans remain `aria-hidden` so the per-word animation doesn't double-announce.
  - `color-contrast`: primary token darkened from `oklch(0.55 0.2 260)` to `oklch(0.4 0.16 260)` so the primary button clears 4.5:1 against white text. Focus ring token darkened to match.
  - `definition-list` / `dlitem`: `Reveal` now accepts an `as` prop; the `<dl>` in `CapabilitiesSection` and the project card heading in `ProjectFilter` use `as="dt"` / `as="dd"` / `as="h2"` so the semantic tags are direct children of the `<dl>` / `<h1>` instead of being wrapped in a `<div>`.
  - `skip-to-content` flow: the root `<main>` element is now `tabIndex={-1}` so clicking the skip link moves focus to it.
  - Heading hierarchy: project cards on `/work` are now `<h2>` (a subheading of the work page), not `<h3>`. The previous h1 → h3 jump is fixed.
- **Phase 10 — Performance tooling (`@next/bundle-analyzer`):** new dev dependency. Wired into `next.config.ts` behind `ANALYZE=true` so `npm run build` stays fast by default and `ANALYZE=true npm run build` writes `.next/analyze/{client,server}.html` for review.
- **Phase 10 — Performance audit:** bundle is **103 kB First Load shared JS** with per-route pages weighing 0.1–2.8 kB of route-specific code. The 6 `/work/[slug]` pages stay SSG. `next/font/google` is already self-hosting Inter (see `src/app/layout.tsx`); `next/image` is configured to serve AVIF/WebP (`next.config.ts`) and is ready to be used as project images land. `optimizePackageImports: ["motion"]` ensures the motion library is tree-shaken. No unused dependencies found.
- **Phase 11 — CI scripts:** new `npm run validate` (lint + type-check + unit tests, ~3s) and `npm run ci` (validate + build + Playwright E2E) entries in `package.json`. `validate` is the fast local check; `ci` mirrors what the GitHub Actions workflow runs.
- **Phase 11 — GitHub Actions workflow (`.github/workflows/ci.yml`):** three jobs run sequentially on push and pull request to `main`:
  1. **validate** — Node 20, `npm ci`, `npm run validate`.
  2. **build** — gated on `validate`, runs `npm run build` so a broken build blocks the pipeline before E2E even starts.
  3. **e2e** — gated on `build`, installs Playwright browsers (cached by `package-lock.json` hash), runs the full E2E matrix, and uploads the HTML report on failure. Concurrency group cancels in-flight runs on the same ref so PR pushes don't queue behind themselves.
- **Phase 11 — Console-error smoke (`tests/e2e/console.spec.ts`):** every public route is loaded with a console listener attached. Page errors and `console.error` calls fail the test (with a small allowlist for hydration / DevTools noise). 24 cases, all green.
- **Phase 11 — Visual regression smoke (`tests/e2e/visual.spec.ts`):** snapshots the home and `/work` index at desktop (1280×800) and mobile (412×915) viewports. Baselines live at `tests/e2e/visual.spec.ts-snapshots/*.png` and are checked in. `maxDiffPixelRatio: 0.02` tolerates minor font anti-aliasing diffs. Regenerate with `npx playwright test visual.spec.ts -u` after intentional design changes. 16 cases (4 routes × 4 projects), all green on the second run after baselines were created.
- **Phase 11 — E2E coverage audit:** the suite covers every critical user flow from `docs/11-testing-strategy.md`:
  - Homepage loads (`home.spec.ts`)
  - Navigation works desktop + mobile (`navigation.spec.ts`, `mobile-menu.spec.ts`)
  - Mobile menu keyboard, ESC, focus return (`mobile-menu.spec.ts`)
  - Contact form happy path + validation + server error (`contact-form.spec.ts`)
  - Primary CTA navigates to `/contact` (`home.spec.ts`)
  - No critical console errors on any route (`console.spec.ts`)
  - Visual regression baseline at desktop + mobile (`visual.spec.ts`)
  - Responsive layout at 7 viewports (`responsive.spec.ts`, `responsive-interactions.spec.ts`)
  - Axe-core a11y + heading hierarchy + skip link (`a11y.spec.ts`)
  - Motion + reduced motion (`motion.spec.ts`)
  - SEO surface (sitemap, robots, favicon) (`seo.spec.ts`)
  - Project grid + filter + detail navigation (`work.spec.ts`)
  - Homepage sections in correct IA order (`home-sections.spec.ts`)
- **Phase 12 — Version control and release:** `git user.name` and `git user.email` configured locally and globally as `MDFOZLERABBIPIYASH <f.r.p.421l@gmail.com>`. Default branch is `main`. All 10 commits on `main` use a conventional prefix (`chore:`, `feat(scope):`, `test(scope):`, `ci:`, `docs(scope):`); each is a single logical change with a matching `CHANGELOG.md` entry.
- **Phase 12 — Release notes:** added a `[1.0.0] — 2026-08-29` section at the top of `CHANGELOG.md` summarizing every shipped phase, the current quality gates, and the known limitations carried into the release. `README.md` now shows a "Status: v1.0.0" line and links to the changelog from the repo root.
- **Phase 12 — v1.0.0 tag:** annotated tag `v1.0.0` created on the latest `main` commit (`c7b4d5e`) with full release notes, and pushed to `origin`. The tag is the canonical reference for "the first production-ready commit" per `plan.md` Phase 12 task 4. The local commit history was rewritten once (Phase 06 → Phase 07 boundary) to align all author metadata with the project's GitHub identity.
- **Phase 13 — Vercel deployment:** the repo is connected to Vercel via the GitHub App integration. Production deploys are automatic on every push to `main`; PRs get preview URLs. The first successful deploy is live at `https://aurwave-vibe-coding-test.vercel.app/`. `docs/13-vercel-deployment.md` is now a real, end-to-end deployment guide (was a placeholder before) covering: the GitHub → Vercel flow, env-var setup, the empty-string env-var trap, custom-domain migration, and rollback via the Vercel dashboard. `.env.example` now defaults `NEXT_PUBLIC_SITE_URL` to the production URL.
- **Phase 13 — v1.0.1 tag:** annotated tag `v1.0.1` created at the live commit (`5d0b7ba`) and pushed to `origin`. The v1.0.0 tag is preserved at the original release commit (`c7b4d5e`) for traceability — the v1.0.0 build never deployed because of the empty-string `NEXT_PUBLIC_SITE_URL` bug fixed in this release. v1.0.1 is the canonical "first production deploy" reference.

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
- `npm run test:e2e` — 440/440 Playwright tests pass across 4 browser projects (Chromium, WebKit, Firefox, mobile-chrome), with 4 mobile/desktop conditional skips. Coverage:
  - Home: title, wordmark, primary nav, mobile nav, primary CTA → /contact.
  - Homepage sections (Phase 05): every section is present in the IA order, the hero shows the eyebrow + headline + both CTAs, services preview lists 4 services, selected work lists 3 projects, process lists all 5 phases, capabilities list every technology, final CTA navigates to /contact.
  - Navigation: every route loads with the expected title and H1; unknown path returns 404; footer renders Sitemap, Services, Contact columns.
  - Mobile menu: hamburger visible, opens menu, aria-expanded flips, ESC closes and returns focus to the toggle, tapping a link navigates and closes the menu.
  - Work (Phase 06): all 6 projects render initially; clicking a card navigates to `/work/[slug]`; the Web filter narrows the grid (asserted both via URL query and visible count); the detail page renders problem/approach/results blocks and a "Continue reading" link; unknown slugs return 404.
  - Contact form (Phase 06): empty submit surfaces summary + per-field errors (verified via `[id$="-name-error"]` selectors); invalid email surfaces a clear error; valid submit posts to `/api/contact` (intercepted) and shows the success panel; 5xx from the API shows the error alert.
  - Motion (Phase 07): the hero headline settles to opacity 1 after the text-reveal animation; with `prefers-reduced-motion: reduce` the heading renders at its final opacity immediately, and section H2s do the same; the `<main>` element always has at least one child (the `PageTransition` wrapper).
  - SEO surface (Phase 08): `/icon` returns a 200 with an `image/*` content type; `/robots.txt` includes the `User-Agent`, `Disallow: /dev/`, and `Sitemap` directives; `/sitemap.xml` lists every static route and every project slug from the catalog.
  - Logo (Phase 08): the home page renders the brand wordmark as an accessible image in the header.
  - Responsive (Phase 09): every public route lays out cleanly (no horizontal overflow, H1 visible, primary nav reachable) at the seven target viewports (360, 414, 768, 1024, 1280, 1536, 1920 px) across all 4 browser projects. Mobile menu, project grid, and contact form all meet the WCAG 2.5.5 44px touch-target minimum on small viewports.
  - A11y (Phase 10): axe-core audit on every public route reports zero critical or serious WCAG 2.2 AA violations across all 4 browser projects. Every page has exactly one `<h1>` and a valid heading hierarchy (no level skips). The skip-to-content link is reachable on the first Tab and moves focus to `<main>` when activated.
  - CI / QA (Phase 11): `npm run validate` (lint + type-check + 24 unit) and `npm run ci` (validate + build + 440 E2E) both pass. GitHub Actions workflow runs the same pipeline on every push/PR. No console errors on any route. Visual regression baselines are checked in for the home and `/work` index at desktop and mobile viewports.
  - Release (Phase 12): v1.0.0 is tagged on `main` and live on `origin`. The release notes are at the top of `CHANGELOG.md`.

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
