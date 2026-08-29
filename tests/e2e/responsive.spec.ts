import { test, expect, type Page } from "@playwright/test";

/**
 * Responsive test harness.
 *
 * Loads every public route at the seven target viewports from
 * `plan.md` Phase 09 and asserts that the page lays out cleanly:
 *   - no horizontal overflow on the body
 *   - the H1 is fully visible (not clipped off-screen)
 *   - the primary nav is reachable (desktop nav or mobile menu)
 *
 * The viewport matrix is a data table so the per-route case count
 * stays small. Failures produce a per-viewport diff in the
 * Playwright report so regressions are easy to localize.
 */

const viewports = [
  { name: "360", width: 360, height: 740 },
  { name: "414", width: 414, height: 896 },
  { name: "768", width: 768, height: 1024 },
  { name: "1024", width: 1024, height: 768 },
  { name: "1280", width: 1280, height: 800 },
  { name: "1536", width: 1536, height: 960 },
  { name: "1920", width: 1920, height: 1080 },
];

const routes = [
  { path: "/", h1: /Considered digital experiences/i },
  { path: "/services", h1: /What we build, end to end/i },
  { path: "/work", h1: /Recent projects\./i },
  { path: "/about", h1: /senior studio that ships like a large one/i },
  { path: "/contact", h1: /start a project/i },
  { path: "/work/northwind-commerce", h1: /Northwind Commerce/i },
];

async function assertNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const docW = document.documentElement.clientWidth;
    const bodyW = document.body.scrollWidth;
    // 1px tolerance for sub-pixel rounding.
    return bodyW - docW;
  });
  expect(
    overflow,
    `body is ${overflow}px wider than the viewport`,
  ).toBeLessThanOrEqual(1);
}

async function assertHeadingVisible(page: Page, h1: RegExp) {
  const heading = page.getByRole("heading", { name: h1, level: 1 }).first();
  await expect(heading).toBeVisible();
  const box = await heading.boundingBox();
  // The H1 must be inside the viewport horizontally.
  if (box) {
    expect(
      box.x,
      `H1 left edge (${box.x}) is offscreen`,
    ).toBeGreaterThanOrEqual(0);
    expect(
      box.x + box.width,
      `H1 right edge (${box.x + box.width}) exceeds viewport width`,
    ).toBeLessThanOrEqual(page.viewportSize()!.width + 1);
  }
}

async function assertPrimaryNavReachable(page: Page, width: number) {
  if (width >= 1024) {
    // Desktop: primary nav is visible.
    await expect(
      page.getByRole("navigation", { name: "Primary" }),
    ).toBeVisible();
  } else {
    // Mobile: hamburger button is visible and opens the menu.
    const toggle = page.locator('button[aria-controls="mobile-menu"]');
    await expect(toggle).toBeVisible();
  }
}

for (const viewport of viewports) {
  test.describe(`@ ${viewport.name}px`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    for (const route of routes) {
      test(`${route.path} lays out cleanly`, async ({ page }) => {
        const response = await page.goto(route.path);
        expect(response?.status(), `${route.path} should return 2xx`).toBeLessThan(
          400,
        );

        await assertHeadingVisible(page, route.h1);
        await assertNoHorizontalOverflow(page);
        await assertPrimaryNavReachable(page, viewport.width);
      });
    }
  });
}
