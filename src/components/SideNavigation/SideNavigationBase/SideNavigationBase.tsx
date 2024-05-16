import React from "react";
import type { PropsWithSpread } from "types";
import type { ComponentType, ElementType, ReactNode } from "react";
import Icon from "components/Icon";

export type Props<C> = PropsWithSpread<
  {
    /**
     * The component or element to use for the element e.g. `span` or `NavLink`.
     */
    component: ElementType | ComponentType<C>;
    /**
     * Whether to use the dark theme.
     */
    dark?: boolean;
    /**
     * The navigation item's icon.
     */
    icon?: string;
    /**
     * The navigation item's label.
     */
    label: ReactNode;
    /**
     * The navigation item's status.
     */
    status?: ReactNode;
  },
  C
>;

const SideNavigationBase = <C,>({
  component: Component,
  dark,
  icon,
  label,
  status,
  ...props
}: Props<C>) => {
  return (
    <Component {...props}>
      {icon ? (
        <Icon name={icon} light={dark} className="p-side-navigation__icon" />
      ) : null}
      <span className="p-side-navigation__label">
        <span className="p-side-navigation__label">{label}</span>
      </span>
      {status ? (
        <div className="p-side-navigation__status">{status}</div>
      ) : null}
    </Component>
  );
};

export default SideNavigationBase;
