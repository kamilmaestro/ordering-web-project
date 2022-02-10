import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getImageUrl } from '../../utils/imagesGetter';
import Button from '@material-ui/core/Button';
import { ProposalHeader } from './ProposalHeader';
import { ProposalFoodPreviewList } from './ProposalFoodPreviewList/ProposalFoodPreviewList';
import {getDateTime} from "../../utils/dateFormatter";

export const ProposalPreview = ({ proposal, food, supplier, memberName, onClickButton, onClickFood }) => {

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  const calculateFoodImageHeight = () => {
    return getImage() ?
      250
      : 0;
  }

  const getImage = () => {
    const foodWithImage = food.find(food => food.imageId !== null);
    return foodWithImage ?
      getImageUrl(foodWithImage.imageId) 
      : null;
  }

  const getFoodForPreviewList = () => {
    return proposal.food.map(food => createFoodPreview(food));
  }

  const createFoodPreview = (value) => {
    const foodData = food.find(food => food.id === value.foodId)
    return {
      amount: value.amountOfFood,
      name: foodData ? foodData.name : null,
      price: foodData ? foodData.price : 0
    }
  }

  const goToSupplier = () => {
    onClickFood(supplier.id, supplier.name);
  }

  return (
    <div className={classes.root}>
      <Card>
      <CardHeader title={ <ProposalHeader supplierName={supplier ? supplier.name : null} /> } />
      <CardMedia
        style={{height: calculateFoodImageHeight()}}
        image={getImage()}
      />
      <CardActions disableSpacing>
        <Button  color="primary" variant="contained" onClick={() => onClickButton(supplier.id)} >
          Zostań kupującym
        </Button>
        <IconButton
          className={clsx(classes.expand, { [classes.expandOpen]: expanded })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
        >
          <ExpandMoreIcon className={classes.mainColor}/>
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout={500} unmountOnExit>
        <CardContent>
          <div className={classes.content}>
            <Typography variant="h6" className={classes.text}>
              { `Wygasa: ${getDateTime(proposal.expirationDate)}` }
            </Typography>
            {
              memberName &&
                <Typography variant="h6" className={classes.text}>
                  { `Dodane przez: ${memberName}` }
                </Typography>
            }
          </div>
          <ProposalFoodPreviewList food={getFoodForPreviewList()} onFoodClick={goToSupplier} />
        </CardContent>
      </Collapse>
    </Card>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 250,
    marginBottom: 12
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500]
  },
  mainColor: {
    color: theme.palette.primary.main
  },
  text: {
    color: theme.palette.text.primary,
    fontWeight: 100
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}));
