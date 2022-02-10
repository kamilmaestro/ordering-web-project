import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { MemberPreview } from './MemberPreview';

export const MembersDrawer = ({ members, isOpen, handleClose }) => {

  const classes = useStyles();

  return (
    <SwipeableDrawer
      anchor={'right'}
      open={isOpen}
      onClose={handleClose}
    >
      <div style={{width: 500}}>
        <List>
          {
            members.map((member, index) => (
              <MemberPreview member={member} index={index} />
            ))
          }
        </List>
      </div>
    </SwipeableDrawer>
  );
};

const useStyles = makeStyles({
  list: {
    minWidth: 500,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
});
