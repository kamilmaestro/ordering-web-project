import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { uploadImage } from '../../apiServices/imagesApi';
import { ImageUploader } from '../ImageUploader/ImageUploader';
import { addNewFood } from '../../apiServices/supplierApi';
import { makeStyles } from '@material-ui/core/styles';

export const AddFoodModal = ({ match, isOpen, handleOpen, handleClose }) => {

  const classes = useStyles();
  const [name, setName] = useState(null);
  const [integerPrice, setIntegerPrice] = useState(null);
  const [fractionalPrice, setFractionalPrice] = useState(null);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const onClose = () => {
    setName(null);
    setIntegerPrice(null);
    setImage(null);
    setImageUrl(null);
    handleClose();
  }

  const onAddFoodToMenu = (e) => {
    onClose();
    e.preventDefault();
    image ? 
      addFoodWithImage()
      : addFoodToMenu();
  }

  const addFoodWithImage = () => {
    uploadImage(image)
      .then((response) => {
        addFoodToMenu(response.data.id);
      }).catch(error => {
        console.log(error)
      })
  }

  const addFoodToMenu = (imageId) => {
    const food = {
      name: name,
      supplierId: match.params.id,
      price: `${integerPrice}.${fractionalPrice}`,
      imageId: imageId
    }
    addNewFood(food)
      .then((response) => {
        console.log(response.data);
        handleOpen();
      }).catch(error => {
        console.log(error)
      })
  }

  const onChangeName = (event) => {
    setName(event.target.value);
  }

  const onChangeIntegerPrice = (event) => {
    setIntegerPrice(event.target.value);
  }

  const onChangeFractionalPrice = (event) => {
    setFractionalPrice(event.target.value);
  }

  const onChangeImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose} >
      <DialogTitle >
        Dodaj jedzenie 
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Uzupełnij informacje na temat jedzenia, które chcesz dodać do menu
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Nazwa jedzenia"
          fullWidth
          onChange={onChangeName}
        />
        <div className={classes.price} >
          <TextField
            margin="dense"
            label="Cena - zł"
            fullWidth
            type="number"
            onChange={onChangeIntegerPrice}
            style={{marginRight: 50}}
          />
          <TextField
            margin="dense"
            label="Cena - gr"
            fullWidth
            type="number"
            onChange={onChangeFractionalPrice}
          />
        </div>
        <ImageUploader imageUrl={imageUrl} onChange={onChangeImage} />
      </DialogContent>
      <DialogActions style={{marginRight: 15, marginBottom: 15}}>
        <Button onClick={onClose} color="primary" variant="contained">
          Anuluj
        </Button>
        <Button onClick={onAddFoodToMenu} color="primary" variant="contained">
          Dodaj
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles({
  price: {
    display: 'flex'
  }
});
