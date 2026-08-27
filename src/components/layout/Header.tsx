"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import { MenuIcon, CloseIcon, ArrowUpRightIcon } from "@/components/ui/Icon";
import { primaryNav, siteConfig } from "@/lib/site";
import { cn } from "@/lib/cn";
import { useMobileMenu } from "@/hooks/use-mobile-menu";

/**
 * Header — global site navigation.
 *
 * Desktop (≥ `lg`):
 *   Logo wordmark · primary nav · "Start a Project" CTA.
 *
 * Mobile (< `lg`):
 *   Logo wordmark · hamburger button. Tapping the button opens a
 *   full-screen overlay menu with the same items, an ESC-to-close
 *   handler, a body scroll lock, and focus management. The page
 *   content outside the menu is `inert` while the menu is open so
 *   keyboard navigation cycles only through the menu links.
 *
 * Implementation notes:
 *  - The component is a client component because the mobile menu
 *    requires state and event handlers.
 *  - The header is `sticky` so it stays visible while users scroll
 *    long pages.
 *  - A small "scrolled" state adds a backdrop and border once the
 *    user has scrolled past the top — this gives the bar a clear
 *    edge on long pages without competing with content.
 */
export function Header() {
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);

  // Subtle "elevated" state once the user scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const { open, toggle, close, panelRef, toggleButtonRef } = useMobileMenu();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-fast ease-out-quart",
        "backdrop-blur-md",
        scrolled
          ? "border-b border-border bg-background/80"
          : "border-b border-transparent bg-background/60",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
          <Link
            href="/"
            className="font-display text-body font-semibold tracking-tight text-foreground no-underline hover:no-underline"
            aria-label={`${siteConfig.name} home`}
          >
            {siteConfig.name}
          </Link>

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 lg:flex"
          >
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                subtle
                className="rounded-sm text-small text-foreground/80 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              href={siteConfig.primaryCta.href}
              intent="primary"
              size="md"
              className="hidden lg:inline-flex"
            >
              {siteConfig.primaryCta.label}
              <ArrowUpRightIcon className="ml-1" aria-hidden />
            </Button>

            <button
              ref={toggleButtonRef}
              type="button"
              onClick={toggle}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground lg:hidden",
                "border border-border bg-background/80",
                "transition-colors duration-fast ease-out-quart",
                "hover:bg-muted active:bg-muted/80",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            tabIndex={-1}
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-x-0 top-16 z-40 h-[calc(100dvh-4rem)] border-t border-border bg-background lg:hidden"
          >
            <Container className="h-full">
              <nav
                aria-label="Primary mobile"
                className="flex h-full flex-col justify-between pb-10 pt-12"
              >
                <ul className="flex flex-col gap-2">
                  {primaryNav.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={reduced ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.25,
                        delay: reduced ? 0 : 0.05 + i * 0.04,
                        ease: [0.25, 1, 0.5, 1],
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={close}
                        className="block py-3 font-display text-h2 font-semibold tracking-tight text-foreground no-underline hover:no-underline"
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                <div className="flex flex-col gap-3">
                  <Button
                    href={siteConfig.primaryCta.href}
                    intent="primary"
                    size="lg"
                    onClick={close}
                    className="w-full"
                  >
                    {siteConfig.primaryCta.label}
                    <ArrowUpRightIcon className="ml-1" aria-hidden />
                  </Button>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-center text-small text-muted-foreground hover:text-foreground"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </nav>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
