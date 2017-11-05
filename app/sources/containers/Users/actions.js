
import {
  USERS_REQUESTED,
  USERS_SUCCEEDED,
  USERS_FAILURED,
  USERS_CANCELLED,
  USERS_CANCELING,
} from './constants'

// eslint-disable-next-line
export class UsersAction {
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

  static _success(data) {
    return {
      type: USERS_SUCCEEDED,
      payload: {
        loading: false,
        error:   null,
        data,
      },
    };
  }

  static _failure(error) {
    return {
      type: USERS_FAILURED,
      payload: {
        loading: false,
        error,
      },
    };
  }

  static _cancelled() {
    return {
      type: USERS_CANCELLED,
      payload: {
        loading: false,
        error:   null,
      },
    };
  }
}
