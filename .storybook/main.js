import path from "path";

const dirname =
  typeof __dirname === "undefined" ? import.meta?.dirname : __dirname;

const config = {
  stories: ["../src/**/*.@(mdx|stories.@(js|ts|jsx|tsx))"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-docs",
    "@storybook/addon-controls",
    "@storybook/addon-a11y",
    "@storybook/addon-webpack5-compiler-babel",
  ],
  webpackFinal: async (config) => {
    process.env.BABEL_ENV = "cjs";

    // Include the "sass" named export from vanilla-frameworks package.json
    // @see https://webpack.js.org/configuration/resolve/#resolveconditionnames
    config.resolve.conditionNames = ["...", "sass"];

    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
      include: path.resolve(dirname, "../"),
    });
    config.resolve.alias = {
      ...config.resolve.alias,
      external: path.resolve(dirname, "../src/external"),
    };
    return config;
  },
  docs: {
    autodocs: "tag",
  },
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
};

export default config;
