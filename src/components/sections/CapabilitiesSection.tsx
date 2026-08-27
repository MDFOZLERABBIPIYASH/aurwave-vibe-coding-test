import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Capabilities — the technology stack, grouped by role.
 *
 * Per docs/04 we only show what Aurwave actually uses:
 *  - Frontend: React, Next.js, TypeScript
 *  - Styling: Tailwind CSS
 *  - Animation: Motion
 *  - Deployment: Vercel
 *
 * Layout is a four-column grid on desktop, two on tablet, single column
 * on mobile. Each column gets a quiet label and a list of pills so the
 * section scans like a cheat-sheet rather than a logo wall.
 */
const groups = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript"],
  },
  {
    label: "Styling",
    items: ["Tailwind CSS"],
  },
  {
    label: "Animation",
    items: ["Motion"],
  },
  {
    label: "Deployment",
    items: ["Vercel"],
  },
] as const;

export function CapabilitiesSection() {
  return (
    <Section density="default" id="capabilities">
      <Container>
        <div className="grid gap-10 sm:grid-cols-12 sm:gap-12">
          <div className="sm:col-span-4">
            <Reveal>
              <Eyebrow>Capabilities</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <Heading variant="h2" className="mt-4 text-balance">
                A small, deliberate stack.
              </Heading>
            </Reveal>
            <Reveal delay={0.16}>
              <Text tone="muted" className="mt-6 text-pretty">
                We work with a tight set of well-understood tools. That
                keeps projects fast, code review focused, and the result
                maintainable long after we hand it over.
              </Text>
            </Reveal>
          </div>

          <dl className="grid gap-8 sm:col-span-8 sm:grid-cols-2">
            {groups.map((group, i) => (
              <Reveal key={group.label} delay={0.04 * i}>
                <div>
                  <dt className="text-eyebrow uppercase tracking-[0.18em] text-muted-foreground">
                    {group.label}
                  </dt>
                  <dd className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border bg-background px-3 py-1 text-small text-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </Container>
    </Section>
  );
}
