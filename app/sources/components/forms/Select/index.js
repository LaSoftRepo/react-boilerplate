import Downshift from 'downshift'

import { isFunction } from 'helpers/common'
import Types from 'helpers/types'

import './styles.scss'

export default class Select extends PureComponent {
  static propTypes = {
    options:      Types.funcOrArrayOf(Types.stringOrObject).isRequired,

    label:        Types.string,
    placeholder:  Types.string,
    optionStyle:  Types.funcOrObject,
    filter:       Types.funcOrBool,
  }

  static defaultProps = {
    placeholder:  'Select item...',
    onInputValueChange: () => {},
    optionStyle: ({ index, item, highlightedIndex, selectedItem }) => ({
      backgroundColor: highlightedIndex === index ? '#559cc9' : 'transparent',
      color:           highlightedIndex === index ? 'white' : 'black',
      fontWeight:      selectedItem     === item  ? 'bold' : 'normal'
    }),
    filter: false,
  }

  static defaultFilter(options, input) {
    if (!input) return options;
    input = input.toLowerCase();
    return options.filter(option =>
      option.toLowerCase().includes(input)
    );
  }

  renderLabel({ getLabelProps, label, ...props }) {
    return label ? (
      <label className='select-label' { ...getLabelProps() }>{ label }</label>
    ) : null;
  }

  renderInput({ getInputProps, placeholder, autoFocus, filter, disabled, required, ...props }) {
    return (
      <input
        className='select-input'
        { ...getInputProps({ placeholder, autoFocus, disabled, required, readOnly: !filter }) }
      />
    );
  }

  renderControls({ getButtonProps, clearSelection, isOpen, disabled, ...props }) {
    return (
      <button className={ `select-arrow ${ isOpen ? 'open' : '' }` } { ...getButtonProps({ disabled }) } />
    );
  }

  renderOption({ getItemProps, optionStyle, ...props }) {
    const item  = props.item;
    const style = isFunction(optionStyle) ? optionStyle(props) : optionStyle;
    return (
      <div key={ item } className='select-option' { ...getItemProps({ style, item }) }>
        { item }
      </div>
    );
  }

  renderOptions({ isOpen, options, inputValue, filter, ...props }) {
    const filtered = isFunction(filter) ? filter(options, inputValue) :
          (filter ? Select.defaultFilter(options, inputValue) : options);

    return isOpen && filtered.length ? (
      <div className='select-dropdown'>
        { filtered.map((item, index) => this.renderOption({ index, item, ...props })) }
      </div>
    ) : null;
  }

  renderSelect(props) {
    return (
      <div className='select-panel'>
        { this.renderInput(props) }
        { this.renderControls(props) }
      </div>
    );
  }

  onInputValueChange = (inputValue, state) => {
    if (isFunction(this.props.options)) {
      // TODO
      // this.props.options(inputValue);
    }

    console.log('inputValue: ', inputValue);
    this.props.onInputValueChange(inputValue, state);
  }

  render() {
    const { filter, options } = this.props;

    const inProps = {
      ...this.props,
      onInputValueChange:  this.onInputValueChange,
      defaultSelectedItem: !filter ? options[0] : void 0,
    };

    return (
      <Downshift { ...inProps }>
        { outProps => {
            const props = { ...inProps, ...outProps };
            return (
              <div className='select-container'>
                { this.renderLabel(props) }
                { this.renderSelect(props) }
                { this.renderOptions(props) }
              </div>
            );
          }
        }
      </Downshift>
    );
  }
}
