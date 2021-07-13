import classNames from "classnames";
import PropTypes from "prop-types";
import React, { useEffect, useRef } from "react";
import type { HTMLProps, ReactNode } from "react";

import Button, { ButtonAppearance } from "../Button";
import type { Props as ButtonProps } from "../Button";

export const notificationTypes = {
  CAUTION: "caution",
  INFORMATION: "information",
  NEGATIVE: "negative",
  POSITIVE: "positive",
};

/**
 * The props for the Notification component.
 */
export type Props = {
  /**
   * The list of actions that the notification can perform.
   */
  actions?: {
    appearance?: ButtonProps["appearance"];
    className?: string;
    label: string;
    onClick: () => void;
  }[];
  /**
   * Whether the notification should not show a border.
   */
  appearance?: "borderless" | "default" | "modal" | "raised";
  /**
   * The notification message content.
   */
  children?: ReactNode;
  /**
   * Optional class(es) to apply to the parent notification element.
   */
  className?: string;
  /**
   * Whether the title should display inline with the message.
   */
  inline?: boolean;
  /**
   * The function to run when dismissing/closing the notification.
   */
  onDismiss?: () => void;
  /**
   * The severity of the notification.
   */
  severity?: "caution" | "information" | "negative" | "positive";
  /**
   * The amount of time (in ms) until the notification is automatically dismissed.
   */
  timeout?: number;
  /**
   * A relevant timestamp for the notification, e.g. when it was created.
   */
  timestamp?: ReactNode;
  /**
   * The title of the notification.
   */
  title?: ReactNode;
} & HTMLProps<HTMLDivElement>;

const Notification = ({
  actions,
  appearance = "default",
  children,
  className,
  inline = false,
  onDismiss,
  severity = "information",
  timeout,
  timestamp,
  title,
  ...props
}: Props): JSX.Element => {
  const timeoutId = useRef(null);
  const hasActions = actions?.length;
  const showMeta = timestamp || hasActions;

  useEffect(() => {
    if (timeout && onDismiss) {
      timeoutId.current = setTimeout(() => onDismiss(), timeout);
    }
    return () => clearTimeout(timeoutId.current);
  }, [onDismiss, timeout]);

  return (
    <div
      className={classNames(className, {
        [`p-notification--${severity}`]: !!severity,
        "p-notification": !severity,
        "is-borderless": appearance === "borderless",
        "is-inline": inline,
        "is-modal": appearance === "modal",
        "is-raised": appearance === "raised",
      })}
      {...props}
    >
      <div className="p-notification__content">
        {title && (
          <h5 className="p-notification__title" data-test="notification-title">
            {title}
          </h5>
        )}
        <p className="p-notification__message">{children}</p>
        {onDismiss && (
          <button
            aria-label="Close notification"
            className="p-notification__close"
            data-test="notification-close-button"
            onClick={onDismiss}
          >
            Close
          </button>
        )}
      </div>
      {showMeta && (
        <div className="p-notification__meta" data-test="notification-meta">
          {timestamp && (
            <span
              className="p-notification__timestamp"
              data-test="notification-timestamp"
            >
              {timestamp}
            </span>
          )}
          {hasActions ? (
            <div className="p-notification__actions">
              {actions.map((action, i) => (
                <Button
                  appearance={action.appearance || ButtonAppearance.LINK}
                  className={classNames(
                    action.className,
                    "p-notification__action"
                  )}
                  data-test="notification-action"
                  key={`${action.label}-${i}`}
                  onClick={action.onClick}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

Notification.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      appearance: PropTypes.string,
      className: PropTypes.string,
      label: PropTypes.string,
      onClick: PropTypes.func,
    })
  ),
  appearance: PropTypes.oneOf(["borderless", "default", "modal", "raised"]),
  children: PropTypes.node,
  className: PropTypes.string,
  inline: PropTypes.bool,
  onDismiss: PropTypes.func,
  severity: PropTypes.oneOf(["caution", "negative", "positive", "information"]),
  timeout: PropTypes.number,
  timestamp: PropTypes.node,
  title: PropTypes.node,
};

export default Notification;
