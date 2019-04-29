import {
  GET_POSTS,
  CREATE_POST,
  GET_POST,
  LIKE_POST,
  DISLIKE_POST,
  EDIT_POST,
  CREATE_COMMENT,
  DELETE_COMMENT,
  SET_LOADING,
  UNSET_LOADING
} from '../actions/types';
const initialState = {
  posts: [],
  post: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
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
    case CREATE_COMMENT:
      return {
        ...state,
        post: action.payload
      };
    case DELETE_COMMENT:
      return {
        ...state,
        post: action.payload
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case UNSET_LOADING:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
