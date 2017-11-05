import { replace, push } from 'react-router-redux'
import { put, call }     from 'redux-saga/effects'

import Api from 'api'

export function request(config) {
  return call(Api.request, config); // eslint-disable-line
}

export function redirect(path, pushing = false) {
  return put(pushing ? push(path) : replace(path)); // eslint-disable-line
}
