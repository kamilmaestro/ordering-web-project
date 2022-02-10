import * as React from 'react';
import {TO_PAY_TAB} from "../tabs";
import CardHeader from "@material-ui/core/CardHeader";
import {Button, IconButton, Tooltip} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {makeStyles} from "@material-ui/core/styles";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

export const Header = ({ purchaserName, payerName, price, expanded, handleExpandClick }) => {

  const classes = useStyles();

  const getPaymentFlow = () => {
    if (purchaserName === payerName) {
      return (
        <Tooltip title={`Zamówienie, w którym byłeś zamawiajacym`} placement={'bottom-start'} >
          <div className={classes.left}>
            <IconButton disabled >
              <PersonIcon className={classes.icon} />
              <div style ={{color: '#37474f'}}>
                Własne zamówienie
              </div>
            </IconButton>
          </div>
        </Tooltip>
      );
    } else {
      return (
        <Tooltip title={`${payerName} zapłacił: ${purchaserName}`} placement={'bottom-start'} >
          <div className={classes.left}>
            <IconButton disabled >
              <PersonIcon className={classes.icon} />
              <div style ={{color: '#37474f'}}>
                { payerName }
              </div>
              <ChevronRightIcon color="primary" style={{marginLeft: 5}}/>
              <PersonIcon className={classes.icon} />
              <div style ={{color: '#37474f'}}>
                { purchaserName }
              </div>
            </IconButton>
          </div>
        </Tooltip>
      );
    }
  }

  return (
    <CardHeader
      title={ getPaymentFlow() }
      subheader={
        <IconButton disabled size={"small"} style={{paddingLeft: 12}}>
          <LocalOfferIcon className={classes.icon} />
          <div style ={{color: '#d32f2f', fontSize: 24}}>
            { `${price} zł` }
          </div>
        </IconButton>
      }
      action={
        <div className={classes.actions}>
          <IconButton
            className={clsx(classes.expand, { [classes.expandOpen]: expanded })}
            onClick={handleExpandClick}
          >
            <ExpandMoreIcon className={classes.mainColor}/>
          </IconButton>
        </div>
      }
    />
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex'
  },
  icon: {
    marginRight: 5
  },
  mainColor: {
    color: theme.palette.primary.main
  },
  actions: {
    display: 'flex',
    marginTop: 20,
    marginRight: 20
  },
  submit: {
    marginRight: 20
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  left: {
    display: 'inline-block'
  }
}));
