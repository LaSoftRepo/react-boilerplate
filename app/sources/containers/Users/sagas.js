import { call, put, takeEvery } from 'redux-saga/effects'

import { USERS_REQUESTED } from './constants'
import { FetchAction } from './actions'
import Api from 'api'

export function * fetchSaga(action) {
  const meta = action.meta;
  
  switch (meta.method) {
    case 'get':
      try {
        //const { data } = yield call(Api.fetchUsers);
        const { data } = yield call(Api.request, meta);
        yield put(FetchAction.success(data));
      } catch (error) {
        yield put(FetchAction.failure(error));
      } finally {
        yield put(FetchAction.fulfill());
      }
      break;

    case 'post':
      try {
        yield call(Api.request, meta);
        yield put(FetchAction.success());
      } catch (error) {
        yield put(FetchAction.failure(error));
      } finally {
        yield put(FetchAction.fulfill());
      }
      break;

    default: break;
  }
}

// App Saga watcher
export function * usersSaga() {
  yield takeEvery(USERS_REQUESTED, fetchSaga);
}
