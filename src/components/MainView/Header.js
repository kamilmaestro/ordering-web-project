import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import { DRAWER_WIDTH } from '../../utils/constants';
import { SearchBar } from './SearchBar';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PeopleIcon from '@material-ui/icons/People';

export const Header = ({ title, search, searchPlaceholder, handleDrawerOpen, isDrawerOpen, handleAdd, handleJoin, handlePeople, handleSearch }) => {
  
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
          {
            searchPlaceholder && handleSearch &&
              <SearchBar text={search} placeholder={searchPlaceholder} onChange={handleSearch} />
          }
          <div style={{flexGrow: 1}} />
          {
            handlePeople &&
              <Tooltip title='Zobacz kto siedzi przy stoliku' >
                <IconButton color="inherit" onClick={handlePeople}>
                  <PeopleIcon />
                </IconButton>
              </Tooltip>
          }
          {
            handleJoin &&
              <Tooltip title='Wygeneruj zaproszenie do kanału' >
                <IconButton color="inherit" onClick={handleJoin}>
                  <PersonAddIcon />
                </IconButton>
              </Tooltip>
          }
          {
            handleAdd &&
              <React.Fragment>
                <Tooltip title={handleJoin ? 'Dodaj nowy kanał' : 'Dodaj nowego dostawcę'} >
                  <IconButton color="inherit" onClick={handleAdd}>
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </React.Fragment>
          }
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
