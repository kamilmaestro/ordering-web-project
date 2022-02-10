import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export const JoinTableModal = ({ isOpen, handleClose, handleAccept }) => {

  const [invitation, setInvitation] = useState(null);

  const onClose = () => {
    setInvitation(null);
    handleClose();
  }

  const onJoinTable = (e) => {
    onClose();
    e.preventDefault();
    handleAccept(invitation);
  }

  const onChangeInvitaton = (event) => {
    setInvitation(event.target.value);
  }

  return (
    <Dialog open={isOpen} onClose={onClose} >
      <DialogTitle >
        Dosiadka?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Podaj token otrzymany od znajomego uprawniający Cię do dołączenia do stolika. Znajomi już tu siedzą!
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Token"
          fullWidth
          onChange={onChangeInvitaton}
        />
      </DialogContent>
      <DialogActions style={{marginRight: 15, marginBottom: 15}}>
        <Button onClick={onClose} color="primary" variant="contained">
          Anuluj
        </Button>
        <Button onClick={onJoinTable} color="primary" variant="contained">
          Dołącz
        </Button>
      </DialogActions>
    </Dialog>
  );
};