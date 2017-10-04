import { bindActionCreators } from 'redux'

function _createActionsFromClass(clazz) {
  return Object.getOwnPropertyNames(clazz)
    .filter(prop => typeof clazz[prop] === 'function')
    .reduce((current, key) => {
      current[key] = clazz[key];
      return current;
    }, {});
}

export function linkActions(actions) {
  if (!(typeof actions === 'function' || typeof actions === 'object')) {
    throw new TypeError('Actions must be object or static class');
  }

  if (typeof actions === 'function')
    actions = _createActionsFromClass(actions);

  return dispatch => bindActionCreators(actions, dispatch);
}
