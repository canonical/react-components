module.exports = {
  stories: ["../src/**/*.stories.(js|jsx|mdx)"],
  addons: [
    "@storybook/addon-knobs/register",
    "@storybook/preset-create-react-app",
    {
      name: "@storybook/addon-docs/react/preset",
      options: {
        configureJSX: true,
        babelOptions: {
          plugins: [
            [
              "@babel/plugin-transform-react-jsx",
              {
                pragmaFrag: "React.Fragment"
              },
              "storybook-transform-jsx"
            ]
          ]
        },
        sourceLoaderOptions: null
      }
    }
  ]
};
