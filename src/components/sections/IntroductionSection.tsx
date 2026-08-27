import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Introduction — second section, builds trust after the hero.
 *
 * Three short answers, structured for skim-reading:
 *  1. Who Aurwave is.
 *  2. What problems we solve.
 *  3. The kind of work we ship.
 *
 * Layout: a single column on mobile, two columns from `sm` upward so
 * the eyebrow / heading sit on the left and the body copy on the right.
 */
export function IntroductionSection() {
  return (
    <Section tone="muted" density="default" id="introduction">
      <Container>
        <div className="grid gap-10 sm:grid-cols-12 sm:gap-12">
          <div className="sm:col-span-5">
            <Reveal>
              <Eyebrow>About Aurwave</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <Heading variant="h2" className="mt-4">
                A small studio that ships like a large one.
              </Heading>
            </Reveal>
          </div>
          <div className="sm:col-span-7">
            <Reveal delay={0.12}>
              <Text tone="muted" className="text-pretty">
                We&apos;re a focused team of designers and engineers. No
                middle layer, no account managers — the people scoping the
                work are the people building it. We work with a small number
                of clients at a time so every engagement gets our full
                attention.
              </Text>
            </Reveal>
            <Reveal delay={0.18}>
              <Text tone="muted" className="mt-4 text-pretty">
                We help teams who care about how their product feels. That
                means thoughtful design, maintainable code, and a real
                performance budget. It means accessibility from the first
                commit, not as a launch-day checklist.
              </Text>
            </Reveal>
            <Reveal delay={0.24}>
              <Text tone="muted" className="mt-4 text-pretty">
                The result is work that ships on time, performs well in
                production, and is easy for your team to keep moving after
                we&apos;re gone.
              </Text>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
