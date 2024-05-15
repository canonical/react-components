import React from "react";
import type { PropsWithSpread } from "types";
import classNames from "classnames";
import type {
  ComponentType,
  ElementType,
  HTMLProps,
  PropsWithChildren,
  ReactNode,
} from "react";

import type { ExclusiveProps } from "types";
import { isReactNode } from "utils";

export type LogoDefaultElement = HTMLProps<HTMLAnchorElement>;

type PanelLogo<L = LogoDefaultElement> =
  | ReactNode
  | PropsWithSpread<
      {
        /**
         * The url of the icon image.
         */
        icon: string;
        /**
         * The alt text for the icon image.
         */
        iconAlt?: string;
        /**
         * The url of the name image.
         */
        name: string;
        /**
         * The alt text for the name image.
         */
        nameAlt?: string;
        /**
         * The element or component to use for displaying the logo e.g. `a` or `NavLink`.
         * @default a
         */
        component?: ElementType | ComponentType<L>;
      },
      L
    >;

type PanelToggle = {
  /**
   * The panel toggle label.
   */
  label: string;
  /**
   * The function to call when clicking the panel toggle.
   */
  onClick: () => void;
};

type LogoProps<L = LogoDefaultElement> = {
  /**
   * The panel logo content or attributes.
   */
  logo?: PanelLogo<L>;
};

type TitleProps = {
  /**
   * The panel title.
   */
  title: ReactNode;
  /**
   * Classes to apply to the title element.
   */
  titleClassName?: string;
  /**
   * The element to use for the panel title e.g. `h1`.
   * @default h4
   */
  titleComponent?: ElementType;
};

type HeaderProps<L = LogoDefaultElement> = ExclusiveProps<
  {
    /**
     * This prop can be used to replace the header area of the panel when the default implementation is not sufficient.
     */
    header: ReactNode;
  },
  {
    /**
     * Content that will be displayed in the controls area.
     */
    controls?: ReactNode;
    /**
     * Classes that will be applied to the controls element.
     */
    controlsClassName?: string;
    /**
     * Whether the header should be sticky.
     */
    stickyHeader?: boolean;
    /**
     * The panel toggle attributes.
     */
    toggle?: PanelToggle;
  } & ExclusiveProps<LogoProps<L>, TitleProps>
>;

export type Props<L = LogoDefaultElement> = {
  /**
   * The panel content.
   */
  children?: PropsWithChildren["children"];
  /**
   * Classes that are applied to the content container (when using `wrapContent`).
   */
  contentClassName?: string | null;
  /**
   * Classes that are applied to the top level panel element.
   */
  className?: string | null;
  /**
   * Whether to use the dark theme.
   */
  dark?: boolean;
  /**
   * Whether the panel should wrap the content in the `p-panel__content` element.
   * @default true
   */
  wrapContent?: boolean;
  /**
   * A ref to pass to the top level panel element.
   */
  forwardRef?: React.Ref<HTMLDivElement> | null;
} & HeaderProps<L>;

const generateLogo = <L = LogoDefaultElement,>(logo: PanelLogo<L>) => {
  if (isReactNode(logo)) {
    return logo;
  }
  const {
    icon,
    iconAlt,
    name,
    nameAlt,
    component: Component = "a",
    ...props
  } = logo;
  return (
    <Component className="p-panel__logo" {...props}>
      <img
        className="p-panel__logo-icon"
        src={icon}
        alt={iconAlt}
        width="24"
        height="24"
      />
      <img
        className="p-panel__logo-name is-fading-when-collapsed"
        src={name}
        alt={nameAlt}
        height="16"
      />
    </Component>
  );
};

/**
 * This is a [React](https://reactjs.org/) component for panels in the
 * [Vanilla](https://vanillaframework.io/docs/) layouts.
 */
const Panel = <L = LogoDefaultElement,>({
  forwardRef,
  children,
  className,
  contentClassName,
  controlsClassName,
  controls,
  dark,
  header,
  logo,
  stickyHeader,
  title,
  titleClassName,
  titleComponent: TitleComponent = "h4",
  toggle,
  wrapContent = true,
  ...props
}: Props<L>) => {
  return (
    <div
      {...props}
      className={classNames("p-panel", className, {
        "is-dark": dark,
      })}
      ref={forwardRef}
    >
      {logo || title || controls || toggle ? (
        <div
          className={classNames("p-panel__header", {
            "is-sticky": stickyHeader,
          })}
        >
          {logo ? (
            generateLogo<L>(logo)
          ) : (
            <TitleComponent
              className={classNames("p-panel__title", titleClassName)}
            >
              {title}
            </TitleComponent>
          )}
          <div className={classNames("p-panel__controls", controlsClassName)}>
            {toggle ? (
              <span
                role="button"
                tabIndex={0}
                className="p-panel__toggle"
                onClick={() => toggle.onClick()}
                onKeyDown={() => toggle.onClick()}
              >
                {toggle.label}
              </span>
            ) : null}
            {controls}
          </div>
        </div>
      ) : (
        header
      )}
      {children && wrapContent ? (
        <div className={classNames("p-panel__content", contentClassName)}>
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default Panel;
