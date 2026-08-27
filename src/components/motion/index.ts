/**
 * Barrel export for motion helpers.
 *
 * Every helper in this folder respects `prefers-reduced-motion` by
 * short-circuiting to a static render. They are the only sanctioned
 * way to add motion to the site — see docs/06-animation-guidelines.md
 * for the rules around entrance, hover, and scroll animation.
 */
export { Reveal } from "@/components/ui/Reveal";
export type { RevealProps } from "@/components/ui/Reveal";

export { Stagger } from "./Stagger";
export type { StaggerProps } from "./Stagger";

export { TextReveal } from "./TextReveal";
export type { TextRevealProps } from "./TextReveal";

export { MagneticHover } from "./MagneticHover";
export type { MagneticHoverProps } from "./MagneticHover";

export { PageTransition } from "./PageTransition";
