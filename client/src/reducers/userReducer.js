import { GET_USER, GET_USERS, CLEAR_USER, SET_USER_LOADING, UNSET_USER_LOADING } from '../actions/types';
const initialState = {
  user: null,
  users: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case CLEAR_USER:
      return {
        ...state,
        user: null,
        loading: false
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case SET_USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case UNSET_USER_LOADING:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
