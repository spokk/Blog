import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import userReducer from './userReducer';
import postReducer from './postReducer';
import searchReducer from './searchReducer';
import sliderReducer from './sliderReducer';

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  user: userReducer,
  post: postReducer,
  search: searchReducer,
  slider: sliderReducer
});
