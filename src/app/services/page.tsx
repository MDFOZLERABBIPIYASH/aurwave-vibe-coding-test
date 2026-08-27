import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web design, development, UI/UX, e-commerce, redesign, and performance work from Aurwave.",
};

/**
 * Services overview page.
 *
 * Phase 04 ships a minimal layout so every route resolves. The full
 * services detail list and per-service pages land in Phase 06 per
 * `docs/03-information-architecture.md`.
 */
export default function ServicesPage() {
  const services = [
    {
      id: "web-design",
      name: "Web Design",
      description: "Editorial, brand-led design systems built for clarity and conversion.",
    },
    {
      id: "web-development",
      name: "Web Development",
      description: "Production-grade Next.js, TypeScript, and edge deployments.",
    },
    {
      id: "ui-ux",
      name: "UI/UX Design",
      description: "Wireframes, prototypes, and design systems that scale with your team.",
    },
    {
      id: "e-commerce",
      name: "E-commerce Development",
      description: "Headless storefronts, payment flows, and conversion-focused PDPs.",
    },
    {
      id: "redesign",
      name: "Website Redesign",
      description: "Refresh tired sites into fast, modern, on-brand experiences.",
    },
    {
      id: "performance",
      name: "Performance Optimization",
      description: "Audits, refactors, and Core Web Vitals work that ships to production.",
    },
  ];

  return (
    <>
      <Section density="default">
        <Container>
          <Eyebrow>Services</Eyebrow>
          <Heading variant="display-md" as="h1" className="mt-4">
            What we build
          </Heading>
          <Text variant="body-lg" tone="muted" className="mt-6 max-w-2xl">
            A focused set of capabilities. Pick one or combine them — each engagement
            is shaped around the outcome you need.
          </Text>
        </Container>
      </Section>

      <Section tone="muted" density="default">
        <Container>
          <ul className="grid gap-6 sm:grid-cols-2">
            {services.map((service) => (
              <li
                key={service.id}
                id={service.id}
                className="rounded-lg border border-border bg-background p-6"
              >
                <Heading variant="h3" as="h2">
                  {service.name}
                </Heading>
                <Text tone="muted" className="mt-3">
                  {service.description}
                </Text>
              </li>
            ))}
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
