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
  render: () => (
    <ToastNotificationProvider>
      <PreloadedList />
    </ToastNotificationProvider>
  ),
};

const PreloadedList = () => {
  const { success, failure, info, toggleListView } = useToastNotification();

  useEffect(() => {
    success("Settings saved successfully");
    info("Your changes are syncing in the background");
    failure(
      "Save failed",
      new Error("500 Internal Server Error"),
      "Please try again.",
    );
    toggleListView();
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
      <Button onClick={() => success("New success toast!")}>Add Success</Button>
      <Button onClick={() => info("New info toast.")}>Add Info</Button>
      <Button onClick={() => failure("Oh no!", new Error("Something bad"))}>
        Add Error
      </Button>
      <Button variant="secondary" onClick={toggleListView}>
        Toggle List View
      </Button>
    </div>
  );
};
