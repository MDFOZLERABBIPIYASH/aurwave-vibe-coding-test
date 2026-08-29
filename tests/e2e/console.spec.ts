import { test, expect, type ConsoleMessage } from "@playwright/test";

/**
 * Console-error smoke test.
 *
 * Loads every public route and asserts that no `error`-level
 * messages were logged to the browser console during the page
 * lifecycle. This is a coarse signal — a passing test doesn't
 * mean the page is bug-free, but a failing test usually means
 * something is broken.
 *
 * Warnings and info messages are ignored. We also tolerate a
 * small allowlist of expected warnings (e.g. React DevTools
 * nudges, hydration hints) that don't indicate a real problem.
 */
const routes = [
  "/",
  "/services",
  "/work",
  "/work/northwind-commerce",
  "/about",
  "/contact",
];

const allowlist = [
  // Hydration warnings, React DevTools nudges, and similar
  // non-actionable noise. Keep this list small — every entry
  // should have a real reason.
  /hydration/i,
  /devtools/i,
  // Vercel Analytics + Speed Insights inject `/\_vercel/insights/...`
  // scripts at runtime. On `npm start` (and any non-Vercel env)
  // those paths 404, which the browser surfaces as console
  // errors. The scripts are no-ops when 404'd, so allow them.
  /_vercel\/(insights|speed-insights)\//i,
];

for (const route of routes) {
  test(`no console errors on ${route}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg: ConsoleMessage) => {
      if (msg.type() !== "error") return;
      const text = msg.text();
      if (allowlist.some((re) => re.test(text))) return;
      errors.push(text);
    });
    // Also catch uncaught page errors.
    page.on("pageerror", (err) => {
      errors.push(err.message);
    });

    const response = await page.goto(route);
    expect(response?.status()).toBeLessThan(400);
    // Wait for client-side hydration to finish (and any
    // motion-library warnings to surface).
    await page.waitForTimeout(800);

    expect(
      errors,
      `console errors on ${route}:\n  ${errors.join("\n  ")}`,
    ).toEqual([]);
  });
}
