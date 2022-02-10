import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';

export const MemberPreview = ({ member, index }) => {

  const classes = useStyles();

  return (
    <div key={index} className={classes.root}>
      <Avatar className={index % 2 === 0 ? classes.orange : classes.purple}> 
        { member.memberName.charAt(0) } 
      </Avatar>
      <Typography variant="h5" style={{marginLeft: 10, marginTop: 5}}>
        { member.memberName }
      </Typography>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginLeft: 25,
    margin: 15
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));
