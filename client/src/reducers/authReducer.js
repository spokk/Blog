import { SET_USER } from '../actions/types';
const initialState = {
  isAuth: false,
  user: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isAuth: !!action.payload,
        user: action.payload
      };
    default:
      return state;
  }
}
