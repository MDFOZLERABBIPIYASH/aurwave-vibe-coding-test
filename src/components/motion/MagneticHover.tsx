"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * MagneticHover — subtle pull-toward-cursor effect.
 *
 * The wrapped element translates a few pixels toward the pointer
 * while the cursor is on it, and springs back when the cursor
 * leaves. Use sparingly — reserved for the primary CTA on the
 * homepage hero and any other high-priority interactive element
 * that warrants the extra attention.
 *
 * Reduced motion: the element renders statically (no transform).
 *
 * Implementation notes:
 *  - We measure the pointer's position relative to the element's
 *    center and scale the offset to a small max (`max: 6px`).
 *  - The element is wrapped in a `motion.div` so the rest of the
 *    layout is unaffected.
 *  - The inner content keeps its own positioning so the host's
 *    display/alignment doesn't break.
 */
export interface MagneticHoverProps {
  children: ReactNode;
  /** Maximum translation in pixels. Default 6. */
  max?: number;
  className?: string;
}

export function MagneticHover({
  children,
  max = 6,
  className,
}: MagneticHoverProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  if (reduced) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        el.style.setProperty(
          "--magnetic-x",
          `${Math.max(-1, Math.min(1, dx)) * max}px`,
        );
        el.style.setProperty(
          "--magnetic-y",
          `${Math.max(-1, Math.min(1, dy)) * max}px`,
        );
      }}
      onMouseLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.style.setProperty("--magnetic-x", "0px");
        el.style.setProperty("--magnetic-y", "0px");
      }}
      style={{
        // CSS custom properties drive the actual transform so the
        // transition stays in CSS and benefits from GPU compositing.
        transform:
          "translate3d(var(--magnetic-x, 0), var(--magnetic-y, 0), 0)",
        transition: "transform 200ms cubic-bezier(0.25, 1, 0.5, 1)",
      }}
    >
      {children}
    </motion.div>
  );
}
