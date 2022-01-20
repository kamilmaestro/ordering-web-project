import * as React from 'react';
import Button from '@material-ui/core/Button';
import './imageUploader.css';

export const ImageUploader = ({ imageUrl, onChange }) => {
  return (
    <div className='image_uploader_centered'>
      <div style={{margin: 20}} className='image_uploader_centered'>
        <div style={{margin: 5}}>
          {
            imageUrl !== null &&
              <img src={imageUrl} alt='img' className='image_uploader_image' />
          }
        </div>
        <Button color="primary" component="label">
          {
            imageUrl === null ?
              <span>Dodaj zdjęcie</span>
              : <span>Zmień zdjęcie</span>
          }
          <input
            type="file"
            style={{ display: "none" }}
            onChange={onChange}
          />
        </Button>
      </div>
    </div>
  );
};