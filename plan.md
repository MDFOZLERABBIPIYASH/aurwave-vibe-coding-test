# Aurwave — Implementation Plan

> Generated 2026-08-26. This plan follows the workflow defined in `CLAUDE.md` and the phase structure in `docs/roadmap.md`.

---

## 1. Project Summary

**Project:** Aurwave
**Type:** Company profile website for a web design and development agency
**Goal:** Present Aurwave as a modern, premium, technically capable agency. Generate qualified leads via a primary "Start a Project" CTA.

**Current state:** Project initialization. Git repo exists on `master` branch with zero commits. Only documentation files (`.md`) are present in the working tree. No `package.json`, no source code, no dependencies installed. `CHANGELOG.md` is empty.

**Stack (per `docs/07-technical-architecture.md`):** Next.js · TypeScript · Tailwind CSS · Motion · Vercel · Playwright · Vitest · ESLint · Prettier.

---

## 2. Guiding Constraints (from CLAUDE.md and docs)

These rules apply to every phase. Do not skip them.

- **Workflow:** Analyze → Plan → Implement → Test → Build → Review → Update Documentation → Update Changelog → Commit → Deploy.
- **Change tracking:** Every meaningful change must be added to `CHANGELOG.md` before the task is considered complete.
- **Commit hygiene:** Inspect status, review changes, confirm no secrets, run validation, use conventional commit messages.
- **Dependencies:** No library unless it solves a real need; reuse existing tools first.
- **Animations:** Intentional, subtle, performant, respect `prefers-reduced-motion`.
- **Accessibility:** WCAG 2.2 AA target, keyboard nav, semantic HTML, visible focus.
- **AI completion standard:** A task is only complete when lint, type-check, tests, build, and CHANGELOG updates are all done.

---

## 3. Phased Plan

The plan follows `docs/roadmap.md` and breaks each phase into the smallest meaningful units that can be implemented, validated, and changelogged.

### Phase 00 — Project Initialization

**Objective:** Bootstrap a working Next.js project with all quality tools configured.

