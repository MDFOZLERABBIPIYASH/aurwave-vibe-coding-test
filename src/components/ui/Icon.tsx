import type { SVGProps } from "react";

/**
 * Inline SVG icons. Kept as a small, tree-shakable set so we don't pull
 * in a full icon library. All icons inherit `currentColor` so they pick
 * up the surrounding text color and respect theme switches.
 *
 * See: docs/07-technical-architecture.md (no library unless it solves
 * a real need).
 */

export type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
  title?: string;
};

function baseProps(size: number, title?: string) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": title ? undefined : true,
    role: title ? "img" : undefined,
    focusable: false,
  };
}

export function MenuIcon({ size = 22, title, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size, title)} {...rest}>
      {title ? <title>{title}</title> : null}
      <line x1="4" y1="7" x2="20" y2="7" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
  );
}

export function CloseIcon({ size = 22, title, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size, title)} {...rest}>
      {title ? <title>{title}</title> : null}
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 18, title, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size, title)} {...rest}>
      {title ? <title>{title}</title> : null}
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  );
}

export function ArrowUpRightIcon({ size = 14, title, ...rest }: IconProps) {
  return (
    <svg {...baseProps(size, title)} {...rest}>
      {title ? <title>{title}</title> : null}
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="9 7 17 7 17 15" />
    </svg>
  );
}
