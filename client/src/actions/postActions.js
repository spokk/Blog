import axios from 'axios';
import {
  ERROR,
  GET_POSTS,
  CREATE_POST,
  GET_POST,
  DELETE_POST,
  LIKE_POST,
  DISLIKE_POST,
  EDIT_POST,
  CLEAR_ERRORS
} from './types';

//Get posts
export const getPosts = () => dispatch => {
  axios
    .get('/api/posts')
    .then(res => {
      dispatch({
        type: GET_POSTS,
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

//Get post
export const getPostById = id => dispatch => {
  axios
    .get(`/api/posts/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: ERROR,
        payload: err.response.data
      })
    );
};

//Delete post
export const deletePostById = (id, history) => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_POST
      });
      history.push('/');
    })
    .catch(err =>
      dispatch({
        type: ERROR,
        payload: err.response.data
      })
    );
};

//Create post
export const createPost = (postData, history) => dispatch => {
  axios
    .post('/api/posts', postData)
    .then(res => {
      dispatch({
        type: CREATE_POST,
        payload: res.data
      });
      history.push('/');
    })
    .catch(err =>
      dispatch({
        type: ERROR,
        payload: err.response.data
      })
    );
};

//Like post
export const likePost = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res =>
      dispatch({
        type: LIKE_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: ERROR,
        payload: err.response.data
      })
    );
};

//Edit post
export const editPost = (id, postData, history) => dispatch => {
  axios
    .post(`/api/posts/edit/${id}`, postData)
    .then(res => {
      dispatch({
        type: EDIT_POST,
        payload: res.data
      });
      history.push(`/post/${id}`);
    })
    .catch(err =>
      dispatch({
        type: ERROR,
        payload: err.response.data
      })
    );
};

//Disike post
export const dislikePost = id => dispatch => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then(res =>
      dispatch({
        type: DISLIKE_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: ERROR,
        payload: err.response.data
      })
    );
};

export const clearErrors = () => dispatch => {
  return dispatch({
    type: CLEAR_ERRORS
  });
};
