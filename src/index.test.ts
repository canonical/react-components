import fs from "fs";
import * as index from "./index";

it("exports all hooks and components from the index file", () => {
  const hooksPath = "./src/hooks/";
  const componentsPath = "./src/components/";

  const hooks = fs
    .readdirSync(hooksPath)
    .filter(
      (fileName) =>
        fileName !== "index.ts" && fileName.match(/(?<!test)\.(ts|tsx)$/)
    )
    .map((file) => file.replace(".ts", ""));
  const components = fs.readdirSync(componentsPath);

  const actualExports = Object.keys(index);

  [...hooks, ...components].forEach((expectedExport) => {
    expect(actualExports).toEqual(expect.arrayContaining([expectedExport]));
  });
});
