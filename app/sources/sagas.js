
import { fork, all, call } from 'redux-saga/effects'
import { appSaga } from 'containers/App/sagas'
import { usersSaga } from 'containers/Users/sagas'

export function* rootSaga() {
  yield all([
    call(appSaga),
    call(usersSaga),
  ]);
}

export const injectSagas = (store, sagas) => {
  if (!Array.isArray(sagas)) {
    throw new TypeError('sagas must be array');
  }

  sagas.map(store.runSaga);
}
