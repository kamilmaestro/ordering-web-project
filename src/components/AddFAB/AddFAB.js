import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

export const AddFAB = ({ onClick, tooltip }) => {

  const classes = useStyles();

  return (
    <Tooltip title={tooltip} style={{fontSize: 70}}>
      <Fab color="primary" className={classes.fab} onClick={onClick} >
        <AddIcon className={classes.icon} />
      </Fab>
    </Tooltip>
  );
};

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: 0,
    top: 'auto',
    bottom: theme.spacing(7),
    right: theme.spacing(10),
    left: 'auto',
    position: 'fixed',
    width: 70,
    height: 70
  },
  icon: {
    fontSize: '2.1rem'
  }
}));