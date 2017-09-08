import { call, put, cancel, cancelled, takeEvery } from 'redux-saga/effects'

import { USERS_REQUESTED } from './constants'
import { FetchAction } from './actions'
import { request } from 'api'

export function * fetchSaga({ meta }) {
  try {
    switch (meta.method) {
      case 'get':
        const { data } = yield call(request, meta);
        yield put(FetchAction.success(data));
        break;

      case 'post':
        yield call(request, meta);
        yield put(FetchAction.success());
        break;

      default: break;
    }
  } catch (error) {
    yield put(FetchAction.failure(error));
  } finally {
    //if (cancelled()) {
    //  yield put(FetchAction.cancel());
    //} else {
      yield put(FetchAction.fulfill());
    //}
  }
}

// App Saga watcher
export function * usersSaga() {
  yield takeEvery(USERS_REQUESTED, fetchSaga);
}
