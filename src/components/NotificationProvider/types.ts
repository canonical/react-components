import { ReactNode } from "react";
import { ValueOf } from "types";
import { NotificationSeverity } from "../Notification";

export interface NotifyProviderProps {
  children: ReactNode;
}

export interface NotificationAction {
  label: string;
  onClick: () => void;
}

export interface NotificationType {
  actions?: NotificationAction[];
  message: ReactNode;
  title?: string;
  type: ValueOf<typeof NotificationSeverity>;
}

export interface QueuedNotification {
  state?: {
    queuedNotification: NotificationType | null;
  };
  pathname?: string;
}

export interface NotificationHelper {
  notification: NotificationType | null;
  clear: () => void;
  failure: (
    title: string,
    error: unknown,
    message?: ReactNode,
    actions?: NotificationAction[]
  ) => NotificationType;
  info: (message: ReactNode, title?: string) => NotificationType;
  success: (message: ReactNode) => NotificationType;
  queue: (notification: NotificationType) => QueuedNotification;
  setDeduplicated: (value: NotificationType) => NotificationType;
}
