import * as React from 'react';
import Card from "@material-ui/core/Card";

import Collapse from "@material-ui/core/Collapse";
import {Header} from "./Header";
import {useState} from "react";
import {PaymentDetailsList} from "../PaymentDetails/PaymentDetailsList";

export const Payment = ({ tab, payment, user, markAsPaidOff }) => {

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const markAsPaidOffById = () => {
    markAsPaidOff(payment.id);
  }

  return (
    <Card >
      <Header
        userName={user ? user.username : ''}
        price={payment.price}
        expanded={expanded}
        handleExpandClick={handleExpandClick}
        markAsPaidOff={markAsPaidOffById}
        tab={tab}
      />
      <Collapse in={expanded} timeout={500} unmountOnExit>
        <PaymentDetailsList detailsList={payment.details} />
      </Collapse>
    </Card>
  );
};
