import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";
const getInitialState = () => window.matchMedia(QUERY).matches;

/**
 * Returns true if the user prefers reduced motion.
 * It's useful for conditionally disabling animations for users who prefer reduced motion.
 * @returns {boolean} - true if the user prefers reduced motion, false otherwise.
 */
export const usePrefersReducedMotion = (): boolean => {
  const [prefersReducedMotion, setPrefersReducedMotion] =
    useState(getInitialState);

  useEffect(() => {
    const mediaQuery = window.matchMedia(QUERY);
    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    mediaQuery.addEventListener("change", listener);
    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, []);

  return prefersReducedMotion;
};
