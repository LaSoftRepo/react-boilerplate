/*
  eslint
  jsx-a11y/lick-events-have-key-events:    "off",
  jsx-a11y/no-static-element-interactions: "off",
  jsx-a11y/click-events-have-key-events:   "off"
*/

import keycode from 'keycode'
import Anime   from 'react-anime'

import styles  from './styles.module.scss'

const textContent = 'Sample text fgvkjfdv dfhvldhgvldg';

const animationDuration = 500;

@CSSModules(styles, { allowMultiple: true })
export default class Modal extends Component {
  static propTypes = {
    onClose:   PropTypes.func.isRequired,
    allowKeys: PropTypes.bool,
    // autoFocus: PropTypes.bool,
    // children:  PropTypes.node,
  }

  static defaultProps = {
    allowKeys: true,
    // autoFocus: true,
  }

  static animations = ({ enter }) => {
    const duration  = animationDuration;
    const direction = enter ? 'reverse' : 'normal';
    return {
      duration,

      backdrop: {
        duration,
        direction,
        opacity:   0,
        delay:     enter ? 0 : 310,
      },

      dialog: {
        duration,
        direction,
        scaleY:     2.3,
        translateY: enter ? -1200 : 1200,
        delay:      enter ?  0    : 120,
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
    const { onClose } = this.props;
    event.persist();
    setTimeout(() => { onClose(event, accept) }, animationDuration);
  }

  handleKeydown = event => {
    const { allowKeys } = this.props;
    if (allowKeys) {
      if (event.keyCode === keycode('esc')) {
        // eslint-disable-next-line react/no-set-state
        this.setState({ shouldHide: true }, () => { this.handleClose(event, false) });
      } else if (event.keyCode === keycode('enter')) {
        // eslint-disable-next-line react/no-set-state
        this.setState({ shouldHide: true }, () => { this.handleClose(event, true) });
      }
    }
  }

  handleClick = (event, accept) => {
    event.persist();
    // eslint-disable-next-line react/no-set-state
    this.setState(() => ({ shouldHide: true }));
    this.handleClose(event, accept);
  }

  handleModalClick = event => {
    event.stopPropagation();
  }

  renderDialogContent() {
    return (
      <div layout='rows' vertical-distribute='equal' horizontal-distribute='around' styleName='modal-container'>
        <div layout='colummns' horizontal-align='center'>
          <h2>DIALOG TITLE</h2>
        </div>
        { /* { this.props.children } */ }
        <div layout='colummns' center='true' styleName='modal-content'>{ textContent }</div>
        <div layout='colummns' vertical-align='bottom' horizontal-distribute='equal'>
          <button id='ok'     onClick={ e => this.handleClick(e, true)  } styleName='modal-button left'>OK</button>
          <button id='cancel' onClick={ e => this.handleClick(e, false) } styleName='modal-button right'>CANCEL</button>
        </div>
      </div>
    );
  }

  render() {
    const { shouldHide } = this.state;
    const direction = !shouldHide ? 'normal' : 'reverse';

    return (
      // <Anime opacity='0' direction={ direction } delay={ shouldHide ? 310 : 0 } duration={ animationDuration }>
      <Anime opacity={ [0, 1] } direction={ direction } duration={ animationDuration }>
        <div layout='colummns' center='true' styleName='modal-backdrop' onClick={ this.handleModalClick }>
          { /* <Anime
            translateY={ shouldHide ? 1200 : -1200 }
            scaleY='2.3'
            duration={ animationDuration }
            elasticity='0'
            delay={ shouldHide ? 120 : 0 }
            direction={ direction }
          > */ }
          { this.renderDialogContent(this.props) }
          { /* </Anime> */ }
        </div>
      </Anime>
    );
  }
}
