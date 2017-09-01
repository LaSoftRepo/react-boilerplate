
import { fork } from 'redux-saga/effects'
import { appSaga } from 'containers/App/sagas'

export default function* rootSaga() {
  yield [
    fork(appSaga),
    //fork(saga2),
  ];
}
