/** @type {import('eslint').Linter.FlatConfig[]} */
const config = [
    {
      ignores: [".eslintrc.js"],
    },
    {
      files: ["**/*.ts"],
      languageOptions: {
        parser: require("@typescript-eslint/parser"),
        parserOptions: {
          project: "tsconfig.json",
          tsconfigRootDir: __dirname,
          sourceType: "module",
        },
      },
      plugins: {
        "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      },
      rules: {
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
      },
    },
    {
      files: ["**/*.ts"],
      plugins: {
        prettier: require("eslint-plugin-prettier"),
      },
      rules: {
        "prettier/prettier": "error",
      },
    },
  ];
  
  module.exports = config;
  