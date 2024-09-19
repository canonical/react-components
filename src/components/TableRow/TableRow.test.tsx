import { render, screen } from "@testing-library/react";
import React from "react";

import TableRow from "./TableRow";

describe("TableRow", () => {
  it("renders", () => {
    render(
      <table>
        <tbody>
          <TableRow>
            <td></td>
          </TableRow>
        </tbody>
      </table>,
    );
    expect(screen.getByRole("row")).toMatchSnapshot();
  });
});
