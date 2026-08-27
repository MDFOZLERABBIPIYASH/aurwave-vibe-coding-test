import { type ClassValue } from "clsx";
import { cn } from "@/lib/cn";

/**
 * Tailwind-aware `cn` re-exported here for convenience inside the UI layer.
 * Same identity as `@/lib/cn` so tests can assert referential equality.
 */
export { cn };

/**
 * A variant map: `{ variantKey: { optionKey: className } }`.
 * Index signatures are intentionally permissive so strongly-typed literal
 * maps passed in by callers satisfy the constraint without `as` casts.
 */
export type VariantMap = {
  [variantKey: string]: { [optionKey: string]: string };
};

/**
 * Lightweight variant helper. Avoids adding `class-variance-authority`
 * by composing a plain object of variant → class map with `cn`.
 *
 * @example
 *   const button = variants({
 *     base: "inline-flex items-center justify-center rounded font-medium",
 *     variants: {
 *       intent: { primary: "bg-primary text-primary-foreground", secondary: "bg-transparent border" },
 *       size:   { md: "h-10 px-4 text-body", sm: "h-8 px-3 text-small" },
 *     },
 *     defaultVariants: { intent: "primary", size: "md" },
 *   });
 *   button({ intent: "secondary" }) // → merged class string
 */
export type VariantsConfig<V extends VariantMap> = {
  base?: ClassValue;
  variants: V;
  defaultVariants?: { [K in keyof V]?: string };
};

export type VariantProps<V extends VariantMap> = {
  [K in keyof V]?: string;
};

export function variants<V extends VariantMap>(
  config: VariantsConfig<V>
): (props?: VariantProps<V> & { className?: ClassValue }) => string {
  return (props = {}) => {
    const { base, variants: variantMap, defaultVariants } = config;
    const merged: ClassValue[] = [base];

    for (const key of Object.keys(variantMap)) {
      const fallback = defaultVariants?.[key];
      const chosen = (props as VariantProps<V>)[key] ?? fallback;
      if (chosen) {
        const className = variantMap[key]?.[chosen];
        if (className) merged.push(className);
      }
    }

    if (props.className) merged.push(props.className);

    return cn(...merged);
  };
}
