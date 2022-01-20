import * as React from 'react';
import {Box, Typography} from '@material-ui/core';
import { PrimaryButton } from '../PrimaryButton/PrimaryButton';
import './pagePreview.css';

export const PagePreview = ({ onButtonClick }) => {
  return (
    <div className='row'>
      <Typography variant="h1" >
        <Box letterSpacing={3} fontWeight="fontWeightBold" textAlign="center" >
          Foo<span className='title_accent'>d</span>livery
        </Box>
      </Typography>
      <Typography variant="h4" gutterBottom >
        <Box letterSpacing={2} textAlign="center" >
          Delicious food for every mood
        </Box>
      </Typography>
      <PrimaryButton text='Głodny?' onClick={onButtonClick} />
    </div>
  );
};