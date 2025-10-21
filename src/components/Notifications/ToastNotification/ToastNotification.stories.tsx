import React, { useEffect } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ToastNotificationProvider, useToastNotification } from "./index";
import Button from "components/Button";

const meta: Meta<typeof ToastNotificationProvider> = {
  component: ToastNotificationProvider,
  tags: ["autodocs"],
  argTypes: {
    autoDismissDelay: {
      control: {
        type: "select",
      },
      options: [1000, 2000, 3000, 5000, 10000, 0],
      labels: {
        1000: "1 second",
        2000: "2 seconds",
        3000: "3 seconds",
        5000: "5 seconds (default)",
        10000: "10 seconds",
        0: "Persistent (no auto-hide)",
      },
      description:
        "Delay in milliseconds before hiding notification, or 0 for persistent notifications",
    },
  },
  args: {
    autoDismissDelay: 5000,
  },
};

export default meta;

type Story = StoryObj<typeof ToastNotificationProvider>;

export const Default: Story = {
  name: "Default",
  render: (args: { autoDismissDelay?: number }) => (
    <ToastNotificationStoryWrapper {...args} />
  ),
};

const ToastNotificationStoryWrapper = ({
  autoDismissDelay,
}: {
  autoDismissDelay?: number;
}) => {
  useEffect(() => {
    const root = document.getElementById("storybook-root");
    if (root) {
      root.style.height = "90vh";
    }
  }, []);

  return (
    <ToastNotificationProvider autoDismissDelay={autoDismissDelay}>
      <PreloadedList />
    </ToastNotificationProvider>
  );
};

const PreloadedList = () => {
  const toastNotify = useToastNotification();

  useEffect(() => {
    toastNotify.success("Settings saved successfully");
    toastNotify.info("Your changes are syncing in the background");
    toastNotify.failure(
      "Save failed",
      new Error("500 Internal Server Error"),
      "Please try again.",
    );
    toastNotify.caution("You have unsaved changes.");
    toastNotify.toggleListView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        margin: "2rem auto",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        alignContent: "flex-start",
        gap: "0.75rem",
      }}
    >
      <Button
        onClick={() =>
          toastNotify.success("Your changes have been saved.", [
            { label: "Undo", onClick: () => console.log("Undo clicked") },
          ])
        }
      >
        Add Success
      </Button>
      <Button
        onClick={() =>
          toastNotify.info(
            "Your changes are syncing in the background.",
            "Syncing",
          )
        }
      >
        Add Info
      </Button>
      <Button
        onClick={() =>
          toastNotify.failure(
            "Save failed",
            new Error("500 Internal Server Error"),
            "Please try again.",
            [{ label: "Retry", onClick: () => console.log("Retry clicked") }],
          )
        }
      >
        Add Error
      </Button>
      <Button onClick={() => toastNotify.caution("You have unsaved changes")}>
        Add Warning
      </Button>
      <Button onClick={toastNotify.toggleListView}>Toggle List View</Button>
    </div>
  );
};
