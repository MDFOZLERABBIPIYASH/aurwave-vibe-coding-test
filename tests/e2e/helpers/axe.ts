import AxeBuilder from "@axe-core/playwright";
import type { Page } from "@playwright/test";

/**
 * Run axe-core against the current page with the WCAG 2.2 AA ruleset.
 *
 * Returns a list of violations. The caller decides what to do with
 * them — typically fail the test if any are `critical` or `serious`,
 * log the rest for follow-up.
 */
export type AxeViolation = {
  id: string;
  impact: "minor" | "moderate" | "serious" | "critical" | null;
  description: string;
  helpUrl: string;
  nodes: number;
};

export async function runAxe(page: Page): Promise<AxeViolation[]> {
  const builder = new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]);
  const results = await builder.analyze();
  return results.violations.map((v) => ({
    id: v.id,
    impact: v.impact ?? null,
    description: v.description,
    helpUrl: v.helpUrl,
    nodes: v.nodes.length,
  }));
}

/**
 * Build a one-line summary of a violation, useful in test failure
 * messages.
 */
export function summarize(v: AxeViolation): string {
  return `[${v.impact ?? "unknown"}] ${v.id} — ${v.description} (${v.nodes} node${v.nodes === 1 ? "" : "s"})`;
}
