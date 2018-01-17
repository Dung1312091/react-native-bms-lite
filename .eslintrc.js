module.exports = {
  // env: {
  // 	es6: true,
  // 	"react-native/react-native": true
  // },
  // extends: "eslint:recommended",
  // parserOptions: {
  // 	ecmaFeatures: {
  // 		experimentalObjectRestSpread: true,
  // 		jsx: true
  // 	},
  // 	sourceType: "module"
  // },
  // plugins: ["react", "react-native"],
  // rules: {
  // 	indent: ["error", "tab"],
  // 	"linebreak-style": ["error", "windows"],
  // 	quotes: ["error", "double"],
  // 	semi: ["error", "always"],
  // 	"react-native/no-unused-styles": 2,
  // 	"react-native/split-platform-components": 2,
  // 	"react-native/no-inline-styles": 2,
  // 	"react-native/no-color-literals": 2
  // }
  parser: "babel-eslint",
  env: {
    browser: true,
    amd: true
  },
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: "module"
  },
  plugins: ["react"],
  extends: ["eslint:recommended", "plugin:react/recommended"],
  rules: {
    node: true
  }
};
