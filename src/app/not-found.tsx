import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Section density="default">
      <Container className="max-w-xl text-center sm:text-left">
        <p className="text-eyebrow uppercase tracking-[0.18em] text-muted-foreground">
          404
        </p>
        <Heading variant="display-md" as="h1" className="mt-4">
          We couldn&apos;t find that page
        </Heading>
        <Text tone="muted" className="mt-4">
          The link may be broken, or the page may have moved. Head back home
          and we&apos;ll point you in the right direction.
        </Text>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
          <Button href="/" intent="primary">
            Back to home
          </Button>
          <Button href="/contact" intent="ghost">
            Contact us
          </Button>
        </div>
      </Container>
    </Section>
  );
}
