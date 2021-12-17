import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {MainViewDrawer} from '../../components/MainView/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Header } from '../../components/MainView/Header';
import { connect } from 'react-redux';
import {getTablesByIdsPage, getTablesPage} from "../../apiServices/tablesApi";
import {getUserOrdersPage} from "../../apiServices/orderApi";
import {OrdersForUserList} from "../../components/OrdersView/OrdersList/OrdersForUserList";
import {getSupplierByIds} from "../../apiServices/supplierApi";
import {OrderView} from "../../components/OrdersView/OrderView/OrderView";
import { useHistory } from "react-router-dom";

const OrdersView = ({ contextReducer }) => {

  const classes = useStyles();
  const history = useHistory();
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const [orders, setOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [tables, setTables] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    getUserOrders();
  }, []);

  useEffect(() => {
    getTables(orders);
    getSuppliers(orders);
  }, [currentOrder, orders]);

  const getUserOrders = () => {
    getUserOrdersPage()
      .then((response) => {
        setOrders(response.data.content);
        if (response.data.content.length >= 1) {
          setCurrentOrder(response.data.content[0]);
        }
      }).catch(error => {
        console.log(error)
      });
  }

  const getTables = (orders) => {
    const tableIds = orders.map(order => order.channelId);
    getTablesByIdsPage(tableIds)
        .then((response) => {
          setTables(response.data.content);
        }).catch(error => {
      console.log(error)
    });
  }

  const getSuppliers = (orders) => {
    const supplierIds = orders.map(order => order.supplierId)
    getSupplierByIds(supplierIds)
      .then((response) => {
        setSuppliers(response.data);
      }).catch(error => {
      console.log(error)
    })
  }

  const onOrderClick = (order) => {
    setCurrentOrder(order);
  }

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const getSupplier = (order) => {
    return order ?
      suppliers.find(supplier => supplier.id === order.supplierId)
      : null;
  }

  const getTable = (order) => {
    return order ?
      tables.find(table => table.id === order.channelId)
      : null;
  }

  return (
      <div style={{display: "flex", height: '100vh'}} >
        <CssBaseline />
        <Header
          title={'Zamówienia'}
          handleDrawerOpen={handleDrawerOpen}
          isDrawerOpen={isDrawerOpen}
        />
        <MainViewDrawer handleDrawerClose={handleDrawerClose} open={isDrawerOpen}/>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div style={{display: 'flex'}}>
            <OrdersForUserList
              orders={orders}
              currentOrderId={currentOrder ? currentOrder.id : null}
              tables={tables}
              suppliers={suppliers}
              onOrderClick={onOrderClick}
            />
            <div className={classes.right}>
              <OrderView
                orderId={currentOrder ? currentOrder.id : null}
                supplier={getSupplier(currentOrder)}
                table={getTable(currentOrder)}
                history={history}
                loggedInUserId={contextReducer.user.userId}
              />
            </div>
          </div>
        </main>
      </div>
  );
};

const mapStateToProps = ({ contextReducer }) => {
  return { contextReducer };
};

export default connect(mapStateToProps)(OrdersView);

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
