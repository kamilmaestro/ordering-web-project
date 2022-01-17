import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import PlaceIcon from '@material-ui/icons/Place';
import Typography from '@material-ui/core/Typography';
import PhoneIcon from '@material-ui/icons/Phone';
import { getImageUrl } from '../../utils/imagesGetter';
import Button from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core';

export const SupplierPreview = ({ supplier, onClick }) => {

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={getImageUrl(supplier.imageId)}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="h5" style={{paddingLeft: 15}}>
            {supplier.name}
          </Typography>
          <IconButton disabled>
            <PhoneIcon />
            { supplier.phoneNumber }
          </IconButton>
          <IconButton disabled>
            <PlaceIcon />
            { supplier.address }
          </IconButton>
        </CardContent>
        <div className={classes.controls}>
          <Button variant="contained" color="primary" onClick={() => onClick(supplier.id, supplier.name)} >
            Sprawdź menu
          </Button>
        </div>
      </div>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: 10,
    marginLeft: '15%',
    marginRight: '15%'
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
    marginRight: '2%'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 32,
    paddingBottom: theme.spacing(2),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));
