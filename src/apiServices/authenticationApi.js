import { post } from 'axios';
import { SERVER_URL } from '../utils/urlProvider';

export const signIn = (username, password) => {
  const url = `${SERVER_URL}/login`;
  const body = {
    username: username,
    password: password
  };

  return post(url, body);
}
