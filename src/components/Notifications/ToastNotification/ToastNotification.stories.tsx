import React, { useEffect } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { ToastNotificationProvider, useToastNotification } from "./index";
import Button from "components/Button";

const meta: Meta<typeof ToastNotificationProvider> = {
  component: ToastNotificationProvider,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ToastNotificationProvider>;

export const Default: Story = {
  name: "Default",
  render: () => <ToastNotificationStoryWrapper />,
};

const ToastNotificationStoryWrapper = () => {
  useEffect(() => {
    const root = document.getElementById("storybook-root");
    if (root) {
      root.style.height = "90vh";
    }
  }, []);

  return (
    <ToastNotificationProvider>
      <PreloadedList />
    </ToastNotificationProvider>
  );
};

const PreloadedList = () => {
  const toastNotify = useToastNotification();

  useEffect(() => {
    toastNotify.success({ message: "Settings saved successfully" });
    toastNotify.info({ message: "Your changes are syncing in the background" });
    toastNotify.failure({
      title: "Save failed",
      error: new Error("500 Internal Server Error"),
      message: "Please try again.",
    });
    toastNotify.caution({ message: "You have unsaved changes." });
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
          toastNotify.success({
            message: "Your changes have been saved.",
            actions: [
              { label: "Undo", onClick: () => console.log("Undo clicked") },
            ],
          })
        }
      >
        Add Success
      </Button>
      <Button
        onClick={() =>
          toastNotify.info({
            message: "Your changes are syncing in the background.",
            title: "Syncing",
          })
        }
      >
        Add Info
      </Button>
      <Button
        onClick={() =>
          toastNotify.failure({
            title: "Save failed",
            error: new Error("500 Internal Server Error"),
            message: "Please try again.",
            actions: [
              { label: "Retry", onClick: () => console.log("Retry clicked") },
            ],
          })
        }
      >
        Add Error
      </Button>
      <Button onClick={toastNotify.toggleListView}>Toggle List View</Button>
    </div>
  );
};
