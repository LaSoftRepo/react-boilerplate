import {
  USERS_REQUESTED,
  USERS_SUCCEEDED,
  USERS_FAILURED,
  USERS_FULFILLED,
  USERS_CANCELLED,
} from './constants';

const initialState = {
  data:    null,
  error:   null,
  loading: false,
};

export default function usersReducer(state = initialState, action = {}) {
  switch (action.type) {
    case USERS_REQUESTED:
    case USERS_SUCCEEDED:
    case USERS_FAILURED:
    case USERS_FULFILLED:
    case USERS_CANCELLED:
      return { ...state, ...action.payload };

    default: return state;
  }
}
