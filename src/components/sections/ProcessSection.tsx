import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Process — five steps from kickoff to launch.
 *
 * Per docs/04 the canonical sequence is:
 *  01. Discover
 *  02. Define
 *  03. Design
 *  04. Develop
 *  05. Launch
 *
 * Each step is a short description. Index numbers are styled as quiet
 * monospace labels so the cadence reads without screaming.
 */
const steps = [
  {
    name: "Discover",
    description:
      "Stakeholder interviews, user research, competitive audit, and a shared success metric. We leave this phase with a clear brief and a tight scope.",
  },
  {
    name: "Define",
    description:
      "Information architecture, content strategy, and the technical approach. A short, written plan that the whole team can point at.",
  },
  {
    name: "Design",
    description:
      "Wireframes, then visual design in code. We work in real components so what we design is what gets built.",
  },
  {
    name: "Develop",
    description:
      "Production-grade engineering: TypeScript, accessibility, performance budgets, and a test suite that runs on every commit.",
  },
  {
    name: "Launch",
    description:
      "Edge deployment, analytics, monitoring, and a written handoff. We stay close after launch to handle the things that only show up in production.",
  },
] as const;

export function ProcessSection() {
  return (
    <Section tone="muted" density="default" id="process">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Process</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <Heading variant="h2" className="mt-4 text-balance">
              How an engagement runs.
            </Heading>
          </Reveal>
          <Reveal delay={0.16}>
            <Text tone="muted" className="mt-6 max-w-xl text-pretty">
              Predictable phases, written outputs, and a clear handoff at the
              end. Nothing is hidden inside a long email chain.
            </Text>
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, i) => (
            <li key={step.name} className="flex flex-col gap-3">
              <Reveal delay={0.04 * i}>
                <span
                  aria-hidden
                  className="font-display text-h4 font-medium text-muted-foreground"
                >
                  0{i + 1}
                </span>
                <Heading
                  variant="h3"
                  as="h3"
                  className="mt-2 text-balance"
                >
                  {step.name}
                </Heading>
                <Text tone="muted" className="mt-2 text-pretty">
                  {step.description}
                </Text>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
