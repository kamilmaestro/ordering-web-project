import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { getImageUrl } from '../../utils/imagesGetter';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import Button from '@material-ui/core/Button';

export const ProposalHeader = ({ supplierName }) => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography variant="h6" className={classes.text} style={{marginRight: 15}}>
          dla:
        </Typography>
        <Typography variant="h5" className={classes.text}>
          { supplierName }
        </Typography>
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  container: {
    display: 'flex',
    flexDirection: 'row'
  },
  text: {
    color: theme.palette.text.primary,
    fontWeight: 100
  }
}));
