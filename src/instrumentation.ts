/**
 * Sentry runtime initialization.
 *
 * `instrumentation.ts` is Next.js's official hook for code that runs
 * once per server boot. We use it to initialize Sentry on the server
 * (the client-side init is handled automatically by `withSentryConfig`
 * in `next.config.ts`).
 *
 * The SDK is loaded only when `SENTRY_DSN` is set, so the bundle
 * stays empty in environments that don't use Sentry (local dev,
 * preview deploys without a DSN).
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const Sentry = await import("@sentry/nextjs");
    const dsn = process.env.SENTRY_DSN;
    if (dsn) {
      Sentry.init({
        dsn,
        tracesSampleRate: 0.1,
        // Surface unhandled errors and unhandled promise rejections;
        // the defaults already cover both.
      });
    }
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    const Sentry = await import("@sentry/nextjs");
    const dsn = process.env.SENTRY_DSN;
    if (dsn) {
      Sentry.init({
        dsn,
        tracesSampleRate: 0.1,
      });
    }
  }
}
