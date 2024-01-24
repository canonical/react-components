import type { PropsWithSpread } from "@canonical/react-components/dist/types";
import classNames from "classnames";
import type {
  ComponentType,
  ElementType,
  HTMLProps,
  PropsWithChildren,
  ReactNode,
} from "react";

import type { ExclusiveProps } from "types";

export type LogoDefaultElement = HTMLProps<HTMLAnchorElement>;

type PanelLogo<L = LogoDefaultElement> = PropsWithSpread<
  {
    icon: string;
    iconAlt?: string;
    name: string;
    nameAlt?: string;
    component?: ElementType | ComponentType<L>;
  },
  L
>;

type PanelToggle = {
  label: string;
  onClick: () => void;
};

type LogoProps<L = LogoDefaultElement> = {
  logo: PanelLogo<L>;
};

type TitleProps = {
  title: ReactNode;
  titleClassName?: string;
  titleComponent?: ElementType;
};

type HeaderProps<L = LogoDefaultElement> = ExclusiveProps<
  {},
  {
    controls?: ReactNode;
    controlsClassName?: string;
    stickyHeader?: boolean;
    toggle?: PanelToggle;
  } & ExclusiveProps<LogoProps<L>, TitleProps>
>;

export type Props<L = LogoDefaultElement> = {
  contentClassName?: string | null;
  className?: string | null;
  dark?: boolean;
  wrapContent?: boolean;
  forwardRef?: React.Ref<HTMLDivElement> | null;
} & PropsWithChildren &
  HeaderProps<L>;

const generateLogo = <L = LogoDefaultElement,>({
  icon,
  iconAlt,
  name,
  nameAlt,
  component: Component = "a",
  ...props
}: PanelLogo<L>) => (
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

const Panel = <L = LogoDefaultElement,>({
  forwardRef,
  children,
  className,
  contentClassName,
  controlsClassName,
  controls,
  dark,
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
      ) : null}
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
