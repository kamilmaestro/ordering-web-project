import * as React from 'react';
import {List} from "@material-ui/core";
import {PaymentDetails} from "./PaymentDetails";

export const PaymentDetailsList = ({ detailsList }) => {
  return (
    <div style={{marginLeft: 28, marginRight: 28}} >
      <List component="nav" style={{marginBottom: 10}}>
        {
          detailsList.map((details, index) => (
            <PaymentDetails details={details} key={index} />
          ))
        }
      </List>
    </div>
  );
};