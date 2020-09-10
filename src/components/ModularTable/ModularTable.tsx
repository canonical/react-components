import React from "react";
// TODO:
// import PropTypes from "prop-types";
import { useTable } from "react-table";

import Table from "../Table";
import TableRow from "../TableRow";
import TableHeader from "../TableHeader";
import TableCell from "../TableCell";

import { TSFixMe } from "../../index";

function ModularTable({ data, columns }: TSFixMe): JSX.Element {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

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
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <TableCell
                    {...cell.getCellProps([
                      {
                        className: cell.column.className,
                      },
                    ])}
                  >
                    {cell.render("Cell")}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </tbody>
    </Table>
  );
}

export default ModularTable;
