import { describe, it, expect } from "vitest";
import { cn, variants } from "@/lib/variants";
import { cn as cnOriginal } from "@/lib/cn";

describe("cn re-export", () => {
  it("matches the canonical cn helper (same identity)", () => {
    expect(cn).toBe(cnOriginal);
  });

  it("merges class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("ignores falsy values", () => {
    expect(cn("foo", false, null, undefined, "bar")).toBe("foo bar");
  });

  it("resolves tailwind conflicts with the last class winning", () => {
    expect(cn("px-4", "px-8")).toBe("px-8");
  });

  it("preserves text-primary-foreground alongside bg-primary", () => {
    // Regression: twMerge collapses `text-primary-foreground` if it
    // doesn't know about the foreground color token. This test guards the
    // custom merge config in `@/lib/tailwind-merge`.
    const merged = cn("bg-primary", "text-primary-foreground");
    expect(merged).toContain("bg-primary");
    expect(merged).toContain("text-primary-foreground");
  });
});

describe("variants", () => {
  const button = variants({
    base: "inline-flex rounded font-medium",
    variants: {
      intent: {
        primary: "bg-primary text-primary-foreground",
        secondary: "border border-border bg-transparent",
      },
      size: {
        sm: "h-9 px-3 text-small",
        md: "h-11 px-5 text-body",
      },
    },
    defaultVariants: { intent: "primary", size: "md" },
  });

  it("applies defaults when no props are passed", () => {
    const out = button();
    expect(out).toContain("inline-flex");
    expect(out).toContain("rounded");
    expect(out).toContain("bg-primary");
    expect(out).toContain("text-primary-foreground");
    expect(out).toContain("h-11");
    expect(out).toContain("px-5");
    expect(out).toContain("text-body");
  });

  it("applies the selected variant", () => {
    const out = button({ intent: "secondary", size: "sm" });
    expect(out).toContain("border");
    expect(out).toContain("border-border");
    expect(out).toContain("bg-transparent");
    expect(out).toContain("h-9");
    expect(out).toContain("px-3");
    expect(out).toContain("text-small");
  });

  it("merges additional className with conflicts resolved", () => {
    const out = button({ size: "sm", className: "px-6" });
    expect(out).toContain("px-6");
    expect(out).not.toContain("px-3");
  });

  it("handles missing defaultVariants gracefully", () => {
    const noDefaults = variants({
      variants: { tone: { light: "bg-white", dark: "bg-black" } },
    });
    expect(noDefaults()).toBe("");
    expect(noDefaults({ tone: "dark" })).toBe("bg-black");
  });

  it("ignores unknown variant values", () => {
    // Cast is required for the runtime test — TypeScript would normally
    // reject this, but we want to verify the helper doesn't crash on
    // unexpected input (defense in depth).
    const out = button({ intent: "nonexistent" } as unknown as Parameters<typeof button>[0]);
    expect(out).not.toContain("nonexistent");
    // Defaults should still apply for size.
    expect(out).toContain("h-11");
  });
});
