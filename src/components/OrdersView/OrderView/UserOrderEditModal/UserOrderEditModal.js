import * as React from 'react';
import {ItemsList} from "../../../TablesView/AddProposalModal/ItemsList";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {useEffect, useState} from "react";
import {EditableFoodList} from "./EditableFoodList";
import {makeStyles} from "@material-ui/core/styles";

export const UserOrderEditModal = ({ isOpen, userOrder, onSubmit, onClose }) => {

  const classes = useStyles();
  const [editedFood, setEditedFood] = useState([]);

  useEffect(() => {
    if (userOrder) {
      setEditedFood(userOrder.orderedFood);
    }
  }, [userOrder])

  const handleSubmit = () => {
    onSubmit(userOrder.id, editedFood);
  }

  const handleAmountChanged = (id, amount) => {
    const updatedFood = editedFood.map(food =>
      food.id === id ?
        { ...food, amountOfFood: amount }
        : food
    );
    setEditedFood(updatedFood);
  }

  const handlePriceChanged = (id, price) => {
    const updatedFood = editedFood.map(food =>
      food.id === id ?
        { ...food, foodPrice: price }
        : food
    );
    setEditedFood(updatedFood);
  }

  return (
    <div >
      <Dialog open={isOpen} onClose={onClose} classes={{ paper: classes.root }} >
        <DialogTitle>
          Edytuj zamówione jedzenie
        </DialogTitle>
        <DialogContent>
          {
            userOrder &&
              <EditableFoodList
                food={editedFood}
                handleAmountChanged={handleAmountChanged}
                handlePriceChanged={handlePriceChanged}
              />
          }
        </DialogContent>
        <DialogActions style={{marginRight: 15, marginBottom: 15}}>
          <Button onClick={onClose} color="primary" variant="contained">
            Anuluj
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Zatwierdź
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '100vh',
    maxWidth: '100vh',
    minHeight: '90vh',
    maxHeight: '90vh',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  list: {
    maxHeight: 150
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));
