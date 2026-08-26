import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("loads successfully and shows the wordmark", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1, name: "Aurwave" })).toBeVisible();
  });
});
