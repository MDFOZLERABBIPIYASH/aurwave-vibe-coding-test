"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

/**
 * PageTransition — subtle fade on route changes.
 *
 * Wraps the main content in a fade-in/fade-up. Each route gets a
 * fresh mount (because the wrapper remounts on navigation), so the
 * animation plays once per navigation.
 *
 * Reduced motion: the content renders at its final state with no
 * transform.
 *
 * The animation is intentionally short (~220ms) so it never blocks
 * interaction. We animate `opacity` and `translateY` only — both
 * are GPU-composited properties.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  const variants: Variants = reduced
    ? {
        hidden: { opacity: 1, y: 0 },
        show: { opacity: 1, y: 0, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y: 6 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.22,
            ease: [0.25, 1, 0.5, 1],
          },
        },
      };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={variants}
      className="min-h-[calc(100dvh-4rem)]"
    >
      {children}
    </motion.div>
  );
}
