import {
  USERS_SUCCEEDED,
  USERS_FAILED,
} from './constants';

const initialState = {
  data:  null,
  error: null,
};

export default function usersReducer(state = initialState, action = {}) {
  switch (action.type) {
    case USERS_SUCCEEDED:
      return { ...state, data: action.data, error: null };

    case USERS_FAILED:
      return { ...state, data: null, error: action.error };

    default:
      return state;
  }
}
