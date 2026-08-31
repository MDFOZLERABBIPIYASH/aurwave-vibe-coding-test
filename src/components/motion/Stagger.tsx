"use client";

import { m, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Stagger — viewport-triggered entrance for a list of children.
 *
 * Use this to coordinate a sequence of `<Reveal>` blocks (or plain
 * `<m.*>` elements) so they enter with a small offset. Children
 * can be anything; the container just propagates the `initial` /
 * `animate` state via Framer Motion's `staggerChildren` orchestration.
 *
 * Reduced motion: each child renders immediately at its final state
 * with no transform.
 *
 * @example
 *   <Stagger>
 *     <Reveal as="li">…</Reveal>
 *     <Reveal as="li">…</Reveal>
 *   </Stagger>
 */
export interface StaggerProps {
  children: ReactNode;
  /** Seconds between each child entering. Default 0.06. */
  step?: number;
  /** Initial delay before the first child enters. Default 0. */
  delay?: number;
  className?: string;
  /** Once-only playback. Default true. */
  once?: boolean;
}

export function Stagger({
  children,
  step = 0.06,
  delay = 0,
  className,
  once = true,
}: StaggerProps) {
  const reduced = useReducedMotion();

  const variants: Variants = reduced
    ? {
        hidden: { opacity: 1 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0, delayChildren: 0 },
        },
      }
    : {
        hidden: {},
        show: {
          transition: {
            staggerChildren: step,
            delayChildren: delay,
          },
        },
      };

  return (
    <m.div
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      variants={variants}
    >
      {children}
    </m.div>
  );
}
