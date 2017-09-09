import { call, put, take, fork, cancel, cancelled, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import { USERS_REQUESTED, USERS_CANCELING } from './constants'
import { FetchAction } from './actions'
import { request } from 'api'

export function * fetchSaga({ meta }) {
  try {
    switch (meta.method) {
      case 'get':
      case 'post':
        const { data } = yield call(request, meta);
        yield put(FetchAction.success(data));
        break;

      default: break;
    }
  } catch (error) {
    yield put(FetchAction.failure(error));
  } finally {
    if (yield cancelled()) {
      yield put(FetchAction.cancelled());
    } else {
      yield put(FetchAction.fulfill());
    }
  }
}

// App Saga watcher
export function * usersSaga() {
  //yield takeEvery(USERS_REQUESTED, fetchSaga);
  while (true) {
    let action = yield take(USERS_REQUESTED);
    let task   = yield fork(fetchSaga, action);
    if (yield take(USERS_CANCELING)) {
      yield cancel(task);
    }
  }
}
