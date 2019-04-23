import { ERROR, CLEAR_ERRORS } from '../actions/types';

const initialState = {
  error: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ERROR:
      return action.payload;
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
}
