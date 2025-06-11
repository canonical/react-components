import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { createEventQueue } from "./EventQueue";
import Button from "../Button/Button";

type Event = { message: string };

const { EventQueueProvider, useEventQueue } = createEventQueue<Event>();

const meta: Meta<typeof EventQueueProvider> = {
  title: "Components/EventQueue",
  component: EventQueueProvider,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
This provides an event queue system for managing callbacks associated with
asynchronous operations (e.g., API calls) in an application.

It allows components to register success, failure,
and optional finish handlers for a given operation ID, and later retrieve or remove them.

This is useful for handling side effects when dealing
with multiple operations that need to be tracked and updated independently.

The \`createEventQueue\` function should be used to create a single provider and context that are shared throughout your application.
The returned \`EventQueueProvider\` and \`useEventQueue\` hook should be exported
from a shared module and reused across the app to ensure a single
context instance is used.

**Usage pattern:**

\`\`\`tsx
// eventQueue.ts
export const { EventQueueProvider, useEventQueue } = createEventQueue<EventType>();

// App.tsx
import { EventQueueProvider } from "./eventQueue";

<EventQueueProvider>
  <App />
</EventQueueProvider>

// In any other component
import { useEventQueue } from "./eventQueue";

const eventQueue = useEventQueue();
eventQueue.set(operationId, onSuccess, onFailure);
\`\`\``,
      },
    },
  },
  decorators: [
    (Story) => (
      <EventQueueProvider>
        <Story />
      </EventQueueProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof EventQueueProvider>;

export const Default: Story = {
  render: () => {
    const EventQueueDemo = () => {
      const queue = useEventQueue();
      const operationId = "storybook-op-id";
      const [logs, setLogs] = useState<string[]>([]);
      const [isRegistered, setIsRegistered] = useState(false);

      const appendLog = (msg: string) => setLogs((prev) => [...prev, msg]);

      // This simulates the code that is executed when the asynchronous operation starts
      const register = () => {
        queue.set(
          operationId,
          (event) => appendLog(`Success: ${event.message}`),
          (msg) => appendLog(`Failure: ${msg}`),
          () => appendLog("Finished"),
        );
        appendLog("Registered callbacks");
        setIsRegistered(true);
      };

      // This simulates the code that is executed when the asynchronous operation succeeds
      const triggerSuccess = () => {
        const event = queue.get(operationId);
        if (event) {
          event.onSuccess({ message: "This was successful!" });
          event.onFinish?.();
          queue.remove(operationId);
          setIsRegistered(false);
        }
      };

      // This simulates the code that is executed when the asynchronous operation fails
      const triggerFailure = () => {
        const event = queue.get(operationId);
        if (event) {
          event.onFailure("Something failed!");
          event.onFinish?.();
          queue.remove(operationId);
          setIsRegistered(false);
        }
      };

      return (
        <div>
          <div style={{ marginBottom: "0.5rem", display: "flex" }}>
            <Button onClick={register} disabled={isRegistered}>
              Register Callbacks
            </Button>
            <Button onClick={triggerSuccess} disabled={!isRegistered}>
              Trigger Success
            </Button>
            <Button onClick={triggerFailure} disabled={!isRegistered}>
              Trigger Failure
            </Button>
          </div>
          <div>
            <strong>Logs:</strong>
            <ul>
              {logs.map((log, index) => (
                <li key={index}>{log}</li>
              ))}
            </ul>
          </div>
        </div>
      );
    };

    return <EventQueueDemo />;
  },
};
