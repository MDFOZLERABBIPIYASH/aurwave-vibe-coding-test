# Development Workflow

## Workflow

Planning
↓
Task Definition
↓
Architecture Review
↓
Implementation
↓
Linting
↓
Type Checking
↓
Testing
↓
Build
↓
Code Review
↓
Commit
↓
Preview Deployment
↓
Production Deployment

---

# Task-Based Development

Every development task should begin with:

- Objective
- Scope
- Acceptance criteria
- Affected files
- Testing requirements

Example:

Objective:
Add the Services section.

Acceptance Criteria:

- Responsive
- Accessible
- Animated
- Reusable components
- No TypeScript errors
- Tested

---

# Development Rule

Claude should not make unrelated changes.

Before implementation, identify:

- Existing patterns
- Existing components
- Existing dependencies

Reuse project patterns whenever possible.

---

# Before Completing a Task

Claude must run:

- Linting
- Type checking
- Relevant tests
- Production build

The task is not complete until checks pass.