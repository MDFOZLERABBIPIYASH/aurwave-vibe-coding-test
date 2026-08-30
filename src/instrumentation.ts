/**
 * Sentry runtime initialization.
 *
 * `instrumentation.ts` is Next.js's official hook for code that runs
 * once per server boot. We use it to:
 *   1. Initialize Sentry on the server (the `nodejs` and `edge`
 *      runtimes). The client-side init is handled automatically by
 *      `withSentryConfig` in `next.config.ts`.
 *   2. Register the `onRequestError` hook so React Server Component
 *      errors are captured.
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

/**
 * React Server Component error capture (Next.js 15+).
 *
 * Called by Next.js for every request error that surfaces in a
 * Server Component. Without this hook, RSC errors would slip
 * past Sentry's client and `register()` coverage.
 */
export const onRequestError = async (
  err: unknown,
  request: {
    path: string;
    method: string;
    headers: Record<string, string | string[] | undefined>;
  },
  context: {
    routerKind: "Pages Router" | "App Router";
    routePath: string;
    routeType: "render" | "route" | "action" | "middleware";
    revalidateReason?: "on-demand" | "stale" | undefined;
    renderSource?:
      | "react-server-components"
      | "react-server-components-payload"
      | "server-rendering";
  },
) => {
  if (!process.env.SENTRY_DSN) return;
  const Sentry = await import("@sentry/nextjs");
  Sentry.captureRequestError(err, request, context);
};
