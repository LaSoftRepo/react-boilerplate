import Downshift      from 'downshift'
import { isFunction } from 'helpers/common'
import Types          from 'helpers/types'

import './styles.scss'

// class SelectContainer extends PureComponent {
//   render() {
//     return <div>{ this.props.isOpen ? 'open' : 'close' }</div>;
//   }
// }

class SelectContainer extends PureComponent {
  /*render() {
    console.log('this.props:', this.props);
    return <div>{ this.props.isOpen ? 'open' : 'close' }</div>;
  }*/

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

  render() {
    const { style, containerRef, className, ...props } = this.props;
    return (
      <div
        ref={ containerRef }
        style={ style }
        className={ cc([className, 'select-container']) }
      >
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
}

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

  onInputValueChange = (inputValue, state) => {
    if (isFunction(this.props.options)) {
      // TODO
      // this.props.options(inputValue);
    }

    console.log('inputValue: ', inputValue);
    this.props.onInputValueChange(inputValue, state);
  }

  // conditionalRender(children, element, props) {
  //   if (isFunction(children)) {
  //     return children({ [element] : element, ...props });
  //   } else {
  //     return <element { ...props } />
  //   }
  // }

  renderProps = ({ children, render }, props) => {
    const fn = isFunction(children) ? children : render;
    return fn ? fn(props) : null;
  }


  render() {
    const { filter, options, defaultSelectedItem, children } = this.props;

    // Runtime error
    // options();

    const inProps = {
      ...this.props,
      refKey:             'containerRef',
      onInputValueChange:  this.onInputValueChange,
      defaultSelectedItem: defaultSelectedItem || (!filter ? options[0] : void 0),
    };

    if (isFunction(children)) {
      return (
        <Downshift { ...inProps }>
          { ({ getRootProps, ...props }) => children({
            SelectContainer, props: getRootProps({ ...inProps, ...props }),
          }) }
        </Downshift>
      );
    } else {
      return (
        <Downshift { ...inProps }>
          { ({ getRootProps, ...props }) =>
            <SelectContainer { ...getRootProps({ ...inProps, ...props }) } />
          }
        </Downshift>
      );
    }
  }
}
