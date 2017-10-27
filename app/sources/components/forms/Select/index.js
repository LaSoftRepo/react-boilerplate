import Downshift      from 'downshift'
import { isFunction } from 'helpers/common'
import Types          from 'helpers/types'

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

  renderLabel = ({ getLabelProps, label, required, ...props }) => {
    return label ? (
      <label className={ cc({ required }) } { ...getLabelProps() }>{ label }</label>
    ) : null;
  }

  renderInput = ({ getInputProps, getButtonProps, placeholder, autoFocus, filter, disabled, required, readOnly, ...props }) => {
    const passthrough = !filter;
    return (
      <input
        type={ passthrough ? 'button' : 'text' }
        { ...getInputProps({ placeholder, autoFocus, disabled, required, readOnly: readOnly || passthrough }) }
        { ...passthrough ? getButtonProps() : {} }
      />
    );
  }

  renderControls = ({ getButtonProps, clearSelection, filter, inputValue, isOpen: open, disabled, ...props }) => {
    return [
      filter && inputValue ? (
        <button
          key='clear'
          aria-label='clear selection'
          className='select-button clear'
          disabled={ disabled }
          onClick={ clearSelection }
        />
      ) : null,
      <button
        key='arrow'
        className={ cc({'select-button arrow': true, open }) }
        { ...getButtonProps({ disabled }) }
      />,
    ];
  }

  renderOption = ({ getItemProps, optionStyle, ...props }) => {
    const item  = props.item;
    const style = isFunction(optionStyle) ? optionStyle(props) : optionStyle;
    return (
      <div key={ item } className='select-option' { ...getItemProps({ style, item }) }>{ item }</div>
    );
  }

  renderOptions = ({ isOpen, options, inputValue, filter, ...props }) => {
    const filtered = isFunction(filter) ? filter(options, inputValue) :
          (filter ? Select.defaultFilter(options, inputValue) : options);

    return isOpen && filtered.length ? (
      <div className='select-dropdown'>
        { filtered.map((item, index) => this.renderOption({ index, item, ...props })) }
      </div>
    ) : null;
  }

  renderSelect = ({ style, ...props }) => {
    return (
      <div className='select-container' style={ style }>
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
    const { filter, options, defaultSelectedItem, children } = this.props;

    // Runtime error
    // options();

    const inProps = {
      ...this.props,
      onInputValueChange:  this.onInputValueChange,
      defaultSelectedItem: defaultSelectedItem || (!filter ? options[0] : void 0),
    };

    if (isFunction(children)) {
      return (
        <Downshift { ...inProps }>
          { outProps => Children.only(children({
            container: this.renderSelect,
            props:     { ...inProps, ...outProps },
          })) }
        </Downshift>
      );
    } else {
      return (
        <Downshift { ...inProps }>
          { outProps => this.renderSelect({ ...inProps, ...outProps }) }
        </Downshift>
      );
    }
  }
}
