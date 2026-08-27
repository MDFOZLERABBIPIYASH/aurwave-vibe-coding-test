"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";

/**
 * Global error boundary for the App Router.
 *
 * Per Next.js conventions this MUST be a client component. The
 * `reset` callback re-renders the failed segment.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Phase 14: forward to Sentry when configured.
    // For now, log to the console for development.
    console.error(error);
  }, [error]);

  return (
    <Section density="default">
      <Container className="max-w-xl text-center sm:text-left">
        <p className="text-eyebrow uppercase tracking-[0.18em] text-muted-foreground">
          Something went wrong
        </p>
        <Heading variant="display-md" as="h1" className="mt-4">
          We hit an unexpected error
        </Heading>
        <Text tone="muted" className="mt-4">
          The team has been notified. You can try again, or head back to the
          homepage.
        </Text>
        {error.digest ? (
          <Text variant="small" tone="muted" className="mt-2">
            Reference: <code className="font-mono">{error.digest}</code>
          </Text>
        ) : null}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
          <Button onClick={reset} intent="primary">
            Try again
          </Button>
          <Button href="/" intent="ghost">
            Back to home
          </Button>
        </div>
      </Container>
    </Section>
  );
}
