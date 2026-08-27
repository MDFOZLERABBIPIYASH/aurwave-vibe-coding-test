import { createElement, type ElementType, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Heading — typed polymorphic component with the brand typography scale.
 *
 * `display` maps to the large hero/eyebrow-friendly sizes defined in
 * tailwind.config.ts. `as` lets callers pick the semantic tag while the
 * visual style stays consistent.
 */
export type HeadingTone = "default" | "muted";

export interface HeadingProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: "display-xl" | "display-lg" | "display-md" | "h1" | "h2" | "h3" | "h4";
  tone?: HeadingTone;
}

const variantClass: Record<NonNullable<HeadingProps["variant"]>, string> = {
  "display-xl": "text-display-xl font-display font-semibold tracking-tight",
  "display-lg": "text-display-lg font-display font-semibold tracking-tight",
  "display-md": "text-display-md font-display font-semibold tracking-tight",
  h1: "text-h1 font-display font-semibold tracking-tight",
  h2: "text-h2 font-display font-semibold tracking-tight",
  h3: "text-h3 font-display font-semibold tracking-tight",
  h4: "text-h4 font-display font-medium tracking-tight",
};

// Default tag per variant — keeps semantics correct without callers having
// to specify `as` explicitly.
const defaultTag: Record<NonNullable<HeadingProps["variant"]>, ElementType> = {
  "display-xl": "h1",
  "display-lg": "h1",
  "display-md": "h2",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h3",
};

export function Heading({
  as,
  variant = "h2",
  tone = "default",
  className,
  ...rest
}: HeadingProps) {
  const Tag = as ?? defaultTag[variant];
  return createElement(
    Tag,
    {
      className: cn(
        variantClass[variant],
        tone === "muted" ? "text-muted-foreground" : "text-foreground",
        "max-w-[60ch] text-balance",
        className
      ),
      ...rest,
    }
  );
}
