import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import { IconButton, Tooltip } from '@material-ui/core';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import '../../../shadow.css';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PersonIcon from '@material-ui/icons/Person';
import DeleteIcon from "@material-ui/icons/Delete";
import {useState} from "react";

export const FoodPreview = ({ food, onClick, withDelete }) => {

  const classes = useStyles();
  const [hovered, setHovered] = useState(false);

  const hasDelete = () => {
    if (food.userName) {
      return false;
    }
    return hovered && withDelete;
  }

  return (
      <div
        className={clsx("box", classes.container)}
        style={{border: 1, marginTop: 8}}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className={classes.left}>
          <Typography variant="h6" style={{paddingLeft: 15}}>
            { `${food.name}\xa0\xa0\xa0x ${food.amount}` }
          </Typography>
          <Tooltip title={`Łączny koszt. Cena za jedną pozycję: ${food.price} zł`} placement={'bottom-start'} >
            <div>
              <IconButton size={'small'} style={{justifyContent: 'flex-start', marginLeft: 12}} disabled>
                <LocalOfferIcon style ={{marginRight: 8}}/>
                <div style ={{color: '#d32f2f'}}>
                  { `${food.price * food.amount} zł` }
                </div>
              </IconButton>
            </div>
          </Tooltip>
        </div>
        <div style={{marginRight: 15}}>
          {
            hasDelete() &&
              <IconButton
                style={{marginTop: 7, marginRight: 30}}
              >
                <DeleteIcon className={classes.mainColor}/>
              </IconButton>
          }
          {
            food.userName &&
                  <IconButton size={'small'} style={{justifyContent: 'flex-start', marginLeft: 12}} disabled>
                    <PersonIcon style ={{marginRight: 8}}/>
                    <div style ={{color: '#37474f'}}>
                      { food.userName }
                    </div>
                  </IconButton>
          }
        </div>
      </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: 'space-between'
  },
  left: {
    display: 'flex',
    flexDirection: 'column'
  },
  mainColor: {
    color: theme.palette.primary.main
  },
}));
