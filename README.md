# Aurwave

> A modern web design and development agency company profile website.

Aurwave is built as a premium, performance-focused marketing site that communicates clarity, precision, and technical capability.

---

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org) 15 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS
- **Animation:** [Motion](https://motion.dev)
- **Testing:** Vitest (unit) · Playwright (E2E)
- **Quality:** ESLint · Prettier
- **Deployment:** [Vercel](https://vercel.com)

---

## Getting Started

### Prerequisites

- Node.js ≥ 18.18
- npm ≥ 9

### Install

```bash
npm install
cp .env.example .env.local
```

### Scripts

| Command            | Description                                |
| ------------------ | ------------------------------------------ |
| `npm run dev`      | Start the local dev server on `:3000`      |
| `npm run build`    | Production build                           |
| `npm run start`    | Run the production build                   |
| `npm run lint`     | Run ESLint                                 |
| `npm run type-check` | Run the TypeScript compiler (no emit)    |
| `npm run format`   | Format code with Prettier                  |
| `npm test`         | Run unit tests with Vitest                 |
| `npm run test:watch` | Watch-mode unit tests                    |
| `npm run test:e2e` | Run Playwright end-to-end tests            |

---

## Project Structure

```
.
├── src/
│   ├── app/                 # Next.js App Router routes
│   ├── components/
│   │   ├── ui/              # Design-system primitives (Button, Heading, …)
│   │   ├── layout/          # Header, Footer, MainLayout
│   │   └── sections/        # Page-level sections (Hero, Services, …)
│   ├── features/            # Feature-specific logic
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities (cn, site config)
│   ├── types/               # Shared TypeScript types
│   └── styles/              # Global styles and design tokens
├── public/                  # Static assets (images, icons, videos, fonts)
├── tests/
│   ├── unit/                # Vitest unit tests
│   └── e2e/                 # Playwright E2E tests
├── docs/                    # Project documentation
└── ...config files
```

See [`docs/07-technical-architecture.md`](docs/07-technical-architecture.md) for the full architecture rationale.

---

## Documentation

All project documentation lives under [`docs/`](docs/). Start here:

- [`docs/01-project-overview.md`](docs/01-project-overview.md) — Project goals and audience
- [`docs/02-brand-and-design.md`](docs/02-brand-and-design.md) — Visual direction
- [`docs/03-information-architecture.md`](docs/03-information-architecture.md) — Site structure
- [`docs/roadmap.md`](docs/roadmap.md) — Phased development plan
- [`plan.md`](plan.md) — Current implementation plan
- [`CHANGELOG.md`](CHANGELOG.md) — Record of every meaningful change
- [`CLAUDE.md`](CLAUDE.md) — AI development rules and workflow

---

## Workflow

Every meaningful change follows this loop:

```
Analyze → Plan → Implement → Test → Build → Review → Update Docs → Update Changelog → Commit
```

A task is **not** complete until lint, type-check, relevant tests, build, and the changelog update are all done.

---

## Deployment

Deployment is handled by Vercel. See [`docs/13-vercel-deployment.md`](docs/13-vercel-deployment.md) for the full deployment and rollback strategy.
