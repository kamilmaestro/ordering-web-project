import * as React from 'react';
import Card from "@material-ui/core/Card";
import {getImageUrl} from "../../../utils/imagesGetter";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {useEffect, useState} from "react";
import {getUsersByIds} from "../../../apiServices/userApi";
import {UserOrdersList} from "./UserOrders/UserOrdersList";
import {Header} from "./Header/Header";
import {
  editUserOrder,
  finalizeOrderById,
  finishOrderById,
  getOrderWithUserOrders,
  removeUserOrder, resignFromPurchase
} from "../../../apiServices/orderApi";
import {supplierUrl} from "../../../utils/urlProvider";
import {ACCEPTED_ORDER_STATUS, FINALIZED_ORDER_STATUS, FINISHED_ORDER_STATUS} from "../../../utils/constants";
import {UserOrderEditModal} from "./UserOrderEditModal/UserOrderEditModal";
import {SnackBar} from "./SnackBar";

export const OrderView = ({ orderId, supplier, table, history, loggedInUserId }) => {

  const classes = useStyles();
  const [order, setOrder] = useState(null);
  const [users, setUsers] = useState([]);
  const [isOpenEditUserOrderModal, setIsOpenEditUserOrderModal] = useState(false);
  const [editedUserOrder, setEditedUserOrder] = useState(null);
  const [isOpenUserOrderSnackBar, setIsOpenUserOrderSnackBar] = useState(false);

  useEffect(() => {
    if (orderId) {
      getOrder(orderId);
    }
  }, [orderId]);

  useEffect(() => {
    if (order) {
      getUsers(order);
    }
  }, [order]);

  const getOrder = (orderId) => {
    getOrderWithUserOrders(orderId)
      .then((response) => {
        setOrder(response.data);
      }).catch(error => {
        console.log(error)
      });
  }

  const getUsers = (order) => {
    const userIds = order.userOrders.map(userOrder => userOrder.orderedFor);
    userIds.push(order.purchaserId);
    getUsersByIds(userIds)
      .then((response) => {
        setUsers(response.data);
      }).catch(error => {
        console.log(error)
      });
  }

  const getPurchaserName = () => {
    const purchaser = users.find(user => order.purchaserId === user.userId);
    return purchaser ? purchaser.username : '';
  }

  const goToSupplier = () => {
    history.push(supplierUrl(supplier.id, supplier.name));
  }

  const finalizeOrder = () => {
    finalizeOrderById(order.id)
      .then((response) => {
        setOrder(response.data);
      }).catch(error => {
        console.log(error)
      });
  }

  const finishOrder = () => {
    finishOrderById(order.id)
      .then((response) => {
        setOrder(response.data);
      }).catch(error => {
        console.log(error)
      });
  }

  const canEdit = () => {
    return order && order.purchaserId === loggedInUserId;
  };

  const canRemoveUserOrder = (orderedFor) => {
    if (order) {
      return order.status !== FINISHED_ORDER_STATUS &&
        (order.purchaserId === loggedInUserId || orderedFor === loggedInUserId);
    } else {
      return false;
    }
  };

  const handleOpenEditUserOrderModal = (userOrder) => {
    setEditedUserOrder(userOrder);
    setIsOpenEditUserOrderModal(true);
  }

  const handleCloseEditUserOrderModal = () => {
    setIsOpenEditUserOrderModal(false);
    setEditedUserOrder(null);
  }

  const canEditUserOrder = () => {
    if (order) {
      return order.status === FINALIZED_ORDER_STATUS && order.purchaserId === loggedInUserId;
    } else {
      return false;
    }
  };

  const onEditUserOrder = (userOrderId, editedFood) => {
    editUserOrder(order.id, userOrderId, editedFood)
      .then(() => {
        getOrder(orderId);
      }).catch(error => {
        console.log(error)
      });
    handleCloseEditUserOrderModal();
  }

  const onUserOrderRemove = (userOrderId) => {
    removeUserOrder(order.id, userOrderId)
      .then(() => {
        getOrder(orderId);
        handleOpenUserOrderSnackBar();
      }).catch(error => {
        console.log(error)
      });
  }

  const handleOpenUserOrderSnackBar = () => {
    setIsOpenUserOrderSnackBar(true);
  };

  const handleCloseUserOrderSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpenUserOrderSnackBar(false);
  };

  const onResign = () => {
    resignFromPurchase(order.id)
      .then(() => {
        getOrder(orderId);
      }).catch(error => {
        console.log(error)
      });
  }

  const getAction = (status) => {
    return canEdit() ?
      createAction(status)
      : null;
  }

  const createAction = (status) => {
    switch (status) {
      case ACCEPTED_ORDER_STATUS:
        return (
          <div>
            <Button size="medium" color="primary" variant="contained" onClick={finalizeOrder} className={classes.button} >
              Finalizuj
            </Button>
            <Button size="medium" color="primary" variant="contained" onClick={onResign} >
              Rezygnuj
            </Button>
          </div>
        );
      case FINALIZED_ORDER_STATUS:
        return (
          <div>
            <Button size="medium" color="primary" variant="contained" onClick={finishOrder} className={classes.button} >
              Zakończ
            </Button>
            <Button size="medium" color="primary" variant="contained" onClick={onResign} >
              Rezygnuj
            </Button>
          </div>
        );
      case FINISHED_ORDER_STATUS:
      default:
        return null;
    }
  }

  return (
    <div className={classes.root} >
      <Card >
        <Header
          supplierName={supplier ? supplier.name : null}
          tableName={table ? table.name : null}
          purchaserName={getPurchaserName()}
          orderStatus={order ? order.status : null}
        />
        <img
          className={classes.media}
          src={getImageUrl(supplier ? supplier.imageId : null)}
          alt=''
        />
        <div className={classes.info}>
          { getAction(order ? order.status : null) }
        </div>
      </Card>
      <UserOrdersList
        userOrders={order ? order.userOrders : []}
        users={users}
        onFoodClick={goToSupplier}
        canEdit={canEditUserOrder}
        canRemove={canRemoveUserOrder}
        onClickEdit={handleOpenEditUserOrderModal}
        onClickRemove={onUserOrderRemove}
      />
      <UserOrderEditModal
        isOpen={isOpenEditUserOrderModal}
        userOrder={editedUserOrder}
        onSubmit={onEditUserOrder}
        onClose={handleCloseEditUserOrderModal}
      />
      <SnackBar isOpen={isOpenUserOrderSnackBar} handleClose={handleCloseUserOrderSnackBar} />
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '2%'
  },
  media: {
    marginTop: 25,
    maxHeight: 250,
    objectFit: 'contain',
    width: '100%',
    borderRadius: '10%'
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: '3%',
    marginRight: '3%',
    marginBottom: '1.5%'
  },
  button: {
    marginRight: 15
  }
}));
