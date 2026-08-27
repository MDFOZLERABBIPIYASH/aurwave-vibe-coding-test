import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Testimonial — single social-proof block.
 *
 * The quote and attribution below are placeholders for layout review.
 * Real quotes from shipped projects land in Phase 08 (Content and
 * Asset Integration) once the client roster and approvals are in place.
 */
export function TestimonialSection() {
  return (
    <Section tone="muted" density="default" id="testimonial">
      <Container className="max-w-3xl text-center">
        <Reveal>
          <Eyebrow>Testimonial</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <figure className="mt-8">
            <blockquote>
              <Heading
                as="p"
                variant="display-md"
                className="font-display font-medium text-balance"
              >
                &ldquo;Aurwave shipped the new site on the date they said
                they would, on the budget they said it would, and the
                result quietly outperforms everything we&apos;ve shipped
                before.&rdquo;
              </Heading>
            </blockquote>
            <figcaption className="mt-8">
              <Text tone="muted" variant="small" as="p">
                — Placeholder name, role at a placeholder company
              </Text>
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </Section>
  );
}
