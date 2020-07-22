module.exports = {
  stories: ["../src/**/*.stories.@(js|ts|jsx|tsx|mdx)"],
  addons: [
    "@storybook/addon-knobs/register",
    "@storybook/addon-docs/preset",
    "@storybook/preset-create-react-app",
  ],
};
