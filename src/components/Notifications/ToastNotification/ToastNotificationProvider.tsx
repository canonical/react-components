import type {
  NotificationAction,
  NotificationType,
} from "components/NotificationProvider";
import type { ValueOf } from "types";
import {
  failure,
  info,
  caution,
  success,
} from "components/NotificationProvider";
import { NotificationSeverity } from "components/Notifications";
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

interface Props {
  onDismiss?: (notifications?: ToastNotificationType[]) => void;
  hideDelay?: number;
}

interface ToastNotificationHelper {
  notifications: ToastNotificationType[];
  success: (
    message: ReactNode,
    actions?: NotificationAction[],
    title?: string,
    id?: ToastNotificationType["id"],
  ) => ToastNotificationType;
  info: (
    message: ReactNode,
    title?: string,
    actions?: NotificationAction[],
    id?: ToastNotificationType["id"],
  ) => ToastNotificationType;
  failure: (
    title: string,
    error: unknown,
    message?: ReactNode,
    actions?: NotificationAction[],
    id?: ToastNotificationType["id"],
  ) => ToastNotificationType;
  caution: (
    message: ReactNode,
    actions?: NotificationAction[],
    title?: string,
    id?: ToastNotificationType["id"],
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

  /** Show a success toast. Optionally pass actions and a title. */
  success: () => initialNotification,

  /** Show an info toast. Optionally pass a custom title and actions. */
  info: () => initialNotification,

  /** Show a failure toast with an error and optional message/actions. */
  failure: () => initialNotification,

  /** Show a caution toast. Optionally pass actions and a title. */
  caution: () => initialNotification,

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

To make the notification persistent (i.e., not auto-dismiss), set the `hideDelay` prop to `0` when using the provider: `<ToastNotificationProvider hideDelay={0}>`

| **Values**                       | **Description**                                                                |
|----------------------------------|--------------------------------------------------------------------------------|
| `toastNotify.success()`          | Displays a success toast. Optionally accepts actions and a title.              |
| `toastNotify.info()`             | Displays an info toast. Optionally accepts a custom title.                     |
| `toastNotify.failure()`          | Displays a failure toast with an error and optional message or actions.        |
| `toastNotify.caution()`          | Displays a caution toast. Optionally accepts actions and a title.              |
| `toastNotify.clear()`            | Clears specific toasts, or all toasts if none are specified.                   |
| `toastNotify.toggleListView()`   | Toggles the notification list view open or closed.                             |
| `toastNotify.countBySeverity`    | Returns the count of notifications grouped by severity (e.g., success, info).  |

Some example usages:

1. **Show a success toast:**
```
toastNotify.success("Your changes have been saved.");
toastNotify.success("Your changes have been saved.", [{label: "Undo", onClick: () => console.log("Undo clicked")}]);
```

2. **Show an info toast:**
```
toastNotify.info("Your changes are syncing in the background.");
toastNotify.info("Your changes are syncing in the background.", "Syncing");
```

3. **Show a failure toast:**
```
toastNotify.failure("Save failed", new Error("500 Internal Server Error"), "Please try again.");
toastNotify.failure("Save failed", new Error("500 Internal Server Error"), "Please try again.", [{label: "Retry", onClick: () => console.log("Retry clicked")}]);
```

4. **Show a caution toast:**
```
toastNotify.caution("Your changes have not been saved.");
toastNotify.caution("Your changes have not been saved.", [{label: "Undo", onClick: () => console.log("Undo clicked")}]);
```

5. **Clear notifications:**
```
toastNotify.clear(); // clears all toast notifications
toastNotify.clear([notificationId]); // clears specific toast notifications
```

6. **Toggle the notification list view:**
```
toastNotify.toggleListView();
```

7. **Get the count of notifications by severity:**
```
const count = toastNotify.countBySeverity;
console.log(count.positive);
```

Alternatively, you can use the `ToastNotification` and `ToastNotificationList` components directly, without using the provider.
*/

const ToastNotificationProvider: FC<PropsWithChildren<Props>> = ({
  children,
  onDismiss,
  hideDelay = HIDE_NOTIFICATION_DELAY,
}) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showNotificationWithDelay = () => {
    setNotificationTimer((prevTimer) => {
      if (prevTimer) {
        clearTimeout(prevTimer);
      }

      if (!showList) {
        // If hideDelay is 0, make notification persistent (no auto-hide)
        if (!hideDelay) {
          return true; // Set a truthy value to indicate notification should show
        }

        return setTimeout(() => {
          setNotificationTimer(null);
        }, hideDelay);
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
    notification: NotificationType & { error?: unknown } & {
      id?: ToastNotificationType["id"];
    },
  ) => {
    const notificationToAdd = {
      ...notification,
      timestamp: new Date().toLocaleString(),
      id:
        notification.id ??
        Date.now().toString() + (Math.random() + 1).toString(36).substring(7),
    };

    setNotifications((prev) => {
      return [...prev, notificationToAdd];
    });

    showNotificationWithDelay();

    return notificationToAdd;
  };

  const clear = (notifications?: ToastNotificationType[]) => {
    if (onDismiss) {
      onDismiss(notifications);
    }

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
    failure: (title, error, message, actions, id) =>
      addNotification({ ...failure(title, error, message, actions), id }),
    info: (message, title, actions, id) =>
      addNotification({ ...info(message, title, actions), id }),
    success: (message, actions, title, id) =>
      addNotification({ ...success(message, title, actions), id }),
    caution: (message, actions, title, id) =>
      addNotification({ ...caution(message, title, actions), id }),
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
