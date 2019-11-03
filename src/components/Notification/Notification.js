import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";

export const notificationTypes = {
  CAUTION: "caution",
  INFORMATION: "information",
  NEGATIVE: "negative",
  POSITIVE: "positive"
};

const Notification = ({
  children,
  className,
  close,
  status,
  timeout,
  type,
  ...props
}) => {
  const timeoutId = useRef();

  useEffect(() => {
    if (timeout && close && !timeoutId.current) {
      timeoutId.current = setTimeout(() => close(), timeout);
    }
    return () => clearTimeout(timeoutId.current);
  }, [close, timeout]);

  return (
    <div
      className={classNames(className, {
        [`p-notification--${type}`]: !!type,
        "p-notification": !type
      })}
      {...props}
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
  type: PropTypes.oneOf(["caution", "negative", "positive", "information"])
};

export default Notification;
