import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";
export const runtime = "edge";

/**
 * Dynamic favicon.
 *
 * Renders the Aurwave mark as a 32×32 PNG at build time and serves
 * it from `/icon`. The same path is picked up by Next.js as the
 * default `<link rel="icon">`, so we don't need to wire it up in
 * the root layout.
 *
 * Uses the same SVG geometry as `public/icons/aurwave-mark.svg`.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#0a0a0a",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="26"
          height="26"
          fill="none"
        >
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
      </div>
    ),
    { ...size },
  );
}
