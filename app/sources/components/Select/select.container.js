
// import Types from 'helpers/types'
import { isFunction } from 'helpers/common'
import fuzzysearch    from 'fuzzysearch'

function defaultFilter(options, input) {
  if (!input) return options;
  input = input.toLowerCase(); // eslint-disable-line no-param-reassign
  return options.filter(option => this(option.toLowerCase(), input));
}

export default class SelectContainer extends Component {
  static propTypes = {
    containerKey: PropTypes.func,
  }

  static defaultProps = {
    containerKey: void 0,
  }

  static defaultFilters = {
    includes:   defaultFilter.bind((option, input) => option.includes(input)),
    startsWith: defaultFilter.bind((option, input) => option.startsWith(input)),
    fuzzy:      defaultFilter.bind((option, input) => fuzzysearch(input, option)),
  }

  onDropdownFocus() {
    if (this.closeDelayTimer) {
      clearTimeout(this.closeDelayTimer);
      this.closeDelayTimer = null;
    }
  }

  onDropdownBlur({ closeMenu }) {
    if (!this.closeDelayTimer) {
      this.closeDelayTimer = setTimeout(closeMenu, 350);
    }
  }

  renderLabel = ({ getLabelProps, label, required }) => label ? (
    // eslint-disable-next-line jsx-a11y/label-has-for
    <label className={ cc({ required }) } { ...getLabelProps() }>{ label }</label>
  ) : null

  renderInput = ({ getInputProps, getButtonProps, filter, placeholder, autoFocus, disabled, required, readOnly }) => (
    <input
      type={ !filter ? 'button' : 'text' }
      { ...getInputProps({ placeholder, autoFocus, disabled, required, readOnly }) }
      { ...!filter ? getButtonProps() : {} }
    />
  )

  renderControls = ({ getButtonProps, clearSelection, filter, inputValue, isOpen: open, disabled }) => [
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
      className={ cc({ 'select-button arrow': true, open }) }
      { ...getButtonProps({ disabled }) }
    />,
  ]

  renderOption = ({ getItemProps, optionStyle, item, ...props }) => {
    const style = isFunction(optionStyle) ? optionStyle(props) : optionStyle;
    return (
      <div key={ item } className='select-option' { ...getItemProps({ style, item }) }>{ item }</div>
    );
  }

  renderOptions = ({ isOpen, options, inputValue, filter, autoclose, ...props }) => {
    let filtered = options;
    if (filter) {
      if (isFunction(filter)) {
        filtered = filter(options, inputValue);
      } else {
        const { defaultFilters } = SelectContainer;
        filtered = (defaultFilters[filter] || defaultFilters.includes)(options, inputValue);
      }
    }

    const autocloseProps = autoclose ? {
      onMouseLeave: () => this.onDropdownBlur(props),
      onMouseEnter: () => this.onDropdownFocus(props),
    } : {};

    return isOpen && filtered.length ? (
      <div className='select-dropdown' { ...autocloseProps }>
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
