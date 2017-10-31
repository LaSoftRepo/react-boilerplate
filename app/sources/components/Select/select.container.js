
import Types from 'helpers/types'
import { isFunction, isString } from 'helpers/common'
import fuzzysearch from 'fuzzysearch'

function defaultFilter(options, input) {
  if (!input) return options;
  input = input.toLowerCase();
  return options.filter(option => this(option.toLowerCase(), input));
}

export default class SelectContainer extends Component {
  static defaultFilters = {
    includes:   defaultFilter.bind((option, input) => option.includes(input)),
    startsWith: defaultFilter.bind((option, input) => option.startsWith(input)),
    fuzzy:      defaultFilter.bind((option, input) => fuzzysearch(input, option)),
  }

  state = {
    isOpen: false,
  }

  renderLabel = ({ getLabelProps, label, required, ...props }) => {
    return label ? (
      <label className={ cc({ required }) } { ...getLabelProps() }>{ label }</label>
    ) : null;
  }

  renderInput = ({ getInputProps, getButtonProps, filter, placeholder, autoFocus, disabled, required, readOnly, ...props }) => {
    return (
      <input
        type={ !filter ? 'button' : 'text' }
        { ...getInputProps({ placeholder, autoFocus, disabled, required, readOnly }) }
        { ...!filter ? getButtonProps() : {} }
      />
    );
  }

  renderControls = ({ getButtonProps, clearSelection, filter, inputValue, isOpen: open, disabled, ...props }) => {
    return [
      filter && inputValue ? (
        <button
          key='0'
          aria-label='clear selection'
          className='select-button clear'
          disabled={ disabled }
          onClick={ clearSelection }
        />
      ) : null,
      <button
        key='1'
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

  renderOptions = ({ isOpen, options, inputValue, filter, onDropdownBlur, ...props }) => {
    let filtered = options;
    if (filter) {
      if (isFunction(filter)) {
        filtered = filter(options, inputValue);
      } else {
        const defaultFilters = SelectContainer.defaultFilters;
        filtered = (defaultFilters[filter] || defaultFilters.includes)(options, inputValue);
      }
    }

    return isOpen && filtered.length ? (
      <div className='select-dropdown' onMouseLeave={ onDropdownBlur }>
        { filtered.map((item, index) => this.renderOption({ index, item, ...props })) }
      </div>
    ) : null;
  }

  render() {
    const { style, containerKey, className, ...props } = this.props;
    return (
      <div
        ref={ containerKey }
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