import { extendTailwindMerge } from "tailwind-merge";

/**
 * Tailwind-merge configuration for Aurwave.
 *
 * `tailwind-merge` collapses utilities from the same group. By default it
 * does not know about the custom tokens defined in `tailwind.config.ts`,
 * so:
 *
 * 1. `text-primary-foreground` and `text-accent-foreground` get collapsed
 *    because the foreground variants of the brand colors are not in
 *    twMerge's color group.
 * 2. The custom font-size scale (`text-body`, `text-display-xl`, etc.)
 *    gets collapsed against `text-*` color classes (and vice versa),
 *    because twMerge does not know `text-body` is a font-size, not a
 *    color.
 *
 * Both cases are fixed below: we list every custom `text-X` token in
 * either the color group (for foreground color tokens) or the font-size
 * group (for our typographic scale), so they coexist with the rest of
 * the utility classes.
 *
 * See: docs/02-brand-and-design.md, docs/07-technical-architecture.md.
 */
export const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // Tell twMerge that our custom foreground colors are text-colors,
      // not font-sizes — so `text-primary-foreground` survives against
      // `text-body` and other `text-*` utilities.
      "text-color": [
        "primary-foreground",
        "accent-foreground",
        "muted-foreground",
      ],
      "font-size": [
        {
          text: [
            "body",
            "body-lg",
            "small",
            "eyebrow",
            "display-2xl",
            "display-xl",
            "display-lg",
            "display-md",
            "h1",
            "h2",
            "h3",
            "h4",
          ],
        },
      ],
    },
  },
});
