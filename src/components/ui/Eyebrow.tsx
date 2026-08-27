import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Eyebrow — small uppercase label that introduces a section.
 * Follows docs/05-ui-ux-guidelines.md hierarchy pattern.
 */
export function Eyebrow({ className, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "text-eyebrow uppercase tracking-[0.18em] text-muted-foreground",
        className
      )}
      {...rest}
    />
  );
}
