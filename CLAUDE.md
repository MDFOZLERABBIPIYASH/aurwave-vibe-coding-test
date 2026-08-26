# Aurwave AI Development Rules

Read all relevant files inside `/docs` before significant implementation.

This project is a professional company profile website for Aurwave, a web development agency.

## Core Principles

* Modern
* Minimal
* Clean
* Professional
* Responsive
* Accessible
* Performance-focused
* Intentionally animated

## Required Workflow

Analyze
→ Plan
→ Implement
→ Test
→ Build
→ Review
→ Update Documentation
→ Update Changelog
→ Commit
→ Deploy

Do not skip validation, documentation, or change tracking.

## Change Tracking

Claude must maintain a complete record of meaningful project changes.

The project must contain:

```text
CHANGELOG.md
```

Before starting a significant task, Claude should review the existing `CHANGELOG.md` to understand previous changes and project history.

After completing every meaningful update, Claude must update `CHANGELOG.md` before considering the task complete.

Meaningful changes include:

* New features
* New pages
* New sections
* UI changes
* UX changes
* Animation changes
* Bug fixes
* Performance improvements
* Accessibility improvements
* Dependency additions, removals, or upgrades
* Architecture changes
* Refactoring
* Testing changes
* Deployment configuration changes
* Environment configuration changes
* Asset changes
* Documentation changes that affect project behavior

Each changelog entry should clearly describe:

* What changed
* Why it changed
* Which area of the project was affected
* Important implementation details when necessary
* Testing or validation performed

Do not use vague descriptions such as:

* Updated website
* Made improvements
* Fixed issues
* Changed some files

Use specific descriptions of the actual work performed.

Example:

```md
## Unreleased

### Added

- Added a reusable `ProjectCard` component for the selected work section.

### Changed

- Updated homepage project cards with staggered viewport animations.

### Fixed

- Fixed horizontal overflow on mobile devices.

### Testing

- `npm run lint`
- `npm run type-check`
- `npm run build`
```

Do not create empty changelog categories unless they are needed.

The `CHANGELOG.md` must always accurately reflect the current project history.

## Design

Follow:

docs/02-brand-and-design.md
docs/05-ui-ux-guidelines.md
docs/06-animation-guidelines.md

## Development

Follow:

docs/07-technical-architecture.md
docs/08-development-workflow.md
docs/09-library-and-dependency-management.md

## Quality

Follow:

docs/11-testing-strategy.md

## Version Control

Follow:

docs/12-version-control.md

Before committing:

1. Review the current Git status.
2. Review all changed files.
3. Confirm no secrets are included.
4. Confirm unrelated files were not accidentally changed.
5. Run the required validation.
6. Update `CHANGELOG.md`.

Use descriptive conventional commit messages.

Do not:

* Force push without explicit approval.
* Delete important branches without explicit approval.
* Commit secrets.
* Commit generated or temporary files unless intentionally required.

## Deployment

Follow:

docs/13-vercel-deployment.md

Use Vercel preview deployments before production for significant changes.

Before production deployment:

* Required tests must pass.
* Production build must pass.
* Critical functionality must be verified.
* `CHANGELOG.md` must be updated.

## AI Management

Follow:

docs/14-ai-management-system.md
docs/16-claude-instructions.md

Claude is responsible for maintaining project history through `CHANGELOG.md`.

Every meaningful update must follow this process:

```text
Analyze Change
→ Implement Change
→ Test Change
→ Update Relevant Documentation
→ Update CHANGELOG.md
→ Review Changes
→ Commit
→ Deploy
```

A task must not be considered complete until the relevant validation is complete and the change has been properly recorded in `CHANGELOG.md`.
