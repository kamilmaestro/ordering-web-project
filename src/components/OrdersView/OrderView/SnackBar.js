import * as React from 'react';
import {Snackbar} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

export const SnackBar = ({ isOpen, handleClose }) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      autoHideDuration={6000}
      open={isOpen}
      onClose={handleClose}
      message="Zamówienie zostało usunięte"
      action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
      }
    />
  );
};