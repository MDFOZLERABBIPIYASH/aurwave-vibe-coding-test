import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/ui/Icon";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Aurwave is a small, senior web design and development studio. Learn about our approach, mission, and values.",
};

const values = [
  {
    title: "Show the work early.",
    body: "We share rough drafts, not finished decks. The fastest path to the right answer is to put something on the screen and react to it.",
  },
  {
    title: "Quiet design, loud results.",
    body: "Our design voice is restrained. The product does the talking, the marketing does its job, and nothing gets in the way of either.",
  },
  {
    title: "Performance is a feature.",
    body: "Every project ships with a real performance budget. Core Web Vitals are a launch criterion, not a launch afterthought.",
  },
  {
    title: "Accessibility is non-negotiable.",
    body: "Keyboard navigation, visible focus, semantic HTML, real contrast. We treat these as table stakes, not extras.",
  },
  {
    title: "Async-first communication.",
    body: "Loom, written briefs, and a shared workspace. We default to async so the work moves at the speed of thought, not the calendar.",
  },
  {
    title: "Documentation that lives with the code.",
    body: "Decisions are written down where the next person will look. A maintainable handoff is the end of every engagement, not an extra.",
  },
];

const stats = [
  { value: "10+", label: "Years building for the web" },
  { value: "40+", label: "Projects shipped" },
  { value: "5", label: "On the team at a time" },
];

export default function AboutPage() {
  return (
    <>
      <Section density="default">
        <Container>
          <Reveal>
            <Eyebrow>About</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <Heading
              variant="display-lg"
              as="h1"
              className="mt-4 max-w-3xl text-balance"
            >
              A small, senior studio that ships like a large one.
            </Heading>
          </Reveal>
          <Reveal delay={0.16}>
            <Text
              variant="body-lg"
              tone="muted"
              className="mt-6 max-w-2xl text-pretty"
            >
              Aurwave is a focused team of designers and engineers. We work
              with a small number of clients at a time so every engagement
              gets our full attention.
            </Text>
          </Reveal>
        </Container>
      </Section>

      <Section tone="muted" density="default">
        <Container>
          <dl className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="bg-background p-8 text-center">
                <dt className="font-display text-display-md font-semibold tracking-tight text-foreground">
                  {s.value}
                </dt>
                <dd className="mt-2 text-small text-muted-foreground">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section density="default">
        <Container className="grid gap-10 sm:grid-cols-12 sm:gap-12">
          <div className="sm:col-span-5">
            <Reveal>
              <Eyebrow>Mission</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <Heading variant="h2" className="mt-4 text-balance">
                Build web products that respect the people who use them.
              </Heading>
            </Reveal>
          </div>
          <div className="sm:col-span-7">
            <Reveal delay={0.12}>
              <Text tone="muted" className="text-pretty">
                We exist to make the web a little less disposable. Every site
                we ship should be a little faster, a little more accessible,
                and a little more honest than what was there before.
              </Text>
            </Reveal>
            <Reveal delay={0.18}>
              <Text tone="muted" className="mt-4 text-pretty">
                That means doing the boring work — the design systems, the
                performance budgets, the documentation — even when nobody
                asks for it. The result is a site your team can keep moving
                for years, not months.
              </Text>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="muted" density="default">
        <Container>
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Values</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <Heading variant="h2" className="mt-4 text-balance">
                How we work, in six commitments.
              </Heading>
            </Reveal>
          </div>

          <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
            {values.map((v, i) => (
              <li key={v.title} className="bg-background">
                <Reveal delay={0.04 * i} className="h-full">
                  <article className="flex h-full flex-col gap-3 p-6 sm:p-8">
                    <Heading variant="h3" as="h3" className="text-balance">
                      {v.title}
                    </Heading>
                    <Text tone="muted" className="text-pretty">
                      {v.body}
                    </Text>
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section density="default" className="border-t border-border">
        <Container className="text-center sm:text-left">
          <div className="grid gap-8 sm:grid-cols-12 sm:items-end">
            <div className="sm:col-span-7">
              <Heading variant="h2" as="h2" className="text-balance">
                Work with us.
              </Heading>
              <Text tone="muted" variant="body-lg" className="mt-4 max-w-xl text-pretty">
                We take on a small number of engagements at a time. If
                Aurwave sounds like your kind of team, let&apos;s talk.
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
