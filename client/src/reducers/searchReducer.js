import { SEARCH_POSTS, CLEAR_SEARCH } from '../actions/types';

const initialState = {
  search: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SEARCH_POSTS:
      return {
        ...state,
        search: action.payload
      };
    case CLEAR_SEARCH:
      return {
        ...state,
        search: []
      };
    default:
      return state;
  }
}
