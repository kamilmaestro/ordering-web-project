import * as React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {
  ACCEPTED_ORDER_STATUS,
  CANCELLED_ORDER_STATUS,
  FINALIZED_ORDER_STATUS,
  FINISHED_ORDER_STATUS
} from "../../../../utils/constants";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CancelScheduleSendIcon from '@material-ui/icons/CancelScheduleSend';
import Tooltip from "@material-ui/core/Tooltip";

export const OrderStatus = ({ status }) => {

  const classes = useStyles();

  const getContent = () => {
    switch (status) {
      case ACCEPTED_ORDER_STATUS:
        return (
          <Tooltip
            title={
              <span className={classes.tooltip} >
                <p>W trakcie realizacji</p><p>Użytkownicy składają zamówienia</p>
              </span>
            }
          >
            <div>
              <ShoppingCartIcon color="primary" fontSize="large" />
              <ChevronRightIcon color="disabled" fontSize="large" />
              <LocalShippingIcon color="disabled" fontSize="large" />
              <ChevronRightIcon color="disabled" fontSize="large" />
              <AssignmentTurnedInIcon color="disabled" fontSize="large" />
            </div>
          </Tooltip>
        );
      case CANCELLED_ORDER_STATUS:
        return (
          <Tooltip
            title={
              <span className={classes.tooltip} >
                  <p>Zamknięte</p><p>Kupujący zrezygnował z zamawiania</p>
                </span>
            }
          >
            <CancelScheduleSendIcon color="primary" fontSize="large" />
          </Tooltip>
        );
      case FINALIZED_ORDER_STATUS:
        return (
          <Tooltip
            title={
              <span className={classes.tooltip} >
                <p>W drodze</p><p>Zamawiający powiadomił dostawcę o zamówieniu</p>
              </span>
            }
          >
            <div>
              <ShoppingCartIcon color="primary" fontSize="large" />
              <ChevronRightIcon color="primary" fontSize="large" />
              <LocalShippingIcon color="primary" fontSize="large" />
              <ChevronRightIcon color="disabled" fontSize="large" />
              <AssignmentTurnedInIcon color="disabled" fontSize="large" />
            </div>
          </Tooltip>
        );
      case FINISHED_ORDER_STATUS:
        return (
          <Tooltip
            title={
              <span className={classes.tooltip} >
                <p>Zakończone</p><p>Zamawiający potwierdził otrzymanie zaówienia od dostawcy</p>
              </span>
            }
          >
            <div>
              <ShoppingCartIcon color="primary" fontSize="large" />
              <ChevronRightIcon color="primary" fontSize="large" />
              <LocalShippingIcon color="primary" fontSize="large" />
              <ChevronRightIcon color="primary" fontSize="large" />
              <AssignmentTurnedInIcon color="primary" fontSize="large" />
            </div>
          </Tooltip>
        );
      default:
        return 'Unknown status';
    }
  }

  return (
    <div className={classes.container}>
      {getContent()}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 10,
    marginRight: 12
  },
  tooltip: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));
