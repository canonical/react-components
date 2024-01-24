import Button from "@canonical/react-components/dist/components/Button";
import Icon from "@canonical/react-components/dist/components/Icon";
import type { PropsWithSpread } from "@canonical/react-components/dist/types";
import classNames from "classnames";
import { type HTMLProps, type PropsWithChildren } from "react";

import Panel, { type PanelProps } from "components/upstream/Panel";

export type Props = PropsWithSpread<
  {
    forwardRef?: React.Ref<HTMLElement> | null;
    onClose?: () => void;
    panelProps?: PanelProps;
    pinned?: boolean;
  } & PropsWithChildren,
  HTMLProps<HTMLElement>
>;

const AppAside = ({
  children,
  className,
  forwardRef,
  onClose,
  panelProps,
  pinned,
  ...props
}: Props) => {
  return (
    <aside
      className={classNames("l-aside", className, {
        "is-pinned": pinned,
      })}
      {...props}
      ref={forwardRef}
    >
      <Panel
        {...(panelProps ?? {})}
        controls={
          <>
            {panelProps?.controls}
            {onClose ? (
              <Button
                appearance="base"
                className="u-no-margin--bottom"
                hasIcon
                onClick={() => onClose()}
              >
                <Icon name="close">Close</Icon>
              </Button>
            ) : null}
          </>
        }
      >
        {children}
      </Panel>
    </aside>
  );
};
export default AppAside;
