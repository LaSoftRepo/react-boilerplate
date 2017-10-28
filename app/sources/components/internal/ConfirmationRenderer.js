// TODO move this to internal

import React from 'react'
import ReactDOM from 'react-dom'
import ConfirmationDialog from './ConfirmationDialog'

// hard code the location of the modal holder here
var modalHolder = document.getElementById('modal')

export default function ConfirmationRenderer(message, callback) {
  ReactDOM.render((
    <ConfirmationDialog open={ true } message={ message } callback={ callback } />
  ), modalHolder);
}
