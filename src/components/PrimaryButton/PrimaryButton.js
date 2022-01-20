import React from 'react';
import './primaryButton.css';

export const PrimaryButton = ({ onClick, text }) => {
  return (
    <div style={{display: "flex", justifyContent: "center", margin: 30}}>
      <button className='content' onClick={onClick} >
        {text}
      </button>
    </div>
  );
};