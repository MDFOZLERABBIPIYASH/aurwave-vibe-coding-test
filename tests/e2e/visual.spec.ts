import { test, expect } from "@playwright/test";

/**
 * Visual regression smoke.
 *
 * Snapshots the homepage and work index at desktop and mobile
 * viewports, comparing to committed baselines in
 * `tests/e2e/visual.spec.ts-snapshots/`. On a fresh checkout the
 * first run creates the baselines; subsequent runs compare.
 *
 * `maxDiffPixelRatio: 0.02` allows up to 2% pixel diff so the
 * tests don't flake on font anti-aliasing. If you intentionally
 * change the visual design, run `npx playwright test
 * --update-snapshots` (or `npx playwright test visual.spec.ts -u`)
 * to regenerate.
 */
const desktopViewport = { width: 1280, height: 800 };
const mobileViewport = { width: 412, height: 915 };

const snapshots = [
  { name: "home-desktop", path: "/", viewport: desktopViewport },
  { name: "home-mobile", path: "/", viewport: mobileViewport },
  { name: "work-desktop", path: "/work", viewport: desktopViewport },
  { name: "work-mobile", path: "/work", viewport: mobileViewport },
];

for (const snap of snapshots) {
  test(`visual: ${snap.name}`, async ({ page }) => {
    await page.setViewportSize(snap.viewport);
    await page.goto(snap.path);
    // Wait for the page transition + any text-reveal to settle.
    await page.waitForTimeout(1500);
    // Disable any caret blink that could show up in the snapshot.
    await page.evaluate(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    });
    await expect(page).toHaveScreenshot(`${snap.name}.png`, {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    });
  });
}
