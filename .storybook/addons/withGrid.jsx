import React, { useEffect, useRef } from "react";

const GRID = [
  {
    value: false,
    title: "Grid: Off",
  },
  {
    value: true,
    title: "Grid: On",
  },
];

export const gridType = {
  grid: {
    name: "Grid",
    description: "Global grid for components",
    defaultValue: GRID[0].value,
    toolbar: {
      title: "Grid",
      items: GRID,
      dynamicTitle: true,
    },
  },
};

const removeGridFromDocs = () => {
  document.querySelectorAll(".docs-story").forEach((docStory) => {
    docStory.classList.remove("u-baseline-grid");
  });
};

const removeGridFromStory = () => {
  document.body.classList.remove("u-baseline-grid");
};

const clearGrid = () => {
  removeGridFromStory();
  removeGridFromDocs();
};

const addGridToDocs = () => {
  removeGridFromStory();
  document.querySelectorAll(".docs-story").forEach((docStory) => {
    docStory.classList.add("u-baseline-grid");
  });
};

const addGridToStory = () => {
  removeGridFromDocs();
  document.body.classList.add("u-baseline-grid");
};

export const WithGridProvider = (Story, context) => {
  const {
    viewMode,
    globals: { grid },
  } = context;
  const isDocs = viewMode === "docs";
  const gridRef = useRef(false);

  useEffect(() => {
    if (gridRef.current !== grid) {
      if (grid) {
        if (isDocs) {
          addGridToDocs();
        } else {
          addGridToStory();
        }
      } else {
        clearGrid();
      }
      gridRef.current = grid;
    }
  }, [grid, isDocs]);

  return <Story {...context} />;
};
