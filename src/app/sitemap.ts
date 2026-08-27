import type { MetadataRoute } from "next";
import { allProjectSlugs } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

/**
 * Sitemap.
 *
 * Served at `/sitemap.xml` by Next.js's App Router metadata-file
 * convention. Lists every public route, including the six
 * `/work/[slug]` pages that are SSG-rendered. We do not include
 * `/dev/components`, `/privacy`, or `/terms` for now — those are
 * either dev-only or placeholders and don't need to rank.
 *
 * `metadataBase` is inherited from `app/layout.tsx`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/work`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = allProjectSlugs().map(
    (slug) => ({
      url: `${base}/work/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );

  return [...staticRoutes, ...projectRoutes];
}
