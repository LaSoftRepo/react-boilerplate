'use strict'

const fs   = require('fs');
const path = require('path');
const { transform } = require('h2x-core');
const jsx = require('h2x-plugin-jsx').default;

const indent = (string, times) => {
  const spaces = new Array(times + 1).join('  ');
  const lines = string.split('\n');
  return lines.map(line => spaces + line).join('\n');
};

class JSXFactory {

  static convert(path, mode = 'component') {
    const content = fs.readFileSync(path, 'utf8');
    switch (mode) {
      case 'component':
        return this.component(content);

      default:
        return '';
    }
  }

  static component(input) {
    const prolog =`default export class extends Component {
  render() {
    return (
`;

    const epilog = ');\n  }\n}';
    const content = transform(input, { plugins: [jsx] });
    return prolog + indent(content, 3) + epilog;
  }
}

// Test

const result = JSXFactory.convert(path.join(__dirname, 'test.html'));

console.log(result);
