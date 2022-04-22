module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    //"plugin:jest/recommended",
    "plugin:testing-library/react",
    "plugin:storybook/recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "jest", "testing-library"],
  rules: {},
  settings: {
    react: {
      version: "detect",
    },
  },
};
