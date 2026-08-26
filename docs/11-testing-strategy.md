# Testing Strategy

## Testing Layers

The project should use:

1. Static checks
2. Unit tests
3. Integration tests
4. End-to-end tests
5. Build validation

---

# Static Checks

Run:

- ESLint
- TypeScript checking
- Formatting checks

---

# Unit Tests

Use Vitest for:

- Utility functions
- Business logic
- Reusable logic

---

# Component Testing

Test important interactive components.

Examples:

- Forms
- Navigation
- Buttons
- Modals

---

# End-to-End Testing

Use Playwright.

Critical flows:

- Homepage loads
- Navigation works
- Mobile navigation works
- Contact form works
- Primary CTA works
- Page has no critical console errors

---

# Responsive Testing

Test common viewport sizes.

At minimum:

- Mobile
- Tablet
- Desktop

---

# Accessibility Testing

Check:

- Keyboard navigation
- Focus states
- Heading hierarchy
- Image alt text
- Form labels
- Color contrast

---

# Required Quality Gate

Before production deployment:

- Lint passes
- Type check passes
- Tests pass
- Build passes
- Critical E2E tests pass