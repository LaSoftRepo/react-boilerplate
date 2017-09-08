import { call, put, cancel, cancelled, takeEvery } from 'redux-saga/effects'

import { USERS_REQUESTED } from './constants'
import { FetchAction } from './actions'
import Api from 'api'

export function * fetchSaga(action) {
  const meta = action.meta;
  try {
    switch (meta.method) {
      case 'get':
        //const { data } = yield call(Api.fetchUsers);
        const { data } = yield call(Api.request, meta);
        yield put(FetchAction.success(data));
        break;

      case 'post':
        yield call(Api.request, meta);
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
