import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/**
 * robots.txt.
 *
 * Allows the entire site to be crawled and points crawlers at the
 * sitemap. The `/dev/components` route is dev-only and excluded
 * here — Next.js's app-router metadata-route system serves this at
 * `/robots.txt`.
 */
export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url.replace(/\/$/, "");
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dev/", "/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
