import Downshift       from 'downshift'
import { isFunction }  from 'helpers/common'
import Types           from 'helpers/types'
import SelectContainer from './select.container'

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

  render() {
    const { filter, options, defaultSelectedItem, children } = this.props;

    // Runtime error
    // options();

    const inProps = {
      ...this.props,
      refKey:              'containerRef',
      onInputValueChange:  this.onInputValueChange,
      defaultSelectedItem: defaultSelectedItem || (!filter ? options[0] : void 0),
    };

    return (
      <Downshift { ...inProps }>
        {({ getRootProps, ...outProps }) => {
          const props = getRootProps({ ...inProps, ...outProps });
          return (
            isFunction(children) ? children({ SelectContainer, props }) : <SelectContainer { ...props } />
          );
        }}
      </Downshift>
    );
  }
}
