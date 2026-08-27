import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectFilter } from "@/components/sections/ProjectFilter";
import { projects, sortProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects from Aurwave — web design, development, and brand work for ambitious teams.",
};

/**
 * Work index.
 *
 * Server component: renders the page chrome, then mounts a client
 * `<ProjectFilter>` inside a Suspense boundary (useSearchParams requires
 * it). The filter component handles category state, URL sync, and the
 * grid itself.
 */
export default function WorkPage() {
  const sorted = sortProjects(projects);

  return (
    <>
      <Section density="default">
        <Container>
          <Reveal>
            <Eyebrow>Selected work</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <Heading variant="display-md" as="h1" className="mt-4 max-w-3xl">
              Recent projects.
            </Heading>
          </Reveal>
          <Reveal delay={0.16}>
            <Text variant="body-lg" tone="muted" className="mt-6 max-w-2xl text-pretty">
              A small, deliberate portfolio. Each engagement is built to ship
              and built to last.
            </Text>
          </Reveal>
        </Container>
      </Section>

      <Section tone="muted" density="default">
        <Container>
          <Suspense fallback={null}>
            <ProjectFilter projects={sorted} />
          </Suspense>

          <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-border pt-12">
            <Heading variant="h3" as="p" className="text-balance">
              Have a project in mind?
            </Heading>
            <Button href={siteConfig.primaryCta.href} intent="primary" size="lg">
              {siteConfig.primaryCta.label}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
