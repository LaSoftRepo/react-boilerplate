//import ExecutionEnvironment from 'exenv';

import keycode from 'keycode'
import Anime from 'react-anime'

import styles from './styles.module.scss'

const textContent = `Sample text fgvkjfdv dfhvldhgvldg`;

const animationDuration = 500;

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
        translateY: enter ?-1200 : 1200,
        delay:      enter ? 0    : 120,
      },
    };
  }

  state = {
    enter: true,
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
  }

  handleClose = (event, accept) => {
    event.persist();
    setTimeout(() => {
      this.props.onClose(event, accept);
    }, animationDuration);
  }

  handleKeydown = event => {
    const { allowKeys, onClose } = this.props;
    if (allowKeys) {
      if (event.keyCode === keycode('esc')) {
        this.setState({ enter: false }, () => { this.handleClose(event, false) });
      } else if (event.keyCode === keycode('enter')) {
        this.setState({ enter: false }, () => { this.handleClose(event, true) });
      }
    }
  }

  handleClick = (event, accept) => {
    event.persist();
    this.setState(() => ({ shouldHide: true }));
    this.handleClose(event, accept);
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
    const { shouldHide } = this.state;
    const direction = !shouldHide ? 'normal' : 'reverse';

    return (
      // <Anime opacity='0' direction={ direction } delay={ shouldHide ? 310 : 0 } duration={ ANIMATE_DURATION }>
      <Anime opacity={[0, 1]} direction={ direction } duration={ ANIMATE_DURATION }>
        <div layout='colummns' center='true' styleName='modal-backdrop' onClick={ this.handleModalClick }>
          {/* <Anime
            translateY={ shouldHide ? 1200 : -1200 }
            scaleY='2.3'
            duration={ ANIMATE_DURATION }
            elasticity='0'
            delay={ shouldHide ? 120 : 0 }
            direction={ direction }
          > */}
            { this.renderDialogContent(this.props) }
          {/* </Anime> */}
        </div>
      </Anime>
    );
  }
}
