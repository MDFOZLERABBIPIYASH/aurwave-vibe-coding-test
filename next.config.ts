import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

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

export default withAnalyzer(baseConfig);
