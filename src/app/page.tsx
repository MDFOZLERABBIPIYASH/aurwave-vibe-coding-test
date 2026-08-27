import {
  HeroSection,
  IntroductionSection,
  ServicesPreviewSection,
  SelectedWorkSection,
  WhyAurwaveSection,
  ProcessSection,
  CapabilitiesSection,
  TestimonialSection,
  FinalCTASection,
} from "@/components/sections";

/**
 * Homepage.
 *
 * Section order follows the user journey in
 * `docs/03-information-architecture.md`:
 *   1. Hero          — what we do, primary CTA
 *   2. Introduction  — who we are, who we help
 *   3. Services      — what we do, in detail
 *   4. Selected Work — proof in shipped projects
 *   5. Why Aurwave   — differentiation
 *   6. Process       — how an engagement runs
 *   7. Capabilities  — the technology stack
 *   8. Testimonial   — social proof
 *   9. Final CTA     — last call to action
 *
 * The Header and Footer are mounted in `app/layout.tsx` and wrap every
 * page, so they are not imported here.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IntroductionSection />
      <ServicesPreviewSection />
      <SelectedWorkSection />
      <WhyAurwaveSection />
      <ProcessSection />
      <CapabilitiesSection />
      <TestimonialSection />
      <FinalCTASection />
    </>
  );
}
