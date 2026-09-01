import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright E2E configuration.
 * See docs/11-testing-strategy.md.
 *
 * Tests run against port 3030 to avoid colliding with other services
 * that may already be on the default Next.js port 3000 in development.
 */
const PORT = Number(process.env.PORT ?? 3030);
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  testIgnore: "**/_*.spec.ts",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // CI runners are slower than local. More retries + a longer
  // per-test timeout absorb the kind of transient flakes that
  // happen on shared hardware (the GitHub-hosted Ubuntu images
  // see real-world load variance).
  retries: process.env.CI ? 3 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: process.env.CI ? 60_000 : 30_000,
  reporter: "html",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "mobile-chrome",
      use: { ...devices["Pixel 7"] },
    },
  ],
  webServer: {
    command: `npm run start -- --port ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
