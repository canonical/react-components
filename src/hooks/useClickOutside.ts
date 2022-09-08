import { MutableRefObject, useCallback, useEffect, useRef } from "react";

/**
 * Handle clicks outside an element.
 * @returns A ref to pass to the element to handle clicks outside of.
 */
export const useClickOutside = <E extends HTMLElement>(
  onClickOutside: () => void
): [MutableRefObject<E>] => {
  const wrapperRef = useRef<E | null>(null);

  const handleClickOutside = useCallback(
    (evt: MouseEvent) => {
      const target = evt.target as HTMLElement;
      // The target might be something like an SVG node which doesn't provide
      // the class name as a string.
      const isValidTarget =
        typeof (evt?.target as HTMLElement)?.className === "string";
      if (
        !isValidTarget ||
        (wrapperRef.current &&
          !wrapperRef.current?.contains(target) &&
          wrapperRef.current !== target)
      ) {
        onClickOutside();
      }
    },
    [onClickOutside]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () =>
      document.removeEventListener("click", handleClickOutside, false);
  }, [handleClickOutside]);
  return [wrapperRef];
};
