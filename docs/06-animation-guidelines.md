# Aurwave Animation Guidelines

## Animation Philosophy

Animation is mandatory.

However, animation must feel:

- Intentional
- Smooth
- Professional
- Controlled
- Fast enough
- Subtle

Animation should never feel like decoration for its own sake.

---

# Primary Animation Types

## Entrance Animation

Used when sections enter the viewport.

Examples:

- Fade up
- Small vertical movement
- Staggered reveal

Avoid dramatic movement.

---

# Text Reveal

Use selectively for:

- Hero headline
- Major section headings
- Important statements

Do not animate every paragraph.

---

# Hover Animation

Use subtle feedback for:

- Buttons
- Links
- Project cards
- Navigation

Examples:

- Small translation
- Opacity change
- Underline movement
- Image scale

---

# Scroll Animation

Scroll animations should:

- Be lightweight
- Trigger once when appropriate
- Avoid excessive movement
- Not block scrolling

Do not create scroll-jacking.

---

# Timing

Recommended animation duration:

Fast:
150ms to 250ms

Standard:
300ms to 500ms

Complex:
500ms to 800ms maximum

Avoid unnecessarily slow animation.

---

# Easing

Use natural easing.

Preferred:

- ease-out for entrances
- ease-in-out for transitions

Avoid aggressive bounce effects unless specifically appropriate.

---

# Performance

Animations should prioritize:

- transform
- opacity

Avoid animating expensive properties when possible.

---

# Reduced Motion

Support:

prefers-reduced-motion

When reduced motion is enabled:

- Remove non-essential motion
- Reduce transform animation
- Preserve functional transitions where necessary

---

# Animation Rule

If an animation does not improve:

- Hierarchy
- Feedback
- Storytelling
- Orientation

Do not use it.