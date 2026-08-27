import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Aurwave is a small, senior web design and development studio. Learn about our approach, mission, and values.",
};

/**
 * About page.
 *
 * Phase 04 ships the layout. Full mission, approach, and values copy
 * lands in Phase 06.
 */
export default function AboutPage() {
  return (
    <>
      <Section density="default">
        <Container>
          <Eyebrow>About</Eyebrow>
          <Heading variant="display-md" as="h1" className="mt-4">
            A small, senior studio
          </Heading>
          <Text variant="body-lg" tone="muted" className="mt-6 max-w-2xl">
            Aurwave works with a small number of clients at a time. No middle
            layer, no account managers — just the people doing the work.
          </Text>
        </Container>
      </Section>

      <Section tone="muted" density="default">
        <Container className="max-w-2xl">
          <Heading variant="h2">Approach</Heading>
          <Text tone="muted" className="mt-4">
            Strategy comes first, then design, then engineering — and we keep
            those three disciplines in one room throughout. Every project
            ships with a maintainable codebase, real performance budgets, and
            the documentation your team needs to keep moving.
          </Text>

          <Heading variant="h2" className="mt-12">
            Values
          </Heading>
          <ul className="mt-4 space-y-3 text-body text-foreground/90">
            <li>— Show the work early, iterate in the open.</li>
            <li>— Quiet design, loud results.</li>
            <li>— Performance is a feature.</li>
            <li>— Accessibility is non-negotiable.</li>
          </ul>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Button href="/contact" intent="primary" size="lg">
              {siteConfig.primaryCta.label}
            </Button>
            <Button href="/work" intent="ghost" size="lg">
              See our work
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
