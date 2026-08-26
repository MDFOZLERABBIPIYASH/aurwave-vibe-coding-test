# Version Control Strategy

## Platform

Git + GitHub

---

# Branch Structure

main

Production-ready code.

develop

Integration branch if the project requires it.

feature/*

New features.

fix/*

Bug fixes.

chore/*

Maintenance.

---

# Recommended Simplified Workflow

For a small AI-managed project:

main
↓
feature branch
↓
testing
↓
pull request
↓
main
↓
Vercel production

---

# Commit Format

Use conventional commits.

Examples:

feat: add services section

fix: correct mobile navigation animation

refactor: simplify project card component

test: add contact form tests

chore: update dependencies

---

# Commit Rules

Each commit should represent one logical change.

Avoid commits such as:

- update
- changes
- fix stuff

---

# Pull Requests

Every significant change should include:

- Summary
- Changed files
- Testing performed
- Known limitations

---

# AI Git Rules

Claude must:

1. Inspect repository status
2. Review changes
3. Run tests
4. Create descriptive commit messages
5. Never force push without explicit approval
6. Never delete important branches without explicit approval