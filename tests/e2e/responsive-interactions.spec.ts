import { test, expect, type Page } from "@playwright/test";

/**
 * Interactive per-viewport checks for the most-used surfaces:
 * mobile menu, project grid, contact form.
 *
 * These run at the smallest and a few mid-size viewports to make
 * sure the interactive layout doesn't regress.
 */

async function assertTouchTarget(
  page: Page,
  selector: string,
  minSize: number,
  description: string,
) {
  const el = page.locator(selector).first();
  await expect(el).toBeVisible();
  const box = await el.boundingBox();
  // 44px is the WCAG 2.5.5 minimum target size; we use 40 for less
  // critical targets like inline form fields.
  if (box) {
    expect(
      box.height,
      `${description} height (${box.height}px) is below the ${minSize}px target`,
    ).toBeGreaterThanOrEqual(minSize);
  }
}

test.describe("Mobile menu (360 + 414)", () => {
  for (const width of [360, 414]) {
    test(`@ ${width}px opens, lists every page, and closes via ESC`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 740 });
      await page.goto("/");

      const toggle = page.locator('button[aria-controls="mobile-menu"]');
      await expect(toggle).toBeVisible();
      await assertTouchTarget(page, 'button[aria-controls="mobile-menu"]', 40, "Hamburger");

      await toggle.click();
      const dialog = page.getByRole("dialog", { name: /site navigation/i });
      await expect(dialog).toBeVisible();

      for (const label of ["Home", "Services", "Work", "About", "Contact"]) {
        await expect(dialog.getByRole("link", { name: label })).toBeVisible();
      }

      await page.keyboard.press("Escape");
      await expect(dialog).toHaveCount(0);
    });
  }
});

test.describe("Project grid (768 tablet portrait)", () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  test("project cards lay out in a 2-column grid without overflow", async ({
    page,
  }) => {
    await page.goto("/work");
    const cards = page.locator("ul li article");
    await expect(cards.first()).toBeVisible();
    // No horizontal overflow on the body.
    const overflow = await page.evaluate(
      () => document.body.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);

    // Cards span 2 columns at 768: at least two cards share the same
    // top Y. The first and third card should be on the same row.
    const firstBox = await cards.nth(0).boundingBox();
    const secondBox = await cards.nth(1).boundingBox();
    if (firstBox && secondBox) {
      // Either they're side by side (within 5px vertically) or stacked.
      // At 768 the grid is 2-col, so they should be side by side.
      expect(
        Math.abs(firstBox.y - secondBox.y),
        "tablet grid should not stack to 1 column at 768",
      ).toBeLessThan(20);
    }
  });

  test("the category filter is visible and tappable", async ({ page }) => {
    await page.goto("/work");
    const tabs = page.getByRole("tab");
    await expect(tabs.first()).toBeVisible();
    const tabsCount = await tabs.count();
    expect(tabsCount).toBeGreaterThanOrEqual(4); // All / Web / E-commerce / Brand
    for (let i = 0; i < tabsCount; i++) {
      await assertTouchTarget(page, `[role="tab"]:nth-of-type(${i + 1})`, 36, "Filter chip");
    }
  });
});

test.describe("Contact form (360 + 414)", () => {
  for (const width of [360, 414]) {
    test(`@ ${width}px fields are full-width and the submit button is reachable`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 740 });
      await page.goto("/contact");

      const nameField = page.getByLabel(/name/i);
      await expect(nameField).toBeVisible();

      // Each form field should be at least 36px tall and span
      // essentially the full form width.
      const fieldBox = await nameField.boundingBox();
      const formBox = await page.getByRole("form").boundingBox();
      if (fieldBox && formBox) {
        expect(fieldBox.height, "name field is too short").toBeGreaterThanOrEqual(36);
        expect(
          fieldBox.width / formBox.width,
          "name field should span most of the form",
        ).toBeGreaterThan(0.6);
      }

      // Submit button is reachable (visible in viewport).
      const submit = page.getByRole("button", { name: /send message/i });
      await expect(submit).toBeVisible();
      await assertTouchTarget(
        page,
        'button:has-text("Send message")',
        44,
        "Submit button",
      );
    });
  }
});
