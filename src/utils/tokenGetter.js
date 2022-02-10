import Axios from 'axios';
import { AUTH_HEADER } from './constants';

const TOKEN_KEY = 'AuthToken';

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
}

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
}

export const axios = Axios.create({
  headers: {     
      AUTH_HEADER: getToken()
  }
})

axios.interceptors.request.use(config => {
  config.headers.common[AUTH_HEADER] = getToken();
  return config;
});
