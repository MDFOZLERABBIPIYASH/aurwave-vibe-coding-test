import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

/**
 * Tests for `src/lib/site.ts` — focused on the env-var guards that
 * prevent build failures when `NEXT_PUBLIC_SITE_URL` or
 * `CONTACT_EMAIL` are unset / blank / whitespace-only.
 *
 * These cover the regression that broke a Vercel deploy when
 * `NEXT_PUBLIC_SITE_URL` was added as an empty string in the
 * project env-var settings — `new URL("")` throws and
 * `metadataBase` fails to construct, taking `/_not-found` down
 * with it.
 */

describe("siteConfig", () => {
  const ORIGINAL_ENV = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
    vi.resetModules();
  });

  it("falls back to a local URL when NEXT_PUBLIC_SITE_URL is unset", async () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    const { siteConfig } = await import("@/lib/site");
    expect(siteConfig.url).toBe("http://localhost:3000");
    // Must be a parseable URL — this is the line that broke the
    // Vercel deploy when the env var was empty.
    expect(() => new URL(siteConfig.url)).not.toThrow();
  });

  it("falls back to a local URL when NEXT_PUBLIC_SITE_URL is empty", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "";
    const { siteConfig } = await import("@/lib/site");
    expect(siteConfig.url).toBe("http://localhost:3000");
    expect(() => new URL(siteConfig.url)).not.toThrow();
  });

  it("falls back to a local URL when NEXT_PUBLIC_SITE_URL is whitespace", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "   ";
    const { siteConfig } = await import("@/lib/site");
    expect(siteConfig.url).toBe("http://localhost:3000");
  });

  it("uses NEXT_PUBLIC_SITE_URL when it is a real URL", async () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://aurwave-vibe-coding-test.vercel.app";
    const { siteConfig } = await import("@/lib/site");
    expect(siteConfig.url).toBe(
      "https://aurwave-vibe-coding-test.vercel.app",
    );
  });

  it("uses CONTACT_EMAIL when it is set", async () => {
    process.env.CONTACT_EMAIL = "f.r.p.421l@gmail.com";
    const { siteConfig } = await import("@/lib/site");
    expect(siteConfig.email).toBe("f.r.p.421l@gmail.com");
  });

  it("falls back to a placeholder email when CONTACT_EMAIL is unset", async () => {
    delete process.env.CONTACT_EMAIL;
    const { siteConfig } = await import("@/lib/site");
    expect(siteConfig.email).toBe("hello@aurwave.com");
  });

  it("falls back when CONTACT_EMAIL is empty", async () => {
    process.env.CONTACT_EMAIL = "";
    const { siteConfig } = await import("@/lib/site");
    expect(siteConfig.email).toBe("hello@aurwave.com");
  });
});
