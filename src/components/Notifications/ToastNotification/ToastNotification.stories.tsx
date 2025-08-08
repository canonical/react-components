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
