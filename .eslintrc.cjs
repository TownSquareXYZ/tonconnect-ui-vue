module.exports = {
  parser: "vue-eslint-parser",
  extends: [
    "plugin:vue/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: "module",
    ecmaVersion: "latest",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["vue", "@typescript-eslint", "unused-imports"],
  rules: {
    "import/extensions": ["off"],
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowConciseArrowFunctionExpressionsStartingWithVoid: true,
        allowDirectConstAssertionInArrowFunctions: true,
      },
    ],
    "unused-imports/no-unused-vars": [
      "error",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-explicit-any": "error",
    "quotes": ["error", "single"],
  },
};
