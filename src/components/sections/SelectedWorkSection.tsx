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
 * Selected work — three featured projects on the homepage.
 *
 * Per docs/04, each card shows: project name, industry, short
 * description, services provided, and a visual preview. Real project
 * images land in Phase 08; for now we use a calm placeholder surface
 * so the layout reads correctly during development and review.
 */
const projects = [
  {
    slug: "northwind-commerce",
    name: "Northwind Commerce",
    industry: "E-commerce",
    description:
      "A headless storefront rebuild that doubled mobile conversion and shipped in eight weeks.",
    services: ["Web Design", "Web Development"],
    accent: "from-muted to-muted/40",
  },
  {
    slug: "lumen-marketing",
    name: "Lumen Marketing",
    industry: "B2B SaaS",
    description:
      "A brand site and design system that finally matched the quality of the product underneath.",
    services: ["UI/UX", "Web Design"],
    accent: "from-muted/60 to-muted/20",
  },
  {
    slug: "harbor-financial",
    name: "Harbor Financial",
    industry: "Fintech",
    description:
      "Performance-first marketing site. 100 Lighthouse, sub-second LCP on every page.",
    services: ["Web Development", "Performance"],
    accent: "from-muted/40 to-muted/70",
  },
] as const;

export function SelectedWorkSection() {
  return (
    <Section tone="muted" density="default" id="work">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal>
              <Eyebrow>Selected work</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <Heading variant="h2" className="mt-4 max-w-xl">
                <TextReveal text="Recent projects." />
              </Heading>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <Link
              href="/work"
              className="inline-flex items-center gap-1 self-start text-small font-medium text-foreground no-underline hover:no-underline"
            >
              All work
              <ArrowUpRightIcon aria-hidden />
            </Link>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <li key={project.slug}>
              <Reveal delay={0.06 * i}>
                <article className="group flex h-full flex-col transition-transform duration-fast ease-out-quart hover:-translate-y-0.5">
                  <Link
                    href={`/work/${project.slug}`}
                    aria-label={`${project.name} — ${project.industry}`}
                    className="block focus-visible:outline-none"
                  >
                    <div
                      className={cn(
                        "relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border bg-gradient-to-br",
                        project.accent,
                        "transition-transform duration-fast ease-out-quart",
                        "group-hover:scale-[1.01]",
                      )}
                      aria-hidden
                    >
                      <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(0,0,0,0.04)_100%)]" />
                      <div className="absolute bottom-3 left-3 rounded bg-foreground/80 px-2 py-0.5 text-eyebrow uppercase tracking-[0.18em] text-background">
                        Preview
                      </div>
                    </div>
                  </Link>
                  <div className="mt-5 flex flex-1 flex-col">
                    <p className="text-eyebrow uppercase tracking-[0.18em] text-muted-foreground">
                      {project.industry}
                    </p>
                    <Heading variant="h3" as="h3" className="mt-2 text-balance">
                      <Link
                        href={`/work/${project.slug}`}
                        className="text-foreground no-underline hover:no-underline"
                      >
                        {project.name}
                      </Link>
                    </Heading>
                    <Text tone="muted" className="mt-3 text-pretty">
                      {project.description}
                    </Text>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {project.services.map((s) => (
                        <li
                          key={s}
                          className="rounded-full border border-border bg-background px-3 py-1 text-small text-muted-foreground"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
