import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { generateInvitation } from '../../apiServices/tablesApi';

export const InvitationPopover = ({ isOpen, handleClose, tableId }) => {

  const classes = useStyles();
  const [invitation, setInvitation] = useState(null);
  const id = isOpen ? 
    'simple-popover' 
    : undefined;

  useEffect(() => {
    getInvitation(tableId);
  }, [tableId])

  const getInvitation = (tableId) => {
    generateInvitation(tableId)
      .then((response) => {
        setInvitation(response.data);
      }).catch(error => {
        console.log(error)
      })
  }

  return (
    <div>
      <Popover
        id={id}
        open={isOpen}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        style={{marginTop: '5%', marginLeft: '14%'}}
        transitionDuration={500}
      >
        <Typography className={classes.typography} style={{display: 'flex', justifyContent: 'center'}} variant="h6" >
          Skopiuj zaproszenie
        </Typography>
        <Typography className={classes.invitation} variant="h5">
          {invitation}
        </Typography>
        <Typography className={classes.typography} style={{display: 'flex', justifyContent: 'center'}} variant="subtitle1">
          Przekaż je znajomemu, który będzie mógł dzięki niemu dołączyć do tego stolika
        </Typography>
      </Popover>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  invitation: {
    padding: theme.spacing(2),
    display: 'flex', 
    justifyContent: 'center', 
    wordBreak: 'break-all',
    maxWidth: 1250
  }
}));
