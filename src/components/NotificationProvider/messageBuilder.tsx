import {
  NotificationAction,
  NotificationType,
  QueuedNotification,
} from "./types";
import React, { ReactNode } from "react";
import { NotificationSeverity } from "../Notifications";

export const queue = (notification: NotificationType): QueuedNotification => {
  return { state: { queuedNotification: notification } };
};

export const info = (message: ReactNode, title?: string): NotificationType => {
  return {
    message,
    title,
    type: NotificationSeverity.INFORMATION,
  };
};

export const success = (
  message: ReactNode,
  title?: string,
): NotificationType => {
  return {
    message,
    title,
    type: NotificationSeverity.POSITIVE,
  };
};

export const failure = (
  title: string,
  error: unknown,
  message?: ReactNode,
  actions?: NotificationAction[],
): NotificationType => {
  return {
    actions,
    message:
      error && error instanceof Error ? (
        <>
          {message} {error.message}
        </>
      ) : (
        message
      ),
    title,
    type: NotificationSeverity.NEGATIVE,
  };
};
