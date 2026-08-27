import { test, expect } from "@playwright/test";

/**
 * Contact-form E2E.
 *
 * Covers the three states of interest:
 *  - client-side validation: empty / invalid inputs surface field errors
 *  - happy path: valid submission posts to /api/contact and shows the
 *    success panel
 *  - network/server error: a forced 500 path renders the error state
 *
 * The route is stubbed in the network layer so the test is hermetic.
 */

async function gotoContact(page: import("@playwright/test").Page) {
  await page.goto("/contact");
}

test.describe("Contact form — validation", () => {
  test("empty submit shows field-level errors", async ({ page }) => {
    await gotoContact(page);
    const form = page.getByRole("form", { name: /project inquiry/i });
    await form.getByRole("button", { name: /send message/i }).click();
    // The summary alert appears at the top of the form.
    const summary = page.getByRole("alert").first();
    await expect(summary).toBeVisible();
    await expect(summary.getByText("Name is required.")).toBeVisible();
    await expect(summary.getByText("Email is required.")).toBeVisible();
    await expect(summary.getByText("Message is required.")).toBeVisible();
    // Each field also shows its own error message beneath the input
    // (a red helper <p> tied to the input via aria-describedby).
    await expect(page.locator('[id$="-name-error"]')).toBeVisible();
    await expect(page.locator('[id$="-email-error"]')).toBeVisible();
    await expect(page.locator('[id$="-message-error"]')).toBeVisible();
  });

  test("invalid email surfaces a clear error", async ({ page }) => {
    await gotoContact(page);
    const form = page.getByRole("form", { name: /project inquiry/i });
    await form.getByLabel(/name/i).fill("Ada Lovelace");
    await form.getByLabel(/email/i).fill("not-an-email");
    await form.getByLabel(/message/i).fill("Hello, this is a real message.");
    await form.getByRole("button", { name: /send message/i }).click();
    // The error appears in the summary list AND under the input.
    await expect(
      page.getByText(/valid email address/i).first(),
    ).toBeVisible();
    await expect(page.locator('[id$="-email-error"]')).toBeVisible();
  });
});

test.describe("Contact form — happy path", () => {
  test("valid submit posts to /api/contact and shows success", async ({
    page,
  }) => {
    let postBody: unknown = null;
    await page.route("**/api/contact", async (route) => {
      if (route.request().method() === "POST") {
        postBody = JSON.parse(route.request().postData() ?? "{}");
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ ok: true }),
        });
      } else {
        await route.continue();
      }
    });

    await gotoContact(page);
    const form = page.getByRole("form", { name: /project inquiry/i });
    await form.getByLabel(/name/i).fill("Ada Lovelace");
    await form.getByLabel(/email/i).fill("ada@example.com");
    await form.getByLabel(/message/i).fill(
      "I would like to talk about a new marketing site.",
    );
    await form.getByRole("button", { name: /send message/i }).click();

    await expect(page.getByRole("status")).toBeVisible();
    await expect(page.getByText(/message received/i)).toBeVisible();
    expect((postBody as { email?: string })?.email).toBe("ada@example.com");
  });
});

test.describe("Contact form — server error", () => {
  test("5xx from /api/contact shows the error alert", async ({ page }) => {
    await page.route("**/api/contact", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({
          ok: false,
          message: "Something went wrong on our end.",
          errors: [],
        }),
      });
    });
    await gotoContact(page);
    const form = page.getByRole("form", { name: /project inquiry/i });
    await form.getByLabel(/name/i).fill("Ada Lovelace");
    await form.getByLabel(/email/i).fill("ada@example.com");
    await form.getByLabel(/message/i).fill(
      "I would like to talk about a new marketing site.",
    );
    await form.getByRole("button", { name: /send message/i }).click();
    // The Next route announcer is also `role="alert"`; the form's
    // alert is the visible one with the "went wrong" copy.
    const alert = page.getByRole("alert").filter({ hasText: /went wrong/i });
    await expect(alert).toBeVisible();
  });
});
