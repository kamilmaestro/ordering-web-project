import * as React from 'react';
import {AppBar, IconButton, Toolbar} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useHistory } from "react-router-dom";
import { HOME_PAGE_URL } from '../../utils/urlProvider';

export const HomeHeader = ({ color, onAccountIconClick }) => {

  const history = useHistory();
  
  const goToHomePage = () => {
		history.push(HOME_PAGE_URL);
	}

  return (
    <div >
      <AppBar elevation={0} color={color}>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <div style={{cursor: "pointer", paddingBottom: 10}} onClick={goToHomePage} >
            <h1 style={{letterSpacing: 1.5, margin: 5}} >
              Foo<span className='title_accent'>d</span>livery
            </h1>
          </div>
          {
            onAccountIconClick &&
              <IconButton style={{ color: "white"}} onClick={onAccountIconClick} >
                <AccountCircle style={{ fontSize: 50 }}  />
              </IconButton>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
};