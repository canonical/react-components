import { Icon } from "@canonical/react-components";
import type { PropsWithSpread } from "@canonical/react-components/dist/types";
import type { ComponentType, ElementType, ReactNode } from "react";

export type Props<C> = PropsWithSpread<
  {
    component: ElementType | ComponentType<C>;
    dark?: boolean;
    icon?: string;
    label: ReactNode;
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
        <Icon name={icon} light={!dark} className="p-side-navigation__icon" />
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
