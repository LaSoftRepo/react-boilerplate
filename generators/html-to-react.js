'use strict'

const fs   = require('fs');
const path = require('path');
const { transform } = require('h2x-core');
const jsx = require('h2x-plugin-jsx').default;

const indent = (string, times) => {
  const spaces = new Array(times + 1).join('  ');
  const lines  = string.split('\n');
  return lines.map(line => spaces + line).join('\n').trimRight();
};

class JSXFactory {

  static convert(path, baseClass = 'PureComponent') {
    return new Promise((resolve, reject) => {
      fs.readFile(path, 'utf8', (err, body) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(this.component(body, baseClass));
      });
    });
  }

  static component(input, baseClass) {
    const prolog =`default export class extends ${ baseClass } {
  render() {
    return (
`;

    const epilog  = '\n    );\n  }\n}';
    const content = transform(input, { plugins: [jsx] });
    return prolog + indent(content, 3) + epilog;
  }
}

// Test

(async () => {
  const result = await JSXFactory.convert(path.join(__dirname, 'test.html'));
  console.log(result);
})();
