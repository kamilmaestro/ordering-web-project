import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AddProposalStepper } from './AddProposalStepper';

export const AddProposalModal = ({ isOpen, handleClose, onAddProposal, tableId }) => {

  const classes = useStyles();
  const [isFinished, setIsFinished] = useState(false);
  const [proposal, setProposal] = useState({});

  const handleFinish = (supplierId, food) => {
    setIsFinished(true);
    const proposal = {
      supplierId: supplierId,
      channelId: tableId,
      food: food
    };
    setProposal(proposal);
  }

  const onClose = () => {
    handleClose();
    setIsFinished(false);
  }

  const addProposal = () => {
    onAddProposal(proposal);
    handleClose();
    setIsFinished(false);
  }

  return (
    <div>
      <Dialog open={isOpen} onClose={onClose} classes={{ paper: classes.dialogPaper }} >
        <DialogTitle >
          Nowa propozycja
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Wybierz dostawce oraz pozycję z menu, aby stworzyć propozycję zamówienia
          </DialogContentText>
          <AddProposalStepper onFinish={handleFinish} />
        </DialogContent>
        <DialogActions style={{marginRight: 15, marginBottom: 15}}>
          <Button onClick={onClose} color="primary" variant="contained">
            Anuluj
          </Button>
          {
            <Button onClick={addProposal} color="primary" variant="contained" disabled={!isFinished}>
              Dodaj
            </Button>
          }
        </DialogActions>
      </Dialog>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  dialogPaper: {
    minWidth: '100vh',
    maxWidth: '100vh',
    minHeight: '90vh',
    maxHeight: '90vh',
  },
}));

