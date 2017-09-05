
import { fork, all, call } from 'redux-saga/effects'
import { appSaga } from 'containers/App/sagas'
import { usersSaga } from 'containers/Users/sagas'

export default function* rootSaga() {
  yield all([
    call(appSaga),
    call(usersSaga),
  ]);
}
