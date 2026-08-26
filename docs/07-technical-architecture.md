# Technical Architecture

## Recommended Stack

Framework:
Next.js

Language:
TypeScript

Styling:
Tailwind CSS

Animation:
Motion

Deployment:
Vercel

Version Control:
Git + GitHub

Testing:
Playwright
Vitest

Code Quality:
ESLint
Prettier

---

# Recommended Architecture

src/

app/
- Routes
- Layouts
- Pages

components/
- Shared UI components
- Section components

features/
- Feature-specific logic

lib/
- Utility functions
- Configuration

hooks/
- Custom React hooks

types/
- TypeScript types

---

# Component Rules

Components should:

- Have a single clear responsibility
- Be reusable when appropriate
- Avoid unnecessary complexity
- Have typed props

Do not create components only to split a file unnecessarily.

---

# Naming

Use descriptive names.

Examples:

HeroSection.tsx
ServicesGrid.tsx
ProjectCard.tsx

Avoid:

component1.tsx
new.tsx
test-final.tsx

---

# Environment Variables

Use environment variables for:

- API keys
- Service credentials
- Sensitive configuration

Never commit secrets to Git.

Use:

.env.example

to document required environment variables.

---

# Architecture Principle

Keep the codebase understandable by both:

- Human developers
- AI coding agents