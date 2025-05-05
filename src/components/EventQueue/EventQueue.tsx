import { createContext, FC, ReactNode, useContext } from "react";
import React from "react";

export interface EventCallback<T> {
  onSuccess: (event: T) => void;
  onFailure: (msg: string) => void;
  onFinish?: () => void;
}

export interface EventQueue<T> {
  get: (operationId: string) => EventCallback<T> | undefined;
  set: (
    operationId: string,
    onSuccess: (event: T) => void,
    onFailure: (msg: string) => void,
    onFinish?: () => void,
  ) => void;
  remove: (operationId: string) => void;
}

/**
 * This provides an event queue system for managing callbacks associated with
 * asynchronous operations (e.g., API calls) in an application.
 *
 * It allows components to register success, failure,
 * and optional finish handlers for a given operation ID, and later retrieve or remove them.
 *
 * This is useful for handling side effects when dealing
 * with multiple operations that need to be tracked and updated independently.
 *
 * The `createEventQueue` function should be used to create a single provider and context that are shared throughout your application.
 * The returned `EventQueueProvider` and `useEventQueue` hook should be exported
 * from a shared module and reused across the app to ensure a single
 * context instance is used.
 *
 * Usage pattern:
 * // eventQueue.ts
 * export const { EventQueueProvider, useEventQueue } = createEventQueue<EventType>();
 *
 * // App.tsx
 * import { EventQueueProvider } from "./eventQueue";
 * ...
 * <EventQueueProvider>
 *   <App />
 * </EventQueueProvider>
 *
 * // In any other component
 * import { useEventQueue } from "./eventQueue";
 * ...
 * const eventQueue = useEventQueue();
 * eventQueue.set(operationId, onSuccess, onFailure);
 */

export function createEventQueue<T>() {
  const EventQueueContext = createContext<EventQueue<T> | undefined>(undefined);

  const eventQueue = new Map<string, EventCallback<T>>();

  const EventQueueProvider: FC<{ children: ReactNode }> = ({ children }) => (
    <EventQueueContext.Provider
      value={{
        get: (operationId) => eventQueue.get(operationId),
        set: (operationId, onSuccess, onFailure, onFinish) =>
          eventQueue.set(operationId, { onSuccess, onFailure, onFinish }),
        remove: (operationId) => eventQueue.delete(operationId),
      }}
    >
      {children}
    </EventQueueContext.Provider>
  );

  const useEventQueue = () => {
    const context = useContext(EventQueueContext);
    if (!context) {
      throw new Error(
        "useEventQueue must be used within an EventQueueProvider",
      );
    }
    return context;
  };

  return { EventQueueProvider, useEventQueue, EventQueueContext };
}
