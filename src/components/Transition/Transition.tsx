import React, { useState, useLayoutEffect, useEffect } from "react";
import type { ReactNode } from "react";

import { nanoid } from "nanoid";
import { usePrevious } from "hooks";
import classNames from "classnames";

type TransitionProps = {
  children: ReactNode;
  variant?: "fade-in";
  direction?: "up" | "right" | "down" | "left";
  duration?: "snap" | "fast" | "brisk" | "slow" | "sleepy";
};

const Transition = ({
  children,
  variant = "fade-in",
  direction,
  duration,
}: TransitionProps): JSX.Element => {
  const [hasTransitioned, setHasTransitioned] = useState(false);
  const [callId, setCallId] = useState<string | null>(null);
  const previousCallId = usePrevious(callId);

  useEffect(() => {
    setCallId(nanoid());
  }, [setCallId]);

  useLayoutEffect(() => {
    if (callId !== previousCallId) {
      setHasTransitioned(true);
    }
  }, [callId, previousCallId]);

  const variantClassNames = {
    "transition--fade-in": variant === "fade-in",
    [`transition--${variant}-end`]: hasTransitioned,
  };
  const durationClassNames = {
    "transition-duration--snap": duration === "snap",
    "transition-duration--fast": duration === "fast",
    "transition-duration--brisk": duration === "brisk",
    "transition-duration--slow": duration === "slow",
    "transition-duration--sleepy": duration === "sleepy",
  };
  const directionClassnames = {
    "transition-direction--up": direction === "up",
    "transition-direction--right": direction === "right",
    "transition-direction--down": direction === "down",
    "transition-direction--left": direction === "left",
  };

  return (
    <div
      className={classNames([
        variantClassNames,
        durationClassNames,
        directionClassnames,
      ])}
    >
      {children}
    </div>
  );
};

export default Transition;
