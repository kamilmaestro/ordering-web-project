import * as React from 'react';
import {useState} from "react";
import Card from "@material-ui/core/Card";
import Collapse from "@material-ui/core/Collapse";
import {PaymentDetailsList} from "../PaymentDetails/PaymentDetailsList";
import {Header} from "./Header";

export const ArchivalPayment = ({ payment, purchaser, payer }) => {

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card style={{marginBottom: 10}} >
      <Header
        purchaserName={purchaser ? purchaser.username : ''}
        payerName={payer ? payer.username : ''}
        price={payment.price}
        expanded={expanded}
        handleExpandClick={handleExpandClick}
      />
      <Collapse in={expanded} timeout={500} unmountOnExit>
        <PaymentDetailsList detailsList={payment.details} />
      </Collapse>
    </Card>
  );
};