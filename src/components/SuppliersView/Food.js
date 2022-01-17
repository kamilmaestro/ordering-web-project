import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { getImageUrl } from '../../utils/imagesGetter';
import { IconButton } from '@material-ui/core';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

export const Food = ({ food }) => {

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={getImageUrl(food.imageId)}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="h5" style={{paddingLeft: 15}}>
            {food.name}
          </Typography>
          <IconButton disabled>
            <LocalOfferIcon style ={{marginRight: 8}}/>
            <div style ={{color: '#d32f2f'}}>
              { `${food.price} zł` }
            </div>
          </IconButton>
        </CardContent>
      </div>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: 10,
    marginLeft: '5%',
    marginRight: '5%'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto'
  },
  info: {
    display: 'flex',
    flexDirection: 'row'
  },
  cover: {
    maxHeight: 300,
    minWidth: 250,
    marginRight: '3%',
    marginLeft: '3%'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 32,
    paddingBottom: theme.spacing(2),
  },
  icon: {
    color: theme.palette.primary.main
  }
}));
