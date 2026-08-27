import { test, expect } from "@playwright/test";

/**
 * Mobile menu tests.
 *
 * We use `isMobile` from Playwright's fixtures (set in `playwright.config.ts`
 * via the `mobile-chrome` project — `Pixel 7` viewport). The hamburger is
 * hidden at `lg` (≥ 1024px) so these tests must run in a mobile context.
 */
test.describe("Mobile menu", () => {
  test.use({ viewport: { width: 412, height: 915 } });

  test("hamburger button is visible and opens the menu", async ({ page }) => {
    await page.goto("/");
    // Match by aria-controls (stable identifier) so the locator works
    // before *and* after the menu opens — the button's accessible name
    // flips between "Open menu" and "Close menu" with state.
    const toggle = page.locator('button[aria-controls="mobile-menu"]');
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await expect(
      page.getByRole("dialog", { name: /site navigation/i }),
    ).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  test("ESC closes the menu and returns focus to the toggle", async ({
    page,
  }) => {
    await page.goto("/");
    const toggle = page.locator('button[aria-controls="mobile-menu"]');
    await toggle.click();
    await expect(
      page.getByRole("dialog", { name: /site navigation/i }),
    ).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("dialog", { name: /site navigation/i }),
    ).toHaveCount(0);
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();
  });

  test("tapping a menu link navigates and closes the menu", async ({
    page,
  }) => {
    await page.goto("/");
    await page.locator('button[aria-controls="mobile-menu"]').click();
    await page
      .getByRole("dialog", { name: /site navigation/i })
      .getByRole("link", { name: "Services" })
      .click();
    await expect(page).toHaveURL(/\/services$/);
    await expect(
      page.getByRole("dialog", { name: /site navigation/i }),
    ).toHaveCount(0);
  });
});
