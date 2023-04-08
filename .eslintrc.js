module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  ignorePatterns: ["dist/"],

  extends: ["eslint:recommended", "google", "plugin:prettier/recommended"],

  rules: {
    "prettier/prettier": ["error"],
  },

  parserOptions: {
    sourceType: "module",
  },
};
