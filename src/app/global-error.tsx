"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icon";

/**
 * Global error boundary (App Router).
 *
 * Catches errors that escape the per-route `error.tsx` — typically
 * errors in the root layout itself. Per Next.js convention this
 * MUST be a client component, and it MUST render its own `<html>`
 * and `<body>` because the root layout has failed.
 *
 * When Sentry is configured (`SENTRY_DSN` set), Sentry's
 * `withSentryConfig` wraps this component to capture the
 * exception. When Sentry isn't configured, this is just a
 * graceful "something went wrong" page with a reset button.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <Section density="default">
          <Container className="max-w-xl">
            <p className="text-eyebrow uppercase tracking-[0.18em] text-muted-foreground">
              Something went wrong
            </p>
            <Heading variant="display-md" as="h1" className="mt-4">
              We hit an unexpected error
            </Heading>
            <Text tone="muted" className="mt-6">
              The team has been notified. You can try again, or head back to
              the homepage.
            </Text>
            {error.digest ? (
              <Text variant="small" tone="muted" className="mt-2">
                Reference: <code className="font-mono">{error.digest}</code>
              </Text>
            ) : null}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button onClick={reset} intent="primary" size="lg">
                Try again
                <ArrowRightIcon className="ml-1" aria-hidden />
              </Button>
              <Button href="/" intent="ghost" size="lg">
                Back to home
              </Button>
            </div>
          </Container>
        </Section>
      </body>
    </html>
  );
}
