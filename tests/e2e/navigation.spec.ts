import { test, expect } from "@playwright/test";

const routes = [
  { path: "/", title: /Aurwave/i, h1: /Aurwave/i },
  { path: "/services", title: /Services/i, h1: /What we build/i },
  { path: "/work", title: /Work/i, h1: /Recent projects/i },
  { path: "/about", title: /About/i, h1: /senior studio/i },
  { path: "/contact", title: /Contact/i, h1: /start a project/i },
  { path: "/privacy", title: /Privacy/i, h1: /Privacy/i },
  { path: "/terms", title: /Terms/i, h1: /Terms/i },
];

test.describe("All routes load", () => {
  for (const route of routes) {
    test(`${route.path} renders the expected title and heading`, async ({
      page,
    }) => {
      const response = await page.goto(route.path);
      expect(response?.status(), `${route.path} should return 2xx`).toBeLessThan(
        400,
      );
      await expect(page).toHaveTitle(route.title);
      await expect(
        page.getByRole("heading", { name: route.h1, level: 1 }),
      ).toBeVisible();
    });
  }

  test("an unknown path renders the 404 page", async ({ page }) => {
    const response = await page.goto("/this-route-does-not-exist");
    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { name: /couldn.*find that page/i }),
    ).toBeVisible();
  });
});

test.describe("Footer", () => {
  test("renders the sitemap, services, and contact columns", async ({
    page,
  }) => {
    await page.goto("/");
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    await expect(
      footer.getByRole("navigation", { name: "Sitemap" }),
    ).toBeVisible();
    // Each column has an <h3> with the column name.
    await expect(
      footer.getByRole("heading", { name: "Sitemap", level: 3 }),
    ).toBeVisible();
    await expect(
      footer.getByRole("heading", { name: "Services", level: 3 }),
    ).toBeVisible();
    await expect(
      footer.getByRole("heading", { name: "Contact", level: 3 }),
    ).toBeVisible();
  });
});
