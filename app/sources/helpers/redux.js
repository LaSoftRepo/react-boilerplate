import { bindActionCreators } from 'redux'

export function linkActions(actions) {
  return dispatch => bindActionCreators(actions, dispatch);
}
