import { Typography } from '@material-ui/core';
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';

export const ItemsList = ({ items, onClick, handleAmountChanged }) => {

  const classes = useStyles();

  const onAmountChange = (item, event) => {
    const amount = (event.target.value && event.target.value > 0) ? 
      parseInt(event.target.value, 10) 
      : 1;
    handleAmountChanged(item.id, amount);
  }

  return (
    <div>
      <List component="nav" className={classes.root}>
        {
          items.map((item, index) => (
            <ListItem key={index} button selected={item.isSelected}>
              <ListItemText id={item.id} primary={<Typography> { item.name } </Typography>} onClick={() => onClick(item.id)} />
              <TextField
                margin="dense"
                label="Ilość"
                inputProps={{ min: 1, max: 99}}
                type="number"
                onChange={(e) => onAmountChange(item, e)}
                style={{marginRight: 10, minWidth: 50}}
                value={item.amount ? item.amount : 1}
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
