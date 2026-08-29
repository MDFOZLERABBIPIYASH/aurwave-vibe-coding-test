/**
 * Site-wide constants. Centralized so metadata, nav, and footers stay in sync.
 * See: docs/03-information-architecture.md
 *
 * `email` falls back to `CONTACT_EMAIL` (configured per environment in
 * `.env.local` for dev, in the Vercel project for prod). If neither
 * is set, it falls back to a placeholder so the build never breaks.
 */
export const siteConfig = {
  name: "Aurwave",
  shortDescription:
    "A modern digital agency crafting thoughtful, high-performing digital experiences.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email:
    process.env.CONTACT_EMAIL && process.env.CONTACT_EMAIL.length > 0
      ? process.env.CONTACT_EMAIL
      : "hello@aurwave.com",
  primaryCta: { label: "Start a Project", href: "/contact" },
} as const;

export const primaryNav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export type NavItem = (typeof primaryNav)[number];
