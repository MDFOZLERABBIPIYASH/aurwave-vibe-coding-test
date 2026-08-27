import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactForm } from "@/components/sections/ContactForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your project. Aurwave replies to every inquiry within two business days.",
};

/**
 * Contact page.
 *
 * Phase 04 ships a stub form. Real validation, accessibility, and the
 * `/api/contact` server route are added in Phase 06.
 */
export default function ContactPage() {
  return (
    <>
      <Section density="default">
        <Container>
          <Eyebrow>Contact</Eyebrow>
          <Heading variant="display-md" as="h1" className="mt-4">
            Let&apos;s start a project
          </Heading>
          <Text variant="body-lg" tone="muted" className="mt-6 max-w-2xl">
            Tell us a little about what you&apos;re working on. We reply to every
            inquiry within two business days.
          </Text>
        </Container>
      </Section>

      <Section tone="muted" density="default">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
            <aside className="lg:col-span-5">
              <Heading variant="h3" as="h2">
                Reach us directly
              </Heading>
              <Text tone="muted" className="mt-3">
                Prefer email? Drop us a line and we&apos;ll route you to the right
                person.
              </Text>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-4 inline-block text-body text-foreground underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:decoration-foreground"
              >
                {siteConfig.email}
              </a>

              <Heading variant="h3" as="h2" className="mt-12">
                What happens next
              </Heading>
              <ol className="mt-4 space-y-3 text-body text-foreground/90">
                <li>1. We read your message within 24 hours.</li>
                <li>2. A 30-minute intro call to align on scope.</li>
                <li>3. A short proposal — usually within a week.</li>
              </ol>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
