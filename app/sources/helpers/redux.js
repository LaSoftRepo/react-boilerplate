import { bindActionCreators } from 'redux'

function createActionsFromClass(clazz) {
  return Object.getOwnPropertyNames(clazz)
    .filter(prop => typeof clazz[prop] === 'function')
    .reduce((current, key) => {
      current[key] = clazz[key]; // eslint-disable-line
      return current;
    }, {});
}

// eslint-disable-next-line import/prefer-default-export
export function linkActions(...actions) {
  let resultActions = {};

  for (let i = 0; i < actions.length; i++) {
    let action = actions[i];
    if (!(typeof action === 'function' || typeof action === 'object')) {
      throw new TypeError('Actions must be object or static class');
    }

    if (typeof action === 'function')
      action = createActionsFromClass(action);

    resultActions = Object.assign(resultActions, action);
  }

  return dispatch => bindActionCreators(resultActions, dispatch);
}
