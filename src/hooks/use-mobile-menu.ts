"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * useMobileMenu — open/close state for the full-screen mobile nav.
 *
 * Encapsulates the cross-cutting behavior a full-screen menu needs:
 *  - ESC closes the menu.
 *  - Body scroll is locked while the menu is open (avoids the page
 *    scrolling behind the overlay).
 *  - The hook returns refs for the toggle button (so the menu can move
 *    focus back to it on close) and the panel (so focus can move into
 *    the panel on open).
 *
 * Implementation is deliberately tiny — no external focus-trap library
 * is needed because the panel renders as a full-screen overlay and the
 * page outside is marked `inert` while open.
 */
export interface UseMobileMenuOptions {
  /** Called when open state changes (after body lock updates). */
  onOpenChange?: (open: boolean) => void;
}

export interface UseMobileMenuReturn {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
  close: () => void;
  /** Bind to the menu panel (the focus target when opened). */
  panelRef: (node: HTMLElement | null) => void;
  /** Bind to the toggle button (the focus target when closed). */
  toggleButtonRef: (node: HTMLElement | null) => void;
}

export function useMobileMenu(options: UseMobileMenuOptions = {}): UseMobileMenuReturn {
  const { onOpenChange } = options;
  const [open, setOpenState] = useState(false);
  const [panel, setPanel] = useState<HTMLElement | null>(null);
  const [toggleButton, setToggleButton] = useState<HTMLElement | null>(null);

  const setOpen = useCallback(
    (next: boolean) => {
      setOpenState(next);
      onOpenChange?.(next);
    },
    [onOpenChange],
  );

  const toggle = useCallback(() => setOpen(!open), [open, setOpen]);
  const close = useCallback(() => setOpen(false), [setOpen]);

  // ESC closes the menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  // Body scroll lock + inert siblings + focus management.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Mark every direct sibling of the header as inert so Tab cycles
    // only through the menu panel. `inert` is a standard HTML attribute
    // supported by all modern browsers.
    const root = panel?.closest("body") ?? document.body;
    const inertTargets: HTMLElement[] = [];
    if (panel) {
      const parent = panel.parentElement;
      if (parent) {
        Array.from(parent.children).forEach((el) => {
          if (el !== panel && el instanceof HTMLElement && !el.hasAttribute("inert")) {
            el.setAttribute("inert", "");
            el.setAttribute("data-inert-by-menu", "");
            inertTargets.push(el);
          }
        });
      }
    }
    // Suppress unused-var lint; `root` may be used by future enhancements
    // (e.g. role="dialog" scoping).
    void root;

    // Move focus into the panel after it mounts.
    const focusable = panel?.querySelector<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (focusable) {
      // Defer so the panel has a chance to render with no animation
      // jank before focus moves.
      requestAnimationFrame(() => focusable.focus());
    } else {
      panel?.focus();
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      inertTargets.forEach((el) => {
        el.removeAttribute("inert");
        el.removeAttribute("data-inert-by-menu");
      });
      // Return focus to the toggle button so keyboard users land where
      // they left off. `requestAnimationFrame` defers the focus call
      // until the DOM is settled, which matters in some browsers
      // (e.g. WebKit) when an animated element is unmounting.
      const btn = toggleButton;
      if (btn) {
        requestAnimationFrame(() => btn.focus());
      }
    };
  }, [open, panel, toggleButton]);

  return {
    open,
    setOpen,
    toggle,
    close,
    panelRef: setPanel,
    toggleButtonRef: setToggleButton,
  };
}
