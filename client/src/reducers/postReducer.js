import { GET_POSTS, CREATE_POST, GET_POST, LIKE_POST, DISLIKE_POST, EDIT_POST } from '../actions/types';
const initialState = {
  posts: [],
  post: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload
      };
    case LIKE_POST:
      return {
        ...state,
        post: action.payload
      };
    case DISLIKE_POST:
      return {
        ...state,
        post: action.payload
      };
    case CREATE_POST:
      return {
        ...state,
        posts: action.payload
      };
    case EDIT_POST:
      return {
        ...state,
        post: action.payload
      };
    default:
      return state;
  }
}
