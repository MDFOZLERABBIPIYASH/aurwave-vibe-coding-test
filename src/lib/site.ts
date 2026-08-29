/**
 * Site-wide constants. Centralized so metadata, nav, and footers stay in sync.
 * See: docs/03-information-architecture.md
 *
 * `url` is read from `NEXT_PUBLIC_SITE_URL` and is the source of truth
 * for absolute URLs in metadata + sitemap. The fallback only kicks in
 * when the env var is missing or empty — an empty string would
 * otherwise cause `new URL("")` to throw during the build (which
 * breaks `/_not-found` and any other page that uses `metadataBase`).
 *
 * `email` falls back to `CONTACT_EMAIL` (configured per environment
 * in `.env.local` for dev, in the Vercel project for prod). If
 * neither is set, it falls back to a placeholder so the build
 * never breaks.
 */
const FALLBACK_SITE_URL = "http://localhost:3000";
const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const siteUrl =
  rawSiteUrl && rawSiteUrl.trim().length > 0 ? rawSiteUrl : FALLBACK_SITE_URL;

export const siteConfig = {
  name: "Aurwave",
  shortDescription:
    "A modern digital agency crafting thoughtful, high-performing digital experiences.",
  url: siteUrl,
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
