import React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { MultiSelect } from "./MultiSelect";

const items = [
  { label: "item one", value: 1 },
  { label: "item two", value: 2 },
  { label: "other", value: 3 },
];

it("shows options when opened", async () => {
  render(<MultiSelect items={items} />);

  items.forEach((item) => {
    expect(
      screen.queryByRole("checkbox", { name: item.label }),
    ).not.toBeInTheDocument();
  });

  await userEvent.click(screen.getByRole("combobox"));

  items.forEach((item) => {
    expect(
      screen.getByRole("checkbox", { name: item.label }),
    ).toBeInTheDocument();
  });
});

it("opens the dropdown when the combobox is clicked", async () => {
  render(<MultiSelect items={items} />);
  expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  await userEvent.click(screen.getByRole("combobox"));
  expect(screen.getByRole("listbox")).toBeInTheDocument();
});

it("can have some options preselected", async () => {
  render(
    <MultiSelect
      variant="condensed"
      items={items}
      selectedItems={[items[0]]}
    />,
  );
  expect(screen.getByRole("combobox")).toHaveTextContent(items[0].label);
  expect(
    screen.queryByRole("checkbox", { name: items[0].label }),
  ).not.toBeInTheDocument();
  await userEvent.click(screen.getByRole("combobox"));
  expect(
    screen.getByRole("checkbox", { name: items[0].label }),
  ).toBeInTheDocument();
});

it("can select options from the dropdown", async () => {
  const onItemsUpdate = jest.fn();
  const onSelectItem = jest.fn();
  render(
    <MultiSelect
      items={items}
      onItemsUpdate={onItemsUpdate}
      onSelectItem={onSelectItem}
    />,
  );
  await userEvent.click(screen.getByRole("combobox"));
  await userEvent.click(screen.getByLabelText(items[0].label));
  await waitFor(() => expect(onItemsUpdate).toHaveBeenCalledWith([items[0]]));
  await waitFor(() => expect(onSelectItem).toHaveBeenCalledWith(items[0]));
});

it("can remove options that have been selected", async () => {
  const onItemsUpdate = jest.fn();
  const onDeselectItem = jest.fn();
  render(
    <MultiSelect
      items={items}
      selectedItems={items}
      onItemsUpdate={onItemsUpdate}
      onDeselectItem={onDeselectItem}
    />,
  );
  await userEvent.click(screen.getByRole("combobox"));
  expect(screen.getAllByRole("listitem")).toHaveLength(3);
  await userEvent.click(
    within(screen.getByRole("listbox")).getByLabelText(items[0].label),
  );
  expect(onItemsUpdate).toHaveBeenCalledWith(items.slice(1));
  expect(onDeselectItem).toHaveBeenCalledWith(items[0]);
});

it("can filter option list", async () => {
  render(<MultiSelect variant="search" items={items} />);
  await userEvent.click(screen.getByRole("combobox"));
  expect(screen.getAllByRole("listitem")).toHaveLength(3);
  await userEvent.type(screen.getByRole("combobox"), "item");
  await waitFor(() => expect(screen.getAllByRole("listitem")).toHaveLength(2));
});

it("can display a custom dropdown header and footer", async () => {
  render(
    <MultiSelect
      dropdownHeader={<button>custom header button</button>}
      dropdownFooter={<button>custom footer button</button>}
      items={items}
    />,
  );
  await userEvent.click(screen.getByRole("combobox"));
  expect(
    screen.getByRole("button", { name: "custom header button" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "custom footer button" }),
  ).toBeInTheDocument();
});

it("can not display the footer", async () => {
  render(
    <MultiSelect
      dropdownFooter={<button>custom footer button</button>}
      items={items}
      showDropdownFooter={false}
    />,
  );
  await userEvent.click(screen.getByRole("combobox"));
  expect(
    screen.queryByRole("button", { name: "custom footer button" }),
  ).not.toBeInTheDocument();
});

