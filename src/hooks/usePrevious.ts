import { useEffect, useRef } from "react";

/**
 * A hook to handle storing the previous value of anything.
 * @param value The value to watch.
 * @return The previous value.
 */
export const usePrevious = <T>(value: T): T => {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};
