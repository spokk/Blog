import axios from 'axios';
import { logoutUser } from './authActions';
import { ERROR, GET_USER } from './types';

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
    .then(res => history.push(`/user/${id}`))
    .catch(err =>
      dispatch({
        type: ERROR,
        payload: err.response.data
      })
    );
};
