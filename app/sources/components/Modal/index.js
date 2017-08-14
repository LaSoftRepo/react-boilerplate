//import ExecutionEnvironment from 'exenv';

import keycode from 'keycode';
import Anime from 'react-anime';

import './index.scss';

const textContent = `Sample text fgvkjfdv dfhvldhgvldg`;

const ANIMATE_DURATION = 500;

export default class Modal extends Component {
  static propTypes = {
    onClose:   PropTypes.func.isRequired,
    allowKeys: PropTypes.bool,
    autoFocus: PropTypes.bool,
    children:  PropTypes.node,
  }

  static defaultProps = {
    onClose:   () => {},
    allowKeys: true,
    autoFocus: true,
  }

  state = {
    shouldHide: false,
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
  }

  handleClose = (event, isOk) => {
    setTimeout(() => {
      this.props.onClose(event, isOk);
    }, ANIMATE_DURATION);
  }

  handleKeydown = event => {
    const { allowKeys, onClose } = this.props;
    if (allowKeys) {
      if (event.keyCode === keycode('esc')) {
        this.setState({ shouldHide: true }, () => { this.handleClose(event, false) });
      } else if (event.keyCode === keycode('enter')) {
        this.setState({ shouldHide: true }, () => { this.handleClose(event, true) });
      }
    }
  }

  handleClick = event => {
    event.persist();
    this.setState(
      { shouldHide: true },
      () => { this.handleClose(event, event.target.id === 'ok') }
    );
  }

  handleModalClick = event => {
    event.stopPropagation();
  }

  render() {
    const { shouldHide } = this.state;
    const direction = shouldHide ? 'normal' : 'reverse';

    return (
      <Anime opacity='0' direction={ direction } delay={ shouldHide ? 310 : 0 } duration={ ANIMATE_DURATION }>
        <div layout center className='modal-backdrop' onClick={ this.handleModalClick }>
          <Anime
            translateY={ shouldHide ? 1200 : -1200 }
            scaleY='2.3'
            duration={ ANIMATE_DURATION }
            elasticity='0'
            delay={ shouldHide ? 120 : 0 }
            direction={ direction }
          >
            <div layout='rows' vertical-distribute='equal' horizontal-distribute='around' className='modal-container'>
              <div layout horizontal-align='center'>
                <h2>DIALOG TITLE</h2>
              </div>
              {/* { this.props.children } */}
              <div layout center className='modal-content'>{ textContent }</div>
              <div layout vertical-align='bottom' horizontal-distribute='equal'>
                <button id='ok' onClick={ e => this.handleClick(e, true)  } className='modal-button left'>OK</button>
                <button id='cancel' onClick={ e => this.handleClick(e, false) } className='modal-button right'>CANCEL</button>
              </div>
            </div>
          </Anime>
        </div>
      </Anime>
    );
  }
}
