import * as React from 'react';
import CardContent from "@material-ui/core/CardContent";
import {IconButton} from "@material-ui/core";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import BookmarksIcon from "@material-ui/icons/Bookmarks";
import PersonIcon from "@material-ui/icons/Person";
import {makeStyles} from "@material-ui/core/styles";
import {OrderStatus} from "./OrderStatus";

export const Header = ({ supplierName, tableName, purchaserName, orderStatus }) => {

  const classes = useStyles();

  return (
    <CardContent className={classes.container}>
      <div className={classes.info}>
        <IconButton disabled >
          <RestaurantIcon className={classes.icon} />
          <div style ={{color: '#6b777d'}}>
            { supplierName }
          </div>
        </IconButton>
        <IconButton disabled >
          <BookmarksIcon className={classes.icon} />
          <div style ={{color: '#6b777d'}}>
            { tableName }
          </div>
        </IconButton>
        <IconButton disabled >
          <PersonIcon className={classes.icon} />
          <div style ={{color: '#6b777d'}}>
            { purchaserName }
          </div>
        </IconButton>
      </div>
      <OrderStatus status={orderStatus}/>
    </CardContent>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  icon: {
    marginRight: 5
  },
  info: {
    display: 'flex',
    justifyContent: 'start'
  },
  status: {

  }
}));
