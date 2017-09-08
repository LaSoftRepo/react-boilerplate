
import {
  RESET,
  USERS_REQUESTED,
  USERS_SUCCEEDED,
  USERS_FAILURED,
  USERS_FULFILLED,
  USERS_CANCELLED,
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

  static cancel() {
    return {
      type: USERS_CANCELLED,
      payload: {
        loading: false,
      },
    };
  }
}
