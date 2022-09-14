import { render, screen } from "@testing-library/react";
import React from "react";

import Link from "./Link";

describe("Link ", () => {
  it("renders", () => {
    render(<Link href="/example">Test content</Link>);
    expect(screen.getByRole("link")).toMatchSnapshot();
  });

  it("can be an inverted link", () => {
    render(<Link inverted={true}>Test content</Link>);
    expect(screen.getByRole("link")).toHaveClass("p-link--inverted");
  });

  it("can be a soft link", () => {
    render(<Link soft={true}>Test content</Link>);
    expect(screen.getByRole("link")).toHaveClass("p-link--soft");
  });

  it("can be a back to top link", () => {
    render(<Link top={true}>Back to top</Link>);
    expect(screen.getByRole("link")).toMatchSnapshot();
  });

  it("can add additional classes", () => {
    render(
      <Link soft={true} className="extra-class">
        Test content
      </Link>
    );
    const link = screen.getByRole("link");
    expect(link).toHaveClass("p-link--soft");
    expect(link).toHaveClass("extra-class");
  });
});
