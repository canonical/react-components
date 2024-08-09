import React, { useEffect } from "react";
import type { PropsWithSpread } from "types";
import classNames from "classnames";
import type { ReactNode } from "react";
import { useState, type HTMLProps, type PropsWithChildren } from "react";

import Panel from "components/Panel";
import type { PanelProps } from "components/Panel";
import type { PanelLogoDefaultElement } from "components/Panel";
import type { ExclusiveProps } from "types";

import type { SideNavigationProps } from "../SideNavigation";
import SideNavigation from "../SideNavigation";
import type { SideNavigationLinkDefaultElement } from "../SideNavigation/SideNavigationLink/index";

import AppMain from "./AppMain";
import AppNavigation from "./AppNavigation";
import AppNavigationBar from "./AppNavigationBar";
import AppStatus from "./AppStatus";
import Application from "./Application";
import Button from "components/Button";
import Icon from "components/Icon";

export type BaseProps<
  NI = SideNavigationLinkDefaultElement,
  PL = PanelLogoDefaultElement,
> = PropsWithSpread<
  {
    /**
     * The aside panel. This prop puts the panel in the correct position inside the
     * application layout DOM structure, but does not wrap the content in an aside,
     * so the content provided to this prop should include an `<AppAside>` or equivalent.
     */
    aside?: ReactNode;
    /**
     * The content for the main area.
     */
    children?: PropsWithChildren["children"];
    /**
     * Whether to use the dark theme.
     * @default true
     */
    dark?: boolean;
    /**
     * The logo to appear in the navigation panels.
     */
    logo?: PanelProps<PL>["logo"];
    /**
     * The component to use to render links inside the navigation e.g. when
     * using react-router you'd pass `Link` to this prop.
     */
    navLinkComponent?: SideNavigationProps<NI>["linkComponent"];
    /**
     * Whether the navigation menu should be collapsed.
     */
    menuCollapsed?: boolean;
    /**
     * Whether the navigation menu should be pinned.
     */
    menuPinned?: boolean;
    /**
     * A function that is called to collapse the navigation menu.
     */
    onCollapseMenu?: (menuCollapsed: boolean) => void;
    /**
     * A function that is called to pin the navigation menu.
     */
    onPinMenu?: (menuPinned: boolean) => void;
    /**
     * The content to appear inside the status area.
     */
    status?: ReactNode;
    /**
     * Classes to apply to the navigation bar.
     */
    navigationBarClassName?: string;
    /**
     * Classes to apply to the navigation menu.
     */
    navigationClassName?: string;
    /**
     * Classes to apply to the main area.
     */
    mainClassName?: string;
    /**
     * Classes to apply to the status area.
     */
    statusClassName?: string;
    /**
     * The title of the document.
     */
    title?: string;
  },
  HTMLProps<HTMLDivElement>
>;

export type Props<
  NI = SideNavigationLinkDefaultElement,
  PL = PanelLogoDefaultElement,
> = BaseProps<NI, PL> &
  ExclusiveProps<
    {
      navItems?: SideNavigationProps<NI>["items"];
    },
    {
      sideNavigation?: ReactNode;
    }
  >;

/**
 * This is a [React](https://reactjs.org/) component for the Vanilla
 * [Application Layout](https://vanillaframework.io/docs/layouts/application).
 *
 * This component combines the various sub-components that make up the
 * Application Layout to make it easier to consume. For some applications this
 * component maybe not be flexible enough, in which case you may choose to use
 * the sub-components directly. Be aware that the application layout requires a
 * specific structure and states to function correctly so there will be a
 * trade-off when using the sub-components directly.
 */
const ApplicationLayout = <
  NI = SideNavigationLinkDefaultElement,
  PL = PanelLogoDefaultElement,
>({
  aside,
  children,
  dark = true,
  logo,
  mainClassName,
  menuCollapsed,
  menuPinned,
  navigationBarClassName,
  navigationClassName,
  navItems,
  navLinkComponent,
  onCollapseMenu,
  onPinMenu,
  sideNavigation,
  status,
  statusClassName,
  title,
  ...props
}: Props<NI, PL>) => {
  const [internalMenuPinned, setInternalMenuPinned] = useState(false);
  const [internalMenuCollapsed, setInternalMenuCollapsed] = useState(true);
  const menuIsPinned = menuPinned ?? internalMenuPinned;
  const setMenuPinned = onPinMenu ?? setInternalMenuPinned;
  const menuIsCollapsed = menuCollapsed ?? internalMenuCollapsed;
  const setMenuCollapsed = onCollapseMenu ?? setInternalMenuCollapsed;

  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  return (
    <Application {...props}>
      {(navItems || sideNavigation) && (
        <>
          <AppNavigationBar className={navigationBarClassName}>
            <Panel<PL>
              dark={dark}
              logo={logo}
              toggle={{
                label: "Menu",
                onClick: () => setMenuCollapsed(!menuIsCollapsed),
              }}
            />
          </AppNavigationBar>
          <AppNavigation
            className={navigationClassName}
            collapsed={menuIsCollapsed}
            pinned={menuIsPinned}
          >
            <Panel<PL>
              dark={dark}
              controls={
                <>
                  <Button
                    hasIcon
                    appearance="base"
                    className={classNames("u-no-margin u-hide--medium", {
                      "is-dark": dark,
                    })}
                    onClick={(evt) => {
                      setMenuCollapsed(true);
                      // The menu stays open while its content has focus, so the
                      // close button must blur to actually close the menu.
                      evt.currentTarget.blur();
                    }}
                  >
                    <Icon
                      name="close"
                      className={classNames({ "is-light": dark })}
                    >
                      Close menu
                    </Icon>
                  </Button>
                  <Button
                    hasIcon
                    appearance="base"
                    className={classNames("u-no-margin u-hide--small", {
                      "is-dark": dark,
                    })}
                    onClick={() => {
                      setMenuPinned(!menuIsPinned);
                    }}
                  >
                    <Icon
                      name={menuIsPinned ? "close" : "pin"}
                      className={classNames({ "is-light": dark })}
                    >
                      {menuIsPinned ? "Unpin menu" : "Pin menu"}
                    </Icon>
                  </Button>
                </>
              }
              controlsClassName="u-hide--large"
              stickyHeader
              logo={logo}
            >
              {navItems ? (
                <SideNavigation<NI>
                  dark={dark}
                  items={navItems}
                  linkComponent={navLinkComponent}
                />
              ) : (
                sideNavigation
              )}
            </Panel>
          </AppNavigation>
        </>
      )}
      <AppMain className={mainClassName}>{children}</AppMain>
      {aside}
      {status && <AppStatus className={statusClassName}>{status}</AppStatus>}
    </Application>
  );
};

export default ApplicationLayout;
