import axios from 'axios';
import { setAuthToken } from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { ERROR, SET_USER } from './types';

//Register
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: ERROR,
        payload: err.response.data
      })
    );
};

//Login
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // Save token to localStorage
      const { token } = res.data;
      localStorage.setItem('token', token);
      // Set token to axios Auth header
      setAuthToken(token);
      // Decode user info from token
      const decoded = jwt_decode(token);
      // Set user
      dispatch(setUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: ERROR,
        payload: err.response.data
      })
    );
};

// Set user
export const setUser = decoded => {
  return {
    type: SET_USER,
    payload: decoded
  };
};

// Logout
export const logoutUser = history => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('token');
  // Remove auth header
  setAuthToken(false); //if false - remove token from axios
  //Push to main page
  history ? history.push('/') : (window.location.href = '/');
  // Delete user from store
  dispatch(setUser(null));
};
