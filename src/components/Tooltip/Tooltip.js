import PropTypes from "prop-types";
import React, { useRef } from "react";
import usePortal from "react-useportal";

const getPositionStyle = (position, el) => {
  if (!el || !el.current) {
    return undefined;
  }

  const dimensions = el.current.getBoundingClientRect();
  const { x, y, height, width } = dimensions;
  let left = x + window.scrollX || 0;
  let top = y + window.scrollY || 0;

  switch (position) {
    case "btm-center":
      left += width / 2;
      top += height;
      break;
    case "btm-left":
      top += height;
      break;
    case "btm-right":
      left += width;
      top += height;
      break;
    case "left":
      top += height / 2;
      break;
    case "right":
      left += width;
      top += height / 2;
      break;
    case "top-center":
      left += width / 2;
      break;
    case "top-left":
      break;
    case "top-right":
      left += width;
      break;
    default:
      break;
  }

  return { position: "absolute", left, top };
};

const Tooltip = ({ children, message, position = "top-left" }) => {
  const el = useRef(null);
  const { openPortal, closePortal, isOpen, Portal } = usePortal();
  const positionStyle = getPositionStyle(position, el);

  return (
    <>
      {message ? (
        <span
          onBlur={closePortal}
          onFocus={openPortal}
          onMouseOut={closePortal}
          onMouseOver={openPortal}
          ref={el}
        >
          {children}
          {isOpen && (
            <Portal>
              <span
                className={`p-tooltip--${position}`}
                data-test="tooltip-portal"
                style={positionStyle}
              >
                <span
                  className="p-tooltip__message"
                  style={{ display: "inline" }}
                >
                  {message}
                </span>
              </span>
            </Portal>
          )}
        </span>
      ) : (
        children
      )}
    </>
  );
};

Tooltip.propTypes = {
  /**
   * Element on which to apply the tooltip.
   */
  children: PropTypes.node.isRequired,
  /**
   * Message to display when the element is hovered.
   */
  message: PropTypes.node,
  /**
   * Position of the tooltip relative to the element.
   */
  position: PropTypes.oneOf([
    "btm-center",
    "btm-left",
    "btm-right",
    "left",
    "right",
    "top-center",
    "top-left",
    "top-right",
  ]),
};

export default Tooltip;
