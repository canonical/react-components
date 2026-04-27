import classNames from "classnames";
import React, { MouseEventHandler, useEffect, useRef, useState } from "react";

import type { ButtonProps } from "../Button";
import Icon from "../Icon";

import type { PropsWithSpread } from "types";
import Button from "../Button";

export const LOADER_MIN_DURATION = 400; // minimium duration (ms) loader displays
export const SUCCESS_DURATION = 2000; // duration (ms) success tick is displayed

export enum Label {
  WAITING = "Waiting for action to complete",
  SUCCESS = "Action completed",
}

export type Props = PropsWithSpread<
  {
    /**
     * Whether the button should be in the loading state.
     */
    loading?: boolean;
    /**
     * Whether the button should be in the success state.
     */
    success?: boolean;
  },
  ButtonProps
>;

/**
 * This is a not an existing Vanilla component. It can be used to display submitting states for forms or other actions.
 *
 * ActionButton accepts the props from
 * [Button](?path=/docs/components-button--docs) in addition to those in the
 * props table:
 */
const ActionButton = ({
  children,
  className,
  disabled = null,
  loading = false,
  success = false,
  ...buttonProps
}: Props): React.JSX.Element => {
  const [height, setHeight] = useState<number | null>();
  const [width, setWidth] = useState<number | null>();
  const [showLoader, setShowLoader] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const startLoadTime = useRef<Date | undefined>(undefined);

  // Set up loader timer
  useEffect(() => {
    let loaderTimeout: number;

    if (loading) {
      // add a condition to prevent double set startLoadTime
      // when showLoader changes.
      if (startLoadTime.current === undefined) {
        // Keep track of the time when loading starts
        startLoadTime.current = new Date();
      }
      // Explicitly set button dimensions
      if (ref.current && !!ref.current.getBoundingClientRect()) {
        setHeight(ref.current.getBoundingClientRect().height);
        setWidth(ref.current.getBoundingClientRect().width);
      }
      setShowLoader(true);
    }

    if (!loading && showLoader) {
      const now = new Date();
      // calculate elapsed loading time
      const loadingMilliseconds: number =
        now.getTime() - (startLoadTime.current ?? now).getTime();

      // and subtract it from LOADER_MIN_DURATION,

      // also add an edge case when time diff is less than 0 to be 0.
      const timeoutDuration = Math.max(
        LOADER_MIN_DURATION - loadingMilliseconds,
        0,
      );

      const loadFinishHandler = () => {
        startLoadTime.current = undefined;
        setShowLoader(false);
        if (success) {
          setShowSuccess(true);
        }
      };

      if (timeoutDuration > 0) {
        loaderTimeout = window.setTimeout(loadFinishHandler, timeoutDuration);
      } else {
        loadFinishHandler();
      }
    }

    if (!loading && !showLoader) {
      setHeight(null);
      setWidth(null);
    }

    return () => window.clearTimeout(loaderTimeout);
  }, [loading, showLoader, success]);

  // Set up success timer
  useEffect(() => {
    let successTimeout: number;

    if (showSuccess) {
      successTimeout = window.setTimeout(() => {
        setHeight(null);
        setWidth(null);
        setShowSuccess(false);
      }, SUCCESS_DURATION);
    }

    return () => window.clearTimeout(successTimeout);
  }, [showSuccess]);

  const buttonClasses = classNames(
    className,
    "p-action-button",
    {
      "is-processing": showLoader || showSuccess,
    },
  );
  const showIcon = showLoader || showSuccess;
  const icon = (showLoader && "spinner") || (showSuccess && "success") || null;
  const iconLight = buttonProps.appearance === "positive" || buttonProps.appearance === "negative";

  return (
    <Button
      className={buttonClasses}
      ref={ref}
      disabled={disabled === null ? showLoader : disabled}
      style={
        height && width
          ? {
              height: `${height}px`,
              width: `${width}px`,
            }
          : undefined
      }
      {...buttonProps}
    >
      {showIcon ? (
        <Icon
          aria-label={showLoader ? Label.WAITING : Label.SUCCESS}
          className={showLoader ? "u-animation--spin" : null}
          light={iconLight}
          name={icon}
        />
      ) : (
        children
      )}
    </Button>
  );
};

export default ActionButton;
