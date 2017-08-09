import React from 'react';
import PropTypes from 'prop-types';

export default class ConfirmationDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: props.open,
    };
  }

  handleCancel = () => {
    this.props.callback(false);
    this.setState({ open: false });
  }

  handleContinue = () => {
    this.props.callback(true);
    this.setState({ open: false });
  }

  render() {
    const { message } = this.props;
    const { open }    = this.state;

    /*const actions = [
      <button onClick={ this.handleCancel }>Cancel</button>,
      <button onClick={ this.handleContinue }>Continue</button>
    ];

    return (
      <div>
        <Dialog
          actions={ actions }
          modal={ true }
          open={ open }
        >
          { message }
        </Dialog>
      </div>
    );*/
    return <div style={{ position: 'fixed', width: '500px', height: '200px', backgroundColor: '#f00' }} >Dialog</div>
  }
}
