import axios, { CancelToken } from 'axios';

const api = axios.create({
  baseURL: 'http://dev.backend.team02.vse.handson.pro/api',
});

export function getCancelTokenSource() {
  return CancelToken.source();
}

export function setAuthToken(authToken) {
  if (typeof authToken === 'undefined') {
    delete api.defaults.headers.common['Authorization']
  } else {
    api.defaults.headers.common['Authorization'] = authToken
  }
}

export default api;
