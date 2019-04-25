import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import userReducer from './userReducer';
import postReducer from './postReducer';
import searchReducer from './searchReducer';

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  user: userReducer,
  post: postReducer,
  search: searchReducer
});
