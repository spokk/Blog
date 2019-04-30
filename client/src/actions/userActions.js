import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from '../utils/setAuthToken';
import { logoutUser, setUser } from './authActions';
import { ERROR, GET_USER, GET_USERS, CLEAR_USER, SET_USER_LOADING, UNSET_USER_LOADING } from './types';

//Get user
export const getUser = id => dispatch => {
  dispatch({ type: SET_USER_LOADING });
  axios
    .get(`/api/users/${id}`)
    .then(res => {
      dispatch({
        type: GET_USER,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: UNSET_USER_LOADING });
      dispatch({
        type: ERROR,
        payload: err.response.data
      });
    });
};

export const clearUser = () => dispatch => {
  dispatch({
    type: CLEAR_USER
  });
};

// Delete user
export const deleteUser = (id, history) => dispatch => {
  axios
    .delete(`/api/users/${id}`)
    .then(res => {
      dispatch(logoutUser(history));
    })
    .catch(err =>
      dispatch({
        type: ERROR,
        payload: err.response.data
      })
    );
};

// Edit user
export const editUser = (id, userData, history) => dispatch => {
  axios
    .post(`/api/users/${id}`, userData)
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
      history.push(`/user/${id}`);
    })
    .catch(err =>
      dispatch({
        type: ERROR,
        payload: err.response.data
      })
    );
};

//Get user
export const getUsers = () => dispatch => {
  dispatch({ type: SET_USER_LOADING });
  axios
    .get('/api/users/all')
    .then(res => {
      dispatch({
        type: GET_USERS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: UNSET_USER_LOADING });
      dispatch({
        type: ERROR,
        payload: err.response.data
      });
    });
};
