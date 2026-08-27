import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Why Aurwave — differentiation.
 *
 * Four concrete, value-driven points. Per docs/04 the writing must avoid
 * generic statements ("we are passionate about…"). Each point commits
 * to a behavior the client can verify on the project.
 */
const points = [
  {
    title: "Strategy before execution",
    body: "We start with discovery, not design. Every build is anchored in user research, competitive context, and a measurable success metric.",
  },
  {
    title: "Design and development, together",
    body: "Designers and engineers work in the same room. The result is a site that looks the way it does because of how it's built — not in spite of it.",
  },
  {
    title: "Performance is a feature",
    body: "Every project ships with a real performance budget. We treat Core Web Vitals as a launch criterion, not a launch afterthought.",
  },
  {
    title: "Clear, written communication",
    body: "Weekly Loom summaries, async-first decisions, and documentation that lives with the code. No mystery, no status meetings.",
  },
] as const;

export function WhyAurwaveSection() {
  return (
    <Section density="default" id="why">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Why Aurwave</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <Heading variant="h2" className="mt-4 text-balance">
              The way we work, in four commitments.
            </Heading>
          </Reveal>
          <Reveal delay={0.16}>
            <Text tone="muted" className="mt-6 max-w-xl text-pretty">
              We&apos;ve made these promises on every project we&apos;ve
              shipped. They&apos;re the reason clients come back.
            </Text>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
          {points.map((point, i) => (
            <li key={point.title} className="bg-background">
              <Reveal delay={0.04 * i} className="h-full">
                <article className="flex h-full flex-col gap-3 p-6 sm:p-8">
                  <span
                    aria-hidden
                    className="font-display text-eyebrow uppercase tracking-[0.18em] text-muted-foreground"
                  >
                    0{i + 1}
                  </span>
                  <Heading variant="h3" as="h3" className="text-balance">
                    {point.title}
                  </Heading>
                  <Text tone="muted" className="text-pretty">
                    {point.body}
                  </Text>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
