import { SERVER_URL } from '../utils/urlProvider';
import {axios} from '../utils/tokenGetter'

export const getProposalsPage = (tableId) => {
  const url = `${SERVER_URL}/order/channel/${tableId}/proposals`;

  return axios.get(url);
}

export const createNewProposal = (name) => {
  const url = `${SERVER_URL}/order/`;

  return axios.post(url, name);
}

export const getOrdersPage = (tableId) => {
  const url = `${SERVER_URL}/order/channel/${tableId}`;

  return axios.get(url);
}

export const becomePurchaserForSupplier = (supplierId, tableId) => {
  const url = `${SERVER_URL}/order/purchaser`;
  const purchaser = {
    supplierId: supplierId,
    channelId: tableId
  };

  return axios.post(url, purchaser);
}

export const getUserOrdersPage = () => {
  const url = `${SERVER_URL}/order/user`;

  return axios.get(url);
}

export const getOrderWithUserOrders = (orderId) => {
  const url = `${SERVER_URL}/order/${orderId}`;

  return axios.get(url);
}

export const finalizeOrderById = (orderId) => {
  const url = `${SERVER_URL}/order/${orderId}/finalize`;

  return axios.post(url);
}

export const finishOrderById = (orderId) => {
  const url = `${SERVER_URL}/order/${orderId}/finish`;

  return axios.post(url);
}

export const editUserOrder = (orderId, userOrderId, editedFood) => {
  const url = `${SERVER_URL}/order/${orderId}/user-order/${userOrderId}`;
  const body = {
    editedFood: editedFood
  };

  return axios.put(url, body);
}

export const removeUserOrder = (orderId, userOrderId) => {
  const url = `${SERVER_URL}/order/${orderId}/user-order/${userOrderId}`;

  return axios.delete(url);
}

export const resignFromPurchase = (orderId) => {
  const url = `${SERVER_URL}/order/${orderId}`;

  return axios.delete(url);
}
