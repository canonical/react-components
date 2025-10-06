import React, { HTMLProps, ReactElement } from "react";
import { ClassName, PropsWithSpread } from "types";
import classnames from "classnames";
import Tooltip from "components/Tooltip";
import ContextualMenu from "components/ContextualMenu";
import Icon from "components/Icon";
import CheckboxInput from "components/CheckboxInput";
import "./ColumnSelector.scss";

export type Props = PropsWithSpread<
  {
    /**
     * Optional classes to add to the contextual menu.
     */
    className?: ClassName;
    /**
     * Columns of the table that can be hidden by the user
     */
    columns: string[];
    /**
     * Columns of the table hidden by the user
     */
    userHidden: string[];
    /**
     * Columns of the table hidden because the available space is not sufficient
     */
    sizeHidden: string[];
    /**
     * Function that sets columns hidden by the user
     */
    setUserHidden: (columns: string[]) => void;
  },
  HTMLProps<HTMLElement>
>;

/**
This is a [React](https://reactjs.org/) component that extends from the Vanilla [Select](https://vanillaframework.io/docs/base/forms#select) element.
The aim of this component is to provide a dropdown menu to control the visibility of columns within a table.
This component allows users to customize their view, hiding or showing columns as needed, while also handling columns that are automatically hidden on smaller screens.
*/
const ColumnSelector = ({
  className,
  columns,
  userHidden,
  sizeHidden,
  setUserHidden,
}: Props): React.JSX.Element => {
  const selectedCount = columns.length - userHidden.length;

  const toggleHiddenColumn = (column: string): void => {
    if (userHidden.includes(column)) {
      setUserHidden(userHidden.filter((c) => c !== column));
    } else {
      setUserHidden([...userHidden, column]);
    }
  };

  const wrapTooltip = (element: ReactElement, column: string): ReactElement => {
    if (!sizeHidden.includes(column)) return element;

    return (
      <Tooltip
        message={
          <>
            Screen is too narrow to fit the column.
            <br />
            Disable columns above or use a bigger screen.
          </>
        }
        position="left"
      >
        {element}
      </Tooltip>
    );
  };

  return (
    <ContextualMenu
      className={classnames(className, "column-selector-toggle")}
      dropdownProps={{ "aria-label": "columns menu" }}
      position="right"
      toggleClassName="has-icon"
      toggleProps={{
        "aria-label": "Columns selection toggle",
      }}
      toggleLabel={<Icon name="settings" />}
      toggleAppearance="base"
      title="Columns"
    >
      <div className="column-selector-column-list">
        <CheckboxInput
          checked={userHidden.length === 0}
          indeterminate={selectedCount > 0 && selectedCount < columns.length}
          label={`${selectedCount} out of ${columns.length} columns selected`}
          onChange={() => {
            if (userHidden.length > 0) {
              setUserHidden([]);
            } else {
              setUserHidden(columns);
            }
          }}
        />
        <hr />
        {columns.map((column) => (
          <div key={column}>
            {wrapTooltip(
              <CheckboxInput
                aria-label={column}
                labelClassName={classnames({
                  "size-hidden": sizeHidden.includes(column),
                })}
                checked={!userHidden.includes(column)}
                label={column}
                onChange={() => {
                  toggleHiddenColumn(column);
                }}
                disabled={sizeHidden.includes(column)}
              />,
              column,
            )}
          </div>
        ))}
      </div>
    </ContextualMenu>
  );
};

export default ColumnSelector;
