import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Link } from "@/components/ui/Link";
import { Reveal, TextReveal } from "@/components/motion";
import { ArrowUpRightIcon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * Services preview — a high-level tour of what we do.
 *
 * Per docs/04-content-strategy.md the homepage shows 3–4 highlighted
 * services with a short description and an outbound link to the
 * services page. The full capability list lives at /services.
 */
const services = [
  {
    id: "web-design",
    name: "Web Design",
    description:
      "Editorial, brand-led design systems built to convert and scale.",
  },
  {
    id: "web-development",
    name: "Web Development",
    description:
      "Production-grade Next.js, TypeScript, and edge deployments.",
  },
  {
    id: "ui-ux",
    name: "UI/UX Design",
    description:
      "Wireframes, prototypes, and design systems that hold up in code.",
  },
  {
    id: "performance",
    name: "Performance",
    description:
      "Audits, refactors, and Core Web Vitals work that ships to production.",
  },
] as const;

export function ServicesPreviewSection() {
  return (
    <Section density="default" id="services">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal>
              <Eyebrow>Services</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <Heading variant="h2" className="mt-4 max-w-xl">
                <TextReveal text="What we do, end to end." />
              </Heading>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <Link
              href="/services"
              className="inline-flex items-center gap-1 self-start text-small font-medium text-foreground no-underline hover:no-underline"
            >
              All services
              <ArrowUpRightIcon aria-hidden />
            </Link>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
          {services.map((service, i) => (
            <li key={service.id} className="bg-background">
              <Reveal delay={0.04 * i} className="h-full">
                <article
                  className={cn(
                    "flex h-full flex-col gap-3 p-6 sm:p-8",
                    "transition-colors duration-fast ease-out-quart",
                    "hover:bg-muted/50",
                  )}
                >
                  <Heading variant="h3" as="h3" className="text-pretty">
                    <Link
                      href={`/services#${service.id}`}
                      className="text-foreground no-underline hover:no-underline"
                    >
                      {service.name}
                    </Link>
                  </Heading>
                  <Text tone="muted" className="text-pretty">
                    {service.description}
                  </Text>
                  <Link
                    href={`/services#${service.id}`}
                    className="mt-auto inline-flex items-center gap-1 self-start pt-2 text-small text-muted-foreground hover:text-foreground"
                  >
                    Learn more
                    <ArrowUpRightIcon aria-hidden />
                  </Link>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
