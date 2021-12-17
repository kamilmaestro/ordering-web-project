import * as React from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";

export const EditableFoodList = ({ food, handleAmountChanged, handlePriceChanged }) => {

  const classes = useStyles();

  const onAmountChange = (item, event) => {
    const amount = (event.target.value && event.target.value > 0) ?
      parseInt(event.target.value, 10)
      : 1;
    handleAmountChanged(item.id, amount);
  }

  const onPriceChanged = (item, event) => {
    const price = (event.target.value && event.target.value > 0) ?
      event.target.value
      : 1;
    handlePriceChanged(item.id, price);
  }

  return (
    <div>
      <List component="nav" className={classes.root}>
        {
          food.map((item, index) => (
            <ListItem key={index} button>
              <ListItemText id={item.id} primary={<Typography> { item.foodName } </Typography>} />
              <TextField
                margin="dense"
                label="Cena (zł)"
                inputProps={{ min: 0, max: 999, step: 0.01 }}
                type="number"
                onChange={(e) => onPriceChanged(item, e)}
                style={{marginRight: 15, minWidth: 75}}
                value={item.foodPrice ? item.foodPrice : 0}
              />
              <TextField
                margin="dense"
                label="Ilość"
                inputProps={{ min: 1, max: 99}}
                type="number"
                onChange={(e) => onAmountChange(item, e)}
                style={{marginRight: 10, minWidth: 50}}
                value={item.amountOfFood ? item.amountOfFood : 1}
              />
            </ListItem>
          ))
        }
      </List>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    minHeight: '10vh',
    maxHeight: '35vh',
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));
