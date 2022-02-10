import * as React from 'react';
import {ARCHIVAL_TAB, MONEY_DUE_TAB, TO_PAY_TAB} from "./tabs";
import {useEffect, useState} from "react";
import {
  getUserCharges,
  getUserMoneyDue,
  getUserPaidOffPayments,
  markPaymentAsPaidOffById
} from "../../apiServices/paymentsApi";
import {getUsersByIds} from "../../apiServices/userApi";
import {Payment} from "./Payment/Payment";
import List from "@material-ui/core/List";
import {ArchivalPayment} from "./ArchivalPayment/ArchivalPayment";

export const PaymentsList = ({ tab }) => {

  const [payments, setPayments] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getPayments();
  }, [tab]);

  useEffect(() => {
    getUsers();
  }, [payments]);

  const getPayments = () => {
    switch (tab) {
      case MONEY_DUE_TAB:
        getMoneyDue();
        break;
      case ARCHIVAL_TAB:
        getArchivalPayments();
        break;
      case TO_PAY_TAB:
      default:
        getCharges();
        break;
    }
  }

  const getCharges = () => {
    getUserCharges()
      .then((response) => {
        setPayments(response.data.content);
      }).catch(error => {
        console.log(error)
      })
  }

  const getMoneyDue = () => {
    getUserMoneyDue()
      .then((response) => {
        setPayments(response.data.content);
      }).catch(error => {
        console.log(error)
      })
  }

  const getArchivalPayments = () => {
    getUserPaidOffPayments()
      .then((response) => {
        setPayments(response.data.content);
      }).catch(error => {
        console.log(error)
      })
  }

  const getUsers = () => {
    const userIds = [];
    payments.forEach(payment => userIds.push(payment.purchaserId, payment.payerId));

    getUsersByIds(userIds)
      .then((response) => {
        setUsers(response.data);
      }).catch(error => {
        console.log(error)
      });
  }

  const markPaymentAsPaidOff = (paymentId) => {
    markPaymentAsPaidOffById(paymentId)
      .then(() => {
        getPayments();
      }).catch(error => {
      console.log(error)
    });
  }

  const getPurchaser = (payment) => {
    return users.find(user => user.userId === payment.purchaserId);
  }

  const getPayer = (payment) => {
    return users.find(user => user.userId === payment.payerId);
  }

  const getUserFromPayment = (payment) => {
    if (tab === TO_PAY_TAB) {
      return getPurchaser(payment);
    } else {
      return getPayer(payment);
    }
  }

  const createPayment = (payment, index) => {
    if (tab === ARCHIVAL_TAB) {
      return (
        <ArchivalPayment
          payment={payment}
          purchaser={getPurchaser(payment)}
          payer={getPayer(payment)}
          key={index}
        />
      );
    } else {
      return (
        <Payment
          tab={tab}
          payment={payment}
          user={getUserFromPayment(payment)}
          markAsPaidOff={markPaymentAsPaidOff}
          key={index}
        />
      );
    }
  }

  return (
    <div style={{marginLeft: '10%', marginRight: '10%', marginTop: 12}}>
      <List component="nav">
        {
          payments.map((payment, index) =>
            createPayment(payment, index)
          )
        }
      </List>
    </div>
  );
};