import { createElement, type ElementType, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Text — semantic body copy primitive.
 *
 * Use for paragraphs and supporting text. `as` controls the tag (default `p`)
 * and `variant` controls the size scale defined in tailwind.config.ts.
 */
export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: "body-lg" | "body" | "small";
  tone?: "default" | "muted";
}

const variantClass: Record<NonNullable<TextProps["variant"]>, string> = {
  "body-lg": "text-body-lg",
  body: "text-body",
  small: "text-small",
};

export function Text({
  as,
  variant = "body",
  tone = "default",
  className,
  ...rest
}: TextProps) {
  const Tag = as ?? "p";
  return createElement(Tag, {
    className: cn(
      variantClass[variant],
      tone === "muted" ? "text-muted-foreground" : "text-foreground",
      "max-w-[65ch] text-pretty",
      className
    ),
    ...rest,
  });
}
