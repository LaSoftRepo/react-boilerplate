
const Path = require('./webpack/paths');

module.exports = {
  "extends": [
    "airbnb",
    "prettier",
    "prettier/react",
    "./.eslint.rules.json"
  ],
  "plugins": [
    "prettier",
    "react"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 2017,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "modules": true,
      "experimentalObjectRestSpread": true,
      "experimentalDecorators": true
    }
  },
  "settings": {
    "import/resolver": {
      "alias": Object.entries(Path.to),
      "webpack": {
        "config": {
          "resolve": {
            "modules": ["app", "node_modules"]
          }
        }
      }
    }
  },
  "env": {
    "es6":     true,
    "browser": true,
    "node":    true,
    "jest":    true
  }
};
