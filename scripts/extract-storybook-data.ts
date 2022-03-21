import express from "express";
import { stat, writeFile } from "fs/promises";
import { AddressInfo } from "net";
import path from "path";
import puppeteer from "puppeteer";

const read = async (url: string) => {
  console.log(`connecting to: ${url}`);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  console.log("extracting the data...");
  await page.waitForFunction("window.__STORYBOOK_ADDONS");
  const data = JSON.parse(
    await page.evaluate(() => {
      return JSON.stringify(window["__STORYBOOK_ADDONS"], null, 2);
    })
  );

  await browser.close();

  const stories = data.channel.data.setStories[0].stories;
  const components = {};
  Object.keys(stories).forEach((storySlug) => {
    const name = storySlug.split("--")[0];
    if (components[name]) return;
    components[name] = {
      name: stories[storySlug].title,
      props: stories[storySlug].argTypes,
    };
  });

  // special case: this isn't a component, it's added by storybook
  // as main point to the page
  delete components["getting-started"];
  return components;
};

const serveLocation: (
  location: string
) => Promise<[string, () => void]> = async (location: string) => {
  if (location.match(/^http/)) {
    return [location, async () => {}];
  }

  // check for location's existence
  await stat(path.resolve(location));

  const app = express();

  app.use(express.static(location));

  return new Promise((resolve) => {
    const server = app.listen(0, () => {
      const address: AddressInfo = server.address() as AddressInfo;
      const result = `http://localhost:${address.port}/iframe.html`;

      console.log(`serving the data on: ${result}`);

      resolve([result, server.close.bind(server)]);
    });
  });
};

async function extract(input: string, targetPath: string) {
  if (input && targetPath) {
    const [location, exit] = await serveLocation(input);

    const data = await read(location);

    await writeFile(targetPath, JSON.stringify(data, null, 2));

    await exit();
  } else {
    throw new Error(
      "Extract: please specify a path where your built-storybook is (can be a public url) and a target directory"
    );
  }
}

async function main(storybookOutputDir, targetPath) {
  targetPath = path.resolve(targetPath);
  await extract(storybookOutputDir, targetPath);
  console.log(`data exported to: ${targetPath}`);
}

main("docs", "output.json");
