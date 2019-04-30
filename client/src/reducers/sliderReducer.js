import { GET_POSTS_SLIDER } from '../actions/types';

const initialState = {
  posts: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS_SLIDER:
      return {
        ...state,
        posts: action.payload
      };
    default:
      return state;
  }
}
