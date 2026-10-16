import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SegmentedControl from "./SegmentedControl";

describe("SegmentedControl", () => {
  it("renders", () => {
    const { container } = render(
      <SegmentedControl
        segments={[
          {
            label: "label1",
            content: <p>content1</p>,
          },
        ]}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("can set className correctly", () => {
    const { container } = render(
      <SegmentedControl
        className="is-dense"
        segments={[
          {
            label: "label1",
            content: <p>content1</p>,
          },
        ]}
      />,
    );
    expect(container.querySelector(".p-segmented-control")).toHaveClass(
      "is-dense",
    );
  });

  it("can set active segment on segment click", async () => {
    render(
      <SegmentedControl
        segments={[
          {
            label: "label1",
            content: <p>content1</p>,
          },
          {
            label: "label2",
            content: <p>content2</p>,
          },
        ]}
      />,
    );
    const segment = screen.getByRole("tab", { name: "label2" });
    await userEvent.click(segment);
    expect(screen.getByRole("tab", { name: "label2" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tabpanel", { name: "label2" })).toHaveTextContent(
      "content2",
    );
  });

  it("uses a roving tab index", () => {
    render(
      <SegmentedControl
        segments={[
          {
            label: "label1",
            content: <p>content1</p>,
          },
          {
            label: "label2",
            content: <p>content2</p>,
          },
          {
            label: "label3",
            content: <p>content3</p>,
          },
        ]}
      />,
    );

    expect(screen.getByRole("tab", { name: "label1" })).toHaveAttribute(
      "tabindex",
      "0",
    );
    expect(screen.getByRole("tab", { name: "label2" })).toHaveAttribute(
      "tabindex",
      "-1",
    );
    expect(screen.getByRole("tab", { name: "label3" })).toHaveAttribute(
      "tabindex",
      "-1",
    );
  });

  it("moves focus and selection with arrow keys", async () => {
    const user = userEvent.setup();

    render(
      <SegmentedControl
        segments={[
          {
            label: "label1",
            content: <p>content1</p>,
          },
          {
            label: "label2",
            content: <p>content2</p>,
          },
          {
            label: "label3",
            content: <p>content3</p>,
          },
        ]}
      />,
    );

    const firstTab = screen.getByRole("tab", { name: "label1" });
    const secondTab = screen.getByRole("tab", { name: "label2" });
    const thirdTab = screen.getByRole("tab", { name: "label3" });

    firstTab.focus();
    await user.keyboard("{ArrowRight}");

    expect(secondTab).toHaveFocus();
    expect(secondTab).toHaveAttribute("aria-selected", "true");
    expect(secondTab).toHaveAttribute("tabindex", "0");
    expect(firstTab).toHaveAttribute("tabindex", "-1");
    expect(screen.getByRole("tabpanel", { name: "label2" })).toHaveTextContent(
      "content2",
    );

    await user.keyboard("{ArrowLeft}");

    expect(firstTab).toHaveFocus();
    expect(firstTab).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{ArrowLeft}");

    expect(thirdTab).toHaveFocus();
    expect(thirdTab).toHaveAttribute("aria-selected", "true");
  });

  it("moves focus to first and last segment with home and end keys", async () => {
    const user = userEvent.setup();

    render(
      <SegmentedControl
        segments={[
          {
            label: "label1",
            content: <p>content1</p>,
          },
          {
            label: "label2",
            content: <p>content2</p>,
          },
          {
            label: "label3",
            content: <p>content3</p>,
          },
        ]}
      />,
    );

    const firstTab = screen.getByRole("tab", { name: "label1" });
    const thirdTab = screen.getByRole("tab", { name: "label3" });

    firstTab.focus();
    await user.keyboard("{ArrowRight}");
    await user.keyboard("{End}");

    expect(thirdTab).toHaveFocus();
    expect(thirdTab).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{Home}");

    expect(firstTab).toHaveFocus();
    expect(firstTab).toHaveAttribute("aria-selected", "true");
  });

  it("moves focus into the active tabpanel on tab", async () => {
    const user = userEvent.setup();

    render(
      <SegmentedControl
        segments={[
          {
            label: "label1",
            content: (
              <div>
                <button type="button">panel action one</button>
              </div>
            ),
          },
          {
            label: "label2",
            content: (
              <div>
                <button type="button">panel action two</button>
              </div>
            ),
          },
        ]}
      />,
    );

    const firstTab = screen.getByRole("tab", { name: "label1" });

    firstTab.focus();
    await user.keyboard("{ArrowRight}");

    await user.keyboard("{Tab}");

    expect(screen.getByRole("tabpanel", { name: "label2" })).toHaveFocus();
  });

  it("allows tabbing from the active tabpanel into its interactive content", async () => {
    const user = userEvent.setup();

    render(
      <SegmentedControl
        segments={[
          {
            label: "label1",
            content: (
              <div>
                <button type="button">panel action one</button>
              </div>
            ),
          },
          {
            label: "label2",
            content: (
              <div>
                <button type="button">panel action two</button>
              </div>
            ),
          },
        ]}
      />,
    );

    const firstTab = screen.getByRole("tab", { name: "label1" });

    firstTab.focus();
    await user.keyboard("{ArrowRight}");
    await user.keyboard("{Tab}");
    await user.keyboard("{Tab}");

    expect(
      screen.getByRole("button", { name: "panel action two" }),
    ).toHaveFocus();
  });

  it("focuses the tabpanel when tabbing from a segment", async () => {
    const user = userEvent.setup();

    render(
      <SegmentedControl
        segments={[
          {
            label: "label1",
            content: <p>content1</p>,
          },
        ]}
      />,
    );

    const tab = screen.getByRole("tab", { name: "label1" });
    tab.focus();

    await user.keyboard("{Tab}");

    expect(screen.getByRole("tabpanel", { name: "label1" })).toHaveFocus();
  });
});
