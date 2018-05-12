module.exports = {
  root: true,
  parserOptions: {
    sourceType: "module",
    parser: "babel-eslint",
    ecmaVersion: 2017
  },
  env: {
    browser: true
  },
  extends: ["prettier", "prettier/standard"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error"
  }
};
