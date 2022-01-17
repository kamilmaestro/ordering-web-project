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
import { addNewSupplier, getSuppliersPage } from '../../apiServices/supplierApi';

export const AddSupplierModal = ({ isOpen, handleClose }) => {

  const [name, setName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [address, setAddress] = useState(null);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const onClose = () => {
    setName(null);
    setPhoneNumber(null);
    setAddress(null);
    setImage(null);
    setImageUrl(null);
    handleClose();
  }

  const onAddSupplier = (e) => {
    onClose();
    e.preventDefault();
    image ? 
      addSupplierWithImage()
      : addSupplier();
  }

  const addSupplierWithImage = () => {
    uploadImage(image)
      .then((response) => {
        addSupplier(response.data.id);
      }).catch(error => {
        console.log(error)
      })
  }

  const addSupplier = (imageId) => {
    const supplier = {
      name: name,
      phoneNumber: phoneNumber,
      address: address,
      imageId: imageId
    }
    addNewSupplier(supplier)
      .then((response) => {
        console.log(response.data);
      }).catch(error => {
        console.log(error)
      })
  }

  const onChangeName = (event) => {
    setName(event.target.value);
  }

  const onChangePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  }

  const onChangeAddress = (event) => {
    setAddress(event.target.value);
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
        Nowy dostawca
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Uzupełnij wszystkie pola, aby dodać nowego dostawcę jedzenia
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Nazwa dostawcy"
          fullWidth
          onChange={onChangeName}
        />
        <TextField
          margin="dense"
          label="Numer telefonu"
          fullWidth
          onChange={onChangePhoneNumber}
        />
        <TextField
          margin="dense"
          label="Adres"
          type="email"
          fullWidth
          onChange={onChangeAddress}
        />
        <ImageUploader imageUrl={imageUrl} onChange={onChangeImage} />
      </DialogContent>
      <DialogActions style={{marginRight: 15, marginBottom: 15}}>
        <Button onClick={onClose} color="primary" variant="contained">
          Anuluj
        </Button>
        <Button onClick={onAddSupplier} color="primary" variant="contained">
          Dodaj
        </Button>
      </DialogActions>
    </Dialog>
  );
};
