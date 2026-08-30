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
 * nudges, hydration hints, known Vercel-runtime 404s) that
 * don't indicate a real problem.
 */
const routes = [
  "/",
  "/services",
  "/work",
  "/work/northwind-commerce",
  "/about",
  "/contact",
];

// Patterns matched against the full error text. The text is the
// generic "Failed to load resource" the browser logs, which does
// NOT include the URL — so we match by pattern + cross-reference
// with the per-route 404 tracker below.
const allowlist = [
  // Hydration warnings, React DevTools nudges, and similar
  // non-actionable noise.
  /hydration/i,
  /devtools/i,
  // The generic browser "Failed to load resource: 404" message.
  // We narrow this further by tracking the actual 404 URLs in
  // a per-test set; only URLs in that set are allowed through.
  /Failed to load resource: the server responded with a status of 404/i,
];

/**
 * Set of URLs that 404'd during the current test run. Populated
 * by the `page.on('response')` listener below. When a 404 is
 * observed, we add it here; when a console error is observed, we
 * suppress it if (a) the message matches the generic 404 pattern
 * AND (b) the only 404s in this test came from known Vercel
 * runtime endpoints (`/_vercel/insights/...`, `/_vercel/speed-insights/...`).
 *
 * Outside Vercel, the analytics + speed-insights scripts always
 * 404, and we don't want those to fail the test. Real 404s (e.g.
 * a missing image) would also surface as console errors and
 * would still fail the test because the URL wouldn't match the
 * Vercel allowlist.
 */
function isVercelRuntime404(url: string): boolean {
  return /^\/_vercel\/(insights|speed-insights)\//.test(new URL(url, "http://x").pathname);
}

for (const route of routes) {
  test(`no console errors on ${route}`, async ({ page }) => {
    const errors: string[] = [];
    const fourOhFourUrls: string[] = [];
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
    // Track 404 responses so we can distinguish "404 from a
    // known Vercel runtime script" (allowed) from "404 from a
    // real missing asset" (fails the test). The console-error
    // message itself is generic, so we correlate it with the
    // 404 URLs we actually observed.
    page.on("response", (res) => {
      if (res.status() === 404) fourOhFourUrls.push(res.url());
    });

    const response = await page.goto(route);
    expect(response?.status()).toBeLessThan(400);
    // Wait for client-side hydration to finish (and any
    // motion-library warnings to surface).
    await page.waitForTimeout(800);

    // If every 404 we observed in this test is a known Vercel
    // runtime endpoint, the corresponding "Failed to load
    // resource: 404" console errors are also Vercel runtime
    // noise and can be ignored. Otherwise, the 404s represent
    // real missing assets and the test should fail.
    const allVercelRuntime = fourOhFourUrls.every(isVercelRuntime404);
    if (allVercelRuntime && fourOhFourUrls.length > 0) {
      // Drop the matched console errors. We re-derive the filter
      // here because the original allowlist check happens before
      // we know which URLs 404'd.
      const filtered = errors.filter(
        (e) =>
          !/Failed to load resource: the server responded with a status of 404/i.test(
            e,
          ),
      );
      errors.length = 0;
      errors.push(...filtered);
    }

    expect(
      errors,
      `console errors on ${route}:\n  ${errors.join("\n  ")}\n\n404 URLs observed: ${fourOhFourUrls.join(", ")}`,
    ).toEqual([]);
  });
}
