import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";
import { withSentryConfig } from "@sentry/nextjs";

const baseConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["motion"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

/**
 * Optional bundle analyzer.
 *
 * Set `ANALYZE=true` (e.g. `ANALYZE=true npm run build`) to write
 * `.next/analyze/{client,server}.html` and inspect the per-route
 * bundle. Off by default so production builds stay fast.
 */
const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/**
 * Sentry wrapper.
 *
 * `withSentryConfig` adds:
 *  - source-map upload (when `SENTRY_AUTH_TOKEN` is set)
 *  - automatic instrumentation for Next.js data-fetching methods
 *  - client-side Sentry init via the Sentry Next.js SDK
 *
 * If `SENTRY_DSN` is not set, the SDK still loads but reports
 * are no-ops. Source-map upload only happens when
 * `SENTRY_AUTH_TOKEN` is set, so the build is unaffected in
 * environments without Sentry.
 */
const sentryOptions = {
  // Suppress the Sentry build log when the DSN is not configured.
  // `disableLogger` was renamed to `webpack.treeshake.removeDebugLogging`
  // in @sentry/nextjs 10.x.
  ...(process.env.SENTRY_DSN
    ? {}
    : { webpack: { treeshake: { removeDebugLogging: true } } }),
};

export default withAnalyzer(withSentryConfig(baseConfig, sentryOptions));
