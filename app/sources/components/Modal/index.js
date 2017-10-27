//import ExecutionEnvironment from 'exenv';

import keycode from 'keycode'
import Anime from 'react-anime'

import styles from './styles.module.scss'

const textContent = `Sample text fgvkjfdv dfhvldhgvldg`;

@CSSModules(styles, { allowMultiple: true })
export default class Modal extends PureComponent {
  static propTypes = {
    onClose:   PropTypes.func.isRequired,
    allowKeys: PropTypes.bool,
    autoFocus: PropTypes.bool,
    //children:  PropTypes.node,
  }

  static defaultProps = {
    onClose:   () => {},
    allowKeys: true,
    autoFocus: true,
  }

  static animations = ({ shouldHide }) => {
    const duration  = 500;
    const direction = shouldHide ? 'normal' : 'reverse';
    return {
      backdrop: {
        duration,
        direction,
        opacity:   0,
        delay:     shouldHide ? 310 : 0,
      },

      dialog: {
        duration,
        direction,
        scaleY:     2.3,
        translateY: shouldHide ? 1200 : -1200,
        delay:      shouldHide ? 120  : 0,
      },
    };
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

  handleClose = (event, accept) => {
    setTimeout(() => {
      this.props.onClose(event, accept);
    }, 500);
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

  handleClick = (event, accept) => {
    event.persist();
    this.setState(
      { shouldHide: true },
      () => { this.handleClose(event, accept) }
    );
  }

  handleModalClick = event => {
    event.stopPropagation();
  }

  renderDialogContent(props) {
    return (
      <div layout='rows' vertical-distribute='equal' horizontal-distribute='around' styleName='modal-container'>
        <div layout='colummns' horizontal-align='center'>
          <h2>DIALOG TITLE</h2>
        </div>
        {/* { this.props.children } */}
        <div layout='colummns' center='true' styleName='modal-content'>{ textContent }</div>
        <div layout='colummns' vertical-align='bottom' horizontal-distribute='equal'>
          <button id='ok' onClick={ e => this.handleClick(e, true)  } styleName='modal-button left'>OK</button>
          <button id='cancel' onClick={ e => this.handleClick(e, false) } styleName='modal-button right'>CANCEL</button>
        </div>
      </div>
    );
  }

  render() {
    const animations = Modal.animations(this.state);
    return (
      <Anime { ...animations.backdrop }>
        <div layout='colummns' center='true' styleName='modal-backdrop' onClick={ this.handleModalClick }>
          <Anime { ...animations.dialog }>
            { this.renderDialogContent(this.props) }
          </Anime>
        </div>
      </Anime>
    );
  }
}
