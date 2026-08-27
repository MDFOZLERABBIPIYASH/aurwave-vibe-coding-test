import { Container } from "@/components/ui/Container";
import { Link } from "@/components/ui/Link";
import { Text } from "@/components/ui/Text";
import { Logo } from "@/components/ui/Logo";
import { primaryNav, siteConfig } from "@/lib/site";

/**
 * Footer — site-wide, lives at the bottom of every page.
 *
 * Structure (per docs/03-information-architecture.md):
 *  - Wordmark + short description.
 *  - Two navigation columns: primary sitemap + services (placeholder
 *    list; replaced when /services is built in Phase 06).
 *  - Contact column with email and (placeholder) social links.
 *  - Bottom row: copyright + legal placeholders.
 *
 * Server component — no state. Legal placeholders are anchor links
 * to /privacy and /terms so the layout is complete even before the
 * pages are authored.
 */
export function Footer() {
  const year = new Date().getFullYear();

  const services = [
    { label: "Web Design", href: "/services#web-design" },
    { label: "Web Development", href: "/services#web-development" },
    { label: "UI/UX Design", href: "/services#ui-ux" },
    { label: "E-commerce", href: "/services#e-commerce" },
    { label: "Performance", href: "/services#performance" },
  ];

  return (
    <footer
      className="border-t border-border bg-muted py-section-y"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center text-foreground no-underline hover:no-underline"
              aria-label={`${siteConfig.name} home`}
            >
              <Logo variant="wordmark" width={120} title={siteConfig.name} />
            </Link>
            <Text tone="muted" className="mt-4 max-w-md">
              {siteConfig.shortDescription}
            </Text>
          </div>

          <nav
            aria-label="Sitemap"
            className="grid gap-8 sm:grid-cols-3 lg:col-span-7"
          >
            <div>
              <h3 className="text-eyebrow uppercase tracking-[0.18em] text-muted-foreground">
                Sitemap
              </h3>
              <ul className="mt-4 space-y-3">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} subtle>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-eyebrow uppercase tracking-[0.18em] text-muted-foreground">
                Services
              </h3>
              <ul className="mt-4 space-y-3">
                {services.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} subtle>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-eyebrow uppercase tracking-[0.18em] text-muted-foreground">
                Contact
              </h3>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="rounded-sm text-small text-foreground/80 underline decoration-transparent underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  <Link href="/contact" subtle>
                    Start a project
                  </Link>
                </li>
              </ul>
              {/* Social placeholders. Replaced with real links in Phase 08. */}
              <ul className="mt-4 flex gap-3">
                {[
                  { label: "GitHub", href: "https://github.com" },
                  { label: "LinkedIn", href: "https://linkedin.com" },
                  { label: "X", href: "https://x.com" },
                ].map((s) => (
                  <li key={s.label}>
                    <Link href={s.href} external subtle>
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <Text variant="small" tone="muted" as="p">
            © {year} {siteConfig.name}. All rights reserved.
          </Text>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <Link href="/privacy" subtle>
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" subtle>
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
