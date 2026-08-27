import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { Reveal, TextReveal } from "@/components/motion";
import { ArrowRightIcon } from "@/components/ui/Icon";
import { siteConfig } from "@/lib/site";

/**
 * Final CTA — the homepage's last call to action.
 *
 * Per docs/04 the structure is direct:
 *  - Headline: "Have a project in mind?"
 *  - Supporting text: a brief invitation to discuss the project
 *  - CTA: "Start a Conversation" → /contact
 */
export function FinalCTASection() {
  return (
    <Section density="default" id="contact-cta" className="border-t border-border">
      <Container className="max-w-3xl text-center sm:text-left">
        <Reveal>
          <Heading
            as="h2"
            variant="display-lg"
            className="text-balance"
          >
            <TextReveal text="Have a project in mind?" />
          </Heading>
        </Reveal>
        <Reveal delay={0.08}>
          <Text tone="muted" variant="body-lg" className="mt-6 text-pretty">
            Tell us what you&apos;re working on. We&apos;ll get back to you
            within two business days and tell you honestly whether
            we&apos;re the right team for it.
          </Text>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <Button href={siteConfig.primaryCta.href} intent="primary" size="lg">
              Start a conversation
              <ArrowRightIcon className="ml-1" aria-hidden />
            </Button>
            <Button href="/work" intent="ghost" size="lg">
              See our work first
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
