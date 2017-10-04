import { bindActionCreators } from 'redux'

function _createActionsFromClass(clazz) {
  return Object.getOwnPropertyNames(clazz)
    .filter(prop => typeof clazz[prop] === 'function')
    .reduce((current, key) => {
      current[key] = clazz[key];
      return current;
    }, {});
}

export function linkActions(...actions) {
  let resultActions = {};

  for (let action of actions) {
    if (!(typeof action === 'function' || typeof action === 'object')) {
      throw new TypeError('Actions must be object or static class');
    }

    if (typeof action === 'function')
      action = _createActionsFromClass(action);

    resultActions = Object.assign(resultActions, action);
  }

  return dispatch => bindActionCreators(resultActions, dispatch);
}
