
import { isFunction }  from 'helpers/common'
import Types           from 'helpers/types'

import './styles.scss'

export default class SelectContainer extends PureComponent {

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