**Tasks:**
1. Initialize `package.json` with project metadata and required scripts (`dev`, `build`, `start`, `lint`, `type-check`, `test`, `test:e2e`, `format`).
2. Install core dependencies: `next`, `react`, `react-dom`, `typescript`, `tailwindcss`, `motion`, `clsx`, `tailwind-merge`.
3. Install dev dependencies: `@types/node`, `@types/react`, `@types/react-dom`, `eslint`, `eslint-config-next`, `prettier`, `vitest`, `@vitest/ui`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@playwright/test`.
4. Create configuration files:
   - `tsconfig.json` (strict mode, path alias `@/*` → `./src/*`).
   - `next.config.ts` (or `.mjs`) — minimal, optimized for Vercel.
   - `tailwind.config.ts` with design tokens from `docs/02-brand-and-design.md`.
   - `postcss.config.mjs`.
   - `.eslintrc.json` extending `next/core-web-vitals` + TypeScript.
   - `.prettierrc.json`.
   - `vitest.config.ts` (jsdom environment, alias to `@/*`).
   - `playwright.config.ts` (projects for chromium + webkit + firefox, base URL `http://localhost:3000`).
5. Create `.env.example` with empty documented variables.
6. Create `README.md` (project description, scripts, structure, docs index).
7. Create the `src/` folder structure exactly as specified in `docs/07-technical-architecture.md`:
   ```
   src/app
   src/components/{ui,layout,sections}
   src/features
   src/hooks
   src/lib
   src/types
   src/styles
   public/{images/{projects,services,general},icons,videos,fonts}
   tests
   ```
8. Create initial `src/app/layout.tsx` (root layout, metadata, font links) and `src/app/page.tsx` (placeholder home).
9. Create `src/styles/globals.css` with Tailwind directives + CSS custom properties for the design tokens.
10. Add a `.gitignore` extending the existing one (already ignores `.aider*`) to include `node_modules`, `.next`, `out`, `.env*.local`, `coverage`, `playwright-report`, `test-results`.
11. **Initial commit:** `chore: initialize Next.js project with tooling`.

**Acceptance criteria:**
- `npm install` completes cleanly.
- `npm run lint`, `npm run type-check`, `npm run build`, `npm test` all pass.
- `npm run dev` serves a working placeholder home page on `:3000`.
- Folder structure matches the architecture doc.

---

### Phase 01 — Project Discovery and Planning

**Objective:** Solidify the plan from documentation. (Mostly complete via this `plan.md` file.)

**Tasks:**
1. Review all 16 docs and confirm the plan covers them. ✅ done in this file.
2. Confirm information architecture, content, and IA are reflected in the page plan below.
3. Capture open questions for the user (logo, brand colors, project assets, contact form backend) — see Section 4.

**Acceptance criteria:** Plan signed off by user.

---

### Phase 02 — Architecture and Foundation

**Objective:** Configure Next.js, TypeScript, Tailwind, and global styles.

**Tasks:**
1. Configure `next.config.ts` with `reactStrictMode: true`, image domains if needed, and any required experimental flags.
2. Configure TypeScript with strict mode and path alias `@/*`.
3. Configure Tailwind with:
   - Brand-neutral placeholder palette (defined as CSS custom properties; see Phase 03 for tokens).
   - Custom spacing scale from `docs/02-brand-and-design.md` (4, 8, 12, 16, 24, 32, 48, 64, 96, 128).
   - Custom font family (Inter, loaded via `next/font/google`).
4. Configure global reset and base typography in `globals.css`.
5. Set up `src/lib/cn.ts` (`clsx` + `tailwind-merge` helper).
6. Add an empty `<MainLayout>` component that wraps `{children}` with `<Header />` + `<Footer />` placeholders.

**Acceptance criteria:** App builds, layout renders, styles apply, no console errors.

---

### Phase 03 — Design System

**Objective:** Build a consistent, reusable set of UI primitives.

**Tasks:**
1. Define design tokens in `src/styles/tokens.css`:
   - Typography (sizes, line-heights, letter-spacing per hierarchy H1–Small).
   - Color (Primary, Neutral scale, Accent).
   - Spacing scale.
   - Radii (minimal, calm).
   - Motion durations & easings (150–250ms fast, 300–500ms standard, 500–800ms complex; `ease-out` and `ease-in-out`).
   - Container max-width.
2. Create reusable components in `src/components/ui/`:
   - `Button.tsx` — `primary | secondary | text` variants, sizes, hover/focus/active states, accessible focus ring.
   - `Container.tsx` — max-width wrapper with consistent padding.
   - `Section.tsx` — section wrapper with `id`, padding, optional eyebrow.
   - `Heading.tsx` — `as` prop, `display | h1..h4 | eyebrow | small` variants.
   - `Text.tsx` — `body | bodyLarge | small` variants.
   - `Link.tsx` — accessible, with subtle hover.
   - `Eyebrow.tsx` — small uppercase label.
   - `Reveal.tsx` — `motion`-based entrance wrapper (opacity + small y), respects `prefers-reduced-motion`.
3. Add unit tests for `cn.ts` and any pure logic.
4. Add a Storybook-style dev page at `/dev/components` to showcase the primitives (dev only, behind `process.env.NODE_ENV !== "production"`).
5. Add Vitest + Testing Library setup for component tests.

**Acceptance criteria:** Tokens are centralized, primitives are typed and accessible, reduced motion is respected, dev showcase renders.

---

### Phase 04 — Website Structure

**Objective:** Build the global layout, header, navigation, and footer.

**Tasks:**
1. `Header`:
   - Logo (text wordmark for now, replaced with real logo in Phase 08).
   - Primary nav: Home, Services, Work, About, Contact.
   - Primary CTA button: "Start a Project" → `/contact`.
   - Mobile: hamburger → animated full-screen menu with focus trap, ESC to close, body scroll lock.
2. `Footer`:
   - Logo, short description, nav columns (Sitemap + Services), contact info, social links, copyright, legal placeholders.
3. Routes (App Router):
   - `/` (Home)
   - `/services`
   - `/work`
   - `/about`
   - `/contact`
   - `/dev/components` (dev only)
4. Page metadata for each route (title, description, OpenGraph, Twitter).
5. `not-found.tsx` and `error.tsx`.
6. Add Playwright smoke tests for: each route loads, mobile menu opens/closes, primary CTA navigates to `/contact`.

**Acceptance criteria:** All routes load, navigation is keyboard accessible, mobile menu works, no console errors, Playwright smoke green.

---

### Phase 05 — Core Homepage Development

**Objective:** Build the homepage sections listed in `docs/03-information-architecture.md` and `docs/04-content-strategy.md`.

**Tasks (one component per file under `src/components/sections/`):**
1. `HeroSection` — eyebrow + headline + supporting text + primary/secondary CTAs. Use `Reveal` for staggered text.
2. `IntroductionSection` — concise who/what/why copy.
3. `ServicesPreviewSection` — 3–4 highlighted services, links to `/services`.
4. `SelectedWorkSection` — 3 featured projects with image, name, industry, services.
5. `WhyAurwaveSection` — 4 differentiation points (Strategy, Design+Dev together, Performance, Communication).
6. `ProcessSection` — 5 steps (Discover → Define → Design → Develop → Launch) with index numbers and short descriptions.
7. `CapabilitiesSection` — Frontend / Styling / Animation / Deployment stack.
8. `TestimonialSection` — single social-proof block (placeholder quote, replaced in Phase 08).
9. `FinalCTASection` — "Have a project in mind?" + "Start a Conversation" CTA.
10. Wire them in `src/app/page.tsx` in the order from the IA doc.

**Acceptance criteria:** Each section is responsive, accessible, and animated. Lighthouse a11y ≥ 95 in local dev.

---

### Phase 06 — Supporting Pages

**Objective:** Build Services, Work, About, Contact.

**Tasks:**
1. `/services`:
   - Overview hero.
   - Service detail list (Web Design, Web Development, UI/UX, E-commerce, Redesign, Performance Optimization).
   - Methodology recap (link to homepage Process).
   - CTA.
2. `/work`:
   - Project grid with filter by category (All / Web / E-commerce / Brand).
   - Project detail pages at `/work/[slug]` with hero, problem, approach, results, gallery.
3. `/about`:
   - Agency intro, mission, approach, values.
   - CTA.
4. `/contact`:
   - Form (name, email, company, project type, budget range, message).
   - Client-side validation, accessible error messages, success state.
   - Contact details.
   - For submission: a serverless route at `app/api/contact/route.ts` stubbed to log and return success; replace with real provider in a later phase.
5. Add Playwright tests for: form validation, form happy path, project detail navigation.

**Acceptance criteria:** Each page is complete, responsive, and accessible. Form is fully functional with stubbed backend.

---

### Phase 07 — Animation and Interaction

**Objective:** Layer in intentional, performant animation across the site.

**Tasks:**
1. Centralize `Reveal`, `Stagger`, and `MagneticHover` helpers in `src/components/motion/` (or under `ui/`).
2. Apply entrance animations to all major sections.
3. Add text-reveal to hero headline and key H2s.
4. Subtle hover states on buttons, links, project cards, nav.
5. Mobile menu open/close animation.
6. Page transitions: subtle fade/slide between routes.
7. Respect `prefers-reduced-motion` everywhere (test by toggling OS setting).
8. Performance pass: only animate `transform` and `opacity`, lazy-load `motion` where possible, use `will-change` sparingly.

**Acceptance criteria:** All animations feel intentional, no jank, reduced motion verified.

---

### Phase 08 — Content and Asset Integration

**Objective:** Replace placeholders with real content and optimized assets.

**Tasks:**
1. Add logo SVGs (`aurwave-logo.svg`, `aurwave-mark.svg`) to `public/icons/`.
2. Add favicon set and `app/icon.tsx` (or static files in `app/`).
3. Add 3–6 project images to `public/images/projects/` (WebP, optimized, with descriptive alt text).
4. Add service visuals if any.
5. Replace placeholder copy with final copy.
6. Add `next-sitemap` (or app-router-native metadata) for SEO.
7. Add `robots.txt` and `sitemap.xml` (via `@next/sitemap` if needed).
8. Verify asset license metadata where required.

**Acceptance criteria:** No placeholder copy remains. All images optimized. Asset folder is clean.

---

### Phase 09 — Responsive Optimization

**Objective:** Verify and refine every breakpoint.

**Tasks:**
1. Test at: 360, 414, 768, 1024, 1280, 1536, 1920 px.
2. Fix any horizontal overflow, awkward line breaks, oversized touch targets.
3. Refine spacing and typography per breakpoint.
4. Verify mobile menu, project grid, and form behavior on real devices via Playwright (or BrowserStack if needed).

**Acceptance criteria:** No layout regressions at any tested viewport.

---

### Phase 10 — Accessibility and Performance

**Objective:** Hit WCAG 2.2 AA and good Core Web Vitals.

**Tasks:**
1. Run `axe` via Playwright on all pages; fix all critical/serious issues.
2. Add skip-to-content link.
3. Verify focus order on every page; ensure focus rings are visible.
4. Confirm heading hierarchy, alt text, form labels, color contrast.
5. Performance:
   - `next/image` everywhere.
   - `next/font` self-hosted.
   - Lazy-load below-the-fold sections.
   - Audit bundle; remove unused deps.
6. Set up `@next/bundle-analyzer` and check sizes.

**Acceptance criteria:** `axe` reports zero critical issues on every page. Lighthouse Perf ≥ 90, A11y ≥ 95 locally.

---

### Phase 11 — Testing and Quality Assurance

**Objective:** Validate the full app before release.

**Tasks:**
1. CI script (or local script) that runs: `lint`, `type-check`, `test`, `test:e2e`, `build`.
2. Playwright E2E for all critical user flows.
3. Visual regression (optional, via Playwright snapshots for the homepage).
4. Manual QA pass across viewports.
5. Bug-fix loop: detect → repro → fix → test → changelog.

**Acceptance criteria:** All quality gates pass.

---

### Phase 12 — Version Control and Release

**Objective:** Clean, traceable release.

**Tasks:**
1. Configure git user name/email locally.
2. Make the initial commit on `main` (rename branch from `master` if desired) and all subsequent phase commits.
3. Use conventional commits throughout.
4. Tag `v1.0.0` on the first production-ready commit.
5. Ensure `CHANGELOG.md` is current for every shipped phase.

**Acceptance criteria:** History is clean, commits are meaningful, tag is in place.

---

### Phase 13 — Vercel Deployment

**Objective:** Deploy safely.

**Tasks:**
1. Connect repo to Vercel.
2. Configure environment variables from `.env.example` in Vercel.
3. Confirm preview deploys work on a sample PR.
4. Add a Vercel deployment guide doc (`docs/13-vercel-deployment.md` is already present; verify it matches the actual setup).
5. Promote to production once green.

**Acceptance criteria:** Production URL live, preview works, no console errors.

---

### Phase 14 — Post-Launch Monitoring

**Objective:** Detect and fix issues early.

**Tasks:**
1. Add Vercel Analytics (or Plausible/Umami) and Speed Insights.
2. Set up Sentry (or similar) for runtime errors.
3. Monitor for first 7 days; respond to issues.

**Acceptance criteria:** Monitoring live, no unresolved critical issues.

---

### Phase 15 — Continuous AI Maintenance

**Objective:** Keep the site healthy.

**Tasks:** (Recurring, per `docs/15-maintenance-and-monitoring.md`.)
- Weekly: dependency health, build, test, broken-link scan, perf check.
- Monthly: accessibility re-audit, asset audit, doc freshness.
- Always: changelog discipline, incremental changes, conventional commits.

---

## 4. Open Questions for the User (to resolve before Phase 08)

1. **Brand color:** Any specific brand color, or use a brand-neutral default palette and swap later?
2. **Logo:** Do you have a logo (SVG)? If not, ship a clean text wordmark and replace later.
3. **Domain & contact email:** Final production domain and the email that should receive contact form submissions.
4. **Contact form backend:** Email-only (Resend / Postmark), third-party form service (Formspree, Web3Forms), or full CRM (HubSpot)? Default plan: stub route, swap later.
5. **Project portfolio:** How many real projects are ready to feature, and are visuals available? If none, use clearly-labeled placeholder projects initially.
6. **Analytics:** Vercel Analytics, Plausible, Umami, or none for now?
7. **Legal pages:** Are Privacy / Terms pages required at launch? Default plan: placeholder pages.
8. **CMS:** Any need for a CMS (Sanity, Contentful, MDX) for the blog/work/case studies? Default plan: static content in code; revisit later.

---

## 5. Change Discipline

For every change during implementation:

1. Identify the smallest meaningful unit of work.
2. Implement it.
3. Run `lint`, `type-check`, relevant tests, and `build`.
4. Update the relevant doc(s) if architecture/dependency/test/deploy changed.
5. Append a precise entry to `CHANGELOG.md` (Added / Changed / Fixed / Removed / Testing) — never vague wording.
6. Conventional commit on a topic branch; merge to `main` once green.

A task is **not** complete until all six steps are done.

---

## 6. Definition of Done (Whole Project)

- All 16 docs in `docs/` are still accurate.
- `CHANGELOG.md` reflects every meaningful change.
- `npm run lint`, `npm run type-check`, `npm test`, `npm run test:e2e`, and `npm run build` all pass.
- Lighthouse Perf ≥ 90, A11y ≥ 95, SEO ≥ 95 on `/`.
- No critical or serious `axe` issues.
- Production deployed to Vercel.
- Monitoring live.
- v1.0.0 tagged.
