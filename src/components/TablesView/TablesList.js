import React from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AddIcon from '@material-ui/icons/Add';
import { Tooltip } from '@material-ui/core';

export const TablesList = ({ tables, onTableClick, onAddClick, currentTableId }) => {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav">
        {
          <Tooltip title='Otrzymaj token od znajomego, aby dołączyć do nowego stolika' arrow leaveDelay={200} >
            <ListItem button key={-1} onClick={() => onAddClick()} >
              <AddIcon color="primary" style={{marginRight: 5}} />
              <ListItemText primary='Dosiądź się do stolika' />
            </ListItem>
          </Tooltip>
        }
        {
          tables.map((table, index) => (
            <ListItem button key={index} onClick={() => onTableClick(table.id)} selected={table.id === currentTableId} >
              {
                table.id === currentTableId && <ChevronRightIcon color="primary" style={{marginRight: 4}} />
              }
              <ListItemText primary={table.name} />
            </ListItem>
          ))
        }
      </List>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 325,
    minHeight: '93vh',
    backgroundColor: theme.palette.background.paper
  }
}));
