import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Drawer from '@material-ui/core/Drawer';
import { DRAWER_WIDTH } from '../../utils/constants';
import { DrawerItems } from './DrawerItems';
import { ITEMS } from './DrawerItemsCreator';
import { useLocation, useHistory } from "react-router-dom";

export const MainViewDrawer = ({ handleDrawerClose, open }) => {

  const classes = useStyles();
  const history = useHistory();

  const decorateItemsWithOnClick = () => {
    return ITEMS.map(item => {
      return {
        ...item,
        'onClick': () => onItemClick(item)
      };
    });
  };

  const onItemClick = (item) => {
    history.push(item.url);
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, { [classes.drawerOpen]: open, [classes.drawerClose]: !open })}
      classes={{ paper: clsx({ [classes.drawerOpen]: open, [classes.drawerClose]: !open }) }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon color="primary" />
        </IconButton>
      </div>
      <Divider />
      <DrawerItems items={decorateItemsWithOnClick()} />
    </Drawer>
  );
};

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: DRAWER_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }
}));
