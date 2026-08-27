/**
 * Project catalog — single source of truth for the Work index and the
 * `/work/[slug]` detail pages.
 *
 * Per `plan.md` Phase 08, real projects (with case study copy, hero
 * images, gallery) will replace these placeholders before launch. The
 * shape of the data is locked in here so the rest of the site can be
 * built against the real contract today.
 */

export type ProjectCategory = "web" | "ecommerce" | "brand";

export type ProjectMetric = {
  label: string;
  value: string;
};

export type Project = {
  slug: string;
  name: string;
  industry: string;
  /** Short pitch used on the index card. */
  summary: string;
  /** Optional longer description for the detail page. */
  description: string;
  category: ProjectCategory;
  services: string[];
  /** Tailwind gradient classes for the visual preview. */
  accent: string;
  /** Detail page content. */
  problem: string;
  approach: string;
  results: string;
  metrics?: ProjectMetric[];
  /** Year the project shipped — used for sort + detail meta. */
  year: number;
  /** Optional client name, if different from the project name. */
  client?: string;
};

export const projects: Project[] = [
  {
    slug: "northwind-commerce",
    name: "Northwind Commerce",
    client: "Northwind",
    industry: "E-commerce",
    summary:
      "A headless storefront rebuild that doubled mobile conversion and shipped in eight weeks.",
    description:
      "Northwind's existing storefront was a slow, brittle Magento theme. We rebuilt it on Next.js with a headless Shopify backend, edge-cached PDPs, and a checkout that respected the cart state across devices.",
    category: "ecommerce",
    services: ["Web Design", "Web Development", "Performance"],
    accent: "from-muted to-muted/40",
    problem:
      "Mobile conversion was leaking badly. The existing stack had a 4.1s LCP on the PDP and a 28% checkout abandonment rate attributed to the mobile flow.",
    approach:
      "We rebuilt the storefront on Next.js with a headless Shopify backend, edge-cached catalog pages, and a single-page checkout that preserved cart state across devices. Design and engineering worked in the same Figma file so the system stayed in sync as the build progressed.",
    results:
      "Mobile LCP dropped from 4.1s to 1.3s. Mobile conversion doubled in the first month. Checkout abandonment fell 18%.",
    metrics: [
      { label: "Mobile LCP", value: "1.3s" },
      { label: "Mobile CVR", value: "2.1×" },
      { label: "Abandonment", value: "−18%" },
    ],
    year: 2025,
  },
  {
    slug: "lumen-marketing",
    name: "Lumen Marketing",
    client: "Lumen",
    industry: "B2B SaaS",
    summary:
      "A brand site and design system that finally matched the quality of the product underneath.",
    description:
      "Lumen had a great product and an outdated marketing site. We redesigned the site around the way their buyers actually evaluate tools, and shipped a typed design system the marketing team could extend without a developer.",
    category: "web",
    services: ["UI/UX", "Web Design", "Web Development"],
    accent: "from-muted/60 to-muted/20",
    problem:
      "The marketing site read like a brochure — long blocks of copy, no hierarchy, no path from landing to demo request. The design system was inconsistent across pages, and the marketing team couldn't ship a new page without engineering.",
    approach:
      "We interviewed four buyers and mapped their evaluation journey, then redesigned the IA around that. A typed design system (React + tokens) gave marketing a self-serve pattern library without compromising visual consistency.",
    results:
      "Time to publish a new landing page dropped from two weeks to two days. Demo requests up 64% in the quarter after launch.",
    metrics: [
      { label: "Demo requests", value: "+64%" },
      { label: "Time to ship a page", value: "2 days" },
      { label: "Lighthouse Perf", value: "98" },
    ],
    year: 2025,
  },
  {
    slug: "harbor-financial",
    name: "Harbor Financial",
    client: "Harbor",
    industry: "Fintech",
    summary:
      "Performance-first marketing site. 100 Lighthouse, sub-second LCP on every page.",
    description:
      "Harbor's marketing site was a marketing liability: slow, dated, and not reflecting the technical depth of the product. We rebuilt it as a fast, content-driven site with a 100 Lighthouse score and a strict performance budget on every commit.",
    category: "web",
    services: ["Web Development", "Performance"],
    accent: "from-muted/40 to-muted/70",
    problem:
      "Every page failed Core Web Vitals on mobile. Marketing was unable to ship content updates without a developer. The brand felt a step behind the product.",
    approach:
      "A static-first Next.js build with edge-rendered forms, image AVIF, and a CI step that fails any PR pushing the bundle over budget. A typed MDX-based content layer lets marketing publish without touching the codebase.",
    results:
      "100 Lighthouse across the board. Sub-second LCP on every page. Marketing now ships 3-4 updates per week without engineering.",
    metrics: [
      { label: "Lighthouse", value: "100" },
      { label: "LCP (p75)", value: "0.8s" },
      { label: "CLS", value: "0" },
    ],
    year: 2024,
  },
  {
    slug: "atlas-archive",
    name: "Atlas Archive",
    client: "Atlas",
    industry: "Cultural",
    summary:
      "A digital archive for a regional museum — readable, searchable, and kind to slow connections.",
    description:
      "Atlas needed a public archive that could host 12,000+ catalog records without melting under their existing traffic spikes. We built a content-first site with aggressive caching and a faceted search experience.",
    category: "web",
    services: ["Web Design", "Web Development"],
    accent: "from-muted/30 to-muted/60",
    problem:
      "The existing archive was a 12-year-old PHP site that buckled under traffic during the museum's quarterly free-admission weekends. Search was effectively broken; the page weight was north of 8MB.",
    approach:
      "Static-first Next.js with on-demand ISR for catalog updates, edge-search powered by a hosted search API, and an aggressive image strategy (AVIF + responsive + lazy).",
    results:
      "Page weight down 92%. Search p95 under 200ms. Traffic spikes now invisible — the site serves 30× its previous peak with the same infra.",
    metrics: [
      { label: "Page weight", value: "−92%" },
      { label: "Search p95", value: "180ms" },
      { label: "Peak capacity", value: "30×" },
    ],
    year: 2024,
  },
  {
    slug: "verdant-goods",
    name: "Verdant Goods",
    client: "Verdant",
    industry: "E-commerce",
    summary:
      "Brand identity and Shopify Hydrogen storefront for a homewares startup.",
    description:
      "Verdant launched a new line of sustainable homewares and needed a brand and storefront that would read as premium, not precious. We worked end to end from naming support through the first 90 days of sales.",
    category: "ecommerce",
    services: ["UI/UX", "Web Design", "Web Development"],
    accent: "from-muted/50 to-muted/20",
    problem:
      "Verdant had a product line and a thesis, but no visual identity and no commerce platform. They needed a brand and a storefront they could actually ship in 10 weeks.",
    approach:
      "We led a fast discovery cycle, then a single tightly-scoped design sprint that delivered the brand and the storefront in tandem. Shopify Hydrogen under the hood, with a small, deliberately calm component library.",
    results:
      "Shipped on day one of the launch window. First 90 days: 2.4× the projected revenue. Brand NPS measured at 71 in the first quarter.",
    metrics: [
      { label: "Time to launch", value: "10 weeks" },
      { label: "First 90d revenue", value: "2.4× target" },
      { label: "Brand NPS", value: "71" },
    ],
    year: 2025,
  },
  {
    slug: "mosaic-rebrand",
    name: "Mosaic Rebrand",
    client: "Mosaic",
    industry: "Brand",
    summary:
      "A complete brand refresh for a 40-person B2B consultancy — identity, voice, and website.",
    description:
      "Mosaic had outgrown their original brand. We refreshed the identity, the voice, and the website in a single engagement, then handed the marketing team a system they could actually run.",
    category: "brand",
    services: ["Web Design", "Web Development"],
    accent: "from-muted/40 to-muted/30",
    problem:
      "The brand had drifted from the work. Visual identity, copy voice, and the website all told slightly different stories — and none of them matched the way the leadership team actually described the work.",
    approach:
      "We ran a two-week discovery, then delivered a brand book, a Figma-based design system, and a static Next.js website in eight weeks. The marketing team received a full handoff with documentation, Loom walkthroughs, and a 30-day support window.",
    results:
      "Inbound qualified leads up 41% in the quarter after launch. Sales calls now open with the prospect referencing the new site.",
    metrics: [
      { label: "Qualified leads", value: "+41%" },
      { label: "Brand recall", value: "Strong" },
      { label: "Time to launch", value: "8 weeks" },
    ],
    year: 2024,
  },
];

/** Lookup a single project by slug. */
export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Slugs of all projects, for `generateStaticParams`. */
export function allProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}

/** Distinct categories, for the filter UI. */
export const projectCategories: { value: "all" | ProjectCategory; label: string }[] = [
  { value: "all", label: "All work" },
  { value: "web", label: "Web" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "brand", label: "Brand" },
];

/** Filter projects by category. `"all"` returns the unfiltered list. */
export function filterProjects(
  list: Project[],
  category: "all" | ProjectCategory,
): Project[] {
  if (category === "all") return list;
  return list.filter((p) => p.category === category);
}

/** Sort comparator — newest first. */
export function sortByYearDesc(a: Project, b: Project): number {
  return b.year - a.year;
}

/** Return a new array sorted by year, newest first. */
export function sortProjects(list: Project[]): Project[] {
  return [...list].sort(sortByYearDesc);
}
