import {axios} from '../utils/tokenGetter'
import { SERVER_URL } from '../utils/urlProvider';

export const uploadImage = (file) => {
  const url = `${SERVER_URL}/image/`;
  const formData = new FormData();
  formData.append('file', file)
  const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
  }

  return axios.post(url, formData, config)
}