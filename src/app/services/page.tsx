import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRightIcon, ArrowRightIcon } from "@/components/ui/Icon";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web design, development, UI/UX, e-commerce, redesign, and performance work from Aurwave.",
};

type Service = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  capabilities: string[];
};

const services: Service[] = [
  {
    id: "web-design",
    name: "Web Design",
    tagline: "Editorial, brand-led design.",
    description:
      "Design systems built on real brand foundations. We work in real components from day one so what we design is what gets built — no design-to-dev translation tax.",
    capabilities: [
      "Design systems & tokens",
      "Component libraries in code",
      "Brand identity for the web",
      "Marketing site design",
    ],
  },
  {
    id: "web-development",
    name: "Web Development",
    tagline: "Production-grade Next.js.",
    description:
      "TypeScript, accessibility, and performance budgets baked in. The result is a site that ships on time, performs in production, and stays maintainable for the team that takes it over.",
    capabilities: [
      "Next.js + TypeScript",
      "Edge deployment on Vercel",
      "Accessibility (WCAG 2.2 AA)",
      "Documentation & handoff",
    ],
  },
  {
    id: "ui-ux",
    name: "UI/UX Design",
    tagline: "Research-led product work.",
    description:
      "Wireframes, prototypes, and usability testing. We start with user research and a measurable success metric, and we design against that metric throughout.",
    capabilities: [
      "User research & interviews",
      "Wireframes & prototypes",
      "Usability testing",
      "Design system audits",
    ],
  },
  {
    id: "e-commerce",
    name: "E-commerce Development",
    tagline: "Headless storefronts that convert.",
    description:
      "Headless commerce on Next.js — Shopify Hydrogen, custom backends, and checkout flows that hold cart state across devices. We obsess over the metrics that matter.",
    capabilities: [
      "Shopify Hydrogen",
      "Headless commerce",
      "Checkout optimization",
      "Conversion audits",
    ],
  },
  {
    id: "redesign",
    name: "Website Redesign",
    tagline: "Refresh without losing SEO.",
    description:
      "We refresh tired sites into fast, modern, on-brand experiences without burning the search equity you've already built. Content audits, IA work, and 301 strategy are all in scope.",
    capabilities: [
      "Content audits & IA",
      "Design refresh",
      "SEO-safe migration",
      "Analytics & instrumentation",
    ],
  },
  {
    id: "performance",
    name: "Performance Optimization",
    tagline: "Real Core Web Vitals, not a wish.",
    description:
      "Audits, refactors, and ongoing work that ships to production. Performance budgets on every commit, with a CI gate that fails the build if the budget breaks.",
    capabilities: [
      "Core Web Vitals audits",
      "Bundle & asset work",
      "Edge & CDN strategy",
      "Performance budgets in CI",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Section density="default">
        <Container>
          <Reveal>
            <Eyebrow>Services</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <Heading
              variant="display-lg"
              as="h1"
              className="mt-4 max-w-3xl text-balance"
            >
              What we build, end to end.
            </Heading>
          </Reveal>
          <Reveal delay={0.16}>
            <Text
              variant="body-lg"
              tone="muted"
              className="mt-6 max-w-2xl text-pretty"
            >
              A focused set of capabilities. Pick one or combine them — each
              engagement is shaped around the outcome you need.
            </Text>
          </Reveal>
        </Container>
      </Section>

      <Section tone="muted" density="default">
        <Container>
          <ul className="space-y-16">
            {services.map((service, i) => (
              <li
                key={service.id}
                id={service.id}
                className="scroll-mt-24 border-b border-border pb-16 last:border-b-0 last:pb-0"
              >
                <Reveal delay={0.04 * i}>
                  <div className="grid gap-8 sm:grid-cols-12 sm:gap-12">
                    <div className="sm:col-span-4">
                      <span className="font-display text-eyebrow uppercase tracking-[0.18em] text-muted-foreground">
                        0{i + 1}
                      </span>
                      <Heading
                        variant="h2"
                        as="h2"
                        className="mt-3 text-balance"
                      >
                        {service.name}
                      </Heading>
                      <Text tone="muted" className="mt-3 text-pretty">
                        {service.tagline}
                      </Text>
                    </div>
                    <div className="sm:col-span-8">
                      <Text tone="muted" className="text-pretty">
                        {service.description}
                      </Text>
                      <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                        {service.capabilities.map((c) => (
                          <li
                            key={c}
                            className="flex items-start gap-2 text-body text-foreground/90"
                          >
                            <span
                              aria-hidden
                              className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-foreground"
                            />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section density="default" id="methodology">
        <Container className="grid gap-10 sm:grid-cols-12 sm:gap-12">
          <div className="sm:col-span-5">
            <Reveal>
              <Eyebrow>Methodology</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <Heading variant="h2" className="mt-4 text-balance">
                Predictable phases, written outputs.
              </Heading>
            </Reveal>
          </div>
          <div className="sm:col-span-7">
            <Reveal delay={0.12}>
              <Text tone="muted" className="text-pretty">
                Every engagement runs through the same five phases — Discover,
                Define, Design, Develop, Launch. You always know where we are,
                what&apos;s next, and what you&apos;ll receive at the end of
                each one.
              </Text>
            </Reveal>
            <Reveal delay={0.18}>
              <Link
                href="/#process"
                className="mt-6 inline-flex items-center gap-1 text-body text-foreground"
              >
                Read the full process
                <ArrowUpRightIcon aria-hidden />
              </Link>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section
        tone="muted"
        density="default"
        className="border-t border-border"
      >
        <Container className="text-center sm:text-left">
          <div className="grid gap-8 sm:grid-cols-12 sm:items-end">
            <div className="sm:col-span-7">
              <Heading variant="h2" as="h2" className="text-balance">
                Pick a starting point.
              </Heading>
              <Text tone="muted" variant="body-lg" className="mt-4 max-w-xl text-pretty">
                Tell us what you&apos;re working on. We&apos;ll reply within
                two business days with a clear next step.
              </Text>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:col-span-5 sm:justify-end">
              <Button href={siteConfig.primaryCta.href} intent="primary" size="lg">
                Start a project
                <ArrowRightIcon className="ml-1" aria-hidden />
              </Button>
              <Button href="/work" intent="ghost" size="lg">
                See our work
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
