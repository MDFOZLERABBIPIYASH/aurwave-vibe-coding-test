"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { useMemo } from "react";
import { cn } from "@/lib/cn";

/**
 * TextReveal — animate text with a per-word stagger.
 *
 * Splits the text on whitespace and reveals each word with a small
 * upward translate + opacity. Per `docs/06-animation-guidelines.md`
 * this is reserved for hero headlines and major section H2s — do not
 * use it on every paragraph.
 *
 * Reduced motion: renders the full string at once with no transform.
 *
 * The component is inline-flex so the wrapped words keep their
 * natural spacing and the line breaks fall where the original text
 * breaks.
 */
export interface TextRevealProps {
  text: string;
  /** Seconds between each word entering. Default 0.04. */
  step?: number;
  /** Initial delay. Default 0. */
  delay?: number;
  /** Duration of each word's animation. Default 0.5. */
  duration?: number;
  /** HTML tag to render. Default "span". */
  as?: "span" | "h1" | "h2" | "h3" | "p";
  className?: string;
  /** Vertical offset to translate from, in pixels. Default 14. */
  y?: number;
  /** Once-only playback. Default true. */
  once?: boolean;
}

export function TextReveal({
  text,
  step = 0.04,
  delay = 0,
  duration = 0.5,
  as = "span",
  className,
  y = 14,
  once = true,
}: TextRevealProps) {
  const reduced = useReducedMotion();
  const words = useMemo(() => text.split(/(\s+)/), [text]);

  const containerVariants: Variants = reduced
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
          transition: { staggerChildren: step, delayChildren: delay },
        },
      };

  const wordVariants: Variants = reduced
    ? {
        hidden: { opacity: 1, y: 0 },
        show: { opacity: 1, y: 0, transition: { duration: 0 } },
      }
    : {
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration, ease: [0.25, 1, 0.5, 1] },
        },
      };

  const Tag = as as keyof React.JSX.IntrinsicElements;

  return (
    <motion.span
      // @ts-expect-error — `as` is a constrained string; JSX type
      // inference is broader than our prop allows.
      as={Tag}
      className={cn("inline-block", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      variants={containerVariants}
      // `role="text"` makes `aria-label` valid on a generic <span>;
      // it also tells assistive tech to read the label as a single
      // string instead of walking the individual word children
      // (which are aria-hidden so they animate independently).
      role="text"
      aria-label={text}
    >
      {words.map((word, i) =>
        // Whitespace stays as a literal text node so the browser
        // collapses it the way it would in normal text.
        /^\s+$/.test(word) ? (
          <span key={i}>{word}</span>
        ) : (
          <motion.span
            key={i}
            variants={wordVariants}
            className="inline-block"
            aria-hidden
          >
            {word}
          </motion.span>
        ),
      )}
    </motion.span>
  );
}
