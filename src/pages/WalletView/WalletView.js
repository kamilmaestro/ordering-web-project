import * as React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import {MainViewDrawer} from "../../components/MainView/Drawer";
import {makeStyles} from "@material-ui/core/styles";
import {useState} from "react";
import { useHistory } from "react-router-dom";
import {PaymentsList} from "../../components/WalletView/PaymentsList";
import {TabbedHeader} from "../../components/WalletView/TabbedHeader";
import {TO_PAY_TAB} from "../../components/WalletView/tabs";

export const WalletView = () => {

  const classes = useStyles();
  const history = useHistory();
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [tab, setTab] = useState(TO_PAY_TAB);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <div style={{display: "flex", height: '100vh'}} >
      <CssBaseline />
      <TabbedHeader
        title={'Portfel'}
        handleDrawerOpen={handleDrawerOpen}
        isDrawerOpen={isDrawerOpen}
        tab={tab}
        handleTabChange={handleTabChange}
      />
      <MainViewDrawer handleDrawerClose={handleDrawerClose} open={isDrawerOpen}/>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <PaymentsList tab={tab} />
      </main>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1
  },
  right: {
    width: '100%'
  },
  list: {
    height:'86vh',
    overflowX: 'auto',
    overflow: 'scroll'
  }
}));
