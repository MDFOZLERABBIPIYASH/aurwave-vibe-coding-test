import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { variants } from "@/lib/variants";

/**
 * Button / link primitive.
 *
 * Renders an <a> when `href` is supplied (with Next.js client-side routing via
 * `next/link`), otherwise a real <button>. Variants follow the docs/02 brand
 * guidelines: primary, secondary, ghost.
 *
 * Always renders with a visible focus ring via the global :focus-visible rule.
 * Animations are subtle — color/opacity/transform only — and respect
 * prefers-reduced-motion through globals.css.
 */

const buttonStyles = variants({
  base: cn(
    "inline-flex items-center justify-center gap-2 rounded-md font-medium",
    "transition-colors transition-transform duration-fast ease-out-quart",
    "select-none whitespace-nowrap",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50"
  ),
  variants: {
    intent: {
      primary:
        "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/95",
      secondary:
        "border border-border bg-transparent text-foreground hover:bg-muted active:bg-muted/80",
      ghost:
        "bg-transparent text-foreground hover:bg-muted active:bg-muted/80",
    },
    size: {
      sm: "h-9 px-4 text-small",
      md: "h-11 px-5 text-body",
      lg: "h-12 px-6 text-body",
    },
  },
  defaultVariants: { intent: "primary", size: "md" },
});

type Intent = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  intent?: Intent;
  size?: Size;
  href?: undefined;
};

export type ButtonLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> & {
  intent?: Intent;
  size?: Size;
  href: string;
  /** When true, render an external <a> and skip Next.js routing. */
  external?: boolean;
};

export type AnyButtonProps = ButtonProps | ButtonLinkProps;

function isLinkProps(
  props: AnyButtonProps
): props is ButtonLinkProps {
  return typeof (props as ButtonLinkProps).href === "string";
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, AnyButtonProps>(
  function Button(props, ref) {
    const { className, intent, size, ...rest } = props as AnyButtonProps & {
      intent?: Intent;
      size?: Size;
    };

    const classes = buttonStyles({ intent, size, className });

    if (isLinkProps(props as AnyButtonProps)) {
      const { href, external, ...anchorRest } = rest as Omit<
        AnchorHTMLAttributes<HTMLAnchorElement>,
        "href"
      > & { href: string; external?: boolean };
      if (external) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            className={classes}
            {...anchorRest}
          />
        );
      }
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...anchorRest}
        />
      );
    }

    const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={buttonRest.type ?? "button"}
        className={classes}
        {...buttonRest}
      />
    );
  }
);
