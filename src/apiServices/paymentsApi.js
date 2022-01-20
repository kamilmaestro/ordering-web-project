import {SERVER_URL} from "../utils/urlProvider";
import {axios} from "../utils/tokenGetter";

export const getUserCharges = () => {
  const url = `${SERVER_URL}/payment/charges/`;
  return axios.get(url);
}

export const getUserMoneyDue = () => {
  const url = `${SERVER_URL}/payment/due/`;
  return axios.get(url);
}

export const getUserPaidOffPayments = () => {
  const url = `${SERVER_URL}/payment/archival/`;
  return axios.get(url);
}

export const markPaymentAsPaidOffById = (paymentId) => {
  const url = `${SERVER_URL}/payment/${paymentId}/`;

  return axios.post(url);
}
