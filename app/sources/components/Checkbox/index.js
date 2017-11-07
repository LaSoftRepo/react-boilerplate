/* eslint-disable jsx-a11y/interactive-supports-focus, jsx-a11y/click-events-have-key-events */

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

  static propTypes = {
		// id:         PropTypes.string,
		value:      PropTypes.bool,
		onChange:   PropTypes.func,
    states:     PropTypes.object,
    stateViews: PropTypes.object,
	}

	static defaultProps = {
    // id:         void 0,
		value:      false,
		onChange:   Default.noop,
    states:     Checkbox.Tristate,
    stateViews: {
      null:  '﹣',
      true:  '✓',
      false: ' ',
    },
	}

  trigger = ({ value }) => {
    const { states, onChange } = this.props;
    const state = { value: states[value] };
    onChange(state);
    return state;
  }

	render() {
    const {
      // id,
      value,
      // multistate,
      stateViews,
      // onChange,
    } = this.props;

    return (
      <State initial={{ value }}>
        { ({ state, setState }) => (
          <div
            role='checkbox'
            className='checkbox'
            aria-checked={ state }
            onClick={ () => setState(this.trigger) }
          >
            { stateViews[state.value] }
          </div>
        ) }
      </State>
    );
	}
}
