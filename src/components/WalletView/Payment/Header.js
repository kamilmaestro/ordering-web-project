import * as React from 'react';
import {Button, IconButton, Tooltip} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CardHeader from "@material-ui/core/CardHeader";
import {makeStyles} from "@material-ui/core/styles";
import {TO_PAY_TAB} from "../tabs";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";

export const Header = ({ userName, price, expanded, handleExpandClick, tab, markAsPaidOff }) => {

  const classes = useStyles();

  const getTooltip = () => {
    return tab === TO_PAY_TAB ?
      'Osoba kupująca, której nalezy zapłacić'
      : 'Osoba, od której oczekujesz zapłaty';
  }

  const getButtonValue = () => {
    return tab === TO_PAY_TAB ?
      'Potwierdź zapłatę'
      : 'Potwierdź otrzymanie zapłaty';
  }

  return (
    <CardHeader
      title={
        <Tooltip title={getTooltip()} placement={'bottom-start'} >
          <div className={classes.left}>
            <IconButton disabled >
              <PersonIcon className={classes.icon} />
              <div style ={{color: '#37474f'}}>
                { userName }
              </div>
            </IconButton>
          </div>
        </Tooltip>
      }
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
          <Button variant="contained" color="primary" className={classes.submit} onClick={markAsPaidOff} >
            { getButtonValue() }
          </Button>
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
