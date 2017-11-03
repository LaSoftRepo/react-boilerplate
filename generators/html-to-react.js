'use strict'

const { transform } = require('h2x-core');
const jsx = require('h2x-plugin-jsx').default;

class ComponentGenerator {
  constructor() {
    this.transformers = { plugins: [jsx] };
    this.component = `default export class extends Component {`;
    this.renderContent =
`
  render() {
    return (
      `;
  }

  render(input) {
    this.renderContent += transform(input, this.transformers);
  }

  get result() {
    this.renderContent += '    );\n  }\n';
    this.component += this.renderContent;
    return this.component + '}';
  }
}

// Test

const cgen = new ComponentGenerator();
cgen.render(
`<div class="foo">
  <svg viewbox='0 0 32 32'>
    <rect x="0" y="0" width="32" height="32"/>
  </svg>
</div>`
);

console.log(cgen.result);
