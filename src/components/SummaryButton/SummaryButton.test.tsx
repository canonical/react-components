import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SummaryButton from "./SummaryButton";

describe("<SummaryButton />", () => {
  // snapshot tests
  it("renders and matches the snapshot", () => {
    const { container } = render(
      <SummaryButton
        summary="Showing some items"
        label="Show more"
        onClick={jest.fn()}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  // unit tests
  it("renders a spinner icon", () => {
    const { container } = render(
      <SummaryButton label="Show more" onClick={jest.fn()} isLoading />
    );

    expect(container.querySelector("i.u-animation--spin")).toBeInTheDocument();
  });

  it("can handle click events", async () => {
    const onClick = jest.fn();
    render(<SummaryButton label="Show more" onClick={onClick} />);

    await userEvent.click(screen.getByRole("button", { name: "Show more" }));

    expect(onClick).toHaveBeenCalled();
  });
});
