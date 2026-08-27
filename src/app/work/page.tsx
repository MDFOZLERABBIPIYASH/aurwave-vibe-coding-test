import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects from Aurwave — web design, development, and brand work for ambitious teams.",
};

/**
 * Work index page.
 *
 * Phase 04 ships a minimal layout. The full project grid with filters
 * and project detail routes at `/work/[slug]` land in Phase 06.
 */
export default function WorkPage() {
  return (
    <>
      <Section density="default">
        <Container>
          <Eyebrow>Selected Work</Eyebrow>
          <Heading variant="display-md" as="h1" className="mt-4">
            Recent projects
          </Heading>
          <Text variant="body-lg" tone="muted" className="mt-6 max-w-2xl">
            A small, deliberate portfolio. Each engagement is built to ship and
            built to last.
          </Text>
        </Container>
      </Section>

      <Section tone="muted" density="default">
        <Container>
          <div className="rounded-lg border border-dashed border-border bg-background p-12 text-center">
            <Text tone="muted">
              Project gallery coming in Phase 06. The site currently uses
              placeholder cards until real case studies are ready.
            </Text>
            <div className="mt-6 flex justify-center">
              <Button href="/contact" intent="primary">
                {siteConfig.primaryCta.label}
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
