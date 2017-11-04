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
    switch (mode) {
      case 'component':
        return this.transformToComponent(fs.readFileSync(path, 'utf8'));

      default:
        return '';
    }
  }

  static transformToComponent(input) {
    const prolog =`default export class extends Component {
  render() {
    return (
`;

    const end = ');\n  }\n}';
    const content = transform(input, { plugins: [jsx] });
    return prolog + indent(content, 3) + end;
  }
}

// Test

const result = JSXFactory.convert(path.join(__dirname, 'test.html'));

console.log(result);
