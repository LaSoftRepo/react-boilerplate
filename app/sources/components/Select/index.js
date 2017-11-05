import Downshift       from 'downshift'
import { isFunction }  from 'helpers/common'
import Types           from 'helpers/types'
import SelectContainer from './select.container'

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
      refKey:              'containerKey',
      onInputValueChange:  this.onInputValueChange,
      defaultSelectedItem: defaultSelectedItem || (!filter ? options[0] : void 0),
    };

    return (
      <Downshift { ...inProps }>
        {({ getRootProps, ...outProps }) => {
          const props = getRootProps({
            ...inProps,
            ...outProps,
          });

          return (
            isFunction(children) ? children({ SelectContainer, ...props }) : <SelectContainer { ...props } />
          );
        }}
      </Downshift>
    );
  }
}
