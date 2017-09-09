
import {
  RESET,
  USERS_REQUESTED,
  USERS_SUCCEEDED,
  USERS_FAILURED,
  USERS_FULFILLED,
  USERS_CANCELLED,
  USERS_CANCELING,
} from './constants';

export class FetchAction {
  static request(config) {
    return {
      type: USERS_REQUESTED,
      payload: {
        loading: true,
      },
      meta: config,
    };
  }

  static cancel() {
    return {
      type: USERS_CANCELING,
    };
  }

  static success(data) {
    return {
      type: USERS_SUCCEEDED,
      payload: {
        data,
      },
    };
  }

  static failure(error) {
    return {
      type: USERS_FAILURED,
      payload: {
        error,
      },
    };
  }

  static fulfill() {
    return {
      type: USERS_FULFILLED,
      payload: {
        loading: false,
      },
    };
  }

  static cancelled() {
    return {
      type: USERS_CANCELLED,
      payload: {
        loading: false,
      },
    };
  }
}
