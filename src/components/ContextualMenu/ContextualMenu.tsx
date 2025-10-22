import classNames from "classnames";
import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import type { HTMLProps, ReactNode } from "react";
import { useListener, usePrevious } from "hooks";
import Button from "../Button";
import type { ButtonProps } from "../Button";
import ContextualMenuDropdown from "./ContextualMenuDropdown";
import type { ContextualMenuDropdownProps } from "./ContextualMenuDropdown";
import type { MenuLink, Position } from "./ContextualMenuDropdown";
import {
  ClassName,
  ExclusiveProps,
  PropsWithSpread,
  SubComponentProps,
} from "types";
import { usePortal } from "external";

export enum Label {
  Toggle = "Toggle menu",
}

export type BaseProps<L> = PropsWithSpread<
  {
    /**
     * Whether the menu should adjust its horizontal position to fit on the screen.
     */
    autoAdjust?: boolean;
    /**
     * The menu content (if the links prop is not supplied).
     */
    children?: ContextualMenuDropdownProps["dropdownContent"];
    /**
     * An optional class to apply to the wrapping element.
     */
    className?: ClassName;
    /**
     * Whether the menu should close when the escape key is pressed.
     */
    closeOnEsc?: boolean;
    /**
     * Whether the menu should close when clicking outside the menu.
     */
    closeOnOutsideClick?: boolean;
    /**
     * Whether the menu's width should match the toggle's width.
     */
    constrainPanelWidth?: boolean;
    /**
     * An optional class to apply to the dropdown.
     */
    dropdownClassName?: string | null;
    /**
     * Additional props to pass to the dropdown.
     */
    dropdownProps?: SubComponentProps<ContextualMenuDropdownProps>;
    /**
     * A list of links to display in the menu (if the children prop is not supplied.)
     */
    links?: MenuLink<L>[] | null;
    /**
     * A function to call when the menu is toggled.
     */
    onToggleMenu?: (isOpen: boolean) => void | null;
    /**
     * The horizontal position of the menu.
     */
    position?: Position | null;
    /**
     * An element to make the menu relative to.
     */
    positionNode?: HTMLElement | null;
    /**
     * Whether the dropdown should scroll if it is too long to fit on the screen.
     */
    scrollOverflow?: boolean;
    /**
     * Whether the menu should be visible.
     */
    visible?: boolean;
  },
  HTMLProps<HTMLSpanElement>
>;

/**
 * The props for the ContextualMenu component.
 * @template L - The type of the link props.
 */
export type Props<L> = BaseProps<L> &
  ExclusiveProps<
    {
      /**
       * Whether the toggle should display a chevron icon.
       */
      hasToggleIcon?: boolean;
      /**
       * The appearance of the toggle button.
       */
      toggleAppearance?: ButtonProps["appearance"] | null;
      /**
       * A class to apply to the toggle button.
       */
      toggleClassName?: string | null;
      /**
       * Whether the toggle button should be disabled.
       */
      toggleDisabled?: boolean;
      /**
       * The toggle button's label.
       */
      toggleLabel?: React.ReactNode | null;
      /**
       * Whether the toggle lable or icon should appear first.
       */
      toggleLabelFirst?: boolean;
      /**
       * Additional props to pass to the toggle button.
       */
      toggleProps?: SubComponentProps<ButtonProps>;
    },
    { toggle: ReactNode }
  >;

/**
 * Get the node to use for positioning the menu.
 * @param wrapper - The component's wrapping element.
 * @param positionNode - A positioning node, if supplied.
 * @return A node or null.
 */
const getPositionNode = (
  wrapper: HTMLElement,
  positionNode?: HTMLElement,
): HTMLElement | null => {
  if (positionNode) {
    return positionNode;
  } else if (wrapper) {
    // We want to position the menu in relation to the toggle, if it exists.
    const toggle = wrapper.querySelector<HTMLElement>(
      ".p-contextual-menu__toggle",
    );
    return toggle || wrapper;
  }
  return null;
};

/**
 * Whether the positioning node is visible.
 * @param positionNode - The node that is used to position the menu.
 * @return Whether the positioning node is visible.
 */
const getPositionNodeVisible = (positionNode: HTMLElement) => {
  return !positionNode || positionNode.offsetParent !== null;
};

/**
 * This is a [React](https://reactjs.org/) component for the Vanilla [Contextual menu](https://docs.vanillaframework.io/patterns//contextual-menu/).
 *
 * A contextual menu can be used in conjunction with any page element to provide a contextual menu.
 */
