//import ExecutionEnvironment from 'exenv';

import keycode from 'keycode'
import Anime from 'react-anime'

import styles from './index.module.scss'

const textContent = `Sample text fgvkjfdv dfhvldhgvldg`;

const ANIMATE_DURATION = 500;

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
        <div layout horizontal-align='center'>
          <h2>DIALOG TITLE</h2>
        </div>
        {/* { this.props.children } */}
        <div layout center styleName='modal-content'>{ textContent }</div>
        <div layout vertical-align='bottom' horizontal-distribute='equal'>
          <button id='ok' onClick={ e => this.handleClick(e, true)  } styleName='modal-button left'>OK</button>
          <button id='cancel' onClick={ e => this.handleClick(e, false) } styleName='modal-button right'>CANCEL</button>
        </div>
      </div>
    );
  }

  render() {
    const { shouldHide } = this.state;
    const direction = shouldHide ? 'normal' : 'reverse';

    return (
      <Anime opacity='0' direction={ direction } delay={ shouldHide ? 310 : 0 } duration={ ANIMATE_DURATION }>
        <div layout center styleName='modal-backdrop' onClick={ this.handleModalClick }>
          <Anime
            translateY={ shouldHide ? 1200 : -1200 }
            scaleY='2.3'
            duration={ ANIMATE_DURATION }
            elasticity='0'
            delay={ shouldHide ? 120 : 0 }
            direction={ direction }
          >
            { this.renderDialogContent(this.props) }
          </Anime>
        </div>
      </Anime>
    );
  }
}
