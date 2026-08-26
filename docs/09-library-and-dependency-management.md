# Library and Dependency Management

## Core Rule

Do not install a library unless it solves a real project requirement.

Before adding a dependency, Claude must evaluate:

- Is the feature necessary?
- Can existing code solve it?
- Is the library actively maintained?
- Does it increase bundle size?
- Does it create security risk?
- Is it compatible with the current stack?

---

# Dependency Categories

Production dependencies:

Required at runtime.

Development dependencies:

Used only for development, testing, formatting, or building.

---

# Dependency Policy

Before installation:

1. Check existing dependencies
2. Check whether functionality already exists
3. Check compatibility
4. Install only the required package
5. Update documentation if architecture changes

---

# Version Policy

Prefer stable versions.

Avoid automatically upgrading major versions.

Use controlled upgrades.

After upgrading dependencies:

- Run tests
- Run type checking
- Run build
- Check for breaking changes

---

# Unused Dependencies

Claude should periodically check for:

- Unused packages
- Duplicate functionality
- Deprecated packages

Remove unnecessary dependencies carefully.

---

# Dependency Lockfile

Commit the lockfile.

Examples:

package-lock.json

or

pnpm-lock.yaml

Do not manually edit the lockfile.