const ContextualMenu = <L,>({
  autoAdjust = true,
  children,
  className,
  closeOnEsc = true,
  closeOnOutsideClick = true,
  constrainPanelWidth,
  dropdownClassName,
  dropdownProps,
  hasToggleIcon,
  links,
  onToggleMenu,
  position = "right",
  positionNode,
  scrollOverflow,
  toggle,
  toggleAppearance,
  toggleClassName,
  toggleDisabled,
  toggleLabel,
  toggleLabelFirst = true,
  toggleProps,
  visible = false,
  ...wrapperProps
}: Props<L>): React.JSX.Element => {
  const id = useId();
  const wrapper = useRef<HTMLSpanElement | null>(null);
  const [positionCoords, setPositionCoords] = useState<DOMRect>();
  const [adjustedPosition, setAdjustedPosition] = useState(position);

  useEffect(() => {
    setAdjustedPosition(position);
  }, [position, autoAdjust]);

  // Update the coordinates of the position node.
  const updatePositionCoords = useCallback(() => {
    const parent = getPositionNode(wrapper.current, positionNode);
    if (!parent) {
      return;
    }
    setPositionCoords(parent.getBoundingClientRect());
  }, [wrapper, positionNode]);

  const { openPortal, closePortal, isOpen, Portal } = usePortal({
    closeOnEsc,
    closeOnOutsideClick,
    isOpen: visible,
    onOpen: () => {
      // Call the toggle callback, if supplied.
      onToggleMenu?.(true);
      // When the menu opens then update the coordinates of the parent.
      updatePositionCoords();
    },
    onClose: () => {
      // Call the toggle callback, if supplied.
      onToggleMenu?.(false);
    },
    programmaticallyOpen: true,
  });

  const previousVisible = usePrevious(visible);
  const labelNode =
    toggleLabel && typeof toggleLabel === "string" ? (
      <span>{toggleLabel}</span>
    ) : React.isValidElement(toggleLabel) ? (
      toggleLabel
    ) : null;
  const contextualMenuClassName = classNames(className, "p-contextual-menu", {
    [`p-contextual-menu--${adjustedPosition}`]: adjustedPosition !== "right",
  });

  // Update the coordinates of the wrapper once it mounts to the dom. This uses
  // The callback ref pattern:
  // https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
  const wrapperRef = useCallback(
    (node: HTMLSpanElement) => {
      wrapper.current = node;
      if (node !== null) {
        updatePositionCoords();
      }
    },
    [updatePositionCoords],
  );

  // Handle controlling updates to the menu visibility from outside
  // the component.
  useEffect(() => {
    if (visible !== previousVisible) {
      if (visible && !isOpen) {
        openPortal();
      } else if (!visible && isOpen) {
        closePortal();
      }
    }
  }, [closePortal, openPortal, visible, isOpen, previousVisible]);

  const onResize = useCallback(() => {
    const parent = getPositionNode(wrapper.current, positionNode);
    if (parent && !getPositionNodeVisible(parent)) {
      // Hide the menu if the item has become hidden. This might happen in
      // a responsive table when columns become hidden as the page
      // becomes smaller.
      closePortal();
    } else {
      // Only update if the coordinates have changed.
      // The check fixes a bug with chrome, where an input receiving focus and
      // opening the keyboard causes a resize and the keyboard closes right after
      // opening.
      const coords = parent.getBoundingClientRect();
      if (JSON.stringify(coords) !== JSON.stringify(positionCoords)) {
        // Update the coordinates so that the menu stays relative to the
        // toggle button.
        updatePositionCoords();
      }
    }
  }, [closePortal, positionNode, positionCoords, updatePositionCoords]);

  const onScroll = useCallback(
    (e: Event) => {
      const parent = getPositionNode(wrapper.current, positionNode);
      // update position if the scroll event is triggered by the parent of the menu
      if (parent && (e.target as HTMLElement).contains(parent)) {
        // Update the coordinates so that the menu stays relative to the
        // toggle button.
        updatePositionCoords();
      }
    },
    [positionNode, updatePositionCoords],
  );

  useListener(window, onResize, "resize", true, isOpen);
  useListener(window, onScroll, "scroll", false, isOpen, true);

  let toggleNode: ReactNode = null;
  if (toggle) {
    toggleNode = toggle;
  } else if (hasToggleIcon || toggleLabel) {
    toggleNode = (
      <Button
        appearance={toggleAppearance}
        aria-controls={id}
        aria-expanded={isOpen ? "true" : "false"}
        aria-label={toggleLabel ? null : Label.Toggle}
        aria-pressed={isOpen ? "true" : "false"}
        aria-haspopup="true"
        className={classNames("p-contextual-menu__toggle", toggleClassName)}
        disabled={toggleDisabled}
        hasIcon={hasToggleIcon}
        onClick={(evt: React.MouseEvent<HTMLButtonElement>) => {
          if (!isOpen) {
            openPortal(evt);
          } else {
            closePortal(evt);
          }
        }}
        type="button"
        {...toggleProps}
      >
        {toggleLabelFirst ? labelNode : null}
        {hasToggleIcon ? (
          <i
            className={classNames(
              "p-icon--chevron-down p-contextual-menu__indicator",
              {
                "is-light": ["negative", "positive"].includes(toggleAppearance),
              },
            )}
          ></i>
        ) : null}
        {toggleLabelFirst ? null : labelNode}
      </Button>
    );
  }

  return (
    <span
      className={contextualMenuClassName}
      ref={wrapperRef}
      {...wrapperProps}
    >
      {toggleNode}
      {isOpen && (
        <Portal>
          <ContextualMenuDropdown<L>
            adjustedPosition={adjustedPosition}
            autoAdjust={autoAdjust}
            handleClose={closePortal}
            constrainPanelWidth={constrainPanelWidth}
            dropdownClassName={dropdownClassName}
            dropdownContent={children}
            id={id}
            isOpen={isOpen}
            links={links}
            position={position}
            positionCoords={positionCoords}
            contextualMenuClassName={contextualMenuClassName}
            positionNode={getPositionNode(wrapper.current)}
            scrollOverflow={scrollOverflow}
            setAdjustedPosition={setAdjustedPosition}
            {...dropdownProps}
          />
        </Portal>
      )}
    </span>
  );
};

export default ContextualMenu;
