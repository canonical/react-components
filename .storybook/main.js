const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.@(js|ts|jsx|tsx|mdx)"],
  addons: ["@storybook/addon-docs/preset", "@storybook/addon-controls"],
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
      include: path.resolve(__dirname, "../"),
    });
    return config;
  },
};
