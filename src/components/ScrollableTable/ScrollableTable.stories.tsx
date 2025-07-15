import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import ScrollableTable from "./ScrollableTable";
import { MainTable } from "../../index";
import { Description, Subtitle, Title } from "@storybook/blocks";

const meta: Meta<typeof ScrollableTable> = {
  component: ScrollableTable,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof ScrollableTable>;

const StoryExample = (args: Story["args"]) => {
  const headers = [
    { content: "Fact" },
    { content: "Relevancy score" },
    { content: "Size" },
    { content: "ID" },
    { "aria-label": "Actions", className: "actions" },
  ];

  const facts = [
    "Dragons are mythical creatures",
    "They can fly",
    "They breathe fire",
    "They hoard treasure",
    "They are often depicted as large reptiles",
    "They appear in various cultures' folklore",
    "They can be friendly or hostile",
    "They are often associated with wisdom",
    "They can shapeshift in some legends",
    "They are sometimes guardians of sacred places",
    "They can be found in literature and movies",
    "They are often depicted with wings",
    "They can be of various colors",
    "They are sometimes associated with knights",
  ];
  const rows = facts.map((item) => {
    return {
      columns: [
        { content: item, role: "rowheader" },
        { content: 1 },
        { content: "1 GiB" },
        { content: 2 },
      ],
    };
  });

  return (
    <div>
      <h1>Above contents</h1>
      <ScrollableTable
        belowIds={args.belowIds}
        dependencies={[headers, rows]}
        tableId="facts-about-dragons"
      >
        <MainTable headers={headers} rows={rows} id="facts-about-dragons" />
      </ScrollableTable>
      <div id="footer">
        <h2 className="u-no-margin">Below contents</h2>
        <div>here be dragons.</div>
      </div>
    </div>
  );
};

export const Default: Story = {
  args: {
    belowIds: ["footer"],
  },
  render: StoryExample,
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
        </>
      ),
    },
  },
};
