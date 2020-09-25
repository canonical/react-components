import React from "react";
import PropTypes from "prop-types";
import { useTable } from "react-table";
import type { Column } from "react-table";

import Table from "../Table";
import TableRow from "../TableRow";
import TableHeader from "../TableHeader";
import TableCell from "../TableCell";
import Icon from "../Icon";

export type Props<D extends Record<string, unknown>> = {
  columns: Column<D>[];
  data: D[];
  emptyMsg?: string;
};

function ModularTable({
  data,
  columns,
  emptyMsg,
}: Props<Record<string, unknown>>): JSX.Element {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  const showEmpty: boolean = emptyMsg && (!rows || rows.length === 0);

  return (
    <Table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableHeader
                {...column.getHeaderProps([
                  {
                    className: column.className,
                  },
                  {
                    className: column.getCellIcon
                      ? "p-table__cell--icon-placeholder"
                      : "",
                  },
                ])}
              >
                {column.render("Header")}
              </TableHeader>
            ))}
          </TableRow>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          // This function is responsible for lazily preparing a row for rendering.
          // Any row that you intend to render in your table needs to be passed to this function before every render.
          // see: https://react-table.tanstack.com/docs/api/useTable#instance-properties
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell) => {
                const hasColumnIcon = cell.column.getCellIcon;
                const iconName = hasColumnIcon && cell.column.getCellIcon(cell);

                return (
                  <TableCell
                    {...cell.getCellProps([
                      {
                        className: cell.column.className,
                      },
                      {
                        className: hasColumnIcon
                          ? "p-table__cell--icon-placeholder"
                          : "",
                      },
                    ])}
                  >
                    {iconName && <Icon name={iconName} />}
                    {cell.render("Cell")}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
        {showEmpty && (
          <TableRow>
            {/* TODO:
              ideally this should span across whole table, but currently we don't know if any columns hides on small screens
              so this needs to wait until we implement some centralised mechanism for hiding columns
            */}
            <TableCell>{emptyMsg}</TableCell>
          </TableRow>
        )}
      </tbody>
    </Table>
  );
}

ModularTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.node,
      accessor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      Cell: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
      className: PropTypes.string,
      getCellIcon: PropTypes.func,
    }).isRequired
  ),
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  emptyMsg: PropTypes.string,
};

export default ModularTable;
