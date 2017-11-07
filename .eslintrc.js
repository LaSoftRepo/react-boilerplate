
const Path = require('./webpack/paths');

module.exports = {
  "extends": [
    "airbnb",
    "prettier",
    "prettier/react",
    "plugin:react/recommended",
    "plugin:promise/recommended",
    "plugin:redux-saga/recommended",
    "./.eslint.rules.yml",
  ],
  "plugins": [
    "html",
    "node",
    "react",
    "promise",
    "prettier",
    "redux-saga",
    "dependencies",
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 2017,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "modules": true,
      "impliedStrict": true,
      "experimentalObjectRestSpread": true,
      "experimentalDecorators": true,
    }
  },
  "settings": {
    "import/resolver": {
      "alias": Object.entries(Path.to),
      "webpack": {
        "config": {
          "resolve": {
            "modules": ["app", "node_modules"],
          }
        }
      }
    }
  },
  "env": {
    "es6":     true,
    "browser": true,
    "node":    true,
    "jest":    true,
  }
};
