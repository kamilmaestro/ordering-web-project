import * as React from 'react';
import AppBar from "@material-ui/core/AppBar";
import clsx from "clsx";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {DRAWER_WIDTH} from "../../utils/constants";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {ARCHIVAL_TAB, MONEY_DUE_TAB, TO_PAY_TAB} from "./tabs";

export const TabbedHeader = ({ title, handleDrawerOpen, isDrawerOpen, tab, handleTabChange }) => {

  const classes = useStyles();

  return (
    <div>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, { [classes.appBarShift]: isDrawerOpen })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, { [classes.hide]: isDrawerOpen, })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            { title }
          </Typography>
          <div style={{flexGrow: 1}} >
            <Tabs value={tab} onChange={handleTabChange} centered>
              <Tab value={TO_PAY_TAB} label='Do zapłaty'/>
              <Tab value={MONEY_DUE_TAB} label='Moje należności'/>
              <Tab value={ARCHIVAL_TAB} label='Archiwalne płatności'/>
            </Tabs>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  }
}));
