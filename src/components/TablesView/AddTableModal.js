import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createNewTable } from '../../apiServices/tablesApi';

export const AddTableModal = ({ isOpen, handleClose }) => {

  const [name, setName] = useState(null);

  const onClose = () => {
    setName(null);
    handleClose();
  }

  const onAddTable = (e) => {
    onClose();
    e.preventDefault();
    createTable();
  }

  const createTable = () => {
    createNewTable(name)
      .then((response) => {
        console.log(response.data);
      }).catch(error => {
        console.log(error)
      })
  }

  const onChangeName = (event) => {
    setName(event.target.value);
  }

  return (
    <Dialog open={isOpen} onClose={onClose} >
      <DialogTitle >
        Nowy stolik
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Uzupełnij nazwę, aby stworzyć nowy stolik
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Nazwa stolika"
          fullWidth
          onChange={onChangeName}
        />
      </DialogContent>
      <DialogActions style={{marginRight: 15, marginBottom: 15}}>
        <Button onClick={onClose} color="primary" variant="contained">
          Anuluj
        </Button>
        <Button onClick={onAddTable} color="primary" variant="contained">
          Dodaj
        </Button>
      </DialogActions>
    </Dialog>
  );
};