
import { delay } from 'redux-saga'
import { call, put, take, race, fork, cancel, cancelled, takeEvery } from 'redux-saga/effects'
import { USERS_REQUESTED, USERS_CANCELING, RESPONSE_TIMEOUT } from './constants'
import { FetchAction } from './actions'
import { request } from 'api'

export function * fetchSaga({ meta }) {
  try {
    const { timeout, response } = yield race({
      timeout:  call(delay,   RESPONSE_TIMEOUT),
      response: call(request, meta),
    });

    if (timeout) {
      throw new Error('Server not responsable');
    }

    yield put(FetchAction._success(response.data));
  } catch (error) {
    yield put(FetchAction._failure(error));
  } finally {
    if (yield cancelled()) {
      yield put(FetchAction._cancelled());
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
