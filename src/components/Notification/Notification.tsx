import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import type { HTMLAttributes, ReactNode } from "react";

export const notificationTypes = {
  CAUTION: "caution",
  INFORMATION: "information",
  NEGATIVE: "negative",
  POSITIVE: "positive",
};

type NotificationType = "caution" | "negative" | "positive" | "information";

type Props = {
  children: ReactNode;
  className: string;
  close: () => void;
  status: string;
  timeout: number;
  type: NotificationType;
} & HTMLAttributes<HTMLDivElement>;

const Notification = ({
  children,
  className,
  close,
  status,
  timeout,
  type,
  ...divProps
}: Props): JSX.Element => {
  const timeoutId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timeout && close) {
      timeoutId.current = setTimeout(() => close(), timeout);
    }
    return () => clearTimeout(timeoutId.current);
  }, [close, timeout]);

  return (
    <div
      className={classNames(className, {
        [`p-notification--${type}`]: !!type,
        "p-notification": !type,
      })}
      {...divProps}
    >
      <p className="p-notification__response">
        {status && <span className="p-notification__status">{status}</span>}
        {children}
      </p>
      {close && (
        <button
          className="p-icon--close"
          aria-label="Close notification"
          onClick={close}
        >
          Close
        </button>
      )}
    </div>
  );
};

Notification.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  close: PropTypes.func,
  status: PropTypes.string,
  timeout: PropTypes.number,
  type: PropTypes.oneOf(["caution", "negative", "positive", "information"]),
};

export default Notification;
