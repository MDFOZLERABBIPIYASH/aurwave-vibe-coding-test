import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Aurwave privacy policy.",
};

/**
 * Placeholder privacy page. Real policy copy is added before launch
 * (per plan.md open questions).
 */
export default function PrivacyPage() {
  return (
    <Section density="default">
      <Container className="max-w-2xl">
        <Eyebrow>Legal</Eyebrow>
        <Heading variant="display-md" as="h1" className="mt-4">
          Privacy
        </Heading>
        <Text tone="muted" className="mt-6">
          A complete privacy policy will be published before launch. This page
          exists as a layout placeholder so footer links resolve during
          development.
        </Text>
      </Container>
    </Section>
  );
}
