import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { usePrefersReducedMotion } from "@/lib/prefers-reduced-motion";

/**
 * Build a `matchMedia` mock that exposes `matches` as a live getter so
 * the hook reads the current value of the `matches` variable on every
 * access. A plain property would capture the value at mock-creation
 * time and stay stale after tests mutate `matches`.
 */
function mockMatchMedia(
  listeners: Array<(e: MediaQueryListEvent) => void>,
  getMatches: () => boolean,
) {
  return vi.fn().mockImplementation((query: string) => {
    const base = {
      get matches() {
        return getMatches();
      },
      media: query,
      onchange: null,
      addEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => {
        listeners.push(cb);
      },
      removeEventListener: () => {
        listeners.length = 0;
      },
      dispatchEvent: () => true,
    };
    return base;
  });
}

describe("usePrefersReducedMotion", () => {
  let listeners: Array<(e: MediaQueryListEvent) => void> = [];
  let matches = false;

  beforeEach(() => {
    listeners = [];
    matches = false;
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: mockMatchMedia(listeners, () => matches),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns false when the media query does not match", () => {
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(false);
  });

  it("reflects the initial media-query value on mount", () => {
    matches = true;
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(true);
  });

  it("updates when the media query changes", () => {
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(false);

    matches = true;
    act(() => {
      listeners.forEach((cb) => cb({ matches: true } as MediaQueryListEvent));
    });
    expect(result.current).toBe(true);
  });

  it("unsubscribes on unmount", () => {
    const { unmount } = renderHook(() => usePrefersReducedMotion());
    expect(listeners.length).toBe(1);
    unmount();
    // After unmount the hook should have called removeEventListener.
    // Our mock clears the listeners array on remove, so they are gone.
    expect(listeners.length).toBe(0);
  });

  it("falls back to addListener when addEventListener is unavailable", () => {
    // Re-mock without addEventListener to exercise the legacy Safari path.
    const legacyListeners: Array<(e: MediaQueryListEvent) => void> = [];
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      configurable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        get matches() {
          return matches;
        },
        media: query,
        onchange: null,
        addListener: (cb: (e: MediaQueryListEvent) => void) =>
          legacyListeners.push(cb),
        removeListener: () => {
          legacyListeners.length = 0;
        },
        dispatchEvent: () => true,
      })),
    });
    const { result } = renderHook(() => usePrefersReducedMotion());
    matches = true;
    act(() => {
      legacyListeners.forEach((cb) => cb({ matches: true } as MediaQueryListEvent));
    });
    expect(result.current).toBe(true);
  });
});
