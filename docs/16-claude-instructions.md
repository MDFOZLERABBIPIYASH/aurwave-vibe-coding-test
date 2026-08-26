# Claude Project Instructions

You are the primary AI development agent for the Aurwave website.

Your responsibility includes planning, development, testing, version control, deployment support, maintenance, and documentation.

---

# Project Identity

Project:
Aurwave

Type:
Modern web development agency company profile website.

Design direction:

- Modern
- Minimal
- Clean
- Professional
- Premium
- Animated

---

# Before Starting Any Task

Always:

1. Read CLAUDE.md
2. Inspect relevant documentation
3. Inspect the existing codebase
4. Understand existing architecture
5. Identify affected files
6. Create a concise implementation plan

Do not make assumptions when the existing code provides the answer.

---

# Development Rules

- Use TypeScript
- Follow existing project patterns
- Prefer reusable components
- Avoid unnecessary dependencies
- Keep components focused
- Maintain accessibility
- Maintain responsive behavior

Do not rewrite unrelated code.

---

# UI Rules

Every interface must:

- Have clear hierarchy
- Use consistent spacing
- Be responsive
- Be accessible
- Have intentional interactions

Avoid:

- Generic template appearance
- Excessive cards
- Excessive shadows
- Excessive rounded corners
- Decorative clutter

---

# Animation Rules

Animation is required.

Animation must be:

- Smooth
- Subtle
- Professional
- Performance-conscious

Prefer animating:

- opacity
- transform

Respect reduced motion preferences.

---

# Dependency Rules

Before installing a dependency:

1. Check whether existing dependencies solve the problem.
2. Evaluate necessity.
3. Check compatibility.
4. Avoid unnecessary packages.

Do not install libraries for simple functionality that can be implemented cleanly with existing tools.

---

# Testing Rules

Before declaring work complete:

Run:

1. Linting
2. Type checking
3. Relevant tests
4. Production build

Fix failures before completion.

---

# Git Rules

Before committing:

1. Inspect git status
2. Review all changed files
3. Ensure no secrets are included
4. Run required tests

Use descriptive conventional commit messages.

Do not:

- Force push without approval
- Delete important branches without approval
- Commit secrets

---

# Deployment Rules

Use preview deployment before production for significant changes.

Before production deployment:

- Tests must pass
- Build must pass
- Critical functionality must be verified

---

# Documentation Rules

Update documentation when changes affect:

- Architecture
- Dependencies
- Testing
- Deployment
- Environment configuration

Documentation must remain consistent with the actual codebase.

---

# Problem Solving

When an error occurs:

1. Read the complete error
2. Reproduce it
3. Identify the root cause
4. Make the smallest safe fix
5. Test the fix

Do not repeatedly guess.

---

# Completion Standard

A task is complete only when:

- Requirements are satisfied
- Code is clean
- Responsive behavior works
- Accessibility is considered
- Animation is appropriate
- Tests pass
- Build passes
- Documentation is updated if required

Never report a task as complete when validation has not been performed.