import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import CodeSnippet, { CodeSnippetBlockAppearance } from "./index";

describe("CodeSnippet ", () => {
  it("renders a code block", () => {
    render(<CodeSnippet blocks={[{ code: "Test" }]} />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("renders title for a code block", () => {
    render(<CodeSnippet blocks={[{ title: "Title", code: "Test" }]} />);
    expect(screen.getByRole("heading", { name: "Title" })).toHaveClass(
      "p-code-snippet__title",
    );
  });

  it("renders multiple code blocks", () => {
    render(
      <CodeSnippet
        blocks={[
          { title: "Title", code: "Test" },
          { title: "Title 2", code: "Test 2" },
        ]}
      />,
    );
    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByText("Test 2")).toBeInTheDocument();
  });

  it("renders line numbers", () => {
    const multilineCode = `Test line 1;
    Test line 2;
    Test line 3;`;

    render(
      <CodeSnippet
        blocks={[
          {
            appearance: CodeSnippetBlockAppearance.NUMBERED,
            code: multilineCode,
          },
        ]}
      />,
    );
    expect(
      document.querySelector(".p-code-snippet__block--numbered"),
    ).toBeInTheDocument();
    expect(screen.getByText("Test line 1;")).toBeInTheDocument();
    expect(screen.getByText("Test line 2;")).toBeInTheDocument();
    expect(screen.getByText("Test line 3;")).toBeInTheDocument();
  });

  it("renders line numbers when an array is passed in", () => {
    const multilineCode = [
      "Test line 1;",
      <strong key="strong">Test line 2;</strong>,
      "Test line 3;",
    ];

    render(
      <CodeSnippet
        blocks={[
          {
            appearance: CodeSnippetBlockAppearance.NUMBERED,
            code: multilineCode,
          },
        ]}
      />,
    );
    expect(
      document.querySelector(".p-code-snippet__block--numbered"),
    ).toBeInTheDocument();
    expect(document.querySelectorAll(".p-code-snippet__line")).toHaveLength(3);
    expect(screen.getByText("Test line 1;")).toBeInTheDocument();
    expect(screen.getByText("Test line 2;")).toBeInTheDocument();
    expect(screen.getByText("Test line 3;")).toBeInTheDocument();
  });

  it("renders JSX code", () => {
    render(
      <CodeSnippet
        blocks={[
          {
            code: (
              <div data-testid="jsx-content">
                <a href="example.com/docs/function">functionCall()</a>
              </div>
            ),
          },
        ]}
      />,
    );
    expect(screen.getByTestId("jsx-content")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "functionCall()" }),
    ).toBeInTheDocument();
  });

  it("renders default linux prompt icon", () => {
    render(
      <CodeSnippet
        blocks={[
          { appearance: CodeSnippetBlockAppearance.LINUX_PROMPT, code: "Test" },
        ]}
      />,
    );
    expect(
      document.querySelector(".p-code-snippet__block--icon"),
    ).toBeInTheDocument();
  });

  it("renders windows prompt icon", () => {
    render(
      <CodeSnippet
        blocks={[
          {
            appearance: CodeSnippetBlockAppearance.WINDOWS_PROMPT,
            code: "Test",
          },
        ]}
      />,
    );
    expect(
      document.querySelector(".p-code-snippet__block--icon.is-windows-prompt"),
    ).toBeInTheDocument();
  });

  it("renders url icon", () => {
    render(
      <CodeSnippet
        blocks={[{ appearance: CodeSnippetBlockAppearance.URL, code: "Test" }]}
      />,
    );
    expect(
      document.querySelector(".p-code-snippet__block--icon.is-url"),
    ).toBeInTheDocument();
  });

  it("renders code block with line wrapping", () => {
    render(<CodeSnippet blocks={[{ wrapLines: true, code: "Test" }]} />);
    expect(document.querySelector(".is-wrapped")).toBeInTheDocument();
  });

  it("renders code block with a dropdown", async () => {
    const onChange = jest.fn();
    render(
      <CodeSnippet
        blocks={[
          {
            code: "Test",
            dropdowns: [
              {
                options: [
                  { value: "js", label: "JS" },
                  { value: "css", label: "CSS" },
                  { value: "html", label: "HTML" },
                ],
                value: "html",
                onChange: onChange,
              },
            ],
          },
        ]}
      />,
    );
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getAllByRole("option")[0]).toHaveValue("js");
    await userEvent.selectOptions(screen.getByRole("combobox"), "html");
    expect(onChange).toHaveBeenCalled();
  });

  it("renders code snippets with a border when it also has custom content", () => {
    render(
      <CodeSnippet
        blocks={[
          {
            code: "Test",
            content: (
              <>
                <span className="test"></span>
              </>
            ),
          },
        ]}
      />,
    );
    expect(document.querySelector(".test")).toBeInTheDocument();
    expect(document.querySelector(".is-bordered")).toBeInTheDocument();
  });

  it("renders extra props", () => {
    render(
      <CodeSnippet
        blocks={[
          {
            code: "Test",
            content: (
              <>
                <span className="test"></span>
              </>
            ),
          },
        ]}
        data-testid="testID"
      />,
    );
    expect(screen.getByTestId("testID")).toBeInTheDocument();
  });
});
