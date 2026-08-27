import { test, expect } from "@playwright/test";

/**
 * Smoke tests for the Phase 05 homepage sections.
 *
 * Asserts that every section in the IA (docs/03) is present, in the
 * expected order, and contains the canonical content. This guards
 * against accidental section reordering or content drift.
 */
test.describe("Homepage sections", () => {
  test("renders every section in the correct order", async ({ page }) => {
    await page.goto("/");

    // Each section is a <section> with a stable id. We read the order
    // of section ids in the DOM and assert it matches the IA.
    const sectionIds = await page.locator("main section[id]").evaluateAll(
      (nodes) => nodes.map((n) => n.id),
    );

    expect(sectionIds).toEqual([
      "introduction",
      "services",
      "work",
      "why",
      "process",
      "capabilities",
      "testimonial",
      "contact-cta",
    ]);
  });

  test("hero shows the eyebrow, headline, and primary CTAs", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(
      page.getByText("Digital Design & Development Agency", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: /Considered digital experiences, built to perform\./i,
      }),
    ).toBeVisible();
    // Primary hero CTA + secondary "View our work".
    const hero = page.locator("section").first();
    await expect(
      hero.getByRole("link", { name: "Start a Project" }),
    ).toBeVisible();
    await expect(hero.getByRole("link", { name: /view our work/i })).toBeVisible();
  });

  test("services preview lists the four highlighted services", async ({
    page,
  }) => {
    await page.goto("/");
    const section = page.locator("section#services");
    for (const name of [
      "Web Design",
      "Web Development",
      "UI/UX Design",
      "Performance",
    ]) {
      await expect(section.getByText(name, { exact: true })).toBeVisible();
    }
  });

  test("selected work lists three projects", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("section#work");
    for (const name of [
      "Northwind Commerce",
      "Lumen Marketing",
      "Harbor Financial",
    ]) {
      await expect(section.getByText(name, { exact: true })).toBeVisible();
    }
  });

  test("process lists all five phases", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("section#process");
    for (const name of [
      "Discover",
      "Define",
      "Design",
      "Develop",
      "Launch",
    ]) {
      await expect(section.getByText(name, { exact: true })).toBeVisible();
    }
  });

  test("capabilities list every technology used", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("section#capabilities");
    for (const tech of [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Motion",
      "Vercel",
    ]) {
      await expect(section.getByText(tech, { exact: true })).toBeVisible();
    }
  });

  test("final CTA links to /contact", async ({ page }) => {
    await page.goto("/");
    const section = page.locator("section#contact-cta");
    await expect(
      section.getByRole("link", { name: /start a conversation/i }),
    ).toBeVisible();
    await section
      .getByRole("link", { name: /start a conversation/i })
      .click();
    await expect(page).toHaveURL(/\/contact$/);
  });
});
