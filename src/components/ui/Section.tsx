import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Section — semantic section wrapper with consistent vertical rhythm.
 *
 * Provides:
 *  - Native `<section>` semantics for landmarks.
 *  - An optional `id` for in-page anchoring from the nav.
 *  - A `tone` switch to alternate background tints.
 *  - Standardized top/bottom padding via the `section-y` token.
 */
export interface SectionProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  tone?: "default" | "muted";
  /** Reduce vertical padding (useful for tight sections). */
  density?: "default" | "tight";
}

export function Section({
  className,
  tone = "default",
  density = "default",
  ...rest
}: SectionProps) {
  return (
    <section
      className={cn(
        density === "default" ? "py-section-y" : "py-16 sm:py-20",
        tone === "muted" && "bg-muted",
        className
      )}
      {...rest}
    />
  );
}
