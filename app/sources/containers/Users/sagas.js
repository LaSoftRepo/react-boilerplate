/* eslint no-underscore-dangle: ["warn", { "allow": ["_success", "_failure", "_cancelled"] }] */

import { delay } from 'redux-saga'
import { call, put, take, race, fork, cancel, cancelled } from 'redux-saga/effects'

import { USERS_REQUESTED, USERS_CANCELING, RESPONSE_TIMEOUT } from './constants'
import { UsersAction } from './actions'
import { request }     from 'helpers/saga'

function* fetchSaga({ meta }) {
  try {
    const { timeout, response } = yield race({
      timeout:  call(delay, RESPONSE_TIMEOUT),
      response: request(meta),
    });

    if (timeout) {
      throw new Error('Server not responsable');
    }

    yield put(UsersAction._success(response.data));
  } catch (error) {
    yield put(UsersAction._failure(error));
  } finally {
    if (yield cancelled()) {
      yield put(UsersAction._cancelled());
    }
  }
}

// App Saga watcher
export default function* usersSaga() {
  while (true) {
    const action = yield take(USERS_REQUESTED);
    const task   = yield fork(fetchSaga, action);
    if (yield take(USERS_CANCELING)) {
      yield cancel(task);
    }
  }
}
