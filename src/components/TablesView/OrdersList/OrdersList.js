import React, { useState, useEffect } from 'react';
import { getOrdersPage } from '../../../apiServices/orderApi';
import List from '@material-ui/core/List';
import OrderPreview from './OrderPreview';
import { getSupplierByIds } from '../../../apiServices/supplierApi';
import { supplierUrl } from '../../../utils/urlProvider';

export const OrdersList = ({ tableId, members, history }) => {

  const [orders, setOrders] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    if (tableId) {
      getOrders(tableId);
    }
  }, [tableId]);

  useEffect(() => {
    if (orders) {
      getSuppliers(orders);
    }
  }, [orders]);

  const getOrders = (tableId) => {
    getOrdersPage(tableId)
      .then((response) => {
        setOrders(response.data.content);
      }).catch(error => {
        console.log(error)
      })
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

  const getOrderFood = (order) => {
    return order.userOrders
      .filter(userOrder => userOrder.orderUuid === order.uuid)
      .map(userOrder => createFood(userOrder));
  }

  const createFood = (userOrder) => {
    return {
      orderUuid: userOrder.orderUuid,
      amount: userOrder.amountOfFood,
      name: userOrder.foodName,
      price: userOrder.foodPrice > 0 ? userOrder.foodPrice : 0,
      userName: getUserName(userOrder.orderedFor)
    }
  }

  const getUserName = (userId) => {
    const member = members.find(member => member.memberId === userId);
    return member ? 
      member.memberName 
      : null;
  }

  const goToSupplier = (supplierId, supplierName) => {
    history.push(supplierUrl(supplierId, supplierName));
  }

  return (
    <div>
      <List component="nav">
        {
          orders.map((order, index) => (
            <OrderPreview
              order={order}
              supplier={suppliers.find(supplier => supplier.id === order.supplierId)}
              buyerName={members.find(member => member.memberId === order.purchaserId).memberName}
              food={getOrderFood(order)}
              onClickFood={goToSupplier}
              key={index}
            />
          ))
        }
      </List>
    </div>
  );
};