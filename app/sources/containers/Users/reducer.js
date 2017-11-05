import {
  USERS_REQUESTED,
  USERS_SUCCEEDED,
  USERS_FAILURED,
  USERS_CANCELLED,
} from './constants';

const initialState = {
  data:    null,
  error:   null,
  loading: false,
};

export default function usersReducer(state = initialState, { type, payload } = {}) {
  switch (type) {
    case USERS_REQUESTED:
    case USERS_SUCCEEDED:
    case USERS_FAILURED:
    case USERS_CANCELLED:
      return { ...state, ...payload };

    default:
      return state;
  }
}
