module.exports = {
  extends: [
    "../../.eslintrc.js", 
    "react-app", 
    "react-app/jest", 
    "prettier/react", 
    "plugin:react-hooks/recommended"
  ],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  }
};