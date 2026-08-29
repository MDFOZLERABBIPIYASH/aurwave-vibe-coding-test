import { test, expect } from "@playwright/test";
import { runAxe, summarize } from "./helpers/axe";

/**
 * WCAG 2.2 AA — axe-core audit on every public route.
 *
 * Fails on any `critical` or `serious` violation. `moderate` and
 * `minor` violations are listed but don't fail the test (they go
 * in a follow-up file). The set of rules comes from the WCAG 2.0,
 * 2.1, and 2.2 Level A + AA tags.
 */
const routes = [
  "/",
  "/services",
  "/work",
  "/work/northwind-commerce",
  "/about",
  "/contact",
];

for (const route of routes) {
  test(`axe: ${route} has no critical or serious WCAG 2.2 AA violations`, async ({
    page,
  }) => {
    await page.goto(route);
    // Wait for the page to settle: page transition + per-word
    // TextReveal entrance on the hero/section H2s. The
    // `motion-reduced` test runs faster, but in the default
    // config we give every animation a full second.
    await page.waitForTimeout(1200);

    const violations = await runAxe(page);
    const blockers = violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );
    const others = violations.filter(
      (v) => v.impact !== "critical" && v.impact !== "serious",
    );

    if (others.length > 0) {
      console.log(
        `[axe:${route}] ${others.length} non-blocking violation(s):`,
        others.map(summarize).join("\n  "),
      );
    }
    expect(
      blockers,
      `axe found ${blockers.length} blocking violation(s) on ${route}:\n  ${blockers.map(summarize).join("\n  ")}`,
    ).toEqual([]);
  });
}

/**
 * Skip-to-content link — the first Tab from a fresh page load
 * should focus the skip link, and activating it should move focus
 * to the `<main>` element.
 */
test("skip-to-content link is reachable and works", async ({ page }) => {
  await page.goto("/");
  // The first focusable element should be the skip link.
  await page.keyboard.press("Tab");
  const focused = await page.evaluate(
    () => document.activeElement?.textContent ?? "",
  );
  expect(focused).toMatch(/skip to content/i);

  // Activating it jumps to <main>.
  await page.keyboard.press("Enter");
  const mainId = await page.evaluate(
    () => document.activeElement?.id ?? "",
  );
  expect(mainId).toBe("main");
});

/**
 * Heading hierarchy — every page has exactly one `<h1>`, and the
 * headings do not skip levels (h1 → h3 with no h2 in between).
 */
for (const route of routes) {
  test(`headings: ${route} has one h1 and a valid hierarchy`, async ({
    page,
  }) => {
    await page.goto(route);
    await page.waitForTimeout(200);

    const headings = await page.evaluate(() => {
      return Array.from(
        document.querySelectorAll("h1, h2, h3, h4, h5, h6"),
      ).map((el) => Number(el.tagName.slice(1)));
    });

    const h1Count = headings.filter((l) => l === 1).length;
    expect(h1Count, `${route} should have exactly one <h1>`).toBe(1);

    // No level skips. A heading at level N may not be followed
    // (eventually) by a heading at level > N+1.
    let prev = 1;
    for (const level of headings) {
      if (level > prev + 1) {
        throw new Error(
          `${route}: heading level jumps from h${prev} to h${level}`,
        );
      }
      prev = level;
    }
  });
}
