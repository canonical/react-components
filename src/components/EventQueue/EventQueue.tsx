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
