import { useCallback, useEffect, useRef } from "react";

export const THROTTLE_DELAY = 1000 / 60;

export type Callback = (...args: any[]) => any; // eslint-disable-line @typescript-eslint/no-explicit-any

/**
 * A hook to handle throttling calls to a function.
 * @param callback The function to throttle.
 * @param delay The throttle delay in ms.
 * @return The callback function wrapped in the throttle.
 */
export const useThrottle = (
  callback: Callback,
  delay = THROTTLE_DELAY
): Callback => {
  const timeout = useRef<NodeJS.Timeout>();
  const lastCall = useRef<number>();
  const lastArgs = useRef(null);

  const throttle = useCallback(
    (...args) => {
      lastArgs.current = args;
      const callCallback = () => {
        callback(...lastArgs.current);
        lastCall.current = Date.now();
        timeout.current = null;
      };

      const createTimeout = () => {
        timeout.current = setTimeout(() => {
          callCallback();
          timeout.current = null;
        }, delay);
      };

      if (!lastCall.current) {
        // Initially call the callback and start a timeout for the next call.
        callCallback();
        createTimeout();
      } else if (!timeout.current && Date.now() - lastCall.current > delay) {
        // If a timeout isn't active then create a new one if the delay time
        // has elapsed.
        createTimeout();
      }
    },
    [callback, delay]
  );

  useEffect(
    () => () => {
      // Clear the timeout when unmounting.
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    },
    []
  );

  return throttle;
};
