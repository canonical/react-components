import React from "react";
import PropTypes from "prop-types";

const ContextualMenu = ({ children, visible = false }) => (
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
