import Downshift      from 'downshift'
import { isFunction } from 'helpers/common'
import Types          from 'helpers/types'

// import cw from 'classwrap'

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
    placeholder: 'Select item...',
    onInputValueChange: () => {},
    optionStyle: ({ index, item, highlightedIndex, selectedItem }) => ({
      backgroundColor: highlightedIndex === index ? '#559cc9' : 'transparent',
      color:           highlightedIndex === index ? 'white' : 'inherit',
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

  renderLabel({ getLabelProps, label, required, ...props }) {
    return label ? (
      <label className={ cw({ required }) } { ...getLabelProps() }>{ label }</label>
    ) : null;
  }

  renderInput({ getInputProps, getButtonProps, placeholder, autoFocus, filter, disabled, required, readOnly, ...props }) {
    return (
      <input
        type={ filter ? 'text' : 'button' }
        className={ cw({ passthrough: !filter }) }
        { ...getInputProps({ placeholder, autoFocus, disabled, required, readOnly: readOnly || !filter }) }
        { ...!filter ? getButtonProps() : {} }
      />
    );
  }

  renderControls({ getButtonProps, clearSelection, inputValue, isOpen: open, disabled, ...props }) {
    return [
      inputValue ? (
        <button
          className='select-button clear'
          disabled={ disabled }
          onClick={ clearSelection }
          aria-label='clear selection'
        />
      ) : null,
      <button className={ cw(['select-button arrow', { open }]) } { ...getButtonProps({ disabled }) } />,
    ];
  }

  renderOption({ getItemProps, optionStyle, ...props }) {
    const item  = props.item;
    const style = isFunction(optionStyle) ? optionStyle(props) : optionStyle;
    return (
      <div key={ item } className='select-option' { ...getItemProps({ style, item }) }>{ item }</div>
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
      <div className='select-container' style={ props.style }>
        { this.renderLabel(props) }
        <div className='select-panel'>
          <div className='select-field'>
            { this.renderInput(props) }
            { this.renderControls(props) }
          </div>
          { this.renderOptions(props) }
        </div>
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
    const { filter, options, defaultSelectedItem } = this.props;

    const inProps = {
      ...this.props,
      onInputValueChange:  this.onInputValueChange,
      defaultSelectedItem: defaultSelectedItem || (!filter ? options[0] : void 0),
    };

    return (
      <Downshift { ...inProps }>
        { outProps => this.renderSelect({ ...inProps, ...outProps }) }
      </Downshift>
    );
  }
}
