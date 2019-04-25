import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { setAuthToken } from '../utils/setAuthToken';
import { logoutUser, setUser } from './authActions';
import { ERROR, GET_USER, GET_USERS } from './types';

//Get user
export const getUser = id => dispatch => {
  axios
    .get(`/api/users/${id}`)
    .then(res => {
      dispatch({
        type: GET_USER,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: ERROR,
        payload: err.response.data
      })
    );
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
  axios
    .get('/api/users/all')
    .then(res => {
      dispatch({
        type: GET_USERS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: ERROR,
        payload: err.response.data
      })
    );
};
