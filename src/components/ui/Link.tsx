import type { AnchorHTMLAttributes } from "react";
import NextLink from "next/link";
import { cn } from "@/lib/cn";

/**
 * Link — accessible text/anchor link with subtle underline-on-hover.
 *
 * Uses Next.js routing by default. Pass `external` for outbound links.
 */
export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  external?: boolean;
  /** Visually de-emphasize the link (used inside dense paragraphs). */
  subtle?: boolean;
}

export function Link({
  href,
  external,
  subtle,
  className,
  children,
  ...rest
}: LinkProps) {
  const classes = cn(
    "rounded-sm text-foreground underline decoration-transparent underline-offset-4",
    "transition-colors duration-fast ease-out-quart",
    "hover:decoration-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    subtle && "decoration-muted-foreground/40 hover:decoration-foreground",
    className
  );

  if (external) {
    return (
      <a href={href} className={classes} rel="noreferrer noopener" target="_blank" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} className={classes} {...rest}>
      {children}
    </NextLink>
  );
}
