import { useCallback, useEffect, useRef } from "react";

/**
 * Handle clicks outside an element.
 */
export const useOnClickOutside = <E extends HTMLElement>(
  elementRef: ReturnType<typeof useRef<E | null>>,
  onClickOutside: () => void,
  { isEnabled } = { isEnabled: true }
): void => {
  const handleClickOutside = useCallback(
    (evt: MouseEvent) => {
      const target = evt.target as HTMLElement;
      // The target might be something like an SVG node which doesn't provide
      // the class name as a string.
      const isValidTarget =
        typeof (evt?.target as HTMLElement)?.className === "string";
      if (
        !isValidTarget ||
        (elementRef?.current &&
          !elementRef.current?.contains(target) &&
          elementRef.current !== target)
      ) {
        onClickOutside();
      }
    },
    [elementRef, onClickOutside]
  );

  useEffect(() => {
    if (isEnabled) {
      document.addEventListener("click", handleClickOutside, false);
    }
    return () =>
      document.removeEventListener("click", handleClickOutside, false);
  }, [handleClickOutside, isEnabled]);
};
