import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("loads successfully and shows the wordmark", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Aurwave/);
    // The site wordmark is the home link in the header.
    await expect(
      page.getByRole("link", { name: /aurwave home/i }).first(),
    ).toBeVisible();
  });

  test("primary nav lists every page", async ({ page, viewport }) => {
    // The desktop nav is hidden below the `lg` breakpoint (1024px).
    // On mobile the same items are exposed via the hamburger menu.
    test.skip(!!viewport && viewport.width < 1024, "desktop nav only");
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary" });
    await expect(nav).toBeVisible();
    for (const label of ["Home", "Services", "Work", "About", "Contact"]) {
      await expect(nav.getByRole("link", { name: label })).toBeVisible();
    }
  });

  test("mobile menu lists every page when opened", async ({
    page,
    viewport,
  }) => {
    test.skip(!viewport || viewport.width >= 1024, "mobile only");
    await page.goto("/");
    await page.locator('button[aria-controls="mobile-menu"]').click();
    const nav = page.getByRole("navigation", { name: "Primary mobile" });
    await expect(nav).toBeVisible();
    for (const label of ["Home", "Services", "Work", "About", "Contact"]) {
      await expect(nav.getByRole("link", { name: label })).toBeVisible();
    }
  });

  test("primary CTA in the header navigates to /contact", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("link", { name: "Start a Project" })
      .first()
      .click();
    await expect(page).toHaveURL(/\/contact$/);
  });
});
