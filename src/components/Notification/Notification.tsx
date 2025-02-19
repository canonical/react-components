import classNames from "classnames";
import React, {
  ElementType,
  Fragment,
  isValidElement,
  useEffect,
  useRef,
} from "react";
import type { HTMLProps, ReactNode } from "react";

import Button, { ButtonAppearance } from "../Button";
import { IS_DEV } from "../../utils";

import type { ClassName, PropsWithSpread, ValueOf } from "types";

export enum Label {
  Close = "Close notification",
}

export const NotificationSeverity = {
  CAUTION: "caution",
  INFORMATION: "information",
  NEGATIVE: "negative",
  POSITIVE: "positive",
} as const;

export const DefaultTitles = {
  [NotificationSeverity.CAUTION]: "Warning",
  [NotificationSeverity.INFORMATION]: "Info",
  [NotificationSeverity.NEGATIVE]: "Error",
  [NotificationSeverity.POSITIVE]: "Success",
};

type NotificationAction = {
  label: string;
  onClick: () => void;
};

/**
 * The props for the Notification component.
 */
export type Props = PropsWithSpread<
  {
    /**
     * A list of up to two actions that the notification can perform.
     */
    actions?: (NotificationAction | ReactNode)[];
    /**
     * Whether the notification should not have a border.
     */
    borderless?: boolean;
    /**
     * The notification message content.
     */
    children?: ReactNode;
    /**
     * Optional class(es) to apply to the parent notification element.
     */
    className?: ClassName;
    /**
     * **Deprecated**. Use `onDismiss` instead.
     */
    close?: never;
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
    severity?: ValueOf<typeof NotificationSeverity>;
    /**
     * **Deprecated**. Use `title` instead.
     */
    status?: never;
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
    /**
     * Optional element or component to use for the title.
     */
    titleElement?: ElementType;
    /**
     * **Deprecated**. Use `severity` instead.
     */
    type?: never;
  },
  HTMLProps<HTMLDivElement>
>;

/**
This is a [React](https://reactjs.org/) component for the Vanilla [Notification](https://docs.vanillaframework.io/patterns/notification/).

Notifications are used to display global information, our notification variants consist of default, caution, negative or positive.

The `NotificationProvider` component can be used to manage the notification state globally. Wrap your application components with it and then in any child component you can get the helper with `const notify = useNotify()` to easily trigger notifications:

* `notify.info("You should keep this in mind")`
* `notify.failure("Error when fooing a bar", errorObjectFromCatch)`
* `notify.success("The bar was foo'd", "Success")`

The `NotificationConsumer` component can be used to display notifications. It will automatically display any notifications that are added to the `NotificationProvider` state.

The Notification API has changed since v0.18 in order to support new variants
and align with our component prop naming conventions.

| Deprecated prop names | Replaced by |
| --------------------- | ----------- |
| `type`                | `severity`  |
| `status`              | `title`     |
| `close`               | `onDismiss` |

The `notificationTypes` const has also been replaced with `NotificationSeverity`
to reflect the new prop name.
 */
const Notification = ({
  actions,
  borderless = false,
  children,
  className,
  close,
  inline = false,
  onDismiss,
  severity = NotificationSeverity.INFORMATION,
  status,
  timeout,
  timestamp,
  title,
  titleElement: TitleComponent = "h5",
  type,
  ...props
}: Props): React.JSX.Element => {
  const timeoutId = useRef(null);
  const hasActions = actions?.length > 0;
  const showMeta = !!timestamp || hasActions;

  useEffect(() => {
    if (timeout && onDismiss) {
      timeoutId.current = setTimeout(() => onDismiss(), timeout);
    }
    return () => clearTimeout(timeoutId.current);
  }, [onDismiss, timeout]);

  if (IS_DEV && (close || status || type)) {
    console.warn(
      "The Notification component is using deprecated props. Refer to the deprecated list for details: https://canonical.github.io/react-components/?path=/docs/notification--information#deprecated",
    );
  }

  return (
    <div
      className={classNames(className, {
        [`p-notification--${severity}`]: !!severity,
        "p-notification": !severity,
        "is-borderless": borderless,
        "is-inline": inline,
      })}
      {...props}
    >
      <div className="p-notification__content">
        {title && (
          <TitleComponent
            className="p-notification__title"
            data-testid="notification-title"
          >
            {title}
          </TitleComponent>
        )}
        {inline && <>&ensp;</>}
        <p className="p-notification__message">{children}</p>
        {onDismiss && (
          <button
            type="button"
            className="p-notification__close"
            data-testid="notification-close-button"
            onClick={onDismiss}
          >
            {Label.Close}
          </button>
        )}
      </div>
      {showMeta && (
        <div className="p-notification__meta" data-testid="notification-meta">
          {timestamp && (
            <span
              className="p-notification__timestamp"
              data-testid="notification-timestamp"
            >
              {timestamp}
            </span>
          )}
          {hasActions ? (
            <div className="p-notification__actions">
              {actions.map((action, i) => (
                <Fragment key={i}>
                  {action && typeof action === "object" && "label" in action ? (
                    <Button
                      type="button"
                      appearance={ButtonAppearance.LINK}
                      className="p-notification__action"
                      data-testid="notification-action"
                      onClick={action.onClick}
                    >
                      {action.label}
                    </Button>
                  ) : (
                    isValidElement(action) && action
                  )}
                </Fragment>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Notification;
