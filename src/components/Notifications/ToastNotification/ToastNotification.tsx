import Notification from "components/Notifications";
import { DefaultTitles } from "components/Notifications/Notification/Notification";
import type { ToastNotificationType } from "./ToastNotificationProvider";
import type { FC } from "react";
import { createPortal } from "react-dom";
import Animate from "./Animate";
import React from "react";
import "./Toast.scss";

interface Props {
  notification: ToastNotificationType;
  onDismiss: (notification?: ToastNotificationType[]) => void;
  show: boolean;
}

const ToastNotification: FC<Props> = ({ notification, onDismiss, show }) => {
  if (!notification) {
    return null;
  }

  return (
    <>
      {createPortal(
        <Animate
          show={show}
          from={{
            opacity: 0,
          }}
          to={{
            opacity: 1,
          }}
          exitAnimation={[
            { opacity: 1, transform: "translateY(0)" },
            { opacity: 0, transform: "translateY(50px)" },
          ]}
          options={{ duration: 200 }}
          className="toast-animate"
        >
          <div className="toast-notification">
            <Notification
              title={notification.title ?? DefaultTitles[notification.type]}
              actions={notification.actions}
              severity={notification.type}
              onDismiss={() => {
                onDismiss([notification]);
              }}
              className="u-no-margin--bottom"
              timestamp={notification.timestamp}
              titleElement="div"
              role="alert"
            >
              {notification.message}
            </Notification>
          </div>
        </Animate>,
        document.body,
      )}
    </>
  );
};

export default ToastNotification;
