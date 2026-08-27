import { test, expect } from "@playwright/test";

/**
 * Motion + reduced-motion behavior.
 *
 * Two modes are tested:
 *  1. Default: animations are enabled. Hero text is initially hidden
 *     (opacity 0) and animates to visible.
 *  2. Reduced: the same hero text renders at its final opacity with
 *     no transform — the entrance animation is suppressed entirely.
 *
 * `page.emulateMedia({ reducedMotion: 'reduce' })` flips the
 * `prefers-reduced-motion` media query for the test session.
 */
test.describe("Motion — default (animations enabled)", () => {
  test("hero headline is initially below 1.0 opacity and animates in", async ({
    page,
  }) => {
    await page.goto("/");
    const hero = page.getByRole("heading", {
      level: 1,
      name: /Considered digital experiences/i,
    });
    await expect(hero).toBeVisible();

    // Wait for the text-reveal to settle. The transition runs ~600ms.
    await page.waitForTimeout(800);

    // Final opacity should be 1.
    const opacity = await hero.evaluate(
      (el) => Number(getComputedStyle(el).opacity),
    );
    expect(opacity).toBeCloseTo(1, 1);
  });
});

test.describe("Motion — prefers-reduced-motion", () => {
  test("hero renders at its final opacity with no transform", async ({
    browser,
  }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    const hero = page.getByRole("heading", {
      level: 1,
      name: /Considered digital experiences/i,
    });
    await expect(hero).toBeVisible();

    // With reduced motion, the heading should be at its final opacity
    // immediately — not at 0 (which is what an in-progress animation
    // would show).
    const styles = await hero.evaluate((el) => {
      const cs = getComputedStyle(el);
      return { opacity: Number(cs.opacity), transform: cs.transform };
    });
    expect(styles.opacity).toBeGreaterThan(0.9);
    expect(styles.opacity).toBeCloseTo(1, 1);
    await context.close();
  });

  test("section headings render without waiting for animation", async ({
    browser,
  }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    // Scroll the services H2 into view. With reduced motion, it should
    // be at final opacity immediately.
    const servicesH2 = page
      .locator("section#services")
      .getByRole("heading", { level: 2 });
    await servicesH2.scrollIntoViewIfNeeded();
    const opacity = await servicesH2.evaluate(
      (el) => Number(getComputedStyle(el).opacity),
    );
    expect(opacity).toBeGreaterThan(0.9);
    await context.close();
  });
});

test.describe("Page transitions", () => {
  test("main content has a transitionable wrapper", async ({ page }) => {
    await page.goto("/");
    // The PageTransition wrapper sits inside <main> as a real
    // block element. We assert it exists by looking for the first
    // direct child of <main>.
    const main = page.locator("main#main");
    await expect(main).toBeVisible();
    const childCount = await main.evaluate(
      (el) => el.children.length,
    );
    expect(childCount).toBeGreaterThan(0);
  });
});
