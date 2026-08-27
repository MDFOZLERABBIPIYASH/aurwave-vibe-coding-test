import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { Reveal, TextReveal, MagneticHover } from "@/components/motion";
import { ArrowRightIcon } from "@/components/ui/Icon";
import { siteConfig } from "@/lib/site";

/**
 * Hero — first thing visitors see on the homepage.
 *
 * Content (per docs/04-content-strategy.md):
 *  - Eyebrow: Digital Design and Development Agency
 *  - Headline: clear, confident statement about building modern
 *    digital experiences (text-revealed per-word for emphasis)
 *  - Supporting text: short explanation of Aurwave's value
 *  - Primary CTA: Start a Project (→ /contact) wrapped in a subtle
 *    magnetic-hover so it earns a small amount of extra attention
 *  - Secondary CTA: View Our Work (→ /work)
 *
 * Each layer enters with a small `Reveal` and a staggered delay so the
 * page reads top-down without theatrics. Reduced-motion users see the
 * final state immediately.
 */
export function HeroSection() {
  return (
    <Section
      aria-labelledby="hero-heading"
      density="default"
      className="relative overflow-hidden"
    >
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>Digital Design &amp; Development Agency</Eyebrow>
          </Reveal>

          <Heading
            id="hero-heading"
            as="h1"
            variant="display-xl"
            className="mt-6"
          >
            <TextReveal
              text="Considered digital experiences, built to perform."
              delay={0.08}
            />
          </Heading>

          <Reveal delay={0.32}>
            <Text
              variant="body-lg"
              tone="muted"
              className="mt-6 max-w-2xl text-pretty"
            >
              Aurwave is a small, senior studio that designs and engineers
              websites for teams who care about how their product feels as
              much as how it ships.
            </Text>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <MagneticHover>
                <Button
                  href={siteConfig.primaryCta.href}
                  intent="primary"
                  size="lg"
                >
                  {siteConfig.primaryCta.label}
                  <ArrowRightIcon className="ml-1" aria-hidden />
                </Button>
              </MagneticHover>
              <Button href="/work" intent="ghost" size="lg">
                View our work
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* Decorative, calm gradient — quiet, never competing with content. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60vh] bg-gradient-to-b from-muted/40 to-transparent"
      />
    </Section>
  );
}
