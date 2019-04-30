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
  UNSET_LOADING,
  CLEAR_POSTS_STORE
} from '../actions/types';
const initialState = {
  posts: [],
  post: {
    name: '',
    text: '',
    avatar: '',
    likes: [],
    comments: [],
    date: '',
    header: '',
    postAuthor: ''
  },
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
      return state;
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
    case CLEAR_POSTS_STORE:
      return {
        ...state,
        posts: [],
        post: {
          name: '',
          text: '',
          avatar: '',
          likes: [],
          comments: [],
          date: '',
          header: '',
          postAuthor: ''
        },
        loading: false
      };
    default:
      return state;
  }
}
