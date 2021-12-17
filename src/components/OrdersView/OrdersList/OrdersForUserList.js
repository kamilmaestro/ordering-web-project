import React from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import {OrderPreview} from "./OrderPreview";

export const OrdersForUserList = ({ orders, tables, suppliers, onOrderClick, currentOrderId }) => {

  const classes = useStyles();

  const getTableName = (order) => {
    const table = tables.find(table => table.id === order.channelId);
    return table ?
      table.name
      : '';
  }

  const getSupplierName = (order) => {
    const supplier = suppliers.find(supplier => supplier.id === order.supplierId);
    return supplier ?
      supplier.name
      : '';
  }

  return (
      <div className={classes.root}>
        <List component="nav">
          {
            orders.map((order, index) => (
              <OrderPreview
                order={order}
                onClick={onOrderClick}
                selected={order.id === currentOrderId}
                tableName={getTableName(order)}
                supplierName={getSupplierName(order)}
                key={index}
              />
            ))
          }
        </List>
      </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 325,
    minHeight: '93vh',
    backgroundColor: theme.palette.background.paper
  }
}));
