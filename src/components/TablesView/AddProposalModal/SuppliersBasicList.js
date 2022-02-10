import { Typography } from '@material-ui/core';
import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export const SuppliersBasicList = ({ items, selectedId, onClick }) => {

  const classes = useStyles();

  return (
    <div>
      <List component="nav" className={classes.root}>
        {
          items.map((item, index) => (
            <ListItem key={index} button selected={item.id === selectedId}>
              <ListItemText id={item.id} primary={<Typography> { item.name } </Typography>} onClick={() => onClick(item)} />
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
