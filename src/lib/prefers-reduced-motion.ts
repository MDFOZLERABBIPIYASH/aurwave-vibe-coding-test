"use client";

import { useEffect, useState } from "react";

/**
 * Subscribe to the user's `prefers-reduced-motion` setting on the client.
 * Returns `true` if the user has requested reduced motion, otherwise `false`.
 *
 * Defaults to `false` during SSR (we don't know the user preference yet),
 * which keeps initial paint deterministic and avoids hydration mismatches.
 *
 * Used by animation primitives (Reveal, etc.) to gate non-essential motion
 * per docs/06-animation-guidelines.md.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    // Modern API: addEventListener. Older Safari uses addListener.
    if (mq.addEventListener) {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }
    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);

  return reduced;
}
