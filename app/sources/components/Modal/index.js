import React from 'react';
import PropTypes from 'prop-types';
import ExecutionEnvironment from 'exenv';

import './index.scss';

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
      <div grid center className='modal-backdrop'>
        <div className='modal-container'>
          { this.props.children }
        </div>
      </div>
    );
  }
}
