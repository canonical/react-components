import { render, screen } from "@testing-library/react";
import React from "react";

import ArticlePagination from "./ArticlePagination";

describe("ArticlePagination ", () => {
  it("renders", () => {
    render(
      <ArticlePagination
        nextLabel="Consectetur adipisicing elit"
        nextURL="#next"
        previousLabel="Lorem ipsum dolor sit amet"
        previousURL="#previous"
      />
    );
    expect(screen.getByRole("contentinfo")).toMatchSnapshot();
  });

  it("can add additional classes", () => {
    render(<ArticlePagination className="extra-class" />);
    const pagination = screen.getByRole("contentinfo");
    expect(pagination).toHaveClass("p-article-pagination");
    expect(pagination).toHaveClass("extra-class");
  });
});
