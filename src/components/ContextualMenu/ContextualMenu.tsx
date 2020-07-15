import React from "react";
import type { ReactNode } from "react";
import PropTypes from "prop-types";

type Props = {
  visible?: boolean;
  children?: ReactNode;
};

const ContextualMenu = ({ children, visible = false }: Props): JSX.Element => (
  <div>
    <span className="p-contextual-menu--left">
      <span
        className="p-contextual-menu__dropdown"
        aria-hidden={!visible}
        aria-label="submenu"
      >
        {children}
      </span>
    </span>
  </div>
);

ContextualMenu.propTypes = {
  visible: PropTypes.bool,
  children: PropTypes.any,
};

export default ContextualMenu;
