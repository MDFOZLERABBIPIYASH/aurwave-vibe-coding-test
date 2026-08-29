"use client";

import { motion, useReducedMotion, type Variants, type MotionProps } from "motion/react";
import type { ReactNode, ElementType } from "react";
import { cn } from "@/lib/cn";

/**
 * Reveal — viewport-triggered entrance animation.
 *
 * Defaults to a subtle fade + small upward translate (per docs/06). When
 * `prefers-reduced-motion` is set, motion is suppressed and the content is
 * rendered in its final position with no transform.
 *
 * Use `delay` to stagger siblings or `y` to control travel distance.
 *
 * `as` lets callers pick a different host element (e.g. `dt`, `dd`, `li`)
 * when the parent semantic requires the reveal to be a direct child.
 */
export interface RevealProps extends Omit<MotionProps, "initial" | "animate" | "whileInView" | "variants"> {
  children: ReactNode;
  /** Delay in seconds before the entrance plays. */
  delay?: number;
  /** Vertical offset to translate from, in pixels. */
  y?: number;
  /** Duration in seconds. */
  duration?: number;
  /** Once-only playback (default true). */
  once?: boolean;
  className?: string;
  /** Render as a different element. Default "div". */
  as?: ElementType;
}

export function Reveal({
  children,
  delay = 0,
  y = 12,
  duration = 0.5,
  once = true,
  className,
  as = "div",
  ...rest
}: RevealProps) {
  const reduced = useReducedMotion();

  const variants: Variants = reduced
    ? {
        hidden: { opacity: 1, y: 0 },
        show: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration,
            delay,
            ease: [0.25, 1, 0.5, 1], // ease-out-quart
          },
        },
      };

  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      variants={variants}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
