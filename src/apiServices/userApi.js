import { SERVER_URL } from '../utils/urlProvider';
import {axios} from '../utils/tokenGetter'

export const getUsersByIds = (ids) => {
  const url = `${SERVER_URL}/user/ids`;

  return axios.post(url, ids);
}