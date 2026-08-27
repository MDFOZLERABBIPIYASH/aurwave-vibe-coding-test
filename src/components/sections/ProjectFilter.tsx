"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Heading } from "@/components/ui/Heading";
import { Link } from "@/components/ui/Link";
import { ArrowUpRightIcon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import {
  type Project,
  type ProjectCategory,
  filterProjects,
  projectCategories,
  sortProjects,
} from "@/lib/projects";

/**
 * ProjectFilter — filterable grid for the Work index.
 *
 * The active category lives in the URL as `?category=…` so a filtered
 * view is shareable, and the back/forward buttons do the right thing
 * without client state. SSR renders the unfiltered grid; the client
 * component narrows it without a navigation when the user clicks a
 * filter chip.
 */
export function ProjectFilter({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialCategory = parseCategory(searchParams.get("category"));
  const [active, setActive] = useState<"all" | ProjectCategory>(initialCategory);

  // Keep state in sync if the URL changes (e.g. via the back button).
  useEffect(() => {
    setActive(parseCategory(searchParams.get("category")));
  }, [searchParams]);

  const visible = useMemo<Project[]>(
    () => sortProjects(filterProjects(projects, active)),
    [projects, active],
  );

  const setCategory = useCallback(
    (next: "all" | ProjectCategory) => {
      setActive(next);
      const params = new URLSearchParams(searchParams.toString());
      if (next === "all") {
        params.delete("category");
      } else {
        params.set("category", next);
      }
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter projects by category"
        className="flex flex-wrap gap-2"
      >
        {projectCategories.map((c) => {
          const isActive = active === c.value;
          return (
            <button
              key={c.value}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setCategory(c.value)}
              className={cn(
                "rounded-full border px-4 py-2 text-small font-medium",
                "transition-colors duration-fast ease-out-quart",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isActive
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background text-foreground hover:bg-muted",
              )}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-small text-muted-foreground" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
        {active !== "all" ? ` in ${labelFor(active)}` : ""}.
      </p>

      <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <li key={project.slug}>
            <article className="group flex h-full flex-col">
              <Link
                href={`/work/${project.slug}`}
                aria-label={`${project.name} — ${project.industry}`}
                className="block focus-visible:outline-none"
              >
                <div
                  className={cn(
                    "relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border bg-gradient-to-br",
                    project.accent,
                    "transition-transform duration-fast ease-out-quart",
                    "group-hover:scale-[1.01]",
                  )}
                  aria-hidden
                >
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(0,0,0,0.04)_100%)]" />
                  <div className="absolute bottom-3 left-3 rounded bg-foreground/80 px-2 py-0.5 text-eyebrow uppercase tracking-[0.18em] text-background">
                    {project.industry}
                  </div>
                </div>
              </Link>
              <div className="mt-5 flex flex-1 flex-col">
                <p className="text-eyebrow uppercase tracking-[0.18em] text-muted-foreground">
                  {labelFor(project.category)} · {project.year}
                </p>
                <Heading variant="h3" as="h3" className="mt-2 text-balance">
                  <Link
                    href={`/work/${project.slug}`}
                    className="text-foreground no-underline hover:no-underline"
                  >
                    {project.name}
                  </Link>
                </Heading>
                <p className="mt-3 text-body text-muted-foreground text-pretty">
                  {project.summary}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {project.services.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-border bg-background px-3 py-1 text-small text-muted-foreground"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/work/${project.slug}`}
                  className="mt-4 inline-flex items-center gap-1 self-start text-small text-foreground"
                >
                  Read the case study
                  <ArrowUpRightIcon aria-hidden />
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

function parseCategory(value: string | null): "all" | ProjectCategory {
  if (value === "web" || value === "ecommerce" || value === "brand") return value;
  return "all";
}

function labelFor(c: "all" | ProjectCategory): string {
  return projectCategories.find((cat) => cat.value === c)?.label ?? "All work";
}
