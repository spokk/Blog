import axios from 'axios';

export const setAuthToken = token => {
  // Apply token to every request
  if (token) axios.defaults.headers.common['Authorization'] = token;
  // Delete auth header if request has no token
  else delete axios.defaults.headers.common['Authorization'];
};