it("selects all items and clears selection when respective buttons are clicked", async () => {
  const onItemsUpdate = jest.fn();
  render(
    <MultiSelect
      items={items}
      variant="search"
      onItemsUpdate={onItemsUpdate}
    />,
  );
  await userEvent.click(screen.getByRole("combobox"));
  await userEvent.type(screen.getByRole("combobox"), "item");
  await userEvent.click(screen.getByRole("button", { name: /select all/i }));
  expect(onItemsUpdate).toHaveBeenCalledWith(items);
  await userEvent.click(screen.getByRole("button", { name: "Clear" }));
  expect(onItemsUpdate).toHaveBeenCalledWith([]);
});

it("closes the dropdown when clicking outside of the dropdown", async () => {
  render(<MultiSelect items={items} />);
  await userEvent.click(screen.getByRole("combobox"));
  expect(screen.getByRole("listbox")).toBeInTheDocument();
  await userEvent.click(document.body);
  expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
});

it("closes the dropdown when clicking on the button", async () => {
  render(<MultiSelect items={items} />);
  await userEvent.click(screen.getByRole("combobox"));
  expect(screen.getByRole("listbox")).toBeInTheDocument();
  await userEvent.click(screen.getByRole("combobox"));
  expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
});

it("updates text in the input field if something is selected", async () => {
  render(
    <MultiSelect
      items={items}
      selectedItems={[items[0]]}
      variant="condensed"
    />,
  );
  expect(screen.getByRole("combobox")).toHaveTextContent(items[0].label);
});

it("can display the placeholder when items are selected", async () => {
  const placeholder = "Select a few items";
  render(
    <MultiSelect
      items={items}
      selectedItems={[items[0]]}
      variant="condensed"
      listSelected={false}
      placeholder={placeholder}
    />,
  );
  expect(screen.getByRole("combobox")).toHaveTextContent(placeholder);
});

it("can have one or more sections with titles", async () => {
  const itemsWithGroup = [
    { label: "item one", value: 1, group: "Group 1" },
    { label: "item two", value: 2, group: "Group 2" },
    { label: "other", value: 3, group: "Group 1" },
  ];

  render(<MultiSelect items={itemsWithGroup} />);
  await userEvent.click(screen.getByRole("combobox"));

  itemsWithGroup.forEach((item) => {
    expect(
      screen.getByRole("heading", { name: item.group }),
    ).toBeInTheDocument();
    expect(screen.getByRole("list", { name: item.group })).toBeInTheDocument();
  });
});

it("sorts grouped options alphabetically", async () => {
  const itemsUnsorted = [
    { label: "item B", value: 2, group: "Group 1" },
    { label: "item A", value: 1, group: "Group 1" },
    { label: "other B", value: 3, group: "Group 2" },
    { label: "other A", value: 4, group: "Group 2" },
  ];

  render(<MultiSelect items={itemsUnsorted} />);
  await userEvent.click(screen.getByRole("combobox"));

  const checkGroupOrder = async (
    groupName: string,
    expectedLabels: string[],
  ) => {
    const group = screen.getByRole("list", { name: groupName });
    await waitFor(() =>
      within(group)
        .getAllByRole("listitem")
        .forEach((item, index) =>
          expect(item).toHaveTextContent(expectedLabels[index]),
        ),
    );
  };

  checkGroupOrder("Group 1", ["item A", "item B"]);
  checkGroupOrder("Group 2", ["other A", "other B"]);
});

it("hides group title when no items match the search query", async () => {
  const itemsWithGroup = [
    { label: "item one", value: 1, group: "Group 1" },
    { label: "item two", value: 2, group: "Group 2" },
    { label: "other", value: 3, group: "Group 1" },
  ];

  render(<MultiSelect variant="search" items={itemsWithGroup} />);
  await userEvent.click(screen.getByRole("combobox"));
  expect(screen.getByRole("heading", { name: "Group 1" })).toBeInTheDocument();

  await userEvent.type(screen.getByRole("combobox"), "item two");
  expect(
    screen.queryByRole("heading", { name: "Group 1" }),
  ).not.toBeInTheDocument();
  expect(screen.getByRole("heading", { name: "Group 2" })).toBeInTheDocument();
});

