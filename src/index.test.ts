import fs from "fs";
import * as index from "./index";

it("exports all public hooks and components from the index file", () => {
  const hooksPath = "./src/hooks/";
  const componentsPath = "./src/components/";

  const isNotHidden = (name: string) => !name.startsWith(".");

  const hooks = fs
    .readdirSync(hooksPath)
    .filter(
      (fileName) =>
        fileName !== "index.ts" &&
        isNotHidden(fileName) &&
        fileName.match(/(?<!test)\.(ts|tsx)$/),
    )
    .map((file) => file.replace(".ts", ""));
  expect(hooks.length).toBeGreaterThan(0);

  const components = fs.readdirSync(componentsPath).filter(isNotHidden);
  expect(components.length).toBeGreaterThan(0);

  const actualExports = Object.keys(index);

  [...hooks, ...components].forEach((expectedExport) => {
    expect(actualExports).toEqual(expect.arrayContaining([expectedExport]));
  });
});
