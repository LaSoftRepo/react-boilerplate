
import {
  RESET,
  USERS_REQUESTED,
  USERS_SUCCEEDED,
  USERS_FAILED,
} from './constants';

export class FetchUsersActions {
  static success(data) {
    return {
      type: USERS_SUCCEEDED,
      data,
    };
  }

  static fail(error) {
    return {
      type: USERS_FAILED,
      error,
    };
  }
}
