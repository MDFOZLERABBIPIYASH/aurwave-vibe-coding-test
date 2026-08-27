import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * Container — max-width wrapper with consistent horizontal padding.
 * Anchors to the Tailwind `container` settings defined in tailwind.config.ts.
 *
 * Use this for any content that should align to the grid max-width.
 */
export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Remove horizontal padding (useful for full-bleed sections). */
  bleed?: boolean;
}

export function Container({ className, bleed, ...rest }: ContainerProps) {
  return (
    <div
      className={cn("container w-full", !bleed && "container-px", className)}
      {...rest}
    />
  );
}
