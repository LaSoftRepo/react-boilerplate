
import { State } from 'react-powerplug'
import Default from 'helpers/default'

import './style.scss'

export default class Checkbox extends PureComponent {

  static Bistate = {
    null:  false,
    true:  false,
    false: true,
  }

  static Tristate = {
    null:  true,
    true:  false,
    false: true,
  }

	static defaultProps = {
		value:      false,
		onChange:   Default.noop,
    states:     Checkbox.Tristate,
    stateViews: {
      null:  '﹣',
      true:  '✓',
      false: ' ',
    }
	}

	static propTypes = {
		id:       PropTypes.string,
		value:    PropTypes.bool,
		onChange: PropTypes.func,
    states:   PropTypes.object,
	}

  trigger = ({ value }) => {
    const { states, onChange } = this.props;
    const state = { value: states[value] };
    onChange(state);
    return state;
  }

	render() {
    const {
      id,
      value,
      multistate,
      stateViews,
      onChange,
    } = this.props;

    return (
      <State initial={{ value }}>
        {({ state: { value }, setState }) => (
          <div className='checkbox' onClick={ () => setState(this.trigger) }>
            { stateViews[value] }
          </div>
        )}
      </State>
    );
	}
}
