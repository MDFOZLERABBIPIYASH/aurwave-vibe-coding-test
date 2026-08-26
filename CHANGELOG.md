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

### Docs
- Documented the project status: Git repository initialized on `master` with zero commits; only documentation files exist in the working tree. No source code, `package.json`, or dependencies are present yet.
- Outlined 16 phases (Phase 00 → Phase 15) mapped to `docs/roadmap.md`, with explicit tasks, acceptance criteria, and a definition of done.
- Listed open questions for the user (brand color, logo, domain, contact form backend, portfolio assets, analytics, legal pages, CMS) that must be resolved before Phase 08 (Content and Asset Integration).
- Added `README.md` with project description, scripts, folder structure, and documentation index.

### Changed
- Pinned `next` at `15.5.24` (patched within the 15.x line per `docs/09-library-and-dependency-management.md` "no major-version auto-upgrades" rule) to pick up the security fix for CVE-2025-66478 without crossing to Next 16.
- Pinned `eslint` at `^8.57.1` to match the version supported by `eslint-config-next@15.5.x`; ESLint 9 is dropped out of support and `eslint-config-next` 15.x is built for ESLint 8.

### Testing
- `npm run lint` — passes with no warnings or errors.
- `npm run type-check` — passes (strict mode, `noUncheckedIndexedAccess`).
- `npm test` — 3/3 unit tests pass (`cn` utility merge + conflict-resolution behavior).
- `npm run build` — production build succeeds; static-rendered home route weighs 103 kB First Load JS.
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
