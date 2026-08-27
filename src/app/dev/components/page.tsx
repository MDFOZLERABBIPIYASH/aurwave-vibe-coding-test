import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Link } from "@/components/ui/Link";

export const metadata: Metadata = {
  title: "Component Library",
  robots: { index: false, follow: false },
};

/**
 * Dev-only component showcase.
 *
 * Per plan.md Phase 03, this page lets designers (and Claude) visually
 * verify every primitive against the design tokens. It is guarded to
 * non-production builds via `NEXT_PUBLIC_SHOW_DEV` (default: dev only).
 * If hidden, visitors are redirected to the homepage.
 */
export default function ComponentsPage() {
  const enabled =
    process.env.NODE_ENV !== "production" ||
    process.env.NEXT_PUBLIC_SHOW_DEV === "true";
  if (!enabled) redirect("/");

  return (
    <main className="bg-background text-foreground">
      <Section density="tight">
        <Container>
          <Eyebrow>Phase 03 · Design System</Eyebrow>
          <Heading variant="display-md" as="h1" className="mt-4">
            Component Library
          </Heading>
          <Text tone="muted" className="mt-4">
            Every primitive that powers the Aurwave site. Dev-only showcase —
            not indexed.
          </Text>
        </Container>
      </Section>

      <Section tone="muted" density="tight">
        <Container>
          <Eyebrow>Typography</Eyebrow>
          <Heading variant="h2" className="mt-4">
            Headings
          </Heading>
          <div className="mt-8 space-y-6">
            <Heading variant="display-xl">Display XL — Aurwave</Heading>
            <Heading variant="display-lg">Display LG — Aurwave</Heading>
            <Heading variant="display-md">Display MD — Aurwave</Heading>
            <Heading variant="h1">H1 — Section Heading</Heading>
            <Heading variant="h2">H2 — Subheading</Heading>
            <Heading variant="h3">H3 — Card title</Heading>
            <Heading variant="h4">H4 — Smaller label</Heading>
          </div>

          <Heading variant="h2" className="mt-12">
            Body
          </Heading>
          <div className="mt-6 space-y-4">
            <Text variant="body-lg">
              Body large — used for important supporting content.
            </Text>
            <Text>
              Body — standard readable content. Comfortable line height, clear
              contrast, sufficient spacing.
            </Text>
            <Text variant="small" tone="muted">
              Small — labels and metadata.
            </Text>
          </div>
        </Container>
      </Section>

      <Section density="tight">
        <Container>
          <Eyebrow>Buttons</Eyebrow>
          <Heading variant="h2" className="mt-4">
            Intents and sizes
          </Heading>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button intent="primary" size="lg">
              Start a Project
            </Button>
            <Button intent="primary">Primary</Button>
            <Button intent="primary" size="sm">
              Small
            </Button>
            <Button intent="secondary">Secondary</Button>
            <Button intent="ghost">Ghost</Button>
            <Button intent="primary" disabled>
              Disabled
            </Button>
          </div>

          <Heading variant="h2" className="mt-12">
            As a link
          </Heading>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button href="/contact" intent="primary">
              Start a Project
            </Button>
            <Button href="/work" intent="secondary">
              View Our Work
            </Button>
            <Button
              href="https://example.com"
              external
              intent="ghost"
            >
              External link
            </Button>
          </div>
        </Container>
      </Section>

      <Section tone="muted" density="tight">
        <Container>
          <Eyebrow>Text Link</Eyebrow>
          <Heading variant="h2" className="mt-4">
            Inline link
          </Heading>
          <Text className="mt-6">
            Used inline inside paragraphs, like this{" "}
            <Link href="/services">services overview</Link> or this{" "}
            <Link href="https://github.com" external>
              external source
            </Link>
            . Underlines appear on hover only and never on the resting state to
            keep the paragraph quiet.
          </Text>
        </Container>
      </Section>

      <Section density="tight">
        <Container>
          <Eyebrow>Section</Eyebrow>
          <Heading variant="h2" className="mt-4">
            Container &amp; Section wrappers
          </Heading>
          <Text tone="muted" className="mt-4">
            Section applies standardized vertical rhythm via the
            <code className="mx-1 rounded bg-muted px-1.5 py-0.5 text-small">
              section-y
            </code>
            token. Container caps the max-width at 1280px (2xl breakpoint).
          </Text>
        </Container>
      </Section>
    </main>
  );
}
