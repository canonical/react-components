import { useEffect, useRef } from "react";

/**
 * A hook to handle storing the previous value of anything.
 * @param value The value to watch.
 * @param setInitial Whether the it should initialise with the current value.
 * @return The previous value.
 */
export const usePrevious = <T>(value: T, setInitial = true): T => {
  const ref = useRef(setInitial ? value : undefined);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};
