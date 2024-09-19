import { useEffect, useRef } from "react";

import { useThrottle } from "./useThrottle";
import { usePrevious } from "./usePrevious";

/**
 * A hook that handles attaching/removing listeners and smartly reattaching if
 * any of the attributes change.
 * @param targetNode The node to attach the listener to.
 * @param callback The function to call from the listener.
 * @param eventType The event name.
 * @param shouldThrottle Whether the callback calls should be throttled.
 * @param shouldListen When the listener should be active.
 * @param options Native event listener options.
 */
export const useListener = (
  targetNode: Window | HTMLElement,
  callback: (...args: any[]) => any, // eslint-disable-line @typescript-eslint/no-explicit-any
  eventType: string,
  shouldThrottle = false,
  shouldListen = true,
  options?: boolean | AddEventListenerOptions,
): void => {
  const isListening = useRef(false);
  const throttle = useThrottle(callback);
  const eventListener = useRef(shouldThrottle ? throttle : callback);
  const previousEventType = usePrevious(eventType);
  const previousShouldThrottle = usePrevious(shouldThrottle);
  const previousTargetNode = usePrevious(targetNode);
  const previousCallback = usePrevious(callback);
  const previousOptions = usePrevious(options);

  useEffect(() => {
    // If any of the props related to the attached listener changed then the
    // listener needs to be re-attached.
    const listenerAttributesChanged =
      callback !== previousCallback ||
      eventType !== previousEventType ||
      shouldThrottle !== previousShouldThrottle ||
      targetNode !== previousTargetNode ||
      options !== previousOptions;
    if (isListening.current && (!shouldListen || listenerAttributesChanged)) {
      previousTargetNode.removeEventListener(
        previousEventType,
        eventListener.current,
        previousOptions,
      );
      isListening.current = false;
    }

    if (
      shouldThrottle !== previousShouldThrottle ||
      callback !== previousCallback
    ) {
      // Set the listener to the callback, or used the throttled callback.
      eventListener.current = shouldThrottle ? throttle : callback;
    }

    if (targetNode && shouldListen && !isListening.current) {
      targetNode.addEventListener(eventType, eventListener.current, options);
      isListening.current = true;
    }
  }, [
    callback,
    eventType,
    options,
    previousCallback,
    previousEventType,
    previousOptions,
    previousShouldThrottle,
    previousTargetNode,
    shouldListen,
    shouldThrottle,
    targetNode,
    throttle,
  ]);

  useEffect(
    () => () => {
      // Unattach the listener if the component gets unmounted while
      // listening.
      if (targetNode && isListening.current) {
        targetNode.removeEventListener(
          eventType,
          eventListener.current,
          options,
        );
      }
    },
    [eventType, targetNode, options],
  );
};
