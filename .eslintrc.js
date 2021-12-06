module.exports = {
  parser: "@babel/eslint-parser",
  plugins: ["react", "prettier", "cypress"],
  extends: [
    "react-app", // Use the recommended rules from CRA.
    "plugin:cypress/recommended",
    "plugin:prettier/recommended", // Ensure this is last in the list.
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "error",
    "react/forbid-component-props": [
      "error",
      {
        forbid: [
          {
            propName: "data-test",
            message: "Use `data-testid` instead of `data-test` attribute",
          },
        ],
      },
    ],
    "react/forbid-dom-props": [
      "error",
      {
        forbid: [
          {
            propName: "data-test",
            message: "Use `data-testid` instead of `data-test` attribute",
          },
        ],
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      parser: "@typescript-eslint/parser",
      plugins: ["react", "prettier"],
      extends: [
        "react-app", // Uses the recommended rules from CRA.
        "plugin:@typescript-eslint/recommended", // Uses the recommended rules from @typescript-eslint/eslint-plugin
        "plugin:prettier/recommended", // Ensure this is last in the list.
      ],
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: "module",
      },
      rules: {
        "prettier/prettier": "error",
      },
      settings: {
        react: {
          version: "detect",
        },
      },
    },
  ],
};
