import * as React from 'react';
import {List} from "@material-ui/core";
import {OrderedFoodPreview} from "./OrderedFoodPreview";

export const OrderedFoodList = ({ orderedFood, onFoodClick, canEdit }) => {
  return (
    <List component="nav" style={{marginBottom: 10}}>
      {
        orderedFood.map((food, index) => (
          <OrderedFoodPreview
            food={food}
            onClick={onFoodClick}
            withDelete={canEdit}
            key={index}
          />
        ))
      }
    </List>
  );
};