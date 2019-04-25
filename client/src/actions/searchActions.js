import axios from 'axios';
import { SEARCH_POSTS, CLEAR_SEARCH } from './types';

export const searchPosts = (query, history) => dispatch => {
  axios
    .get(`/api/posts/search?query=${query}`)
    .then(res => {
      history.push(`/search?query=${query}`);
      dispatch({
        type: SEARCH_POSTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: CLEAR_SEARCH
      })
    );
};
