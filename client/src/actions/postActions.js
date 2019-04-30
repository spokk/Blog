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
  CLEAR_ERRORS,
  CREATE_COMMENT,
  DELETE_COMMENT,
  SET_LOADING,
  UNSET_LOADING,
  CLEAR_POSTS_STORE
} from './types';

//Get posts
export const getPosts = page => dispatch => {
  dispatch({ type: SET_LOADING });
  axios
    .get(`/api/posts/page/${page}`)
    .then(res => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: UNSET_LOADING });
      dispatch({
        type: ERROR,
        payload: err.response
      });
    });
};

//Get post
export const getPostById = id => dispatch => {
  dispatch({ type: SET_LOADING });
  axios
    .get(`/api/posts/post/${id}`)
    .then(res =>
      dispatch({
        type: GET_POST,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({ type: UNSET_LOADING });
      dispatch({
        type: ERROR,
        payload: err.response.data
      });
    });
};

//Delete post
export const deletePostById = (id, history) => dispatch => {
  axios
    .delete(`/api/posts/post/${id}`)
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
    .catch(err => {
      dispatch({
        type: ERROR,
        payload: err.response.data
      });
    });
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

//Create comment
export const createComment = (id, newComment) => dispatch => {
  axios
    .post(`/api/posts/comment/${id}`, newComment)
    .then(res =>
      dispatch({
        type: CREATE_COMMENT,
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

//Delete comment
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res =>
      dispatch({
        type: DELETE_COMMENT,
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

export const clearPosts = () => dispatch => {
  return dispatch({
    type: CLEAR_POSTS_STORE
  });
};
