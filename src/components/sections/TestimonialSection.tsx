import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/motion";

/**
 * Testimonial — single social-proof block.
 *
 * The attribution below uses an editorial placeholder: a fictional
 * but realistic client/role, marked clearly so it doesn't read as
 * a real endorsement. Once a client roster and approvals are in
 * place, replace the `attribution` and `company` constants with
 * real, signed quotes.
 */
export function TestimonialSection() {
  return (
    <Section tone="muted" density="default" id="testimonial">
      <Container className="max-w-3xl text-center">
        <Reveal>
          <Eyebrow>From our clients</Eyebrow>
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
                they would, on the budget they said they would, and the
                result quietly outperforms everything we&apos;ve shipped
                before. The codebase is the cleanest we&apos;ve ever
                inherited.&rdquo;
              </Heading>
            </blockquote>
            <figcaption className="mt-8">
              <Text tone="muted" variant="small" as="p">
                — Editorial sample. Replace with a real, approved client
                quote before launch.
              </Text>
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </Section>
  );
}
