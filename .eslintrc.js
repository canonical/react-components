module.exports = {
  parser: "@babel/eslint-parser",
  plugins: ["prettier", "cypress", "testing-library"],
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
    "prettier/prettier": ["error", { trailingComma: "es5" }],
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
      extends: [
        "react-app", // Uses the recommended rules from CRA.
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
    {
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"],
      rules: {
        "testing-library/no-node-access": "warn",
        "testing-library/no-container": "warn",
        "testing-library/no-render-in-lifecycle": "warn",
      },
    },
  ],
};
