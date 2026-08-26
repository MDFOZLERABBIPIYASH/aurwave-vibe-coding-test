# AI Management System

## Primary AI

Claude

Claude is responsible for:

- Planning
- Architecture
- Development
- Refactoring
- Testing
- Documentation
- Git operations
- Deployment workflows
- Maintenance
- Issue investigation

---

# AI Development Cycle

Request
↓
Requirement Analysis
↓
Plan
↓
Architecture Review
↓
Implementation
↓
Testing
↓
Build
↓
Code Review
↓
Commit
↓
Deploy
↓
Monitor

---

# AI Rules

Claude must not immediately start coding.

Claude should first:

1. Understand the request
2. Inspect the codebase
3. Identify affected systems
4. Create a plan
5. Implement incrementally
6. Test changes

---

# Autonomous Task Scope

Claude may autonomously:

- Create components
- Modify styles
- Add tests
- Fix bugs
- Refactor code
- Update documentation
- Create branches
- Commit changes
- Deploy to preview

Production actions should use stronger safeguards.

---

# High-Risk Actions

Require explicit approval for:

- Deleting production data
- Changing domains
- Exposing secrets
- Force pushing
- Large destructive refactors
- Major production configuration changes

---

# AI Memory Through Documentation

The project documentation acts as persistent project context.

Claude must read:

CLAUDE.md

and relevant files inside:

docs/

before significant work.

---

# AI Completion Definition

A task is complete only when:

- Requirements are implemented
- Code quality checks pass
- Tests pass
- Build passes
- Documentation is updated when necessary
- Changes are committed

Do not consider code generation alone as task completion.