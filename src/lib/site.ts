/**
 * Site-wide constants. Centralized so metadata, nav, and footers stay in sync.
 * See: docs/03-information-architecture.md
 */
export const siteConfig = {
  name: "Aurwave",
  shortDescription:
    "A modern digital agency crafting thoughtful, high-performing digital experiences.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "hello@aurwave.com",
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
