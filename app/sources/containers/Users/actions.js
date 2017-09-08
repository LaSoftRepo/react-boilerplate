
import {
  RESET,
  USERS_REQUESTED,
  USERS_SUCCEEDED,
  USERS_FAILURED,
  USERS_FULFILLED,
} from './constants';

export class FetchAction {
  static request(config) {
    return {
      type: USERS_REQUESTED,
      loading: true,
      meta: config,
    };
  }

  static success(payload) {
    return {
      type: USERS_SUCCEEDED,
      payload,
    };
  }

  static fail(payload) {
    return {
      type: USERS_FAILURED,
      payload,
    };
  }

  static fulfill() {
    return {
      type: USERS_FULFILLED,
      loading: false,
    }
  }
}
