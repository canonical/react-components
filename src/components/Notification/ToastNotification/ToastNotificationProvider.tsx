import type {
  NotificationAction,
  NotificationType,
} from "components/NotificationProvider";
import type { ValueOf } from "types";
import { failure, info } from "components/NotificationProvider";
import { NotificationSeverity } from "components/Notification";
import ToastNotification from "./ToastNotification";
import ToastNotificationList from "./ToastNotificationList";
import type { FC, PropsWithChildren, ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import React from "react";

const HIDE_NOTIFICATION_DELAY = 5_000;

export type ToastNotificationType = NotificationType & {
  timestamp?: ReactNode;
  id: string;
};

interface ToastNotificationHelper {
  notifications: ToastNotificationType[];
  success: (
    message: ReactNode,
    actions?: NotificationAction[],
  ) => ToastNotificationType;
  info: (message: ReactNode, title?: string) => ToastNotificationType;
  failure: (
    title: string,
    error: unknown,
    message?: ReactNode,
    actions?: NotificationAction[],
  ) => ToastNotificationType;
  clear: (notification?: ToastNotificationType[]) => void;
  toggleListView: () => void;
  isListView: boolean;
  countBySeverity: GroupedNotificationCount;
}

export type GroupedNotificationCount = {
  [key in ValueOf<typeof NotificationSeverity>]?: number;
};

const initialNotification: ToastNotificationType = {
  id: "",
  message: "",
  type: "positive",
};

const ToastNotificationContext = createContext<ToastNotificationHelper>({
  /** List of all active toast notifications */
  notifications: [],

  /** Show a success toast. Optionally pass actions. */
  success: () => initialNotification,

  /** Show an info toast. Optionally pass a custom title. */
  info: () => initialNotification,

  /** Show a failure toast with an error and optional message/actions. */
  failure: () => initialNotification,

  /** Clear one or more specific toasts, or all if none provided. */
  clear: () => null,

  /** Toggle between single toast view and list view. */
  toggleListView: () => null,

  /** Whether the notification list view is currently open. */
  isListView: false,

  /** Grouped count of notifications by severity (positive, info, etc.). */
  countBySeverity: {},
});

/**
 * The `ToastNotificationProvider` can be used to manage toast notifications.

Wrap your application with this provider, and in any child component you can get the helper with `const toastNotify = useToastNotification()` to trigger notifications.
Notifications automatically dismiss after a delay unless manually dismissed or expanded.

| **Values**                        | **Description**                                                                 |
|----------------------------------|---------------------------------------------------------------------------------|
| `toastNotify.success()`          | Displays a success toast. Optionally accepts actions.                          |
| `toastNotify.info()`             | Displays an info toast. Optionally accepts a custom title.                     |
| `toastNotify.failure()`          | Displays a failure toast with an error and optional message or actions.        |
| `toastNotify.clear()`            | Clears specific toasts, or all toasts if none are specified.                   |
| `toastNotify.toggleListView()`   | Toggles the notification list view open or closed.                             |
| `toastNotify.countBySeverity`    | Returns the count of notifications grouped by severity (e.g., success, info).  |

Alternatively, you can use the `ToastNotification` and `ToastNotificationList` components directly, without using the provider.
*/

const ToastNotificationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [notifications, setNotifications] = useState<ToastNotificationType[]>(
    [],
  );
  const [showList, setShowList] = useState(false);
  const [notificationTimer, setNotificationTimer] =
    useState<NodeJS.Timeout | null>(null);

  // cleanup on timer if unmounted
  useEffect(() => {
    return () => {
      if (notificationTimer) {
        clearTimeout(notificationTimer);
      }
    };
  }, []);

  const showNotificationWithDelay = () => {
    setNotificationTimer((prevTimer) => {
      if (prevTimer) {
        clearTimeout(prevTimer);
      }

      if (!showList) {
        return setTimeout(() => {
          setNotificationTimer(null);
        }, HIDE_NOTIFICATION_DELAY);
      }

      return null;
    });
  };

  const clearNotificationTimer = () => {
    setNotificationTimer((prevTimer) => {
      if (prevTimer) {
        clearTimeout(prevTimer);
      }
      return null;
    });
  };

  const addNotification = (
    notification: NotificationType & { error?: unknown },
  ) => {
    const notificationToAdd = {
      ...notification,
      timestamp: new Date().toLocaleString(),
      id: Date.now().toString() + (Math.random() + 1).toString(36).substring(7),
    };

    setNotifications((prev) => {
      return [...prev, notificationToAdd];
    });

    showNotificationWithDelay();

    return notificationToAdd;
  };

  const clear = (notifications?: ToastNotificationType[]) => {
    if (!notifications) {
      setNotifications([]);
      setShowList(false);
      clearNotificationTimer();
      return;
    }

    setNotifications((prev) => {
      const removeIdLookup = new Set(notifications);
      const newNotifications = prev.filter((item) => !removeIdLookup.has(item));

      // if we are clearing the last notification from an expanded list,
      // then we want to collapse the list as well if all notifications has been cleared
      if (!newNotifications.length) {
        setShowList(false);
      }

      return newNotifications;
    });

    clearNotificationTimer();
  };

  const toggleListView = () => {
    clearNotificationTimer();
    setShowList((prev) => !prev);
  };

  const countBySeverity = {
    positive: 0,
    negative: 0,
    caution: 0,
    information: 0,
  };

  notifications.forEach((notification) => {
    countBySeverity[notification.type] += 1;
  });

  const helper: ToastNotificationHelper = {
    notifications,
    failure: (title, error, message, actions) =>
      addNotification(failure(title, error, message, actions)),
    info: (message, title) => addNotification(info(message, title)),
    success: (message, actions) =>
      addNotification({
        message,
        actions,
        type: NotificationSeverity.POSITIVE,
      } as NotificationType),
    clear,
    toggleListView,
    isListView: showList,
    countBySeverity,
  };

  const latestNotification = notifications[notifications.length - 1];
  const hasNotifications = !!notifications.length;
  const showNotification = hasNotifications && !showList && notificationTimer;
  const showNotificationList = hasNotifications && showList;

  return (
    <ToastNotificationContext.Provider value={helper}>
      {children}
      <ToastNotification
        notification={latestNotification}
        onDismiss={clear}
        show={!!showNotification}
      />
      <ToastNotificationList
        notifications={notifications}
        groupedCount={countBySeverity}
        show={showNotificationList}
        onDismiss={clear}
      />
    </ToastNotificationContext.Provider>
  );
};

export default ToastNotificationProvider;

export const useToastNotification = () => useContext(ToastNotificationContext);
