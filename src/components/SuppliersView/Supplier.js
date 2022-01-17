import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { getImageUrl } from '../../utils/imagesGetter';
import { getSupplierWithMenu } from '../../apiServices/supplierApi';
import PlaceIcon from '@material-ui/icons/Place';
import PhoneIcon from '@material-ui/icons/Phone';
import { IconButton } from '@material-ui/core';
import List from '@material-ui/core/List';
import { Food } from './Food';
import { AddFoodModal } from './AddFoodModal';

export const Supplier = ({ match, isAddModalOpen, handleAddModalClose }) => {

  const classes = useStyles();
  const [supplier, setSupplier] = useState({});
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    getSupplier();
  }, [isAddModalOpen])

  const getSupplier = () => {
    getSupplierWithMenu(match.params.id)
      .then((response) => {
        setSupplier(response.data.supplier);
        setMenu(response.data.menu);
      }).catch(error => {
        console.log(error)
      })
  }

  const onAddFoodToMenu = () => {
    getSupplier();
  }

  return (
    <Card className={classes.root}>
      <AddFoodModal isOpen={isAddModalOpen} handleOpen={onAddFoodToMenu} handleClose={handleAddModalClose} match={match} />
      <img
        className={classes.media}
        src={getImageUrl(supplier.imageId)}
        alt=''
      />
      <div className={classes.info}>
        <CardContent>
          <IconButton disabled >
            <PhoneIcon />
            { supplier.phoneNumber }
          </IconButton>
          <IconButton disabled >
            <PlaceIcon />
            { supplier.address }
          </IconButton>
        </CardContent>
        <CardActions className={classes.action}>
          <Button size="medium" color="primary" variant="contained">
            Zamów jedzenie
          </Button>
        </CardActions>
      </div>
      <div>
        <List component="nav">
          {
            menu.map((food, index) => 
              <Food food={food} />
            )
          }
        </List>
      </div>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: '5%',
    marginRight: '5%'
  },
  media: {
    marginTop: 25,
    maxHeight: 250,
    objectFit: 'contain',
    width: '100%',
    borderRadius: '10%'
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: '3%',
    marginRight: '3%'
  },
  action: {
    marginRight: '2%'
  }
}));
