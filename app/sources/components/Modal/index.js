import React from 'react';
import PropTypes from 'prop-types';
import ExecutionEnvironment from 'exenv';

import './index.scss';

const textContent = `Sample text`;

export default class Modal extends React.Component {
  static propTypes = {
    onClose:   PropTypes.func.isRequired,
    allowEsc:  PropTypes.bool,
    autoFocus: PropTypes.bool,
    children:  PropTypes.node,
  }

  static defaultProps = {
    onClose:   () => {},
    allowEsc:  true,
    autoFocus: true,
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = event => {
    if (this.props.allowEsc && event.keyCode === 27) {
      this.props.onClose();
    }
  }

  handleModalClick = event => {
    event.stopPropagation();
  }

  render() {
    return (
      <div layout center className='modal-backdrop'>
        <div layout='rows' columns='3' horizontal-align="center" className='modal-container'>
          <div layout><h3>DIALOG TITLE</h3></div>
          {/* { this.props.children } */}
          <div layout center>{ textContent }</div>
          <div layout vertical-align='bottom' horizontal-distribute='equal'>
            <button className='modal-button'>OK</button>
            <button className='modal-button'>CANCEL</button>
          </div>
        </div>
      </div>
    );
  }
}