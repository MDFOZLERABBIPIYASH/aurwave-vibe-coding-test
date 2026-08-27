import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowUpRightIcon, ArrowRightIcon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import {
  allProjectSlugs,
  getProject,
  projects,
  sortProjects,
} from "@/lib/projects";
import { siteConfig } from "@/lib/site";

/**
 * Pre-render every project at build time so case study pages are
 * served as static HTML.
 */
export function generateStaticParams() {
  return allProjectSlugs().map((slug) => ({ slug }));
}

/** Per-page metadata — uses the project name + summary. */
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.name,
    description: project.summary,
  };
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProject(params.slug);
  if (!project) notFound();

  // For the "next project" link, find the project immediately after this
  // one in the chronological list.
  const sorted = sortProjects(projects);
  const index = sorted.findIndex((p) => p.slug === project.slug);
  const next = sorted[(index + 1) % sorted.length] ?? project;

  return (
    <>
      <Section density="default" className="relative overflow-hidden">
        <Container>
          <Reveal>
            <Link
              href="/work"
              className="inline-flex items-center gap-1 text-small text-muted-foreground hover:text-foreground"
            >
              ← All work
            </Link>
          </Reveal>
          <Reveal delay={0.08}>
            <Eyebrow className="mt-8">
              {project.industry} · {project.year}
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.16}>
            <Heading
              as="h1"
              variant="display-xl"
              className="mt-4 max-w-3xl text-balance"
            >
              {project.name}
            </Heading>
          </Reveal>
          <Reveal delay={0.24}>
            <Text
              variant="body-lg"
              tone="muted"
              className="mt-6 max-w-2xl text-pretty"
            >
              {project.description}
            </Text>
          </Reveal>

          <Reveal delay={0.32}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {project.services.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-border bg-background px-3 py-1 text-small text-muted-foreground"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>

        {/* Hero preview surface. Real imagery lands in Phase 08. */}
        <Container className="mt-16">
          <div
            aria-hidden
            className={cn(
              "aspect-[16/9] w-full overflow-hidden rounded-xl border border-border bg-gradient-to-br",
              project.accent,
            )}
          >
            <div className="h-full w-full bg-[linear-gradient(135deg,transparent_0%,rgba(0,0,0,0.04)_100%)]" />
          </div>
        </Container>
      </Section>

      <Section tone="muted" density="default">
        <Container>
          <div className="grid gap-16 sm:grid-cols-12">
            <div className="sm:col-span-7">
              <DetailBlock label="Problem" body={project.problem} />
              <DetailBlock
                label="Approach"
                body={project.approach}
                className="mt-12"
              />
              <DetailBlock label="Results" body={project.results} className="mt-12" />
            </div>
            <aside className="sm:col-span-5">
              {project.metrics && project.metrics.length > 0 ? (
                <div>
                  <Eyebrow>By the numbers</Eyebrow>
                  <dl className="mt-6 grid grid-cols-1 gap-4">
                    {project.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="rounded-lg border border-border bg-background p-5"
                      >
                        <dt className="text-eyebrow uppercase tracking-[0.18em] text-muted-foreground">
                          {m.label}
                        </dt>
                        <dd className="mt-2 font-display text-h2 font-semibold tracking-tight text-foreground">
                          {m.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ) : null}
            </aside>
          </div>
        </Container>
      </Section>

      <Section density="default">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>Next project</Eyebrow>
              <Heading variant="h2" as="p" className="mt-4 text-balance">
                {next.name}
              </Heading>
            </div>
            <Button href={`/work/${next.slug}`} intent="primary" size="lg">
              Continue reading
              <ArrowRightIcon className="ml-1" aria-hidden />
            </Button>
          </div>
        </Container>
      </Section>

      <Section
        tone="muted"
        density="default"
        className="border-t border-border"
      >
        <Container className="text-center">
          <Heading as="h2" variant="display-md" className="text-balance">
            Have a project like this in mind?
          </Heading>
          <Text tone="muted" variant="body-lg" className="mx-auto mt-6 max-w-xl text-pretty">
            We take on a small number of engagements at a time. If this feels
            like your kind of work, we should talk.
          </Text>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href={siteConfig.primaryCta.href} intent="primary" size="lg">
              Start a project
              <ArrowUpRightIcon className="ml-1" aria-hidden />
            </Button>
            <Button href="/work" intent="ghost" size="lg">
              See all work
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}

function DetailBlock({
  label,
  body,
  className,
}: {
  label: string;
  body: string;
  className?: string;
}) {
  return (
    <div className={cn(className)}>
      <Eyebrow>{label}</Eyebrow>
      <Text tone="muted" className="mt-4 text-pretty">
        {body}
      </Text>
    </div>
  );
}
