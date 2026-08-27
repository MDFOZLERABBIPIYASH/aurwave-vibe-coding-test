import type { SVGProps } from "react";
import { cn } from "@/lib/cn";

/**
 * Logo — inline-SVG component for the Aurwave brand mark and wordmark.
 *
 * Two variants:
 *  - `mark`: the icon-only mark (used for favicon, social cards,
 *    inline next to the wordmark in the header at very small sizes).
 *  - `wordmark`: the horizontal lockup of mark + "Aurwave" text.
 *
 * Both inherit `currentColor` so the same component renders in light
 * and dark themes without separate files. The SVGs are inlined (not
 * loaded as files) so they can be themed and don't add a network
 * request.
 *
 * Source files live in `public/icons/aurwave-mark.svg` and
 * `public/icons/aurwave-logo.svg` for download and reuse. Keep the
 * inline copy in sync with the public files.
 */
export type LogoProps = SVGProps<SVGSVGElement> & {
  variant?: "mark" | "wordmark";
  /** Width in pixels; height scales to preserve aspect ratio. */
  width?: number;
  className?: string;
  title?: string;
};

export function Logo({
  variant = "wordmark",
  width,
  className,
  title,
  ...rest
}: LogoProps) {
  if (variant === "mark") {
    return <Mark width={width} className={className} title={title} {...rest} />;
  }
  return (
    <Wordmark
      width={width}
      className={className}
      title={title ?? "Aurwave"}
      {...rest}
    />
  );
}

function Mark({
  width = 32,
  className,
  title,
  ...rest
}: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      width={width}
      height={width}
      role={title ? "img" : undefined}
      aria-label={title ?? "Aurwave mark"}
      aria-hidden={title ? undefined : true}
      className={cn("inline-block", className)}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M16 5 L26 25 L22.7 25 L20.5 20 L11.5 20 L9.3 25 L6 25 Z M13 17 L19 17 L16 10.4 Z"
        fill="currentColor"
      />
      <path
        d="M4 28 Q 8 25.5, 12 28 T 20 28 T 28 28"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

function Wordmark({
  width = 160,
  className,
  title,
  ...rest
}: LogoProps) {
  // viewBox is 200x40 (5:1). Height is derived.
  const height = Math.round(width * 0.2);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 40"
      fill="none"
      width={width}
      height={height}
      role="img"
      aria-label={title ?? "Aurwave"}
      className={cn("inline-block", className)}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      <g transform="translate(0, 4)">
        <path
          d="M20 2 L33 32 L28.6 32 L25.6 25.5 L14.4 25.5 L11.4 32 L7 32 Z M16.4 21.5 L23.6 21.5 L20 13.1 Z"
          fill="currentColor"
        />
        <path
          d="M2 36 Q 7.5 32.5, 13 36 T 23 36 T 33 36"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
      </g>
      <text
        x="48"
        y="29"
        fontFamily="Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
        fontSize="22"
        fontWeight={600}
        letterSpacing="-0.02em"
        fill="currentColor"
      >
        Aurwave
      </text>
    </svg>
  );
}