it("displays previously selected items at the top of the list in a sorted order", async () => {
  const items = [
    { label: "item two", value: 2 },
    { label: "item one", value: 1 },
  ];
  const unSortedSelectedItems = [items[1], items[0]];

  render(<MultiSelect items={items} selectedItems={unSortedSelectedItems} />);

  await userEvent.click(screen.getByRole("combobox"));

  const listItems = screen.getAllByRole("listitem");

  await waitFor(() => {
    expect(listItems[0]).toHaveTextContent("item one");
  });
  expect(listItems[1]).toHaveTextContent("item two");
});

it("opens and closes the dropdown on click", async () => {
  render(<MultiSelect variant="condensed" items={items} />);
  expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  await userEvent.click(screen.getByRole("combobox"));
  expect(screen.getByRole("listbox")).toBeInTheDocument();
  await userEvent.click(screen.getByRole("combobox"));
  expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
});

it("can render without sorting alphabetically", async () => {
  const itemsUnsorted = [
    { label: "item B", value: 2 },
    { label: "item A", value: 1 },
    { label: "other B", value: 3 },
    { label: "other A", value: 4 },
  ];

  render(<MultiSelect items={itemsUnsorted} isSortedAlphabetically={false} />);
  await userEvent.click(screen.getByRole("combobox"));
  const list = screen.getByRole("list");

  const expectedLabels = itemsUnsorted.map((item) => item.label);
  await waitFor(() =>
    within(list)
      .getAllByRole("listitem")
      .forEach((item, index) =>
        expect(item).toHaveTextContent(expectedLabels[index]),
      ),
  );
});

it("can render without sorting selected items first", async () => {
  render(
    <MultiSelect
      items={items}
      selectedItems={[items[1]]}
      hasSelectedItemsFirst={false}
    />,
  );
  await userEvent.click(screen.getByRole("combobox"));
  const list = screen.getByRole("list");

  const expectedLabels = items.map((item) => item.label);
  await waitFor(() =>
    within(list)
      .getAllByRole("listitem")
      .forEach((item, index) =>
        expect(item).toHaveTextContent(expectedLabels[index]),
      ),
  );
});

it("can render help", async () => {
  const { container } = render(
    <MultiSelect
      items={items}
      selectedItems={[items[1]]}
      help={<span>This is a help text</span>}
    />,
  );

  const helpTextList = container.querySelectorAll(".p-form-help-text");
  expect(helpTextList).toHaveLength(1);
  const helpText = helpTextList[0];
  expect(helpText).toBeVisible();
});

it("can connect help text to combobox with aria-describedby for search variant", async () => {
  const helpText = "This is helpful information";
  render(<MultiSelect items={items} variant="search" help={helpText} />);
  expect(screen.getByRole("combobox")).toHaveAccessibleDescription(helpText);
});

it("can connect help text to combobox with aria-describedby for condensed variant", async () => {
  const helpText = "This is helpful information";
  render(<MultiSelect items={items} variant="condensed" help={helpText} />);
  expect(screen.getByRole("combobox")).toHaveAccessibleDescription(helpText);
});

it("doesn't render help", async () => {
  const { container } = render(
    <MultiSelect items={items} selectedItems={[items[1]]} />,
  );
  expect(container.querySelectorAll(".p-form-help-text")).toHaveLength(0);
});

it("can add additional classes to help", () => {
  const { container } = render(
    <MultiSelect
      items={items}
      selectedItems={[items[1]]}
      help={<span>This is a help text</span>}
      helpClassName="additional-help-text-class"
    />,
  );
  expect(container.querySelectorAll(".p-form-help-text")).toHaveLength(1);
  expect(container.querySelector(".p-form-help-text")).toHaveClass(
    "additional-help-text-class",
  );
});
