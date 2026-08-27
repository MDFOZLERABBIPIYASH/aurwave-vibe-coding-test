import { test, expect } from "@playwright/test";

/**
 * Work index + project detail navigation.
 */
test.describe("Work index", () => {
  test("renders all six projects initially", async ({ page }) => {
    await page.goto("/work");
    const grid = page.locator("ul").filter({ has: page.getByRole("article") });
    await expect(grid).toBeVisible();
    for (const name of [
      "Northwind Commerce",
      "Lumen Marketing",
      "Harbor Financial",
      "Atlas Archive",
      "Verdant Goods",
      "Mosaic Rebrand",
    ]) {
      await expect(page.getByText(name, { exact: true }).first()).toBeVisible();
    }
  });

  test("clicking a project card navigates to its detail page", async ({
    page,
  }) => {
    await page.goto("/work");
    await page
      .getByRole("link", { name: /Northwind Commerce — E-commerce/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/work\/northwind-commerce$/);
    await expect(
      page.getByRole("heading", { name: "Northwind Commerce", level: 1 }),
    ).toBeVisible();
  });

  test("filter narrows the grid by category", async ({ page }) => {
    await page.goto("/work");

    // Wait for the project grid to be present (filtered container).
    const grid = page.locator("ul").filter({ has: page.getByRole("article") }).first();
    await expect(grid).toBeVisible();

    // Count of project cards before filtering. We expect the unfiltered
    // total (6 projects) so the assertion that follows is meaningful.
    await expect(page.getByText(/Showing 6 projects/)).toBeVisible();
    const before = await page
      .locator("ul li article")
      .count();
    expect(before).toBe(6);

    // Click the "Web" filter.
    await page.getByRole("tab", { name: "Web" }).click();
    await expect(page).toHaveURL(/category=web/);

    // The "Showing N projects" status reflects the new count.
    await expect(page.getByText(/Showing \d+ projects? in Web/)).toBeVisible();

    const after = await page.locator("ul li article").count();
    expect(after).toBeLessThan(before);
    expect(after).toBeGreaterThan(0);
  });
});

test.describe("Project detail", () => {
  test("renders problem, approach, results, and a Next project link", async ({
    page,
  }) => {
    await page.goto("/work/lumen-marketing");
    await expect(
      page.getByRole("heading", { name: "Lumen Marketing", level: 1 }),
    ).toBeVisible();
    // Problem / Approach / Results are styled eyebrows on the detail page.
    await expect(page.getByText("Problem", { exact: true })).toBeVisible();
    await expect(page.getByText("Approach", { exact: true })).toBeVisible();
    await expect(page.getByText("Results", { exact: true })).toBeVisible();

    // The "Continue reading" button points to the next project.
    const next = page.getByRole("link", { name: /continue reading/i });
    await expect(next).toBeVisible();
  });

  test("an unknown project slug returns 404", async ({ page }) => {
    const response = await page.goto("/work/this-does-not-exist");
    expect(response?.status()).toBe(404);
  });
});
