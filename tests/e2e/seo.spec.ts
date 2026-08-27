import { test, expect } from "@playwright/test";

/**
 * SEO surface — favicon, sitemap, robots.
 *
 * Verifies that the metadata-route system picked up the Phase 08
 * additions and serves real content at the expected paths.
 */
test.describe("SEO surface", () => {
  test("favicon is served from /icon", async ({ request }) => {
    const response = await request.get("/icon");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toMatch(/image\//);
  });

  test("robots.txt is served with the right allow/disallow", async ({
    request,
  }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toMatch(/User-Agent:\s*\*/i);
    expect(body).toMatch(/Disallow:\s*\/dev\//i);
    expect(body).toMatch(/Sitemap:\s*.*sitemap\.xml/i);
  });

  test("sitemap.xml lists every public route including /work/[slug]", async ({
    request,
  }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);
    const body = await response.text();
    expect(body).toMatch(/<urlset/);
    // Static routes — the sitemap emits absolute URLs built from the
    // site's `metadataBase`, so we match the path suffix.
    for (const path of ["/", "/services", "/work", "/about", "/contact"]) {
      expect(body).toContain(`<loc>http://localhost:3000${path}</loc>`);
    }
    // Project slugs from the catalog
    for (const slug of [
      "northwind-commerce",
      "lumen-marketing",
      "harbor-financial",
      "atlas-archive",
      "verdant-goods",
      "mosaic-rebrand",
    ]) {
      expect(body).toContain(`/work/${slug}`);
    }
  });
});

test.describe("Logo", () => {
  test("the home page renders the brand wordmark in the header", async ({
    page,
  }) => {
    await page.goto("/");
    const logo = page.getByRole("img", { name: /aurwave home/i }).first();
    await expect(logo).toBeVisible();
  });
});
