import { call, put, takeEvery } from 'redux-saga/effects'

import { USERS_REQUESTED  } from './constants'
import { FetchUsersAction } from './actions'
import Api from 'api'

export function* fetchUsers(action) {
  try {
    const { data } = yield call(Api.fetchUsers);
    yield put(FetchUsersAction.success(data));
  } catch (error) {
    yield put(FetchUsersAction.fail(error));
  }
}

// App Saga watcher
export function* usersSaga() {
  yield takeEvery(USERS_REQUESTED, fetchUsers);
}
