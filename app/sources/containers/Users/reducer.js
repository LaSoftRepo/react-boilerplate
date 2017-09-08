import {
  USERS_REQUESTED,
  USERS_SUCCEEDED,
  USERS_FAILURED,
  USERS_FULFILLED,
} from './constants';

const initialState = {
  data:    null,
  error:   null,
  loading: false,
};

export default function usersReducer(state = initialState, action = {}) {
  switch (action.type) {
    case USERS_REQUESTED:
    case USERS_FULFILLED:
      return { ...state, loading: action.loading };

    case USERS_SUCCEEDED:
      return { ...state, data: action.payload };

    case USERS_FAILURED:
      return { ...state, error: action.payload };

    default: return state;
  }
}
