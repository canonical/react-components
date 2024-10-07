const commonJs = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "babel-plugin-typescript-to-proptypes",
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          enums: "./src/enums",
          components: "./src/components",
          hooks: "./src/hooks",
          types: "./src/types",
          utils: "./src/utils",
        },
      },
    ],
  ],
};
const esm = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        targets: {
          esmodules: true,
          chrome: "120",
        },
      },
    ],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "babel-plugin-typescript-to-proptypes",
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: {
          enums: "./src/enums",
          components: "./src/components",
          hooks: "./src/hooks",
          types: "./src/types",
          utils: "./src/utils",
        },
      },
    ],
  ],
};

module.exports = {
  env: {
    cjs: commonJs,
    test: commonJs,
    esm,
  },
};
