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
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        "style-loader",
        "css-loader",
        {
          loader: "sass-loader",
          options: {
            sassOptions: { loadPaths: [path.resolve(dirname, "../src/scss")] },
          },
        },
      ],
      include: path.resolve(dirname, "../"),
    });
    config.resolve.alias = {
      ...config.resolve.alias,
      external: path.resolve(dirname, "../src/external"),
    };
    return config;
  },
  docs: { autodocs: "tag" },
  framework: { name: "@storybook/react-webpack5", options: {} },
};

export default config;
