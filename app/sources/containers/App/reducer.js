
import { RESET } from './constants';
const initialState = {};

export default function appReducer(state = initialState, action = {}) {
  switch (action.type) {
    case RESET:
      return initialState;

    default:
      return state;
  }
}
