import { SERVER_URL } from './urlProvider';

const DOWNLOAD_IMAGE_URL = `${SERVER_URL}/image/`;

export const getImageUrl = (imageId) => {
  return imageId ?
    `${DOWNLOAD_IMAGE_URL}${imageId}`
    : '';
}
